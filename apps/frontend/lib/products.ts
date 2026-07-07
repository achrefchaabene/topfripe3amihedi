export type Product = {
  _id?: string;
  id?: string;
  title: string;
  price: number;
  description: string;
  brand: string;
  category: string;
  size: string;
  gender: string;
  condition: "Neuf" | "Tres bon" | "Bon";
  color: string;
  images: string[];
  stock: number;
  sold: boolean;
  createdAt: string;
};

export type Category = {
  _id?: string;
  id?: string;
  name: string;
  description?: string;
  order?: number;
};

export const categories = [
  "Homme",
  "Femme",
  "Enfant",
  "Chaussures",
  "Vestes",
  "Jeans",
  "Accessoires"
];

export const products: Product[] = [
  {
    id: "p1",
    title: "Veste denim vintage",
    price: 79,
    description: "Coupe droite, denim epais, parfaite sur hoodie ou robe legere.",
    brand: "Levi's",
    category: "Vestes",
    size: "M",
    gender: "Femme",
    condition: "Tres bon",
    color: "Bleu",
    images: [
      "https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80"
    ],
    stock: 1,
    sold: false,
    createdAt: "2026-07-01T09:00:00.000Z"
  },
  {
    id: "p2",
    title: "Jean droit brut",
    price: 55,
    description: "Jean solide, taille haute, couleur encore profonde.",
    brand: "Lee",
    category: "Jeans",
    size: "42",
    gender: "Homme",
    condition: "Bon",
    color: "Indigo",
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1475178626620-a4d074967452?auto=format&fit=crop&w=900&q=80"
    ],
    stock: 1,
    sold: false,
    createdAt: "2026-07-02T11:30:00.000Z"
  },
  {
    id: "p3",
    title: "Sneakers blanches",
    price: 89,
    description: "Paire nettoyee, semelle en tres bon etat, facile a assortir.",
    brand: "Nike",
    category: "Chaussures",
    size: "40",
    gender: "Femme",
    condition: "Tres bon",
    color: "Blanc",
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1465453869711-7e174808ace9?auto=format&fit=crop&w=900&q=80"
    ],
    stock: 1,
    sold: false,
    createdAt: "2026-07-03T15:00:00.000Z"
  },
  {
    id: "p4",
    title: "Sac bandouliere cuir",
    price: 45,
    description: "Petit format, cuir souple, fermoir metal vintage.",
    brand: "Zara",
    category: "Accessoires",
    size: "Unique",
    gender: "Femme",
    condition: "Bon",
    color: "Marron",
    images: [
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=80"
    ],
    stock: 0,
    sold: true,
    createdAt: "2026-06-28T10:00:00.000Z"
  },
  {
    id: "p5",
    title: "Sweat college",
    price: 39,
    description: "Molleton confortable, coupe ample, imprime discret.",
    brand: "Champion",
    category: "Homme",
    size: "L",
    gender: "Homme",
    condition: "Tres bon",
    color: "Gris",
    images: [
      "https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=900&q=80"
    ],
    stock: 1,
    sold: false,
    createdAt: "2026-07-04T08:45:00.000Z"
  },
  {
    id: "p6",
    title: "Robe fleurie enfant",
    price: 25,
    description: "Tissu leger, coupe confortable, ideale pour l'ete.",
    brand: "Okaidi",
    category: "Enfant",
    size: "8 ans",
    gender: "Enfant",
    condition: "Neuf",
    color: "Rose",
    images: [
      "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=900&q=80"
    ],
    stock: 1,
    sold: false,
    createdAt: "2026-07-05T14:20:00.000Z"
  }
];
