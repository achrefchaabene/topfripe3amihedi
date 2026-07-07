import express from "express";

const router = express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (
    email !== process.env.ADMIN_EMAIL ||
    password !== process.env.ADMIN_PASSWORD ||
    !process.env.ADMIN_TOKEN
  ) {
    return res.status(401).json({ message: "Invalid admin credentials" });
  }

  res.json({ token: process.env.ADMIN_TOKEN });
});

export { router as authRouter };
