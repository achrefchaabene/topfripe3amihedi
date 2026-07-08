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
  await cleanupDemoProducts();
}

export async function cleanupDemoProducts() {
  await Product.deleteMany({
    $or: fallbackProducts.map((product) => ({
      title: product.title,
      brand: product.brand,
      "images.0": product.images[0]
    }))
  });
}
