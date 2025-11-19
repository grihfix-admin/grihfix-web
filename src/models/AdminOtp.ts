import mongoose, { Document, Model, Schema } from "mongoose";

export interface IAdminOtp extends Document {
  email: string;
  code: string;
  purpose: string;
  expiresAt: Date;
  used: boolean;
  createdAt: Date;
}

const AdminOtpSchema = new Schema<IAdminOtp>({
  email: { type: String, required: true, lowercase: true, trim: true },
  code: { type: String, required: true },
  purpose: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  used: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

AdminOtpSchema.index({ email: 1, purpose: 1, createdAt: -1 });
AdminOtpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const AdminOtp: Model<IAdminOtp> =
  (mongoose.models.AdminOtp as Model<IAdminOtp>) || mongoose.model<IAdminOtp>("AdminOtp", AdminOtpSchema);

export default AdminOtp;


