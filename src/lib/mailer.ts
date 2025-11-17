import nodemailer from "nodemailer";

export async function sendBookingEmail(to: string, subject: string, text: string, html?: string) {
  // Configure transporter (for now using Gmail SMTP, can swap later to SendGrid/SES)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER, // set in .env.local
      pass: process.env.SMTP_PASS, // app-specific password
    },
  });

  const mailOptions = {
    from: `"GrihFix" <${process.env.SMTP_USER}>`,
    to,
    subject,
    text,
    html,
  };

  await transporter.sendMail(mailOptions);
}