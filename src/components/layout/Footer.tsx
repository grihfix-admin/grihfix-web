import Link from "next/link";

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
      <Container className="grid gap-10 py-12 md:grid-cols-4">
        <div>
          <p className="text-xl font-semibold">GrihFix</p>
          <p className="mt-3 text-sm text-white/70">
            Friendly home services for Darbhanga families. Safaai ho ya repair — bas bolo aur hum aa gaye!
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">
            Explore
          </p>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">
            Contact
          </p>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li>
              Call:{" "}
              <Link href="tel:+919709870726" className="font-medium text-white">
                +91 97098 70726
              </Link>
            </li>
            <li>
              Email:{" "}
              <Link href="mailto:grihfix.service@gmail.com" className="font-medium text-white">
                grihfix.service@gmail.com
              </Link>
            </li>
            <li>Hours: 9am – 8pm, all week</li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">
            Social
          </p>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            {socials.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition hover:text-white" target="_blank" rel="noreferrer">
                  {item.label} {item.handle && <span className="text-white/60">{item.handle}</span>}
                </Link>
              </li>
            ))}
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

