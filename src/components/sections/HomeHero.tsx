"use client";

import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function HomeHero() {
  const { t } = useLanguage();

  const badges = [
    { icon: "⭐", label: t("hero.badge.rating") },
    { icon: "🧹", label: t("hero.badge.homes") },
    { icon: "🛡", label: t("hero.badge.verified") },
  ];

  return (
    <section className="hero-gradient relative overflow-hidden text-white">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-900/20 via-slate-900/40 to-slate-950/80" />
      <div className="pointer-events-none absolute -left-10 top-10 h-56 w-56 rounded-full bg-sky-400/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 translate-y-1/3 rounded-full bg-saffron-500/20 blur-3xl" />
      <Container className="relative grid gap-10 py-12 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.4em] text-blue-200">{t("hero.eyebrow")}</p>
          <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl">{t("hero.title")}</h1>
          <p className="text-lg text-white/80">{t("hero.subtitle")}</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="tel:+919709870726" size="lg" className="justify-center bg-saffron-500 hover:bg-saffron-600 sm:justify-start">
              {t("hero.ctaPrimary")}
            </Button>
            <Button href="/pricing#estimate" variant="secondary" size="lg" className="justify-center text-slate-900 sm:justify-start">
              {t("hero.ctaSecondary")}
            </Button>
          </div>
          <div className="grid gap-3 pt-2 text-sm text-white/90 sm:grid-cols-3">
            {badges.map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-left shadow-sm backdrop-blur"
              >
                <span aria-hidden className="text-base">
                  {badge.icon}
                </span>
                <span className="font-medium">{badge.label}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-white/70">{t("hero.serviceArea")}</p>
        </div>
        <div className="relative order-first overflow-hidden rounded-3xl border border-white/15 bg-white/5 p-4 shadow-2xl backdrop-blur-sm lg:order-last">
          <Image
            src="/images/home-hero.jpg"
            alt="GrihFix professionals at work"
            width={900}
            height={700}
            className="h-full w-full rounded-2xl object-cover"
            priority
          />
          <div className="absolute bottom-4 left-4 rounded-2xl bg-white/90 px-4 py-3 text-sm text-slate-900 shadow-lg">
            {t("hero.trustedBy")}
          </div>
        </div>
      </Container>
    </section>
  );
}
