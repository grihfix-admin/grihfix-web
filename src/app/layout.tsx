import "./globals.css";
import {
  ClerkProvider,
  UserButton,
  SignInButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
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
    <ClerkProvider>
      <html lang="en">
        <body className="min-h-screen bg-white text-gray-900 flex flex-col">
          {/* Header */}
          <header className="border-b bg-white sticky top-0 z-40 shadow-sm">
            <nav className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between text-gray-800">
              {/* Logo + Brand (clickable) */}
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/grihfix-logo.png"
                  alt="GrihFix"
                  width={50}
                  height={50}
                />
                <span className="font-bold text-xl">
                  <span className="text-[#e53935]">Grih</span>
                  <span className="text-[#1976d2]">Fix</span>
                </span>
              </Link>

              {/* Nav Links */}
              <div className="flex items-center gap-6">
                <Link
                  href="/services"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Services
                </Link>
                <Link
                  href="/contact"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Contact
                </Link>
                <SignedOut>
                  <SignInButton>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                      My Account
                    </button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>
              </div>
            </nav>
          </header>

          {/* Main Page Content */}
          <main className="flex-1 mx-auto max-w-6xl px-4 py-8">
            {children}
          </main>

          {/* Footer */}
          <footer className="mt-16 border-t bg-gray-900 text-gray-300">
            <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8 text-sm">
              {/* About */}
              <div>
                <h3 className="font-semibold text-white mb-3">About GrihFix</h3>
                <p>
                  Your one-stop solution for all home repair and maintenance
                  needs in Darbhanga. Quality service, guaranteed.
                </p>
              </div>

              {/* Legal */}
              <div>
                <h3 className="font-semibold text-white mb-3">Legal</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="hover:text-white">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Terms & Conditions
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Refund Policy
                    </a>
                  </li>
                </ul>
              </div>

              {/* Contact + Social */}
              <div>
                <h3 className="font-semibold text-white mb-3">Contact Us</h3>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4" /> grihfix.service@gmail.com
                </p>
                <p className="flex items-center gap-2 mt-2">
                  <Phone className="w-4 h-4" /> +91 97098 70726
                </p>

                <div className="mt-4 space-y-3">
                  <a
                    href="https://www.instagram.com/grihfix/"
                    target="_blank"
                    className="hover:text-white flex items-center gap-2"
                  >
                    <Instagram className="w-5 h-5" /> Instagram
                  </a>
                  <a
                    href="https://www.facebook.com/grihfixdbg/"
                    target="_blank"
                    className="hover:text-white flex items-center gap-2"
                  >
                    <Facebook className="w-5 h-5" /> Facebook
                  </a>
                </div>
              </div>
            </div>

            <div className="text-center text-gray-500 text-xs py-4 border-t border-gray-700">
              Copyright © {new Date().getFullYear()} GrihFix. All rights reserved.
            </div>
          </footer>

          {/* Floating WhatsApp Button */}
          <a
            href="https://wa.me/919709870726"
            target="_blank"
            className="fixed bottom-6 right-6 z-50 bg-[#25D366] rounded-full p-3 shadow-lg hover:bg-green-500 transition"
          >
            <Image
              src="/icons/whatsapp.png"
              alt="Chat on WhatsApp"
              width={44}
              height={44}
            />
          </a>
        </body>
      </html>
    </ClerkProvider>
  );
}