import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@topfripe.com";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "TopFripe2026!";
  const adminToken = process.env.ADMIN_TOKEN ?? "topfripe-admin-secret-2026-change-moi";

  if (
    email !== adminEmail ||
    password !== adminPassword ||
    !adminToken
  ) {
    return NextResponse.json({ message: "Identifiants admin invalides" }, { status: 401 });
  }

  return NextResponse.json({ token: adminToken });
}
