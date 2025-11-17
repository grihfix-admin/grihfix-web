import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { pricingTiers } from "@/content/pricing";

export default function PricingPage() {
  return (
    <div className="space-y-16 pb-20">
      <section className="bg-slate-900 text-white">
        <Container className="py-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.5em] text-blue-200">Transparent pricing</p>
          <h1 className="mt-4 text-4xl font-bold">Simple estimates, no hidden charges.</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/80">
            Every home is different, so the final quote comes after a quick assessment. But here’s a clear idea of where our pricing starts.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="/contact" size="lg" variant="secondary" className="text-slate-900">
              Get Free Estimate
            </Button>
            <Button href="tel:+919709870726" size="lg" variant="ghost" className="text-white">
              Call +91 97098 70726
            </Button>
          </div>
        </Container>
      </section>

      <Section
        eyebrow="Starting packages"
        title="Flexible options for every service"
        description="Pricing shown is for standard jobs. Complex scopes may vary once we understand the site condition."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {pricingTiers.map((tier) => (
            <div
              key={tier.id}
              className="flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
            >
              <p className="text-sm uppercase tracking-[0.4em] text-blue-500">{tier.service}</p>
              <p className="mt-3 text-3xl font-bold text-slate-900">{tier.startingAt}</p>
              <p className="text-sm text-slate-500">Starting package</p>
              <ul className="mt-6 space-y-3 text-sm text-slate-600">
                {tier.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-blue-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-6">
                <Button href="/contact" className="w-full justify-center">
                  Discuss requirement
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        background="muted"
        title="How estimates work"
        description="Book a slot, we inspect virtually or in person, then share a digital quote with inclusions, exclusions, and payment schedule."
      >
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Visit fee waived</h3>
            <p className="mt-2 text-sm text-slate-600">
              We don’t charge for inspection when you confirm the job with GrihFix.
            </p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Digital invoices</h3>
            <p className="mt-2 text-sm text-slate-600">
              Receive invoices via WhatsApp + email, with UPI & cash options available.
            </p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Combo discounts</h3>
            <p className="mt-2 text-sm text-slate-600">
              Club multiple services (e.g., cleaning + plumbing) for better per-service pricing.
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
}

