import express from "express";
import { adminAuth } from "../middleware/adminAuth.js";
import { Category } from "../models/Category.js";

const router = express.Router();

router.get("/", async (_req, res, next) => {
  try {
    const categories = await Category.find().sort({ order: 1, name: 1 });
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

router.post("/", adminAuth, async (req, res, next) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", adminAuth, async (req, res, next) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(category);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", adminAuth, async (req, res, next) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export { router as categoriesRouter };
