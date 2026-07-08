import mongoose from "mongoose";

const mongoUri = process.env.MONGODB_URI;

type CachedConnection = {
  promise?: Promise<typeof mongoose>;
};

const globalForMongoose = globalThis as typeof globalThis & {
  mongooseConnection?: CachedConnection;
};

const cached = globalForMongoose.mongooseConnection ?? {};
globalForMongoose.mongooseConnection = cached;

export async function connectDb() {
  if (!mongoUri) {
    throw new Error("MONGODB_URI is required");
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(mongoUri, { dbName: "topfripe" });
  }

  await cached.promise;
}
