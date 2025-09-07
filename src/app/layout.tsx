import "./globals.css";
// import {
//   //ClerkProvider,
//   UserButton,
//   SignInButton,
//   SignedIn,
//   SignedOut,
// } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Mail, Phone } from "lucide-react";

export const metadata = {
  title: "GrihFix — Your Home, Perfectly Fixed",
  description:
    "Book home cleaning, plumbing, appliance repair, and more in Darbhanga with GrihFix.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Header without Clerk */}
        <header className="border-b bg-white sticky top-0 z-40 shadow-sm">
          <nav className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between text-gray-800">
            {/* Logo + Brand */}
            <a href="/" className="flex items-center gap-2">
              <img src="/grihfix-logo.png" alt="GrihFix" width={50} height={50} />
              <span className="font-bold text-xl">
                <span className="text-[#e53935]">Grih</span>
                <span className="text-[#1976d2]">Fix</span>
              </span>
            </a>

            {/* Nav Links */}
            <div className="flex items-center gap-6">
              <a href="/services" className="hover:text-blue-600">Services</a>
              <a href="/contact" className="hover:text-blue-600">Contact</a>
            </div>
          </nav>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>

        <footer className="mt-16 border-t bg-white py-4 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} GrihFix. All rights reserved.
        </footer>
      </body>
    </html>
  );
}