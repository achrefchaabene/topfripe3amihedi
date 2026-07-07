import express from "express";
import multer from "multer";
import { cloudinary } from "../config/cloudinary.js";
import { Product } from "../models/Product.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { files: 5 } });

router.get("/", async (req, res, next) => {
  try {
    const {
      category,
      size,
      brand,
      color,
      availability,
      minPrice,
      maxPrice,
      search
    } = req.query;

    const filters = {};

    if (category) filters.$or = [{ category }, { gender: category }];
    if (size) filters.size = size;
    if (brand) filters.brand = brand;
    if (color) filters.color = color;
    if (availability === "available") filters.sold = false;
    if (availability === "sold") filters.sold = true;
    if (minPrice || maxPrice) {
      filters.price = {};
      if (minPrice) filters.price.$gte = Number(minPrice);
      if (maxPrice) filters.price.$lte = Number(maxPrice);
    }
    if (search) {
      filters.$text = { $search: String(search) };
    }

    const products = await Product.find(filters).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.post("/", upload.array("images", 5), async (req, res, next) => {
  try {
    const uploadedImages = await Promise.all(
      (req.files ?? []).map((file) => uploadToCloudinary(file.buffer))
    );

    const product = await Product.create({
      ...req.body,
      price: Number(req.body.price),
      stock: Number(req.body.stock ?? 1),
      sold: req.body.sold === "true",
      images: uploadedImages
    });

    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

function uploadToCloudinary(buffer) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "topfripe/products" }, (error, result) => {
        if (error || !result) {
          reject(error ?? new Error("Cloudinary upload failed"));
          return;
        }

        resolve(result.secure_url);
      })
      .end(buffer);
  });
}

export { router as productsRouter };
