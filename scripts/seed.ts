// scripts/seed.ts
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const { connectToDatabase } = require("../src/lib/mongodb");
const Service = require("../src/models/Service").default;

async function main() {
  try {
    await connectToDatabase();
  } catch (e) {
    const { connectToDatabase: cb } = require("../src/lib/mongodb");
    await cb();
  }

  const services = [
    // Home / room cleaning
    { name: "Single Room Cleaning", slug: "home-cleaning", category: "Home Cleaning", priceInr: 699, discountInr: 499, isDiscounted: true, active: true },
    { name: "1BHK Flat Cleaning", slug: "1bhk-flat", category: "Home Cleaning", priceInr: 999, discountInr: 699, isDiscounted: true, active: true },
    { name: "2BHK Flat Cleaning (2 Bathrooms)", slug: "2bhk-flat", category: "Home Cleaning", priceInr: 1850, discountInr: 1299, isDiscounted: true, active: true },
    { name: "3BHK Flat Cleaning (2 Bathrooms)", slug: "3bhk-flat", category: "Home Cleaning", priceInr: 2599, discountInr: 1799, isDiscounted: true, active: true },

    // Bathroom / kitchen
    { name: "Only Bathroom Cleaning", slug: "bathroom", category: "Bathroom / Kitchen", priceInr: 699, discountInr: 499, isDiscounted: true, active: true },
    { name: "Only Kitchen Cleaning", slug: "kitchen", category: "Bathroom / Kitchen", priceInr: 699, discountInr: 499, isDiscounted: true, active: true },

    // Furniture & interiors (NEW)
    { name: "Sofa Cleaning (5-Seater Set)", slug: "sofa-cleaning", category: "Furniture & Interior", priceInr: 799, discountInr: 599, isDiscounted: true, active: true, durationMin: 90 },
    { name: "Mattress Cleaning (Single/Double)", slug: "mattress-cleaning", category: "Furniture & Interior", priceInr: 399, discountInr: 299, isDiscounted: true, active: true, durationMin: 45 },
    { name: "Chair Cleaning (per chair, min 4)", slug: "chair-cleaning", category: "Furniture & Interior", priceInr: 149, discountInr: 99, isDiscounted: true, active: true, durationMin: 10 },
    { name: "Tiles & Floor Cleaning (up to 150 sq ft)", slug: "tiles-cleaning", category: "Furniture & Interior", priceInr: 999, discountInr: 799, isDiscounted: true, active: true, durationMin: 120 },
    { name: "Chimney Cleaning", slug: "chimney-cleaning", category: "Furniture & Interior", priceInr: 699, discountInr: 499, isDiscounted: true, active: true, durationMin: 60 },

    // Campus / roof
    { name: "Campus / Roof Cleaning", slug: "terrace", category: "Campus / Roof", priceInr: 1449, discountInr: 999, isDiscounted: true, active: true },

    // Water & septic
    { name: "Water Tank Cleaning", slug: "water-tank", category: "Water Tank", priceInr: 1149, discountInr: 799, isDiscounted: true, active: true },
    { name: "Septic Tank Cleaning", slug: "septic-tank", category: "Septic Tank", priceInr: 1999, discountInr: 1399, isDiscounted: true, active: true },

    // Repairs
    { name: "Plumbing Fixes", slug: "plumbing", category: "Repairs", priceInr: 499, discountInr: 349, isDiscounted: true, active: true },
    { name: "Electrical Appliance Repair", slug: "electrical", category: "Repairs", priceInr: 499, discountInr: 349, isDiscounted: true, active: true },

    // Vehicle care (NEW slug naming, was car-wash)
    { name: "Car Cleaning - Outside Only", slug: "car-wash", category: "Vehicle Care", priceInr: 699, discountInr: 399, isDiscounted: true, active: true },
    { name: "Car Cleaning - Inside + Outside", slug: "car-wash-full", category: "Vehicle Care", priceInr: 999, discountInr: 599, isDiscounted: true, active: true },
  ];

  for (const svc of services) {
    await Service.updateOne({ slug: svc.slug }, { $set: svc }, { upsert: true });
  }

  console.log(`✅ Services seeded (${services.length} entries).`);
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
