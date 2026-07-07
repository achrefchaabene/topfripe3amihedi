export const apiUrl =
  process.env.NEXT_PUBLIC_API_URL ??
  (process.env.NODE_ENV === "development" ? "http://localhost:4000/api" : "");

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
