import type { Metadata } from "next";
import Image from "next/image";

import { ServiceCard } from "@/components/cards/ServiceCard";
import { StepCard } from "@/components/cards/StepCard";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { TestimonialsSlider } from "@/components/sections/TestimonialsSlider";
import { services } from "@/content/services";
import { steps } from "@/content/steps";

const features = [
  {
    title: "Darbhanga-first team",
    description: "Local pros who know your mohalla, traffic windows, and water timings.",
    icon: "/icons/staff.png",
  },
  {
    title: "Assured punctuality",
    description: "We confirm slots, share technician details, and reach on time.",
    icon: "/icons/ontime.png",
  },
  {
    title: "Hygienic service kits",
    description: "Gloves, shoe covers, eco-friendly chemicals—ghar ki safety pehle.",
    icon: "/icons/cleaning.png",
  },
  {
    title: "Easy support",
    description: "Track on WhatsApp, get photos, and request quick follow-ups for free.",
    icon: "/icons/whatsapp.png",
  },
];

const trustBadges = [
  { icon: "⭐", label: "4.8 rating by Darbhanga customers" },
  { icon: "🧹", label: "400+ homes cleaned" },
  { icon: "🛡", label: "Verified & background-checked professionals" },
];

export const metadata: Metadata = {
  title: "GrihFix — Local home services for Darbhanga",
  description:
    "Book deep cleaning, tank cleaning, plumbing, electrical repairs and car wash services by verified Darbhanga professionals. Instant WhatsApp support and transparent pricing.",
};

export default function HomePage() {
  return (
    <div className="space-y-12 pb-16 sm:space-y-16 sm:pb-20">
      <section className="hero-gradient relative overflow-hidden text-white">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-900/20 via-slate-900/40 to-slate-950/80" />
        <div className="pointer-events-none absolute -left-10 top-10 h-56 w-56 rounded-full bg-sky-400/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 translate-y-1/3 rounded-full bg-blue-500/20 blur-3xl" />
        <Container className="relative grid gap-10 py-12 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.4em] text-blue-200">Darbhanga • Bihar</p>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
              Hassle-free home services for busy Darbhanga households.
            </h1>
            <p className="text-lg text-white/80">
              Cleaning, water & septic tank, plumbing, electrical repairs and general maintenance—sab kuch ek hi jagah. Friendly support, verified staff, fair pricing.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href="tel:+919709870726" size="lg" className="justify-center sm:justify-start">
                Call Now
              </Button>
              <Button href="/pricing#estimate" variant="secondary" size="lg" className="justify-center sm:justify-start text-slate-900">
                Get Free Estimate
              </Button>
            </div>
            <div className="grid gap-3 pt-2 text-sm text-white/90 sm:grid-cols-3">
              {trustBadges.map((badge) => (
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
            <p className="text-sm text-white/70">Currently serving only in Darbhanga city limits.</p>
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
              Trusted by 2,000+ Darbhanga homes
            </div>
          </div>
        </Container>
      </section>

      <Section
        eyebrow="Why GrihFix"
        title="One partner for all ghar ke kaam"
        description="We blend professionalism with the warmth of a neighbourhood service partner."
        align="center"
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-slate-100 bg-white p-6 text-left shadow-sm"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                <Image src={feature.icon} alt="" width={32} height={32} className="h-8 w-8 object-contain" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">{feature.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Top Services"
        title="Everything your home needs under one roof"
        description="Pick a service to see details and get a quote. We customise pricing after a quick assessment."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {services.slice(0, 4).map((service) => (
            <ServiceCard key={service.id} {...service} />
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <Button href="/services" variant="secondary">
            View all services
          </Button>
        </div>
      </Section>

      <Section
        background="muted"
        eyebrow="How it works"
        title="Book today, relax tomorrow"
        description="Simple, transparent steps from your phone to doorstep."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <StepCard key={step.id} step={step.step} title={step.title} description={step.description} icon={step.icon} />
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Neighbours love us"
        title="Hear from Darbhanga families"
        description="Real stories from local households who trust GrihFix with their space."
      >
        <div className="mt-10">
          <TestimonialsSlider />
        </div>
      </Section>

      <Section background="brand" align="center" title="Ready to fix your home problems?" description="Ping us on WhatsApp or drop a quick form. Team reaches out within 10 minutes during working hours.">
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="/contact" size="lg" variant="secondary" className="text-slate-900">
            Book a visit
          </Button>
          <Button href="https://wa.me/919709870726" size="lg" variant="ghost" className="text-white">
            Chat on WhatsApp
          </Button>
        </div>
      </Section>
    </div>
  );
}