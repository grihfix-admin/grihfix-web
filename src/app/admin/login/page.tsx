import type { Metadata } from "next";

import { AdminLoginForm } from "@/components/admin/AdminLoginForm";

export const metadata: Metadata = {
  title: "Admin login • GrihFix",
  description: "Secure OTP-based login for the GrihFix Darbhanga admin dashboard.",
};

export default function AdminLoginPage() {
  return <AdminLoginForm />;
}
