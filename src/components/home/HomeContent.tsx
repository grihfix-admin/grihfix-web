"use client";

import Image from "next/image";

import { ServiceCard } from "@/components/cards/ServiceCard";
import { StepCard } from "@/components/cards/StepCard";
import { HomeHero } from "@/components/sections/HomeHero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { TestimonialsSlider } from "@/components/sections/TestimonialsSlider";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { services } from "@/content/services";
import { steps } from "@/content/steps";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

const features = [
  { titleKey: "why.local.title", descKey: "why.local.desc", icon: "/icons/staff.png" },
  { titleKey: "why.punctual.title", descKey: "why.punctual.desc", icon: "/icons/ontime.png" },
  { titleKey: "why.hygiene.title", descKey: "why.hygiene.desc", icon: "/icons/cleaning.png" },
  { titleKey: "why.support.title", descKey: "why.support.desc", icon: "/icons/whatsapp.png" },
] as const;

export function HomeContent() {
  const { t } = useLanguage();
  const featuredServices = services.slice(0, 6);

  return (
    <div className="space-y-12 pb-16 sm:space-y-16 sm:pb-20">
      <HomeHero />
      <TrustStrip />

      <Section eyebrow={t("why.eyebrow")} title={t("why.title")} description={t("why.subtitle")} align="center">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.titleKey} className="rounded-2xl border border-slate-100 bg-white p-6 text-left shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                <Image src={feature.icon} alt="" width={32} height={32} className="h-8 w-8 object-contain" />
              </div>
              <h3 className="font-display text-lg font-semibold text-slate-900">{t(feature.titleKey)}</h3>
              <p className="mt-2 text-sm text-slate-600">{t(feature.descKey)}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow={t("services.eyebrow")} title={t("services.homeTitle")} description={t("services.homeSubtitle")}>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredServices.map((service) => (
            <ServiceCard key={service.id} {...service} />
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <Button href="/services" variant="secondary">
            {t("common.viewAllServices")}
          </Button>
        </div>
      </Section>

      <Section background="muted" eyebrow={t("steps.eyebrow")} title={t("steps.title")} description={t("steps.subtitle")}>
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <StepCard
              key={step.id}
              step={step.step}
              title={step.title}
              titleHi={step.titleHi}
              description={step.description}
              descriptionHi={step.descriptionHi}
              icon={step.icon}
            />
          ))}
        </div>
      </Section>

      <Section eyebrow={t("testimonials.eyebrow")} title={t("testimonials.title")} description={t("testimonials.subtitle")}>
        <div className="mt-10">
          <TestimonialsSlider />
        </div>
      </Section>

      <Section background="brand" align="center" title={t("cta.title")} description={t("cta.subtitle")}>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="/contact" size="lg" variant="secondary" className="text-slate-900">
            {t("cta.bookVisit")}
          </Button>
          <Button href="https://wa.me/919709870726" size="lg" variant="ghost" className="text-white">
            {t("common.chatWhatsapp")}
          </Button>
        </div>
      </Section>
    </div>
  );
}
