import mongoose from "mongoose";
import dotenv from "dotenv";
import Coupon from "../src/models/Coupon";

dotenv.config({ path: ".env.local" });

async function main() {
  await mongoose.connect(process.env.MONGODB_URI || "");
  console.log("Connected to MongoDB ✅");
  

  const coupons = [
    { code: "DBG30", discountPercent: 30, active: true },
    { code: "FIRST30", discountPercent: 30, active: true },
    { code: "FIX30", discountPercent: 30, active: true },
    { code: "HOME30", discountPercent: 30, active: true },
  ];

  for (const c of coupons) {
    await Coupon.updateOne({ code: c.code }, { $set: c }, { upsert: true });
  }

  console.log("✅ Coupons seeded!");
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error("❌ Error seeding coupons:", err);
  process.exit(1);
});