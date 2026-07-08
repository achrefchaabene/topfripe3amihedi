import { NextResponse } from "next/server";
import { adminUnauthorized, isAdminRequest } from "@/lib/server/admin-auth";
import { uploadImage } from "@/lib/server/cloudinary";
import { connectDb } from "@/lib/server/db";
import { Product } from "@/lib/server/models";

type Params = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, { params }: Params) {
  await connectDb();
  const { id } = await params;
  const product = await Product.findById(id);

  if (!product) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}

export async function PATCH(request: Request, { params }: Params) {
  if (!isAdminRequest(request)) return adminUnauthorized();

  await connectDb();
  const { id } = await params;
  const body = await readProductBody(request);
  const product = await Product.findByIdAndUpdate(
    id,
    {
      ...body,
      ...(body.price !== undefined ? { price: Number(body.price) } : {}),
      ...(body.stock !== undefined ? { stock: Number(body.stock) } : {}),
      ...(body.sold !== undefined ? { sold: Boolean(body.sold) } : {})
    },
    { new: true, runValidators: true }
  );

  if (!product) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}

export async function DELETE(request: Request, { params }: Params) {
  if (!isAdminRequest(request)) return adminUnauthorized();

  await connectDb();
  const { id } = await params;
  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  return new NextResponse(null, { status: 204 });
}

async function readProductBody(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";

  if (!contentType.includes("multipart/form-data")) {
    return request.json();
  }

  const formData = await request.formData();
  const imageFiles = formData
    .getAll("imageFiles")
    .filter((file): file is File => file instanceof File && file.size > 0);
  const uploadedImages = await Promise.all(
    imageFiles.map((file) => uploadImage(file, "topfripe/products"))
  );
  const imageUrls = String(formData.get("imageUrls") ?? "")
    .split("\n")
    .map((image) => image.trim())
    .filter(Boolean);

  return {
    title: String(formData.get("title") ?? ""),
    price: Number(formData.get("price") ?? 0),
    description: String(formData.get("description") ?? ""),
    brand: String(formData.get("brand") ?? ""),
    category: String(formData.get("category") ?? ""),
    size: String(formData.get("size") ?? ""),
    gender: String(formData.get("gender") ?? "Unisexe"),
    condition: String(formData.get("condition") ?? "Tres bon"),
    color: String(formData.get("color") ?? ""),
    images: [...imageUrls, ...uploadedImages],
    stock: Number(formData.get("stock") ?? 1),
    sold: String(formData.get("sold") ?? "false") === "true"
  };
}
