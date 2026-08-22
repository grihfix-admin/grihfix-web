import mongoose from "mongoose";
import dotenv from "dotenv";
import Service from "../src/models/Service";

dotenv.config({ path: ".env.local" });

async function main() {
  await mongoose.connect(process.env.MONGODB_URI || "");
  console.log("✅ Connected to MongoDB");

  // Remove old services that don't have slug (legacy shape)
  const result = await Service.deleteMany({ slug: { $exists: false } });
  console.log(`🗑️ Removed ${result.deletedCount} old services without slug.`);

  await mongoose.disconnect();
  console.log("🔌 Disconnected");
}

main();