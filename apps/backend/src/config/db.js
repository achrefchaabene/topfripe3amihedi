import mongoose from "mongoose";

export async function connectDb() {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is required");
  }

  await mongoose.connect(process.env.MONGODB_URI, {
    dbName: "topfripe"
  });
}
