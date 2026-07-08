import { NextResponse } from "next/server";

export function isAdminRequest(request: Request) {
  const header = request.headers.get("authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  const adminToken = process.env.ADMIN_TOKEN ?? "topfripe-admin-secret-2026-change-moi";

  return Boolean(adminToken && token === adminToken);
}

export function adminUnauthorized() {
  return NextResponse.json({ message: "Admin access required" }, { status: 401 });
}
