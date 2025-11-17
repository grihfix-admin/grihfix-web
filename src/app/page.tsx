import Image from "next/image";

import { ServiceCard } from "@/components/cards/ServiceCard";
import { StepCard } from "@/components/cards/StepCard";
import { TestimonialCard } from "@/components/cards/TestimonialCard";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { services } from "@/content/services";
import { steps } from "@/content/steps";
import { testimonials } from "@/content/testimonials";

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

export default function HomePage() {
  return (
    <div className="space-y-16 pb-16">
      <section className="bg-slate-900 text-white">
        <Container className="grid gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
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
              <Button href="/contact" variant="secondary" size="lg" className="justify-center sm:justify-start text-slate-900">
                Get Free Estimate
              </Button>
            </div>
            <p className="text-sm text-white/70">Currently serving only in Darbhanga city limits.</p>
          </div>
          <div className="relative order-first overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4 shadow-2xl lg:order-last">
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
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} quote={testimonial.quote} name={testimonial.name} area={testimonial.area} />
          ))}
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