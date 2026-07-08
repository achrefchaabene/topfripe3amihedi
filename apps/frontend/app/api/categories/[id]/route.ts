import { NextResponse } from "next/server";
import { adminUnauthorized, isAdminRequest } from "@/lib/server/admin-auth";
import { connectDb } from "@/lib/server/db";
import { Category } from "@/lib/server/models";

type Params = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, { params }: Params) {
  if (!isAdminRequest(request)) return adminUnauthorized();

  await connectDb();
  const { id } = await params;
  const body = await request.json();
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
