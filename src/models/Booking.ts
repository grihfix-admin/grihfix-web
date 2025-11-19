// src/models/Booking.ts
import crypto from "crypto";
import mongoose, { Schema, Document, Model } from "mongoose";

import { BOOKING_STATUS_VALUES, type BookingStatus } from "@/constants/bookings";

export interface IBooking extends Document {
  name: string;
  phone: string;
  email?: string;
  address: string;
  city?: string;
  pincode?: string;
  landmark?: string;
  serviceName: string;
  serviceSlug: string;
  variant?: string | null;
  scheduledDate?: Date | null;
  notes?: string | null;
  finalPrice?: number | null;
  coords?: { lat: number; lng: number };
  status: BookingStatus;
  trackingCode?: string;
  assignedStaffName?: string | null;
  assignedStaffPhone?: string | null;
  internalNotes?: string | null;
  source: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema: Schema<IBooking> = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    address: { type: String, required: true },
    city: { type: String },
    pincode: { type: String },
    landmark: { type: String },
    serviceName: { type: String, required: true },
    serviceSlug: { type: String, required: true },
    variant: { type: String, default: null },
    scheduledDate: { type: Date, default: null },
    notes: { type: String, default: null },
    finalPrice: { type: Number, default: null },
    coords: {
      lat: { type: Number },
      lng: { type: Number },
    },
    status: {
      type: String,
      enum: BOOKING_STATUS_VALUES,
      default: "new",
    },
    trackingCode: { type: String, unique: true, sparse: true },
    assignedStaffName: { type: String, default: null },
    assignedStaffPhone: { type: String, default: null },
    internalNotes: { type: String, default: null },
    source: { type: String, default: "website" },
  },
  { timestamps: true }
);

BookingSchema.index({ trackingCode: 1 }, { unique: true, sparse: true });

const TRACKING_PREFIX = "GF-";
function generateTrackingCode() {
  const random = crypto.randomBytes(3).toString("hex").toUpperCase();
  return `${TRACKING_PREFIX}${random}`;
}

BookingSchema.pre("save", function handleDefaults(next) {
  if (!this.status) {
    this.status = "new";
  }
  if (!this.trackingCode) {
    this.trackingCode = generateTrackingCode();
  }
  next();
});

const Booking: Model<IBooking> =
  (mongoose.models.Booking as Model<IBooking>) ||
  mongoose.model<IBooking>("Booking", BookingSchema);

export default Booking;