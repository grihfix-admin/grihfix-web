// src/models/Booking.ts
import { EmailAddress } from "@clerk/nextjs/server";
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBooking extends Document {
  serviceId: string;
  serviceName: string;
  customerName: string;
  phone: string;
  email: string;
  fullAddress: string;
  pincode?: string;
  city?: string;
  landmark?: string;
  coords?: { lat: number; lng: number };
  finalPrice: number;
  date: Date;
  status: "pending" | "confirmed" | "completed";
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema: Schema<IBooking> = new Schema(
  {
    serviceId: { type: String, required: true },
    serviceName: { type: String, required: true },
    customerName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    fullAddress: { type: String, required: true }, // ✅ renamed from "address"
    pincode: { type: String },
    city: { type: String },
    landmark: { type: String },
    coords: {
      lat: { type: Number },
      lng: { type: Number },
    },
    finalPrice: { type: Number, required: true },
    date: { type: Date, default: Date.now }, // ✅ default to now
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Booking: Model<IBooking> =
  (mongoose.models.Booking as Model<IBooking>) ||
  mongoose.model<IBooking>("Booking", BookingSchema);

export default Booking;