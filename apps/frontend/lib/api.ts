import { apiUrl } from "@/lib/config";
import type { Category, Product } from "@/lib/products";

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${apiUrl}/products`, { cache: "no-store" });
  if (!response.ok) throw new Error("Unable to load products");
  return response.json();
}

export async function getCategories(): Promise<Category[]> {
  const response = await fetch(`${apiUrl}/categories`, { cache: "no-store" });
  if (!response.ok) throw new Error("Unable to load categories");
  return response.json();
}

export async function adminLogin(email: string, password: string) {
  const response = await fetch(`${apiUrl}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  if (!response.ok) throw new Error("Identifiants admin invalides");
  return response.json() as Promise<{ token: string }>;
}

export async function adminRequest(path: string, token: string, init: RequestInit = {}) {
  const headers = new Headers(init.headers);
  headers.set("Authorization", `Bearer ${token}`);

  if (!(init.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${apiUrl}${path}`, { ...init, headers });
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Erreur serveur" }));
    throw new Error(error.message ?? "Erreur serveur");
  }

  if (response.status === 204) return null;
  return response.json();
}
