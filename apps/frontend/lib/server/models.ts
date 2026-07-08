import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    description: { type: String, required: true, trim: true },
    brand: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    size: { type: String, required: true, trim: true },
    gender: { type: String, required: true, enum: ["Homme", "Femme", "Enfant", "Unisexe"] },
    condition: { type: String, required: true, enum: ["Neuf", "Tres bon", "Bon"] },
    color: { type: String, required: true, trim: true },
    images: {
      type: [String],
      required: true,
      validate: {
        validator: (images: string[]) => images.length >= 2 && images.length <= 5,
        message: "A product needs 2 to 5 images"
      }
    },
    stock: { type: Number, default: 1, min: 0 },
    sold: { type: Boolean, default: false }
  },
  { timestamps: true }
);

productSchema.index({ title: "text", brand: "text", description: "text" });

const categorySchema = new Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    description: { type: String, default: "", trim: true },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export const Product = mongoose.models.Product ?? mongoose.model("Product", productSchema);
export const Category = mongoose.models.Category ?? mongoose.model("Category", categorySchema);
