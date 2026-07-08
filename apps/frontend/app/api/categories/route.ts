import { NextResponse } from "next/server";
import { adminUnauthorized, isAdminRequest } from "@/lib/server/admin-auth";
import { connectDb } from "@/lib/server/db";
import { Category } from "@/lib/server/models";

export async function GET() {
  await connectDb();
  const categories = await Category.find().sort({ order: 1, name: 1 });
  return NextResponse.json(categories);
}

export async function POST(request: Request) {
  if (!isAdminRequest(request)) return adminUnauthorized();

  await connectDb();
  const body = await request.json();
  const category = await Category.create(body);
  return NextResponse.json(category, { status: 201 });
}
