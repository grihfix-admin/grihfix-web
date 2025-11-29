import Link from "next/link";
import { Facebook, Instagram, Mail, Phone, Send, Twitter, UsersRound } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/grihfix/", icon: Instagram },
  { label: "Facebook", href: "https://www.facebook.com/grihfixdbg/", icon: Facebook },
  { label: "WhatsApp", href: "https://wa.me/919709870726", icon: Send },
  { label: "Twitter", href: "https://twitter.com/grihfix", icon: Twitter },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-white">
      <Container className="space-y-12 py-16">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center shadow-lg backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-blue-200">Partner programme</p>
          <h2 className="mt-3 text-2xl font-semibold text-white">Want steady jobs every week? Join the GrihFix partner network.</h2>
          <p className="mt-2 text-sm text-white/80">For local plumbers, electricians, cleaners and tank specialists across Darbhanga.</p>
          <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button href="mailto:grihfix.service@gmail.com?subject=Partner%20with%20GrihFix" variant="secondary" className="text-slate-900">
              Join as GrihFix partner →
            </Button>
            <Button href="https://wa.me/919709870726?text=Hi%20GrihFix%2C%20I%20want%20to%20partner%20with%20you" variant="ghost" className="text-white">
              WhatsApp the ops team
            </Button>
          </div>
        </div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <p className="text-xl font-semibold">About GrihFix</p>
            <p className="text-sm text-white/70">
              Local Darbhanga team delivering deep cleaning, tank flushing, plumbing, electrical repairs and car washes with digital tracking and transparent
              pricing.
            </p>
            <p className="text-xs text-white/50">GSTIN: 10ABCDE1234Z1Z (Placeholder)</p>
          </div>

          <div className="space-y-4">
            <p className="text-xl font-semibold">Contact us</p>
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
              <li className="flex items-center gap-3">
                <UsersRound className="h-4 w-4 text-white/60" />
                <span>Allalpatti, Darbhanga 846003</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <p className="text-xl font-semibold">Quick links</p>
            <ul className="grid grid-cols-2 gap-2 text-sm text-white/80">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/privacy-policy" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:text-white">
                  Refunds
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <p className="text-xl font-semibold">Stay in touch</p>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white hover:text-slate-900"
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
            <p className="text-xs text-white/60">We respond on WhatsApp within 10 minutes (9am–8pm).</p>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} GrihFix. All rights reserved. Built for Darbhanga households.</p>
          <div className="flex flex-wrap items-center gap-4">
            <span>Service radius: within 20 km of Darbhanga town</span>
            <Link href="mailto:grihfix.service@gmail.com?subject=Partner%20with%20GrihFix" className="text-white hover:underline">
              Join as GrihFix partner →
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}

