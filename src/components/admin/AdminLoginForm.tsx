"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/Button";

export function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"email" | "otp">("email");
  const [loading, setLoading] = useState(false);

  const handleRequestOtp = async (event: FormEvent) => {
    event.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter the admin email.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/admin/auth/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        toast.error(data.message || "Unable to send login code.");
        return;
      }
      toast.success("OTP sent. Check your email.");
      setStep("otp");
    } catch (error) {
      console.error("[AdminLogin] OTP request failed:", error);
      toast.error("Failed to send login code. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (event: FormEvent) => {
    event.preventDefault();
    if (!code.trim()) {
      toast.error("Enter the 6-digit code.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/admin/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), code: code.trim() }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        toast.error(data.message || "Invalid code.");
        return;
      }
      toast.success("Login successful.");
      router.replace("/admin");
    } catch (error) {
      console.error("[AdminLogin] OTP verify failed:", error);
      toast.error("Something went wrong. Please retry.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 py-16 text-white">
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-blue-200">Admin</p>
          <h1 className="mt-3 text-3xl font-bold">Secure login</h1>
          <p className="mt-2 text-sm text-white/80">
            Enter the authorized admin email to receive a one-time passcode. Codes expire in 10 minutes.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-md rounded-2xl bg-white p-6 text-slate-900 shadow-xl">
          <form onSubmit={step === "email" ? handleRequestOtp : handleVerifyOtp} className="space-y-5">
            <div>
              <label htmlFor="adminEmail" className="text-sm font-medium text-slate-600">
                Admin email
              </label>
              <input
                id="adminEmail"
                name="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                disabled={step === "otp"}
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:bg-slate-100"
                placeholder="you@example.com"
                required
              />
            </div>

            {step === "otp" && (
              <div>
                <label htmlFor="adminOtp" className="text-sm font-medium text-slate-600">
                  6-digit code
                </label>
                <input
                  id="adminOtp"
                  name="code"
                  value={code}
                  onChange={(event) => setCode(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  placeholder="123456"
                  required
                  inputMode="numeric"
                />
                <p className="mt-2 text-xs text-slate-500">
                  Didn’t get the code?{" "}
                  <button type="button" onClick={handleRequestOtp} className="font-semibold text-blue-600">
                    Resend
                  </button>
                </p>
              </div>
            )}

            <Button type="submit" className="w-full justify-center" disabled={loading}>
              {loading ? "Please wait…" : step === "email" ? "Send login code" : "Verify & continue"}
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-slate-500">
            Secured access. Only the configured admin email can log in.
          </p>
        </div>
      </div>
    </div>
  );
}