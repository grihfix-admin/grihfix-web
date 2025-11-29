import type { Metadata } from "next";

import { ServiceCard } from "@/components/cards/ServiceCard";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { services } from "@/content/services";

const categories = ["Cleaning", "Water & Septic", "Plumbing", "Electrical", "Other"] as const;

const categoryDescription: Record<typeof categories[number], string> = {
  Cleaning: "Festival prep, move-in/out, or quick spruce-ups handled by Darbhanga’s friendliest crew.",
  "Water & Septic": "Tank and septic cleaning with safety gear, rope access and sludge disposal handled end-to-end.",
  Plumbing: "Minor fixes to new mixer installations—visit charge adjusted in final invoice.",
  Electrical: "Fans, geysers, switchboards and small rewiring jobs sorted by licensed electricians.",
  Other: "Didn’t find it listed? Share photos/videos and we customise the SOP + crew mix.",
};

const serviceStats = [
  { label: "Verified pros", value: "28 technicians" },
  { label: "Same-week slots", value: "96% fulfilled" },
  { label: "Avg. rating", value: "4.8 / 5" },
] as const;

export const metadata: Metadata = {
  title: "Services • GrihFix Darbhanga",
  description: "Browse Darbhanga’s most trusted home services—deep cleaning, tank cleaning, plumbing, electrical fixes and more with transparent timing.",
};

export default function ServicesPage() {
  return (
    <div className="space-y-20 pb-24">
      <section className="hero-gradient relative overflow-hidden text-white">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-900/10 via-slate-900/50 to-slate-950/90" />
        <Container className="relative py-16">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <span className="rounded-full border border-white/40 px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-blue-100">
              GrihFix Services
            </span>
            <h1 className="mt-6 text-4xl font-semibold leading-tight sm:text-5xl">One platform for every ghar ka kaam</h1>
            <p className="mt-4 text-base text-white/80">
              Deep cleaning, tank flushing, electrical fixes, car washes, pest checks—mix and match services and we’ll dispatch a verified crew with the right
              tools.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/contact" size="lg" variant="secondary" className="text-slate-900">
                Build my service plan
              </Button>
              <Button href="tel:+919709870726" size="lg" variant="ghost" className="text-white">
                Call +91 97098 70726
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
        eyebrow="Browse by category"
        title="Pick a service cluster"
        description="Tap a category to jump directly to the relevant offerings. Every visit includes WhatsApp updates, before/after shots, and digital invoice."
      >
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <a
              key={category}
              href={`#${category.toLowerCase().replace(/ & /g, "-").replace(/\s+/g, "-")}`}
              className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-blue-300 hover:text-slate-900"
            >
              {category}
            </a>
          ))}
        </div>
      </Section>

      {categories.map((category) => {
        const categoryServices = services.filter((service) => service.category === category);
        if (!categoryServices.length) return null;

        return (
          <Section
            key={category}
            id={category.toLowerCase().replace(/ & /g, "-").replace(/\s+/g, "-")}
            eyebrow={`${category} services`}
            title={category}
            description={categoryDescription[category]}
          >
            <div className="grid gap-6 lg:grid-cols-2">
              {categoryServices.map((service) => (
                <ServiceCard key={service.id} {...service} actionLabel="Book Now" />
              ))}
            </div>
          </Section>
        );
      })}

      <Section
        background="brand"
        align="center"
        title="Need multiple services together?"
        description="Bundle cleaning, plumbing, electrical or tank work to unlock combo discounts. Let’s draft a quick plan."
      >
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <Button href="/contact" size="lg" variant="secondary" className="text-slate-900">
            Plan a visit
          </Button>
          <Button href="https://wa.me/919709870726" size="lg" variant="ghost" className="text-white">
            Chat on WhatsApp
          </Button>
        </div>
      </Section>
    </div>
  );
}