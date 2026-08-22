// src/models/Booking.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBooking extends Document {
  name: string;
  email: string;
  phone?: string | null;
  serviceId: mongoose.Types.ObjectId;
  serviceSnapshot?: { name: string; priceInr: number; slug?: string };
  date: Date;
  address: string;
  instructions?: string | null;
  notes?: string | null;
  paymentMethod?: "cash" | "online" | null;
  couponCode?: string | null;
  amountCharged?: number | null;
  amountPaid?: number | null;
  status?: "new" | "confirmed" | "in-progress" | "completed" | "cancelled";
  createdAt?: Date;
  updatedAt?: Date;
}

const BookingSchema: Schema<IBooking> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: null },
    serviceId: { type: Schema.Types.ObjectId, ref: "Service", required: true },
    serviceSnapshot: {
      name: String,
      priceInr: Number,
      slug: String,
    },
    date: { type: Date, required: true },
    address: { type: String, required: true },
    instructions: { type: String, default: null },
    notes: { type: String, default: null },
    paymentMethod: { type: String, enum: ["cash", "online"], default: null },
    couponCode: { type: String, default: null },
    amountCharged: { type: Number, default: null }, // final amount to be collected
    amountPaid: { type: Number, default: null },
    status: {
      type: String,
      enum: ["new", "confirmed", "in-progress", "completed", "cancelled"],
      default: "new",
    },
  },
  { timestamps: true }
);

const Booking: Model<IBooking> = (mongoose.models.Booking as Model<IBooking>) || mongoose.model<IBooking>("Booking", BookingSchema);
export default Booking;