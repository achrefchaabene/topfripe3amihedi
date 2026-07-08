import { NextResponse } from "next/server";
import { adminUnauthorized, isAdminRequest } from "@/lib/server/admin-auth";
import { connectDb } from "@/lib/server/db";
import { Product } from "@/lib/server/models";

export async function GET(request: Request) {
  await connectDb();

  const { searchParams } = new URL(request.url);
  const filters: Record<string, unknown> = {};
  const category = searchParams.get("category");
  const size = searchParams.get("size");
  const brand = searchParams.get("brand");
  const color = searchParams.get("color");
  const availability = searchParams.get("availability");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const search = searchParams.get("search");

  if (category) filters.$or = [{ category }, { gender: category }];
  if (size) filters.size = size;
  if (brand) filters.brand = brand;
  if (color) filters.color = color;
  if (availability === "available") filters.sold = false;
  if (availability === "sold") filters.sold = true;
  if (minPrice || maxPrice) {
    filters.price = {};
    if (minPrice) (filters.price as Record<string, number>).$gte = Number(minPrice);
    if (maxPrice) (filters.price as Record<string, number>).$lte = Number(maxPrice);
  }
  if (search) filters.$text = { $search: search };

  const products = await Product.find(filters).sort({ createdAt: -1 });
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  if (!isAdminRequest(request)) return adminUnauthorized();

  await connectDb();
  const body = await request.json();
  const product = await Product.create({
    ...body,
    price: Number(body.price),
    stock: Number(body.stock ?? 1),
    sold: Boolean(body.sold)
  });

  return NextResponse.json(product, { status: 201 });
}
