// src/app/layout.tsx
import "./globals.css";
import { ClerkProvider, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Mail, Phone } from "lucide-react";

export const metadata = {
  title: "GrihFix — Your Home, Perfectly Fixed",
  description: "Book professional home cleaning, plumbing, and repair services in Darbhanga with GrihFix.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="min-h-screen bg-white text-gray-900 flex flex-col">
          {/* Header */}
          <header className="border-b bg-white sticky top-0 z-40 shadow-sm">
            <nav className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between text-gray-800">
              {/* Logo + Brand */}
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
                <UserButton afterSignOutUrl="/" />
              </div>
            </nav>
          </header>

          {/* Main Content */}
          <main className="flex-1 mx-auto max-w-6xl px-4 py-8">{children}</main>

          {/* Footer */}
          <footer className="bg-gray-900 text-white py-8 mt-12">
            <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-3 gap-8 text-sm">
              {/* About */}
              <div>
                <h3 className="font-semibold mb-2">About GrihFix</h3>
                <p>
                  Your one-stop solution for all home repair and maintenance
                  needs in Darbhanga. Quality service, guaranteed.
                </p>
              </div>

              {/* Contact */}
              <div>
                <h3 className="font-semibold mb-2">Contact Us</h3>
                <p className="flex items-center gap-2">
                  <Mail className="w-5 h-5" /> grihfix.service@gmail.com
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-5 h-5" /> +91 97098 70726
                </p>
              </div>

              {/* Social */}
              <div>
                <h3 className="font-semibold mb-2">Follow Us</h3>
                <p className="flex items-center gap-2">
                  <Instagram className="w-5 h-5" />
                  <a
                    href="https://www.instagram.com/grihfix/"
                    target="_blank"
                    className="hover:underline"
                  >
                    Instagram
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <Facebook className="w-5 h-5" />
                  <a
                    href="https://www.facebook.com/grihfixdbg/"
                    target="_blank"
                    className="hover:underline"
                  >
                    Facebook
                  </a>
                </p>
              </div>
            </div>

            <p className="text-center text-gray-400 text-xs mt-6">
              © {new Date().getFullYear()} GrihFix. All rights reserved.
            </p>
          </footer>

          {/* Floating WhatsApp Button */}
          <a
            href="https://wa.me/919709870726"
            target="_blank"
            className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition"
            aria-label="Chat on WhatsApp"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0C5.37 0 0 5.18 0 11.57c0 2.04.55 4.02 1.61 5.75L0 24l6.9-1.8A12.07 12.07 0 0 0 12 23.15c6.63 0 12-5.18 12-11.57S18.63 0 12 0Zm0 21.23c-1.63 0-3.22-.42-4.63-1.23l-.33-.19-4.1 1.07 1.1-3.92-.21-.36a9.53 9.53 0 0 1-1.45-5.03c0-5.18 4.32-9.38 9.62-9.38 2.57 0 4.98.98 6.8 2.76a9.36 9.36 0 0 1 2.82 6.62c0 5.18-4.32 9.38-9.62 9.38Zm5.27-6.93c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.29-.77.96-.94 1.15-.17.19-.35.21-.65.06-.3-.15-1.27-.46-2.42-1.48-.9-.77-1.5-1.72-1.67-2.01-.17-.29-.02-.45.13-.6.13-.13.3-.35.45-.52.15-.17.2-.29.3-.48.1-.19.05-.36-.02-.51-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.19 0-.5.07-.76.36-.26.29-1 1-1 2.43s1.03 2.82 1.18 3.01c.15.19 2.02 3.22 4.88 4.52.68.3 1.21.48 1.63.62.68.22 1.3.19 1.79.11.55-.08 1.76-.72 2.01-1.41.25-.69.25-1.28.18-1.41-.07-.13-.26-.2-.56-.35Z" />
            </svg>
          </a>
        </body>
      </html>
    </ClerkProvider>
  );
}