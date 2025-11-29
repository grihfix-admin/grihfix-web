import Image from "next/image";
import type { Metadata } from "next";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { promises } from "@/content/promises";

export const metadata: Metadata = {
  title: "About GrihFix Darbhanga",
  description:
    "Learn how GrihFix became Darbhanga’s trusted partner for deep cleaning, tank cleaning, plumbing, and electrical services with a local, verified crew.",
};

export default function AboutPage() {
  return (
    <div className="space-y-16 pb-20">
      <section className="bg-blue-50">
        <Container className="grid gap-10 py-16 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.5em] text-blue-600">About GrihFix</p>
            <h1 className="mt-4 text-4xl font-bold text-slate-900">Born in Darbhanga, for Darbhanga homes.</h1>
            <p className="mt-4 text-base text-slate-600">
              We started GrihFix after struggling to find reliable, hygienic service partners for our own families. Today, we are a small-but-mighty crew providing
              cleaning, tank, plumbing, and repair services across Darbhanga with professionalism and a smile.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button href="/contact" size="lg">
                Talk to our team
              </Button>
              <Button href="tel:+919709870726" variant="secondary" size="lg" className="text-slate-900">
                Call us directly
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-3xl border border-white/70 bg-white shadow-lg">
              <Image
                src="/home-clean.jpg"
                alt="GrihFix team"
                width={900}
                height={700}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-4 rounded-2xl bg-white p-4 text-sm text-slate-900 shadow-xl">
              <p className="font-semibold">2500+ jobs completed</p>
              <p className="text-slate-500">Across 40+ wards of Darbhanga</p>
            </div>
          </div>
        </Container>
      </section>

      <Section
        eyebrow="Our story"
        title="Neighbourhood trust meets pro-grade systems"
        description="We blend modern scheduling tools with the warmth of local technicians who understand how Darbhanga households operate."
      >
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">Darbhanga roots</h3>
            <p className="mt-3 text-sm text-slate-600">
              Started by siblings who grew up near Tower Chowk, GrihFix focuses only on Darbhanga so we can guarantee punctuality, quality, and consistency.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">Process-driven delivery</h3>
            <p className="mt-3 text-sm text-slate-600">
              Every job has a digital checklist, before/after photos, and customer feedback. That’s how we maintain a 4.9/5 satisfaction score.
            </p>
          </div>
        </div>
      </Section>

      <Section
        background="muted"
        eyebrow="Our promises"
        title="What you can expect every single time"
        description="Yahi toh farq hai — reliability that feels personal."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {promises.map((promise) => (
            <div key={promise.title} className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">{promise.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{promise.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Work with GrihFix"
        description="If you are a skilled cleaner, plumber, electrician, or handyman from Darbhanga and nearby areas, join our verified partner network."
      >
        <div className="rounded-3xl border border-dashed border-slate-200 bg-white/80 p-8 text-center">
          <p className="text-2xl font-bold text-slate-900">We&apos;re hiring service partners</p>
          <p className="mt-3 text-sm text-slate-600">Training + uniforms provided. Weekly payouts. Insurance coverage on the way!</p>
          <Button href="https://wa.me/919709870726" className="mt-6">
            Apply via WhatsApp
          </Button>
        </div>
      </Section>
    </div>
  );
}

