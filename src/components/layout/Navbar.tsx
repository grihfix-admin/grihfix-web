"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { cn } from "@/lib/utils";
import { PhoneCall } from "lucide-react";
import type { DictionaryKey } from "@/lib/i18n/dictionary";

const navLinks: { labelKey: DictionaryKey; href: string }[] = [
  { labelKey: "nav.home", href: "/" },
  { labelKey: "nav.services", href: "/services" },
  { labelKey: "nav.pricing", href: "/pricing" },
  { labelKey: "nav.about", href: "/about" },
  { labelKey: "nav.contact", href: "/contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-transparent bg-white/80 backdrop-blur transition-all",
        scrolled ? "border-slate-100 shadow-lg" : "shadow-sm"
      )}
    >
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
            <span className="font-display text-lg font-extrabold tracking-tight">
              <span className="text-slate-900">Grih</span>
              <span className="text-blue-600">Fix</span>
            </span>
          </Link>
        </div>

        <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-600 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "transition hover:text-slate-900",
                scrolled ? "text-slate-500" : "text-slate-600"
              )}
            >
              {t(link.labelKey)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageToggle />
          <Button href="tel:+919709870726" variant="secondary" size="md" className="gap-2 border-saffron-200 bg-saffron-50 text-saffron-700 hover:bg-saffron-100">
            <PhoneCall size={16} />
            {t("nav.callNow")}
          </Button>
          <Button href="/contact" size="md">
            {t("nav.bookService")}
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageToggle className="scale-90" />
          <button
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((prev) => !prev)}
          >
            <span className="sr-only">{t("nav.menu")}</span>
            <span
              className={cn(
                "relative block h-8 w-8 rounded-full border border-slate-200 bg-white/80 p-2 shadow-sm transition hover:border-slate-300",
                open && "border-blue-200"
              )}
            >
              <span
                className={cn(
                  "absolute left-1.5 top-2 block h-0.5 w-5 bg-slate-700 transition-all duration-200",
                  open ? "translate-y-1.5 rotate-45" : ""
                )}
              />
              <span
                className={cn(
                  "absolute left-1.5 top-3.5 block h-0.5 w-5 bg-slate-700 transition-all duration-200",
                  open ? "-translate-y-1.5 -rotate-45" : ""
                )}
              />
            </span>
          </button>
        </div>
      </Container>

      <div
        id="mobile-nav"
        className={cn(
          "border-t border-slate-100 bg-white text-slate-800 shadow-lg transition-[max-height,opacity] duration-200 md:hidden",
          open ? "max-h-[420px] opacity-100" : "pointer-events-none max-h-0 opacity-0"
        )}
      >
        <Container className="flex flex-col gap-4 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-base font-medium text-slate-800"
              onClick={() => setOpen(false)}
            >
              {t(link.labelKey)}
            </Link>
          ))}
          <div className="flex flex-col gap-3 pb-2 pt-2">
            <Button href="tel:+919709870726" variant="secondary" className="w-full justify-center border-saffron-200 bg-saffron-50 text-saffron-700">
              {t("common.callUs")}
            </Button>
            <Button href="/contact" className="w-full justify-center">
              {t("nav.bookService")}
            </Button>
          </div>
        </Container>
      </div>
    </header>
  );
}
