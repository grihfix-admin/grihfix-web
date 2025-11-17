// src/app/api/services/seed/route.ts
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Service from "@/models/Service";

export async function GET() {
  try {
    await connectToDatabase();

    const services = [
      { name: "Single Room Cleaning", slug: "home-cleaning", category: "Home Cleaning", priceInr: 699, discountInr: 499, isDiscounted: true, active: true },
      { name: "1BHK Flat Cleaning", slug: "1bhk-flat", category: "Home Cleaning", priceInr: 999, discountInr: 699, isDiscounted: true, active: true },
      { name: "2BHK Flat Cleaning (2 Bathrooms)", slug: "2bhk-flat", category: "Home Cleaning", priceInr: 1850, discountInr: 1299, isDiscounted: true, active: true },
      { name: "3BHK Flat Cleaning (2 Bathrooms)", slug: "3bhk-flat", category: "Home Cleaning", priceInr: 2599, discountInr: 1799, isDiscounted: true, active: true },
      { name: "Only Bathroom Cleaning", slug: "bathroom-cleaning", category: "Bathroom / Kitchen", priceInr: 699, discountInr: 499, isDiscounted: true, active: true },
      { name: "Only Kitchen Cleaning", slug: "kitchen-cleaning", category: "Bathroom / Kitchen", priceInr: 699, discountInr: 499, isDiscounted: true, active: true },
      { name: "Campus / Roof Cleaning", slug: "roof-cleaning", category: "Campus / Roof", priceInr: 1449, discountInr: 999, isDiscounted: true, active: true },
      { name: "Water Tank Cleaning", slug: "water-tank", category: "Water Tank", priceInr: 1149, discountInr: 799, isDiscounted: true, active: true },
      { name: "Septic Tank Cleaning", slug: "septic-tank", category: "Septic Tank", priceInr: 1999, discountInr: 1399, isDiscounted: true, active: true },
      { name: "Plumbing Fixes", slug: "plumbing-fixes", category: "Repairs", priceInr: 1299, discountInr: 899, isDiscounted: true, active: true },
      { name: "Electrical Appliance Repair", slug: "electrical-appliance-repair", category: "Repairs", priceInr: 1299, discountInr: 899, isDiscounted: true, active: true },
    ];

    for (const s of services) {
      await Service.updateOne({ slug: s.slug }, { $set: s }, { upsert: true });
    }

    return NextResponse.json({ ok: true, message: "Seeded services" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to seed" }, { status: 500 });
  }
}