import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TopFripe | Boutique de fripe",
  description: "Vetements de seconde main selectionnes: homme, femme, enfant, chaussures et accessoires."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
