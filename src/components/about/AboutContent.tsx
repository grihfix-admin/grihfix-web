"use client";

import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { promises } from "@/content/promises";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function AboutContent() {
  const { lang, t } = useLanguage();
  const isHi = lang === "hi";

  return (
    <div className="space-y-16 pb-20">
      <section className="bg-blue-50">
        <Container className="grid gap-10 py-16 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.5em] text-blue-600">{t("about.eyebrow")}</p>
            <h1 className="font-display mt-4 text-4xl font-bold text-slate-900">{t("about.title")}</h1>
            <p className="mt-4 text-base text-slate-600">{t("about.subtitle")}</p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button href="/contact" size="lg">
                {t("about.ctaTalk")}
              </Button>
              <Button href="tel:+919709870726" variant="secondary" size="lg" className="text-slate-900">
                {t("about.ctaCall")}
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative">
              <div className="overflow-hidden rounded-3xl border border-white/70 bg-white shadow-lg">
                <Image
                  src="/home-clean.jpg"
                  alt="GrihFix team"
                  width={900}
                  height={700}
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-4 rounded-2xl bg-white p-4 text-sm text-slate-900 shadow-xl">
                <p className="font-semibold">{t("about.statJobs")}</p>
                <p className="text-slate-500">{t("about.statWards")}</p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <Section eyebrow={t("about.storyEyebrow")} title={t("about.storyTitle")} description={t("about.storyDesc")}>
        <RevealGroup className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <h3 className="font-display text-xl font-semibold text-slate-900">{t("about.card1Title")}</h3>
            <p className="mt-3 text-sm text-slate-600">{t("about.card1Desc")}</p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <h3 className="font-display text-xl font-semibold text-slate-900">{t("about.card2Title")}</h3>
            <p className="mt-3 text-sm text-slate-600">{t("about.card2Desc")}</p>
          </div>
        </RevealGroup>
      </Section>

      <Section
        background="muted"
        eyebrow={t("about.promisesEyebrow")}
        title={t("about.promisesTitle")}
        description={t("about.promisesDesc")}
      >
        <RevealGroup className="grid gap-6 md:grid-cols-2">
          {promises.map((promise) => (
            <div key={promise.title} className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="font-display text-lg font-semibold text-slate-900">
                {isHi ? promise.titleHi : promise.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">{isHi ? promise.descriptionHi : promise.description}</p>
            </div>
          ))}
        </RevealGroup>
      </Section>

      <Section eyebrow={t("about.hiringEyebrow")} title={t("about.hiringTitle")} description={t("about.hiringDesc")}>
        <Reveal>
          <div className="rounded-3xl border border-dashed border-accent-200 bg-white p-8 text-center shadow-sm">
            <p className="font-display text-2xl font-bold text-slate-900">{t("about.hiringHeadline")}</p>
            <p className="mt-3 text-sm text-slate-600">{t("about.hiringSub")}</p>
            <Button href="https://wa.me/919709870726" className="mt-6">
              {t("about.hiringCta")}
            </Button>
          </div>
        </Reveal>
      </Section>
    </div>
  );
}
