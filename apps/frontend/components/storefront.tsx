"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Facebook,
  Heart,
  Instagram,
  MapPin,
  MessageCircle,
  Search,
  ShoppingBag,
  SlidersHorizontal
} from "lucide-react";
import { useMemo, useState } from "react";
import { categories, products } from "@/lib/products";

const sizes = ["Toutes", "Unique", "8 ans", "40", "42", "M", "L"];
const prices = ["Tous", "0-40", "40-70", "70+"];
const brands = ["Toutes", ...Array.from(new Set(products.map((product) => product.brand)))];
const colors = ["Toutes", ...Array.from(new Set(products.map((product) => product.color)))];
const availability = ["Tous", "Disponible", "Vendu"];

type Filters = {
  query: string;
  category: string;
  size: string;
  price: string;
  brand: string;
  color: string;
  availability: string;
};

const initialFilters: Filters = {
  query: "",
  category: "Toutes",
  size: "Toutes",
  price: "Tous",
  brand: "Toutes",
  color: "Toutes",
  availability: "Tous"
};

export function Storefront() {
  const [filters, setFilters] = useState(initialFilters);
  const [favorites, setFavorites] = useState<string[]>([]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesQuery = `${product.title} ${product.brand} ${product.description}`
        .toLowerCase()
        .includes(filters.query.toLowerCase());
      const matchesCategory =
        filters.category === "Toutes" ||
        product.category === filters.category ||
        product.gender === filters.category;
      const matchesSize = filters.size === "Toutes" || product.size === filters.size;
      const matchesBrand = filters.brand === "Toutes" || product.brand === filters.brand;
      const matchesColor = filters.color === "Toutes" || product.color === filters.color;
      const matchesAvailability =
        filters.availability === "Tous" ||
        (filters.availability === "Disponible" && !product.sold) ||
        (filters.availability === "Vendu" && product.sold);
      const matchesPrice =
        filters.price === "Tous" ||
        (filters.price === "0-40" && product.price <= 40) ||
        (filters.price === "40-70" && product.price > 40 && product.price <= 70) ||
        (filters.price === "70+" && product.price > 70);

      return (
        matchesQuery &&
        matchesCategory &&
        matchesSize &&
        matchesBrand &&
        matchesColor &&
        matchesAvailability &&
        matchesPrice
      );
    });
  }, [filters]);

  const updateFilter = (key: keyof Filters, value: string) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };

  const toggleFavorite = (id: string) => {
    setFavorites((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  };

  return (
    <main className="min-h-screen bg-linen">
      <header className="fixed left-0 right-0 top-0 z-30 border-b border-white/20 bg-ink/80 text-white backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <a href="#home" className="flex items-center gap-2 font-semibold">
            <span className="grid size-10 place-items-center rounded-full bg-cream text-ink">
              TF
            </span>
            <span>TopFripe</span>
          </a>
          <nav className="hidden items-center gap-6 text-sm text-white/80 md:flex">
            <a href="#nouveautes" className="hover:text-white">Nouveautes</a>
            <a href="#categories" className="hover:text-white">Categories</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </nav>
          <a
            href="#favoris"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 px-3 py-2 text-sm"
          >
            <Heart className="size-4" />
            {favorites.length}
          </a>
        </div>
      </header>

      <section id="home" className="hero-image min-h-[88vh] pt-24 text-white">
        <div className="mx-auto flex min-h-[calc(88vh-6rem)] max-w-7xl flex-col justify-end px-4 pb-14 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="max-w-3xl"
          >
            <p className="mb-4 inline-flex items-center rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm backdrop-blur">
              Arrivages selectionnes chaque semaine
            </p>
            <h1 className="text-5xl font-semibold leading-tight sm:text-6xl lg:text-7xl">
              TopFripe
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/86">
              Vetements, chaussures et accessoires de seconde main avec photos claires,
              tailles visibles et disponibilite a jour.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#nouveautes"
                className="inline-flex items-center gap-2 rounded-full bg-cream px-5 py-3 font-semibold text-ink shadow-soft"
              >
                <ShoppingBag className="size-5" />
                Voir les nouveautes
              </a>
              <a
                href="https://wa.me/"
                className="inline-flex items-center gap-2 rounded-full border border-white/35 px-5 py-3 font-semibold text-white"
              >
                <MessageCircle className="size-5" />
                WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="categories" className="border-b border-ink/10 bg-cream py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => updateFilter("category", category)}
                className="rounded-lg border border-ink/10 bg-white px-4 py-4 text-left font-medium shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="nouveautes" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-clay">Boutique</p>
            <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">Articles disponibles</h2>
          </div>
          <div id="favoris" className="rounded-full bg-ink px-4 py-2 text-sm text-white">
            {favorites.length} favori{favorites.length > 1 ? "s" : ""}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[290px_1fr]">
          <aside className="h-fit rounded-lg border border-ink/10 bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center gap-2 font-semibold">
              <SlidersHorizontal className="size-5 text-moss" />
              Filtres
            </div>
            <label className="relative block">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink/45" />
              <input
                value={filters.query}
                onChange={(event) => updateFilter("query", event.target.value)}
                placeholder="Rechercher"
                className="w-full rounded-lg border border-ink/15 py-3 pl-10 pr-3 outline-none focus:border-moss"
              />
            </label>
            <FilterSelect label="Categorie" value={filters.category} values={["Toutes", ...categories]} onChange={(value) => updateFilter("category", value)} />
            <FilterSelect label="Taille" value={filters.size} values={sizes} onChange={(value) => updateFilter("size", value)} />
            <FilterSelect label="Prix" value={filters.price} values={prices} onChange={(value) => updateFilter("price", value)} />
            <FilterSelect label="Marque" value={filters.brand} values={brands} onChange={(value) => updateFilter("brand", value)} />
            <FilterSelect label="Couleur" value={filters.color} values={colors} onChange={(value) => updateFilter("color", value)} />
            <FilterSelect label="Disponibilite" value={filters.availability} values={availability} onChange={(value) => updateFilter("availability", value)} />
          </aside>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product, index) => (
              <motion.article
                key={product.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: index * 0.04 }}
                className="overflow-hidden rounded-lg border border-ink/10 bg-white shadow-sm"
              >
                <div className="relative aspect-[4/5] bg-cream">
                  <Image
                    src={product.images[0]}
                    alt={product.title}
                    fill
                    sizes="(min-width: 1280px) 30vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    aria-label="Ajouter aux favoris"
                    className="absolute right-3 top-3 grid size-10 place-items-center rounded-full bg-white/90 text-ink shadow-sm"
                  >
                    <Heart
                      className={`size-5 ${favorites.includes(product.id) ? "fill-clay text-clay" : ""}`}
                    />
                  </button>
                  <span className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${product.sold ? "bg-ink text-white" : "bg-cream text-ink"}`}>
                    {product.sold ? "Vendu" : "Disponible"}
                  </span>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold">{product.title}</h3>
                      <p className="mt-1 text-sm text-ink/60">{product.brand}</p>
                    </div>
                    <p className="font-semibold">{product.price} TND</p>
                  </div>
                  <p className="mt-3 min-h-12 text-sm leading-6 text-ink/70">{product.description}</p>
                  <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
                    <Meta label="Taille" value={product.size} />
                    <Meta label="Etat" value={product.condition} />
                    <Meta label="Stock" value={String(product.stock)} />
                  </div>
                  <div className="mt-4 flex gap-2">
                    {product.images.slice(0, 5).map((image, imageIndex) => (
                      <div key={image} className="relative size-12 overflow-hidden rounded-md bg-cream">
                        <Image src={image} alt={`${product.title} ${imageIndex + 1}`} fill sizes="48px" className="object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="bg-ink py-12 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-cream/70">Contact</p>
            <h2 className="mt-2 text-3xl font-semibold">Reserver un article</h2>
            <p className="mt-4 max-w-xl leading-7 text-white/70">
              Envoie la capture ou le nom de l'article. Les reservations peuvent etre confirmees
              sur WhatsApp, Instagram ou Facebook.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ContactButton icon={<MessageCircle className="size-5" />} label="WhatsApp" href="https://wa.me/" />
              <ContactButton icon={<Instagram className="size-5" />} label="Instagram" href="https://instagram.com/" />
              <ContactButton icon={<Facebook className="size-5" />} label="Facebook" href="https://facebook.com/" />
            </div>
          </div>
          <a
            href="https://maps.google.com"
            className="flex min-h-64 items-center justify-center rounded-lg border border-white/15 bg-white/8 p-8 text-center transition hover:bg-white/12"
          >
            <span>
              <MapPin className="mx-auto mb-3 size-9 text-cream" />
              Localisation Google Maps
            </span>
          </a>
        </div>
      </section>
    </main>
  );
}

function FilterSelect({
  label,
  value,
  values,
  onChange
}: {
  label: string;
  value: string;
  values: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="mt-4 block text-sm font-medium">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-lg border border-ink/15 bg-white px-3 py-3 outline-none focus:border-moss"
      >
        {values.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </label>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-cream p-2">
      <p className="text-[11px] uppercase text-ink/50">{label}</p>
      <p className="mt-1 font-medium">{value}</p>
    </div>
  );
}

function ContactButton({ icon, label, href }: { icon: React.ReactNode; label: string; href: string }) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 rounded-full bg-cream px-4 py-3 font-semibold text-ink"
    >
      {icon}
      {label}
    </a>
  );
}
