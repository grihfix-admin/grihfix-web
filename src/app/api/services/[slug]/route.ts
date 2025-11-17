// src/app/api/services/[slug]/route.ts
import { NextResponse } from "next/server";
import Service from "@/models/Service";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET(
  _req: Request,
  context: { params: Promise<{ slug: string }> } // ✅ tell TS it's a Promise
) {
  try {
    const { slug } = await context.params; // ✅ await it
    await connectToDatabase();
    const service = await Service.findOne({ slug });

    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    return NextResponse.json(service);
  } catch (error) {
    console.error("Error fetching service:", error);
    return NextResponse.json({ error: "Failed to fetch service" }, { status: 500 });
  }
}