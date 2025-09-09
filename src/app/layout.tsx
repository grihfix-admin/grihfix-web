import "./globals.css";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "GrihFix — Your Home, Perfectly Fixed",
  description:
    "Book professional home services in Darbhanga. Cleaning, Plumbing, Repairs & more.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-white text-gray-900">
        {/* Header / Navbar */}
        <header className="border-b bg-white shadow-sm">
          <nav className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
            {/* Logo + Brand */}
            <div className="flex items-center gap-2">
              <Link href="/">
                <Image src="/grihfix-logo.png" alt="GrihFix" width={50} height={50} />
              </Link>
              <Link href="/">
                <span className="font-bold text-xl">
                  <span className="text-[#e53935]">Grih</span>
                  <span className="text-[#1976d2]">Fix</span>
                </span>
              </Link>
            </div>

            {/* Nav */}
            <div className="flex items-center gap-6">
              <Link href="/services" className="hover:text-blue-600">
                Services
              </Link>
              <Link href="/contact" className="hover:text-blue-600">
                Contact
              </Link>
              {/* My Account (placeholder route for now) */}
              <Link
                href="/account"
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                My Account
              </Link>
            </div>
          </nav>
        </header>

        {/* Page content */}
        <main className="flex-grow">{children}</main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white mt-10">
          <div className="mx-auto max-w-7xl px-6 py-10 grid md:grid-cols-4 gap-10">
            {/* About */}
            <div>
              <h3 className="font-semibold text-lg mb-3">About GrihFix</h3>
              <p className="text-sm text-gray-300">
                Your one-stop solution for all home repair and maintenance needs
                in Darbhanga. Quality service, guaranteed.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold text-lg mb-3">Contact Us</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center gap-2">
                  <Image src="/icons/mail.png" alt="" width={18} height={18} 
                  className="w-5 h-5 brightness-0 invert" />
                  grihfix.service@gmail.com
                </li>
                <li className="flex items-center gap-2">
                  <Image src="/icons/phone.png" alt="" width={18} height={18} 
                  className="w-5 h-5 brightness-0 invert"/>
                  +91 97098 70726
                </li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h3 className="font-semibold text-lg mb-3">Follow Us</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://www.instagram.com/grihfix/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-300 hover:text-white"
                  >
                    <Image src="/icons/instagram.png" alt="" width={18} height={18} 
                    className="w-5 h-5 brightness-0 invert"/>
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.facebook.com/grihfixdbg/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-300 hover:text-white"
                  >
                    <Image src="/icons/facebook.png" alt="" width={18} height={18} 
                    className="w-5 h-5 brightness-0 invert"/>
                    Facebook
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-semibold text-lg mb-3">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white">
                    Terms &amp; Conditions
                  </Link>
                </li>
                <li>
                  <Link href="/refunds" className="hover:text-white">
                    Refund Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center text-gray-400 text-xs py-4 border-t border-gray-700">
            © {new Date().getFullYear()} GrihFix. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}