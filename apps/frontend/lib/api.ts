import { apiUrl } from "@/lib/config";
import type { Category, Product } from "@/lib/products";

const requestTimeoutMs = 20000;

export async function getProducts(): Promise<Product[]> {
  if (!apiUrl) throw new Error("API backend non configuree");
  const response = await fetchWithTimeout(`${apiUrl}/products`, { cache: "no-store" });
  if (!response.ok) throw new Error("Unable to load products");
  return response.json();
}

export async function getCategories(): Promise<Category[]> {
  if (!apiUrl) throw new Error("API backend non configuree");
  const response = await fetchWithTimeout(`${apiUrl}/categories`, { cache: "no-store" });
  if (!response.ok) throw new Error("Unable to load categories");
  return response.json();
}

export async function adminLogin(email: string, password: string) {
  if (!apiUrl) {
    throw new Error("API backend non configuree sur Vercel. Ajoute NEXT_PUBLIC_API_URL avec l'URL Render.");
  }

  let response: Response;

  try {
    response = await fetchWithTimeout(`${apiUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new Error(
        "Connexion trop longue. Le backend Render est peut-etre en sommeil ou NEXT_PUBLIC_API_URL est incorrect."
      );
    }

    throw new Error(`Impossible de contacter l'API: ${apiUrl}. Verifie Render et CLIENT_URL.`);
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Identifiants admin invalides" }));
    throw new Error(error.message ?? "Identifiants admin invalides");
  }

  return response.json() as Promise<{ token: string }>;
}

export async function adminRequest(path: string, token: string, init: RequestInit = {}) {
  if (!apiUrl) {
    throw new Error("API backend non configuree sur Vercel. Ajoute NEXT_PUBLIC_API_URL avec l'URL Render.");
  }

  const headers = new Headers(init.headers);
  headers.set("Authorization", `Bearer ${token}`);

  if (!(init.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetchWithTimeout(`${apiUrl}${path}`, { ...init, headers });
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Erreur serveur" }));
    throw new Error(error.message ?? "Erreur serveur");
  }

  if (response.status === 204) return null;
  return response.json();
}

function fetchWithTimeout(input: RequestInfo | URL, init: RequestInit = {}) {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), requestTimeoutMs);

  return fetch(input, {
    ...init,
    signal: init.signal ?? controller.signal
  }).finally(() => window.clearTimeout(timeout));
}
