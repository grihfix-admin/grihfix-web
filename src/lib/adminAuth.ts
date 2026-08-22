import crypto from "crypto";

import { ADMIN_SESSION_COOKIE, ADMIN_SESSION_MAX_AGE_SECONDS } from "@/constants/auth";
import { connectToDatabase } from "@/lib/mongodb";
import AdminOtp, { IAdminOtp } from "@/models/AdminOtp";
import AdminSession, { IAdminSession } from "@/models/AdminSession";

const OTP_EXPIRY_MINUTES = 10;
const SESSION_LIFETIME_MS = ADMIN_SESSION_MAX_AGE_SECONDS * 1000;
const ADMIN_LOGIN_PURPOSE = "admin-login";

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function isAdminEmailAllowed(email: string): boolean {
  const allowed = process.env.ADMIN_LOGIN_EMAIL;
  if (!allowed) return false;
  return normalizeEmail(email) === allowed.trim().toLowerCase();
}

function generateOtpCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function createAdminOtp(email: string): Promise<IAdminOtp> {
  await connectToDatabase();
  const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);
  const otp = await AdminOtp.create({
    email: normalizeEmail(email),
    code: generateOtpCode(),
    purpose: ADMIN_LOGIN_PURPOSE,
    expiresAt,
  });
  return otp;
}

export async function verifyAdminOtp(email: string, code: string): Promise<boolean> {
  await connectToDatabase();
  const normalizedEmail = normalizeEmail(email);
  const otp = await AdminOtp.findOne({
    email: normalizedEmail,
    code,
    purpose: ADMIN_LOGIN_PURPOSE,
    used: false,
  })
    .sort({ createdAt: -1 })
    .exec();

  if (!otp) return false;
  if (otp.expiresAt.getTime() < Date.now()) return false;

  otp.used = true;
  await otp.save();
  return true;
}

export async function createAdminSession(email: string): Promise<string> {
  await connectToDatabase();
  const normalizedEmail = normalizeEmail(email);
  const rawToken = crypto.randomBytes(32).toString("hex");
  const secret = process.env.ADMIN_SESSION_SECRET || "";
  const sessionToken = secret
    ? crypto.createHmac("sha256", secret).update(rawToken).digest("hex")
    : rawToken;
  const expiresAt = new Date(Date.now() + SESSION_LIFETIME_MS);

  await AdminSession.create({
    email: normalizedEmail,
    sessionToken,
    expiresAt,
  });

  return sessionToken;
}

export async function getAdminSession(sessionToken: string): Promise<IAdminSession | null> {
  await connectToDatabase();
  const session = await AdminSession.findOne({ sessionToken }).exec();
  if (!session) return null;
  if (session.expiresAt.getTime() < Date.now()) {
    await AdminSession.deleteOne({ sessionToken });
    return null;
  }
  return session;
}

export async function deleteAdminSession(sessionToken: string): Promise<void> {
  await connectToDatabase();
  await AdminSession.deleteOne({ sessionToken });
}


