// src/app/api/services/route.ts
import { NextResponse } from "next/server";
import Service from "@/models/Service";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET() {
  try {
    // ✅ Ensure DB connection
    await connectToDatabase();

    // ✅ Fetch all services
    const services = await Service.find({}).lean();

    // ✅ Return structured response
    return NextResponse.json({ services });
  } catch (err: any) {
    console.error("❌ Error fetching services:", err);
    return NextResponse.json(
      { error: "Failed to fetch services" },
      { status: 500 }
    );
  }
}