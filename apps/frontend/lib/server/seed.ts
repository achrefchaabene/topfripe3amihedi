import { categories as fallbackCategoryNames, products as fallbackProducts } from "@/lib/products";
import { Category, Product } from "@/lib/server/models";

export async function seedCategoriesIfEmpty() {
  const count = await Category.countDocuments();

  if (count > 0) return;

  await Category.insertMany(
    fallbackCategoryNames.map((name, index) => ({
      name,
      description: "",
      image: "",
      order: index
    }))
  );
}

export async function seedProductsIfEmpty() {
  const count = await Product.countDocuments();

  if (count > 0) return;

  await Product.insertMany(
    fallbackProducts.map(({ id: _id, createdAt: _createdAt, ...product }) => product)
  );
}
