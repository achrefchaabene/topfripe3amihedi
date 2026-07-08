const configuredApiUrl =
  process.env.NODE_ENV === "production"
    ? "/api"
    : process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

export const apiUrl = normalizeApiUrl(configuredApiUrl);

function normalizeApiUrl(url: string) {
  const cleanUrl = url.replace(/\/$/, "");
  if (!cleanUrl) return "";
  if (cleanUrl.endsWith("/api")) return cleanUrl;
  return `${cleanUrl}/api`;
}

export const contact = {
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "21655859891",
  instagramUrl: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "https://www.instagram.com/topfripe202",
  facebookUrl:
    process.env.NEXT_PUBLIC_FACEBOOK_URL ??
    "https://www.facebook.com/share/1BzADuL6Lt/?mibextid=wwXIfr",
  mapsUrl: process.env.NEXT_PUBLIC_MAPS_URL ?? "https://maps.apple/p/-RKpBgI4yKaaCE",
  address: process.env.NEXT_PUBLIC_SHOP_ADDRESS ?? "Localisation TopFripe"
};

export function whatsappUrl() {
  return `https://wa.me/${contact.whatsappNumber}`;
}
