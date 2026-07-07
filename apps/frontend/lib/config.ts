export const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

export const contact = {
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "21600000000",
  instagramUrl: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "https://instagram.com/topfripe",
  facebookUrl: process.env.NEXT_PUBLIC_FACEBOOK_URL ?? "https://facebook.com/topfripe",
  mapsUrl: process.env.NEXT_PUBLIC_MAPS_URL ?? "https://maps.google.com",
  address: process.env.NEXT_PUBLIC_SHOP_ADDRESS ?? "Adresse de la boutique"
};

export function whatsappUrl() {
  return `https://wa.me/${contact.whatsappNumber}`;
}
