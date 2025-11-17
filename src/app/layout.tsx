// src/app/layout.tsx
import type { Metadata } from "next";

import "./globals.css";

import { Layout } from "@/components/layout/Layout";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "GrihFix — Hassle-free Home Services in Darbhanga",
  description: "Home cleaning, water tank & septic cleaning, plumbing, electrical repairs and more – trusted pros in Darbhanga.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white font-sans text-slate-900 antialiased">
        <Layout>{children}</Layout>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}