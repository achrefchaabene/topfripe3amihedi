import { NextResponse } from "next/server";
import { adminUnauthorized, isAdminRequest } from "@/lib/server/admin-auth";
import { uploadImage } from "@/lib/server/cloudinary";
import { connectDb } from "@/lib/server/db";
import { Category } from "@/lib/server/models";

type Params = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, { params }: Params) {
  if (!isAdminRequest(request)) return adminUnauthorized();

  await connectDb();
  const { id } = await params;
  const body = await readCategoryBody(request);
  const category = await Category.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true
  });

  if (!category) {
    return NextResponse.json({ message: "Category not found" }, { status: 404 });
  }

  return NextResponse.json(category);
}

export async function DELETE(request: Request, { params }: Params) {
  if (!isAdminRequest(request)) return adminUnauthorized();

  await connectDb();
  const { id } = await params;
  const category = await Category.findByIdAndDelete(id);

  if (!category) {
    return NextResponse.json({ message: "Category not found" }, { status: 404 });
  }

  return new NextResponse(null, { status: 204 });
}

async function readCategoryBody(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";

  if (!contentType.includes("multipart/form-data")) {
    return request.json();
  }

  const formData = await request.formData();
  const imageFile = formData.get("imageFile");
  const uploadedImage =
    imageFile instanceof File && imageFile.size > 0
      ? await uploadImage(imageFile, "topfripe/categories")
      : "";

  return {
    name: String(formData.get("name") ?? ""),
    description: String(formData.get("description") ?? ""),
    order: Number(formData.get("order") ?? 0),
    image: uploadedImage || String(formData.get("image") ?? "")
  };
}
