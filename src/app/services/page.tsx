// src/app/services/page.tsx
import { ServiceCard } from "@/components/cards/ServiceCard";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { services } from "@/content/services";

const categories = ["Cleaning", "Water & Septic", "Plumbing", "Electrical", "Other"] as const;

export default function ServicesPage() {
  return (
    <div className="space-y-20 pb-20">
      <section className="bg-blue-50">
        <Container className="py-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.5em] text-blue-500">GrihFix Services</p>
          <h1 className="mt-4 text-4xl font-bold text-slate-900">Detailed services for every corner of your home</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600">
            From one-time deep cleaning to recurring maintenance, select the service that matches your need.
            Quotes are customised after a short inspection or call.
          </p>
          <div className="mt-6 flex justify-center">
            <Button href="/contact" size="lg">
              Get a custom quote
            </Button>
          </div>
        </Container>
      </section>

      {categories.map((category) => {
        const categoryServices = services.filter((service) => service.category === category);
        if (!categoryServices.length) return null;

        return (
          <Section key={category} title={category} description="Flexible slots, assured punctuality, and support over WhatsApp.">
            <div className="grid gap-6 md:grid-cols-2">
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
        <Button href="/contact" size="lg" variant="secondary" className="text-slate-900">
          Plan a visit
        </Button>
      </Section>
    </div>
  );
}