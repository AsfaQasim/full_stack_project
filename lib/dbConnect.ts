import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI not found in environment variables");
}

let isConnected = false;

export default async function connectDB() {
  if (isConnected) return;
  const db = await mongoose.connect(MONGODB_URI);
  isConnected = !!db.connections[0].readyState;
  console.log("✅ MongoDB Connected");
}
