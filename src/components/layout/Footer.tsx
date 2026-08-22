"use client";

import Link from "next/link";
import { Facebook, Instagram, Mail, Phone, Send, ShieldCheck, Twitter, UsersRound } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import type { DictionaryKey } from "@/lib/i18n/dictionary";

const navLinks: { labelKey: DictionaryKey; href: string }[] = [
  { labelKey: "nav.home", href: "/" },
  { labelKey: "nav.services", href: "/services" },
  { labelKey: "nav.pricing", href: "/pricing" },
  { labelKey: "nav.about", href: "/about" },
  { labelKey: "nav.contact", href: "/contact" },
];

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/grihfix/", icon: Instagram },
  { label: "Facebook", href: "https://www.facebook.com/grihfixdbg/", icon: Facebook },
  { label: "WhatsApp", href: "https://wa.me/919709870726", icon: Send },
  { label: "Twitter", href: "https://twitter.com/grihfix", icon: Twitter },
];

export function Footer() {
  const year = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-950 text-white">
      <Container className="space-y-12 py-16">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center shadow-lg backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-saffron-300">{t("footer.partnerEyebrow")}</p>
          <h2 className="font-display mt-3 text-2xl font-semibold text-white">{t("footer.partnerTitle")}</h2>
          <p className="mt-2 text-sm text-white/80">{t("footer.partnerDesc")}</p>
          <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button href="mailto:grihfix.service@gmail.com?subject=Partner%20with%20GrihFix" variant="secondary" className="text-slate-900">
              {t("footer.joinPartner")}
            </Button>
            <Button href="https://wa.me/919709870726?text=Hi%20GrihFix%2C%20I%20want%20to%20partner%20with%20you" variant="ghost" className="text-white">
              {t("footer.whatsappOps")}
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-xs text-white/70 sm:justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-saffron-300" />
            <span>{t("common.verified")}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>⭐ {t("common.rated")}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>💳 {t("common.cashUpi")}</span>
          </div>
        </div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <p className="font-display text-xl font-semibold">{t("footer.about")}</p>
            <p className="text-sm text-white/70">{t("footer.aboutDesc")}</p>
            <p className="text-xs text-white/50">GSTIN: 10ABCDE1234Z1Z (Placeholder)</p>
          </div>

          <div className="space-y-4">
            <p className="font-display text-xl font-semibold">{t("footer.contactUs")}</p>
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
            <p className="font-display text-xl font-semibold">{t("footer.quickLinks")}</p>
            <ul className="grid grid-cols-2 gap-2 text-sm text-white/80">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white">
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/privacy-policy" className="hover:text-white">
                  {t("footer.privacy")}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white">
                  {t("footer.terms")}
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:text-white">
                  {t("footer.refunds")}
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <p className="font-display text-xl font-semibold">{t("footer.stayInTouch")}</p>
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
            <p className="text-xs text-white/60">{t("footer.responseTime")}</p>
            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.3em] text-white/40">{t("lang.toggleLabel")}</p>
              <LanguageToggle variant="light" />
            </div>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} GrihFix. {t("footer.rights")}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <span>{t("footer.serviceRadius")}</span>
            <Link href="mailto:grihfix.service@gmail.com?subject=Partner%20with%20GrihFix" className="text-white hover:underline">
              {t("footer.joinPartner")}
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
