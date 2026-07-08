import { NextResponse } from "next/server";
import { adminUnauthorized, isAdminRequest } from "@/lib/server/admin-auth";
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
  const body = await request.json();
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
