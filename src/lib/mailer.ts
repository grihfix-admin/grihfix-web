import nodemailer from "nodemailer";

import { IBooking } from "@/models/Booking";

type MailerPrerequisites = {
  host?: string;
  port?: string;
  user?: string;
  pass?: string;
  fromEmail?: string;
};

function getMailerPrerequisites(): MailerPrerequisites {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, BOOKING_FROM_EMAIL } = process.env;
  return {
    host: SMTP_HOST,
    port: SMTP_PORT,
    user: SMTP_USER,
    pass: SMTP_PASS,
    fromEmail: BOOKING_FROM_EMAIL,
  };
}

function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

async function sendMail({
  to,
  subject,
  text,
}: {
  to: string;
  subject: string;
  text: string;
}): Promise<boolean> {
  const { host, port, user, pass, fromEmail } = getMailerPrerequisites();

  if (!host || !port || !user || !pass || !fromEmail) {
    console.log("[Mailer] Missing SMTP config, email not sent:", {
      host,
      port,
      user,
      fromEmail,
      to,
      subject,
    });
    return false;
  }

  const transporter = nodemailer.createTransport({
    host,
    port: Number(port),
    secure: Number(port) === 465,
    auth: {
      user,
      pass,
    },
  });

  try {
    await transporter.sendMail({
      from: `"GrihFix" <${fromEmail}>`,
      to,
      subject,
      text,
    });
    return true;
  } catch (error) {
    console.error("[Mailer] Error sending email:", error);
    return false;
  }
}

export async function sendBookingNotification(booking: Partial<IBooking>) {
  console.log(
    "[Mailer] sendBookingNotification called with booking id:",
    booking?._id || (booking as any)?.id,
    "service:",
    booking?.serviceName
  );

  const notifyEmail = process.env.BOOKING_NOTIFY_EMAIL;
  if (!notifyEmail) {
    console.log("[Mailer] BOOKING_NOTIFY_EMAIL missing, not notifying admin inbox.");
    return;
  }

  const subject = `New GrihFix Booking - ${booking.serviceName ?? "Service"}`;
  const text = [
    `Name: ${booking.name}`,
    `Phone: ${booking.phone}`,
    `Email: ${booking.email ?? "N/A"}`,
    `Service: ${booking.serviceName} (${booking.serviceSlug})`,
    `Variant: ${booking.variant ?? "N/A"}`,
    `Address: ${booking.address}`,
    `Scheduled: ${
      booking.scheduledDate ? new Date(booking.scheduledDate).toLocaleString() : "N/A"
    }`,
    `Notes: ${booking.notes ?? "N/A"}`,
  ].join("\n");

  await sendMail({ to: notifyEmail, subject, text });
}

export async function sendAdminLoginOtp(email: string, code: string) {
  const sent = await sendMail({
    to: email,
    subject: "Your GrihFix admin login code",
    text: `Your one-time login code is ${code}. It expires in 10 minutes.`,
  });
  if (!sent) {
    console.log(`[AdminLogin] OTP for ${email}: ${code}`);
  }
}

function resolveTrackingUrl(trackingCode?: string) {
  if (!trackingCode) return `${getBaseUrl()}/track`;
  return `${getBaseUrl()}/track/${trackingCode}`;
}

export async function sendCustomerBookingConfirmation(booking: IBooking) {
  if (!booking.email) {
    console.log("[Mailer] Booking confirmation skipped (no customer email).", booking._id);
    return;
  }

  const lines = [
    `Hello ${booking.name || "there"},`,
    "",
    "Thank you for choosing GrihFix. Your booking details:",
    `Service: ${booking.serviceName}`,
    booking.scheduledDate
      ? `Preferred time: ${new Date(booking.scheduledDate).toLocaleString()}`
      : null,
    `Tracking code: ${booking.trackingCode ?? "pending"}`,
    `Track status here: ${resolveTrackingUrl(booking.trackingCode)}`,
    "",
    "We will reach out shortly to confirm the slot.",
  ]
    .filter(Boolean)
    .join("\n");

  await sendMail({
    to: booking.email,
    subject: `Your GrihFix booking is confirmed (${booking.trackingCode ?? "tracking link"})`,
    text: lines,
  });
}

export async function sendBookingStatusUpdate(booking: IBooking) {
  if (!booking.email) {
    console.log("[Mailer] Status update skipped (no customer email).", booking._id);
    return;
  }

  const summary = [
    `Hi ${booking.name || "there"},`,
    "",
    `Your booking (${booking.serviceName}) is now marked as "${booking.status}".`,
    `Track anytime: ${resolveTrackingUrl(booking.trackingCode)}`,
    "",
    `Need help? Call +91 97098 70726.`,
  ].join("\n");

  await sendMail({
    to: booking.email,
    subject: `GrihFix booking update — ${booking.status}`,
    text: summary,
  });
}