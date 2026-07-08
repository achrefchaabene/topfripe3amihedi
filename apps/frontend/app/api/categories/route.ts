import { NextResponse } from "next/server";
import { adminUnauthorized, isAdminRequest } from "@/lib/server/admin-auth";
import { uploadImage } from "@/lib/server/cloudinary";
import { connectDb } from "@/lib/server/db";
import { Category } from "@/lib/server/models";
import { seedCategoriesIfEmpty } from "@/lib/server/seed";

export async function GET() {
  await connectDb();
  await seedCategoriesIfEmpty();
  const categories = await Category.find().sort({ order: 1, name: 1 });
  return NextResponse.json(categories);
}

export async function POST(request: Request) {
  if (!isAdminRequest(request)) return adminUnauthorized();

  await connectDb();
  const body = await readCategoryBody(request);
  const category = await Category.create(body);
  return NextResponse.json(category, { status: 201 });
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
