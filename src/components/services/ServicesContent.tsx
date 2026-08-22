"use client";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { services, type ServiceCategory } from "@/content/services";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import type { DictionaryKey } from "@/lib/i18n/dictionary";

const categories: ServiceCategory[] = ["Cleaning", "Water & Septic", "Plumbing", "Electrical", "Vehicle Care", "Other"];

const categoryDescriptionKey: Record<ServiceCategory, { en: string; hi: string }> = {
  Cleaning: {
    en: "Festival prep, move-in/out, or quick spruce-ups handled by Darbhanga's friendliest crew.",
    hi: "त्योहार की तैयारी, शिफ्टिंग या झटपट सफाई — दरभंगा की सबसे भरोसेमंद टीम द्वारा।",
  },
  "Water & Septic": {
    en: "Tank and septic cleaning with safety gear, rope access and sludge disposal handled end-to-end.",
    hi: "पूरी सुरक्षा और सही उपकरणों के साथ टंकी व सेप्टिक टैंक की सफाई, शुरू से अंत तक।",
  },
  Plumbing: {
    en: "Minor fixes to new mixer installations — visit charge adjusted in final invoice.",
    hi: "छोटी मरम्मत से लेकर नए मिक्सर इंस्टॉलेशन तक — विज़िट शुल्क अंतिम बिल में समायोजित।",
  },
  Electrical: {
    en: "Fans, geysers, switchboards and small rewiring jobs sorted by licensed electricians.",
    hi: "पंखे, गीज़र, स्विचबोर्ड और छोटी वायरिंग — लाइसेंस्ड इलेक्ट्रीशियन द्वारा।",
  },
  "Vehicle Care": {
    en: "Doorstep car cleaning so you don't have to queue at a local wash centre.",
    hi: "घर बैठे कार की सफाई — अब वॉश सेंटर की लाइन में लगने की ज़रूरत नहीं।",
  },
  Other: {
    en: "Didn't find it listed? Share photos/videos and we customise the SOP + crew mix.",
    hi: "अपनी ज़रूरत नहीं मिली? फ़ोटो/वीडियो भेजें, हम उसी अनुसार टीम भेजेंगे।",
  },
};

const serviceStats: { labelKey: DictionaryKey | null; label: string; value: string }[] = [
  { labelKey: null, label: "Verified pros", value: "28 technicians" },
  { labelKey: null, label: "Same-week slots", value: "96% fulfilled" },
  { labelKey: null, label: "Avg. rating", value: "4.8 / 5" },
];

function categoryAnchor(category: ServiceCategory) {
  return category.toLowerCase().replace(/ & /g, "-").replace(/\s+/g, "-");
}

export function ServicesContent() {
  const { lang, t } = useLanguage();
  const isHi = lang === "hi";

  return (
    <div className="space-y-20 pb-24">
      <section className="hero-gradient relative overflow-hidden text-white">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-900/10 via-slate-900/50 to-slate-950/90" />
        <Container className="relative py-16">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <span className="rounded-full border border-white/40 px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-blue-100">
              {t("services.eyebrow")}
            </span>
            <h1 className="font-display mt-6 text-4xl font-semibold leading-tight sm:text-5xl">{t("services.pageTitle")}</h1>
            <p className="mt-4 text-base text-white/80">{t("services.pageSubtitle")}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/contact" size="lg" variant="secondary" className="text-slate-900">
                {t("services.buildPlan")}
              </Button>
              <Button href="tel:+919709870726" size="lg" variant="ghost" className="text-white">
                {t("common.callUs")}
              </Button>
            </div>
          </div>
          <div className="mt-10 grid gap-4 text-left sm:grid-cols-3">
            {serviceStats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/10 p-4 shadow-sm backdrop-blur">
                <p className="text-xs uppercase tracking-[0.4em] text-blue-100">{stat.label}</p>
                <p className="mt-2 text-xl font-semibold">{stat.value}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Section
        eyebrow={t("services.browseCategory")}
        title={isHi ? "श्रेणी चुनें" : "Pick a service cluster"}
        description={t("services.pickCategory")}
      >
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <a
              key={category}
              href={`#${categoryAnchor(category)}`}
              className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-saffron-300 hover:text-slate-900"
            >
              {t(`category.${category}` as DictionaryKey)}
            </a>
          ))}
        </div>
      </Section>

      {categories.map((category) => {
        const categoryServices = services.filter((service) => service.category === category);
        if (!categoryServices.length) return null;

        const description = isHi ? categoryDescriptionKey[category].hi : categoryDescriptionKey[category].en;

        return (
          <Section
            key={category}
            id={categoryAnchor(category)}
            eyebrow={`${t(`category.${category}` as DictionaryKey)} ${isHi ? "सर्विसेज़" : "services"}`}
            title={t(`category.${category}` as DictionaryKey)}
            description={description}
          >
            <div className="grid gap-6 lg:grid-cols-2">
              {categoryServices.map((service) => (
                <ServiceCard key={service.id} {...service} actionLabel={t("common.bookNow")} />
              ))}
            </div>
          </Section>
        );
      })}

      <Section background="brand" align="center" title={t("services.needMultiple")} description={t("services.bundleDesc")}>
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <Button href="/contact" size="lg" variant="secondary" className="text-slate-900">
            {t("services.planVisit")}
          </Button>
          <Button href="https://wa.me/919709870726" size="lg" variant="ghost" className="text-white">
            {t("common.chatWhatsapp")}
          </Button>
        </div>
      </Section>
    </div>
  );
}
