import { NextResponse } from "next/server";
import Coupon from "@/models/Coupon";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { code } = await req.json();

    const coupon = await Coupon.findOne({ code: code.toUpperCase(), active: true });

    if (!coupon) {
      return NextResponse.json({ valid: false, message: "Invalid coupon" }, { status: 404 });
    }

    if (coupon.expiresAt && coupon.expiresAt < new Date()) {
      return NextResponse.json({ valid: false, message: "Coupon expired" }, { status: 400 });
    }

    if (coupon.maxUses && coupon.usedCount >= coupon.maxUses) {
      return NextResponse.json({ valid: false, message: "Coupon usage limit reached" }, { status: 400 });
    }

    return NextResponse.json({ valid: true, discountPercent: coupon.discountPercent });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ valid: false, message: "Error validating coupon" }, { status: 500 });
  }
}