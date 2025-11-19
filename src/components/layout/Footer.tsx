import Link from "next/link";
import { Facebook, Instagram, Mail, Phone } from "lucide-react";

import { Container } from "@/components/ui/Container";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/grihfix/", handle: "@grihfix" },
  { label: "Facebook", href: "https://www.facebook.com/grihfixdbg/", handle: "/grihfixdbg" },
  { label: "WhatsApp", href: "https://wa.me/919709870726", handle: "+91 97098 70726" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white">
      <Container className="grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3">
          <p className="text-xl font-semibold">About GrihFix</p>
          <p className="text-sm text-white/70">
            Your one-stop solution for all home repair and maintenance needs in Darbhanga. Quality service, guaranteed.
          </p>
        </div>

        <div className="space-y-3">
          <p className="text-xl font-semibold">Contact Us</p>
          <ul className="space-y-3 text-sm text-white/80">
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-white/60" />
              <Link href="mailto:grihfix.service@gmail.com" className="hover:text-white">
                grihfix.service@gmail.com
              </Link>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-white/60" />
              <Link href="tel:+919709870726" className="hover:text-white">
                +91 97098 70726
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <p className="text-xl font-semibold">Follow Us</p>
          <ul className="space-y-3 text-sm text-white/80">
            <li>
              <Link
                href="https://instagram.com/grihfix"
                className="inline-flex items-center gap-3 hover:text-white hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                <Instagram className="h-4 w-4 text-white/60" />
                Instagram
              </Link>
            </li>
            <li>
              <Link
                href="https://facebook.com/grihfixdbg"
                className="inline-flex items-center gap-3 hover:text-white hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                <Facebook className="h-4 w-4 text-white/60" />
                Facebook
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <p className="text-xl font-semibold">Legal</p>
          <ul className="space-y-2 text-sm text-white/80">
            <li>
              <Link href="/privacy-policy" className="hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-white">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link href="/refund-policy" className="hover:text-white">
                Refund Policy
              </Link>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10 text-center text-xs text-white/60">
        <Container className="py-4">
          © {year} GrihFix. All rights reserved. Made with care in Darbhanga.
        </Container>
      </div>
    </footer>
  );
}

