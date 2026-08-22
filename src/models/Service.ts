// src/models/Service.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IService extends Document {
  name: string;
  slug: string;
  priceInr: number;
  discountInr?: number | null;
  isDiscounted: boolean;
  active: boolean;
  category?: string | null;
  durationMin?: number | null;
}

const ServiceSchema: Schema<IService> = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    priceInr: { type: Number, required: true },
    discountInr: { type: Number, default: null },
    isDiscounted: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
    category: { type: String, default: null },
    durationMin: { type: Number, default: null },
  },
  { timestamps: true }
);

// avoid model overwrite on dev HMR
const Service: Model<IService> = (mongoose.models.Service as Model<IService>) || mongoose.model<IService>("Service", ServiceSchema);
export default Service;