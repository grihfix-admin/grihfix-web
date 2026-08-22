// scripts/listServices.ts
import mongoose from "mongoose";
import dotenv from "dotenv";
import Service from "../src/models/Service";

dotenv.config({ path: ".env.local" });

async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "");
    console.log("✅ Connected to MongoDB");

    const services = await Service.find();
    console.log("🛠️ Services in DB:", services);

    await mongoose.disconnect();
    console.log("🔌 Disconnected");
  } catch (err: any) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
}

main();