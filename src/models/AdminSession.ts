import mongoose, { Document, Model, Schema } from "mongoose";

export interface IAdminSession extends Document {
  email: string;
  sessionToken: string;
  expiresAt: Date;
  createdAt: Date;
}

const AdminSessionSchema = new Schema<IAdminSession>({
  email: { type: String, required: true, lowercase: true, trim: true },
  sessionToken: { type: String, required: true, unique: true },
  expiresAt: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

AdminSessionSchema.index({ sessionToken: 1 }, { unique: true });
AdminSessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const AdminSession: Model<IAdminSession> =
  (mongoose.models.AdminSession as Model<IAdminSession>) ||
  mongoose.model<IAdminSession>("AdminSession", AdminSessionSchema);

export default AdminSession;


