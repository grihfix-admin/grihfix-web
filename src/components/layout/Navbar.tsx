"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import { Menu, PhoneCall, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/grihfix-logo.png"
              alt="GrihFix logo"
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-contain"
            />
            <span className="text-lg font-extrabold tracking-tight text-slate-900">
              Grih<span className="text-blue-600">Fix</span>
            </span>
          </Link>
        </div>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-slate-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button href="tel:+919709870726" variant="secondary" size="md" className="gap-2">
            <PhoneCall size={16} />
            Call Now
          </Button>
          <Button href="/contact" size="md">
            Book Service
          </Button>
        </div>

        <button
          type="button"
          aria-label="Toggle navigation"
          className="rounded-full p-2 text-slate-700 ring-1 ring-slate-200 md:hidden"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </Container>

      <div
        className={cn(
          "origin-top border-t border-slate-100 bg-white transition-all duration-200 md:hidden",
          open ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
        )}
      >
        <Container className="flex flex-col gap-4 py-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-base font-medium text-slate-700"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col gap-3 pt-2">
            <Button href="tel:+919709870726" variant="secondary" className="w-full justify-center">
              Call +91 9709870726
            </Button>
            <Button href="/contact" className="w-full justify-center">
              Book Service
            </Button>
          </div>
        </Container>
      </div>
    </header>
  );
}

