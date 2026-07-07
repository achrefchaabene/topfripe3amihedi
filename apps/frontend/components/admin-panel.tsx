"use client";

import { Edit3, LogOut, PackagePlus, Plus, Trash2 } from "lucide-react";
import type { ReactNode } from "react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { adminLogin, adminRequest, getCategories, getProducts } from "@/lib/api";
import { categories as fallbackCategories, type Category, type Product } from "@/lib/products";

type ProductForm = {
  id: string;
  title: string;
  price: string;
  description: string;
  brand: string;
  category: string;
  size: string;
  gender: string;
  condition: "Neuf" | "Tres bon" | "Bon";
  color: string;
  images: string;
  stock: string;
  sold: boolean;
};

const emptyProduct: ProductForm = {
  id: "",
  title: "",
  price: "",
  description: "",
  brand: "",
  category: "Homme",
  size: "",
  gender: "Unisexe",
  condition: "Tres bon",
  color: "",
  images: "",
  stock: "1",
  sold: false
};

export function AdminPanel() {
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categoryOrder, setCategoryOrder] = useState("0");
  const [editingCategoryId, setEditingCategoryId] = useState("");
  const [productForm, setProductForm] = useState<ProductForm>(emptyProduct);

  const categoryNames = useMemo(() => {
    const apiCategories = categories.map((category) => category.name);
    return apiCategories.length ? apiCategories : fallbackCategories;
  }, [categories]);

  useEffect(() => {
    const savedToken = window.localStorage.getItem("topfripe-admin-token");
    if (savedToken) setToken(savedToken);
  }, []);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const [categoryResult, productResult] = await Promise.allSettled([
      getCategories(),
      getProducts()
    ]);

    if (categoryResult.status === "fulfilled") setCategories(categoryResult.value);
    if (productResult.status === "fulfilled") setProducts(productResult.value);
  }

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    try {
      const result = await adminLogin(email, password);
      setToken(result.token);
      window.localStorage.setItem("topfripe-admin-token", result.token);
      setMessage("Connexion admin reussie.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Connexion impossible");
    }
  }

  function logout() {
    setToken("");
    window.localStorage.removeItem("topfripe-admin-token");
  }

  async function saveCategory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    const payload = {
      name: categoryName,
      description: categoryDescription,
      order: Number(categoryOrder)
    };

    try {
      if (editingCategoryId) {
        await adminRequest(`/categories/${editingCategoryId}`, token, {
          method: "PATCH",
          body: JSON.stringify(payload)
        });
      } else {
        await adminRequest("/categories", token, {
          method: "POST",
          body: JSON.stringify(payload)
        });
      }

      resetCategoryForm();
      await loadData();
      setMessage("Categorie enregistree.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Erreur categorie");
    }
  }

  async function deleteCategory(id: string) {
    await adminRequest(`/categories/${id}`, token, { method: "DELETE" });
    await loadData();
  }

  function editCategory(category: Category) {
    setEditingCategoryId(category._id ?? "");
    setCategoryName(category.name);
    setCategoryDescription(category.description ?? "");
    setCategoryOrder(String(category.order ?? 0));
  }

  function resetCategoryForm() {
    setEditingCategoryId("");
    setCategoryName("");
    setCategoryDescription("");
    setCategoryOrder("0");
  }

  async function saveProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    const payload = {
      title: productForm.title,
      price: Number(productForm.price),
      description: productForm.description,
      brand: productForm.brand,
      category: productForm.category,
      size: productForm.size,
      gender: productForm.gender,
      condition: productForm.condition,
      color: productForm.color,
      images: productForm.images
        .split("\n")
        .map((image) => image.trim())
        .filter(Boolean),
      stock: Number(productForm.stock),
      sold: productForm.sold
    };

    try {
      if (productForm.id) {
        await adminRequest(`/products/${productForm.id}`, token, {
          method: "PATCH",
          body: JSON.stringify(payload)
        });
      } else {
        await adminRequest("/products", token, {
          method: "POST",
          body: JSON.stringify(payload)
        });
      }

      setProductForm(emptyProduct);
      await loadData();
      setMessage("Produit enregistre.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Erreur produit");
    }
  }

  async function deleteProduct(id: string) {
    await adminRequest(`/products/${id}`, token, { method: "DELETE" });
    await loadData();
  }

  function editProduct(product: Product) {
    setProductForm({
      id: product._id ?? product.id ?? "",
      title: product.title,
      price: String(product.price),
      description: product.description,
      brand: product.brand,
      category: product.category,
      size: product.size,
      gender: product.gender,
      condition: product.condition,
      color: product.color,
      images: product.images.join("\n"),
      stock: String(product.stock),
      sold: product.sold
    });
  }

  if (!token) {
    return (
      <main className="min-h-screen bg-cream px-4 py-10 text-ink">
        <form
          onSubmit={handleLogin}
          className="mx-auto mt-16 max-w-md rounded-lg border border-ink/10 bg-white p-6 shadow-soft"
        >
          <a href="/" className="text-sm font-semibold text-moss">Retour boutique</a>
          <h1 className="mt-5 text-3xl font-semibold">Admin TopFripe</h1>
          <p className="mt-2 text-sm text-ink/60">
            Connecte-toi pour gerer les categories et les produits.
          </p>
          <Input label="Email admin" value={email} onChange={setEmail} type="email" />
          <Input label="Mot de passe" value={password} onChange={setPassword} type="password" />
          {message ? <p className="mt-4 text-sm text-clay">{message}</p> : null}
          <button className="mt-5 w-full rounded-lg bg-ink px-4 py-3 font-semibold text-white">
            Se connecter
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-linen px-4 py-8 text-ink">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-4 border-b border-ink/10 pb-6 md:flex-row md:items-center md:justify-between">
          <div>
            <a href="/" className="text-sm font-semibold text-moss">Retour boutique</a>
            <h1 className="mt-2 text-3xl font-semibold">Administration</h1>
          </div>
          <button
            onClick={logout}
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-ink/15 bg-white px-4 py-3 font-semibold"
          >
            <LogOut className="size-4" />
            Deconnexion
          </button>
        </header>

        {message ? <p className="mt-5 rounded-lg bg-cream p-3 text-sm">{message}</p> : null}

        <section className="mt-8 grid gap-6 lg:grid-cols-[360px_1fr]">
          <form onSubmit={saveCategory} className="h-fit rounded-lg border border-ink/10 bg-white p-5 shadow-sm">
            <h2 className="flex items-center gap-2 text-xl font-semibold">
              <Plus className="size-5 text-moss" />
              Categories
            </h2>
            <Input label="Nom" value={categoryName} onChange={setCategoryName} />
            <Input label="Description" value={categoryDescription} onChange={setCategoryDescription} />
            <Input label="Ordre" value={categoryOrder} onChange={setCategoryOrder} type="number" />
            <div className="mt-4 flex gap-2">
              <button className="rounded-lg bg-ink px-4 py-3 font-semibold text-white">
                {editingCategoryId ? "Modifier" : "Ajouter"}
              </button>
              <button type="button" onClick={resetCategoryForm} className="rounded-lg border border-ink/15 px-4 py-3 font-semibold">
                Reset
              </button>
            </div>
            <div className="mt-5 space-y-2">
              {categories.map((category) => (
                <div key={category._id} className="flex items-center justify-between rounded-lg bg-cream p-3">
                  <span className="font-medium">{category.name}</span>
                  <div className="flex gap-2">
                    <IconButton label="Modifier categorie" onClick={() => editCategory(category)} icon={<Edit3 className="size-4" />} />
                    <IconButton label="Supprimer categorie" onClick={() => deleteCategory(category._id ?? "")} icon={<Trash2 className="size-4" />} />
                  </div>
                </div>
              ))}
            </div>
          </form>

          <div className="rounded-lg border border-ink/10 bg-white p-5 shadow-sm">
            <h2 className="flex items-center gap-2 text-xl font-semibold">
              <PackagePlus className="size-5 text-moss" />
              Produits proposes
            </h2>
            <form onSubmit={saveProduct} className="mt-5 grid gap-4 md:grid-cols-2">
              <Input label="Titre" value={productForm.title} onChange={(value) => setProductForm({ ...productForm, title: value })} />
              <Input label="Prix" value={productForm.price} onChange={(value) => setProductForm({ ...productForm, price: value })} type="number" />
              <Input label="Marque" value={productForm.brand} onChange={(value) => setProductForm({ ...productForm, brand: value })} />
              <Input label="Taille" value={productForm.size} onChange={(value) => setProductForm({ ...productForm, size: value })} />
              <Input label="Couleur" value={productForm.color} onChange={(value) => setProductForm({ ...productForm, color: value })} />
              <Input label="Stock" value={productForm.stock} onChange={(value) => setProductForm({ ...productForm, stock: value })} type="number" />
              <Select label="Categorie" value={productForm.category} values={categoryNames} onChange={(value) => setProductForm({ ...productForm, category: value })} />
              <Select label="Genre" value={productForm.gender} values={["Homme", "Femme", "Enfant", "Unisexe"]} onChange={(value) => setProductForm({ ...productForm, gender: value })} />
              <Select label="Etat" value={productForm.condition} values={["Neuf", "Tres bon", "Bon"]} onChange={(value) => setProductForm({ ...productForm, condition: value as ProductForm["condition"] })} />
              <label className="mt-1 flex items-center gap-2 text-sm font-medium">
                <input
                  type="checkbox"
                  checked={productForm.sold}
                  onChange={(event) => setProductForm({ ...productForm, sold: event.target.checked })}
                />
                Produit vendu
              </label>
              <label className="md:col-span-2 text-sm font-medium">
                Description
                <textarea
                  value={productForm.description}
                  onChange={(event) => setProductForm({ ...productForm, description: event.target.value })}
                  className="mt-2 min-h-24 w-full rounded-lg border border-ink/15 px-3 py-3 outline-none focus:border-moss"
                />
              </label>
              <label className="md:col-span-2 text-sm font-medium">
                Images, une URL par ligne, 2 a 5 photos
                <textarea
                  value={productForm.images}
                  onChange={(event) => setProductForm({ ...productForm, images: event.target.value })}
                  className="mt-2 min-h-28 w-full rounded-lg border border-ink/15 px-3 py-3 outline-none focus:border-moss"
                />
              </label>
              <div className="md:col-span-2 flex flex-wrap gap-2">
                <button className="rounded-lg bg-ink px-4 py-3 font-semibold text-white">
                  {productForm.id ? "Modifier produit" : "Ajouter produit"}
                </button>
                <button type="button" onClick={() => setProductForm(emptyProduct)} className="rounded-lg border border-ink/15 px-4 py-3 font-semibold">
                  Nouveau
                </button>
              </div>
            </form>

            <div className="mt-8 overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="border-b border-ink/10 text-ink/60">
                  <tr>
                    <th className="py-3">Produit</th>
                    <th>Prix</th>
                    <th>Categorie</th>
                    <th>Stock</th>
                    <th>Etat</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id ?? product.id} className="border-b border-ink/8">
                      <td className="py-3 font-medium">{product.title}</td>
                      <td>{product.price} TND</td>
                      <td>{product.category}</td>
                      <td>{product.stock}</td>
                      <td>{product.sold ? "Vendu" : "Disponible"}</td>
                      <td>
                        <div className="flex gap-2">
                          <IconButton label="Modifier produit" onClick={() => editProduct(product)} icon={<Edit3 className="size-4" />} />
                          <IconButton label="Supprimer produit" onClick={() => deleteProduct(product._id ?? product.id ?? "")} icon={<Trash2 className="size-4" />} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text"
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <label className="mt-4 block text-sm font-medium">
      {label}
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-lg border border-ink/15 px-3 py-3 outline-none focus:border-moss"
      />
    </label>
  );
}

function Select({
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
    <label className="block text-sm font-medium">
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

function IconButton({
  label,
  icon,
  onClick
}: {
  label: string;
  icon: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className="grid size-9 place-items-center rounded-md border border-ink/15 bg-white text-ink"
    >
      {icon}
    </button>
  );
}
