"use client";

import Script from "next/script";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { pricingTiers } from "@/content/pricing";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import {
  calculateHomeCleaningPrice,
  DEFAULT_HOME_AREA_RANGE,
  displayedMrpForTarget,
  HOME_AREA_SLABS,
  HomeCleaningVariant,
  multiplierFor,
  roundRule,
  slabFromArea,
} from "@/lib/pricingCalculator";

type ServiceVariant = {
  id: string;
  label: string;
  base?: number;
};

type ServiceConfig = {
  id: string;
  slug: string;
  label: string;
  variants: ServiceVariant[];
};

type QuoteLine = {
  id: string;
  serviceLabel: string;
  variantLabel: string;
  quantity: number;
  areaRange?: string;
  unitMrp: number;
  unitFinal: number;
  unitSave: number;
  couponSavings: number;
  finalPrice: number;
};

type CalculationInput = {
  serviceId: string;
  variantId: string;
  variantLabel: string;
  variantBase?: number;
  quantity: number;
  areaSqft: string;
  areaRange: string;
  couponCode: "FIRST" | "SECOND" | null;
};

type CalculationResult = {
  targetAfter: number;
  effectiveRange?: string;
  unitMrp: number;
  baseFinal: number;
  baseDiscount: number;
  couponSavings: number;
  finalEstimate: number;
};

const OTHER_SERVICES_BASE = {
  bathroom: { variants: { "Bathroom Cleaning": 499 } },
  kitchen: { variants: { "Kitchen Cleaning": 499 } },
  plumber: { variants: { "Plumber Visit": 349 } },
  electrician: { variants: { "Electrician Visit": 349 } },
  tank_cleaning: {
    variants: { "500 L Tank": 699, "700 L Tank": 799, "1000 L Tank": 999 },
  },
  sofa: { variants: { "5-Seater Set": 599, "7-Seater Set": 849 } },
  mattress: { variants: { "Single / Double Mattress": 299, "Queen / King Mattress": 399 } },
  chair: { variants: { "Fabric / Office Chair (min. 4)": 99 } },
  tiles: { variants: { "Up to 150 sq ft": 799 } },
  chimney: { variants: { "Auto-clean / Baffle Filter": 499 } },
} as const;

const CAR_WASH_TARGET_AFTER: Record<string, number> = {
  outside: 500,
  "inside-out": 800,
};

type OtherBaseKey = keyof typeof OTHER_SERVICES_BASE;

const SERVICE_BASE_KEY: Record<string, OtherBaseKey | "home-cleaning" | "car-wash" | "other"> = {
  "home-cleaning": "home-cleaning",
  "bathroom-cleaning": "bathroom",
  "kitchen-cleaning": "kitchen",
  plumbing: "plumber",
  electrical: "electrician",
  "water-tank": "tank_cleaning",
  "car-wash": "car-wash",
  "other-maintenance": "other",
  "sofa-cleaning": "sofa",
  "mattress-cleaning": "mattress",
  "chair-cleaning": "chair",
  "tiles-cleaning": "tiles",
  "chimney-cleaning": "chimney",
};

const HOME_SERVICE_ID = "home-cleaning";
const CAR_WASH_SERVICE_ID = "car-wash";
const OTHER_DEFAULT_BASE = 499;

const QUANTITY_SERVICES = new Set([
  "bathroom-cleaning",
  "water-tank",
  "plumbing",
  "electrical",
  "other-maintenance",
  "mattress-cleaning",
  "chair-cleaning",
]);
const QUANTITY_OPTIONS = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
];

const baseAfterFor = (key: OtherBaseKey, label: string): number | undefined => {
  const variants = OTHER_SERVICES_BASE[key].variants as Record<string, number>;
  return variants[label];
};

const fallbackBaseAfter = (key: OtherBaseKey): number => {
  const variants = OTHER_SERVICES_BASE[key].variants as Record<string, number>;
  const firstKey = Object.keys(variants)[0];
  return variants[firstKey];
};

const parseCoupon = (value: string): "FIRST" | "SECOND" | null => {
  const normalized = value.trim().toUpperCase();
  if (normalized === "FIRST") return "FIRST";
  if (normalized === "SECOND") return "SECOND";
  return null;
};

function calculateLine(input: CalculationInput): CalculationResult {
  const { serviceId, variantLabel, variantId, variantBase, quantity, areaSqft, areaRange, couponCode } = input;
  const baseKey = SERVICE_BASE_KEY[serviceId] ?? "other";
  const normalizedQuantity = Math.max(1, quantity);
  let targetAfter = 0;
  let effectiveRange: string | undefined;
  let unitMrp = 0;
  let baseFinal = 0;
  let baseDiscount = 0;

  if (baseKey === "home-cleaning") {
    const homeResult = calculateHomeCleaningPrice({
      variant: variantLabel as HomeCleaningVariant,
      areaSqft,
      areaRange,
    });
    targetAfter = homeResult.targetAfter;
    effectiveRange = homeResult.areaRange;
    unitMrp = homeResult.unitMrp;
    baseFinal = homeResult.unitFinal;
    baseDiscount = homeResult.unitSave;
  } else {
    if (
      baseKey === "bathroom" ||
      baseKey === "kitchen" ||
      baseKey === "tank_cleaning" ||
      baseKey === "plumber" ||
      baseKey === "electrician" ||
      baseKey === "sofa" ||
      baseKey === "mattress" ||
      baseKey === "chair" ||
      baseKey === "tiles" ||
      baseKey === "chimney"
    ) {
      const baseAfter =
        baseAfterFor(baseKey, variantLabel) ?? fallbackBaseAfter(baseKey);
      targetAfter = baseAfter * normalizedQuantity;
    } else if (baseKey === "car-wash") {
      targetAfter = CAR_WASH_TARGET_AFTER[variantId] ?? CAR_WASH_TARGET_AFTER.outside;
    } else {
      const baseAfter = variantBase ?? OTHER_DEFAULT_BASE;
      targetAfter = baseAfter * normalizedQuantity;
    }

    targetAfter = Math.max(1, targetAfter);
    unitMrp = displayedMrpForTarget(targetAfter);
    baseFinal = Math.max(1, roundRule(0.7 * unitMrp));
    baseDiscount = unitMrp - baseFinal;
  }

  let finalEstimate = baseFinal;
  let couponSavings = 0;

  if (couponCode === "FIRST") {
    const discounted = baseFinal * 0.9;
    const rounded = Math.max(1, roundRule(discounted));
    couponSavings = baseFinal - rounded;
    finalEstimate = rounded;
  } else if (couponCode === "SECOND") {
    const discounted = baseFinal - 100;
    const rounded = Math.max(1, roundRule(discounted));
    couponSavings = Math.max(0, baseFinal - rounded);
    finalEstimate = rounded;
  }

  return {
    targetAfter,
    effectiveRange,
    unitMrp,
    baseFinal,
    baseDiscount,
    couponSavings,
    finalEstimate,
  };
}

const SERVICE_CONFIG: ServiceConfig[] = [
  {
    id: HOME_SERVICE_ID,
    slug: "home-cleaning",
    label: "Home Deep Cleaning",
    variants: [
      { id: "1bhk", label: "1 BHK" },
      { id: "2bhk", label: "2 BHK" },
      { id: "3bhk", label: "3 BHK" },
    ],
  },
  {
    id: "bathroom-cleaning",
    slug: "bathroom-cleaning",
    label: "Bathroom Cleaning",
    variants: [{ id: "bathroom", label: "Bathroom Cleaning" }],
  },
  {
    id: "kitchen-cleaning",
    slug: "kitchen-deep-cleaning",
    label: "Kitchen Deep Cleaning",
    variants: [{ id: "kitchen", label: "Kitchen Cleaning" }],
  },
  {
    id: "water-tank",
    slug: "water-tank-cleaning",
    label: "Water Tank & Septic Tank Cleaning",
    variants: [
      { id: "500l", label: "500 L Tank" },
      { id: "700l", label: "700 L Tank" },
      { id: "1000l", label: "1000 L Tank" },
    ],
  },
  {
    id: "plumbing",
    slug: "plumbing-visit",
    label: "Plumbing Visit",
    variants: [{ id: "plumber", label: "Plumber Visit" }],
  },
  {
    id: "electrical",
    slug: "electrical-visit",
    label: "Electrical Visit",
    variants: [{ id: "electrician", label: "Electrician Visit" }],
  },
  {
    id: "sofa-cleaning",
    slug: "sofa-cleaning",
    label: "Sofa Cleaning",
    variants: [
      { id: "5-seater", label: "5-Seater Set" },
      { id: "7-seater", label: "7-Seater Set" },
    ],
  },
  {
    id: "mattress-cleaning",
    slug: "mattress-cleaning",
    label: "Mattress Cleaning",
    variants: [
      { id: "single-double", label: "Single / Double Mattress" },
      { id: "queen-king", label: "Queen / King Mattress" },
    ],
  },
  {
    id: "chair-cleaning",
    slug: "chair-cleaning",
    label: "Chair Cleaning",
    variants: [{ id: "chair", label: "Fabric / Office Chair (min. 4)" }],
  },
  {
    id: "tiles-cleaning",
    slug: "tiles-cleaning",
    label: "Tiles & Floor Cleaning",
    variants: [{ id: "tiles", label: "Up to 150 sq ft" }],
  },
  {
    id: "chimney-cleaning",
    slug: "chimney-cleaning",
    label: "Chimney Cleaning",
    variants: [{ id: "chimney", label: "Auto-clean / Baffle Filter" }],
  },
  {
    id: "other-maintenance",
    slug: "other-home-maintenance",
    label: "Other Home Maintenance",
    variants: [{ id: "generic", label: "Custom Visit", base: OTHER_DEFAULT_BASE }],
  },
  {
    id: CAR_WASH_SERVICE_ID,
    slug: "car-wash",
    label: "Car Cleaning",
    variants: [
      { id: "outside", label: "Outside only" },
      { id: "inside-out", label: "Inside + outside" },
    ],
  },
];

const DEFAULT_SERVICE_ID = SERVICE_CONFIG[0].id;
const DEFAULT_VARIANT_ID = SERVICE_CONFIG[0].variants[0].id;

const faqItems = [
  {
    question: "Is the online estimate the final price?",
    answer:
      "No. The calculator shows a discounted indicative price based on your inputs. Final quotes are confirmed after a quick video or on-site walkthrough so we can note condition, scope, and materials.",
  },
  {
    question: "What does the 30% OFF include?",
    answer:
      "Our launch discount applies on labour for home, tank, and car cleaning. Consumables or add-ons (e.g., heavy machinery, chemicals) are billed separately with full transparency.",
  },
  {
    question: "Can I club multiple services for better pricing?",
    answer:
      "Absolutely. Add multiple services to the quote list, share it with us, and we will bundle them so technicians can finish faster. Clubbed jobs usually unlock extra savings on labour and travel.",
  },
  {
    question: "How do I lock a slot after seeing the estimate?",
    answer:
      "Submit the quote or ping us on WhatsApp with photos/videos. We confirm the slot, send technician details, and only then request a small booking advance if required.",
  },
] as const;

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const pricingStats = [
  { title: "30% OFF launch pricing", detail: "Auto-applied on labour" },
  { title: "72 hr price lock", detail: "Quote valid for 3 days" },
  { title: "WhatsApp confirmations", detail: "Slot + technician updates" },
] as const;

export function PricingEstimator() {
  const { lang } = useLanguage();
  const isHi = lang === "hi";
  const [serviceId, setServiceId] = useState(DEFAULT_SERVICE_ID);
  const [variantId, setVariantId] = useState(DEFAULT_VARIANT_ID);
  const [quantityInput, setQuantityInput] = useState("1");
  const [couponInput, setCouponInput] = useState("");
  const [couponCode, setCouponCode] = useState<"FIRST" | "SECOND" | null>(null);
  const [couponError, setCouponError] = useState("");
  const [areaSqft, setAreaSqft] = useState("");
  const [areaRange, setAreaRange] = useState<string>(DEFAULT_HOME_AREA_RANGE);
  const [quoteLines, setQuoteLines] = useState<QuoteLine[]>([]);

  const selectedService =
    SERVICE_CONFIG.find((service) => service.id === serviceId) ?? SERVICE_CONFIG[0];
  const selectedVariant =
    selectedService.variants.find((variant) => variant.id === variantId) ??
    selectedService.variants[0];

  const quantityEnabled = QUANTITY_SERVICES.has(serviceId);
  const quantityValue = quantityEnabled ? Math.max(1, Number(quantityInput) || 1) : 1;

  const calculationInput: CalculationInput = {
    serviceId,
    variantId,
    variantLabel: selectedVariant.label,
    variantBase: selectedVariant.base,
    quantity: quantityValue,
    areaSqft,
    areaRange,
    couponCode,
  };

  const calculation = useMemo(
    () => calculateLine(calculationInput),
    [
      serviceId,
      variantId,
      selectedVariant.label,
      selectedVariant.base,
      quantityValue,
      areaSqft,
      areaRange,
      couponCode,
    ]
  );

  const shareHref = `/contact?service=${encodeURIComponent(
    selectedService.slug
  )}&estimate=${encodeURIComponent(calculation.finalEstimate)}`;

  const handleApplyCoupon = () => {
    if (!couponInput.trim()) {
      setCouponCode(null);
      setCouponError("");
      return;
    }
    const normalized = parseCoupon(couponInput);
    if (normalized) {
      setCouponCode(normalized);
      setCouponError("");
    } else {
      setCouponCode(null);
      setCouponError("Invalid or expired coupon code");
    }
  };

  const handleAddToQuote = () => {
    const lineId = typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
    setQuoteLines((prev) => [
      ...prev,
      {
        id: lineId,
        serviceLabel: selectedService.label,
        variantLabel: selectedVariant.label,
        quantity: quantityValue,
        areaRange: serviceId === HOME_SERVICE_ID ? calculation.effectiveRange ?? areaRange : undefined,
        unitMrp: calculation.unitMrp,
        unitFinal: calculation.baseFinal,
        unitSave: calculation.baseDiscount,
        couponSavings: calculation.couponSavings,
        finalPrice: calculation.finalEstimate,
      },
    ]);
  };

  const handleRemoveLine = (id: string) => {
    setQuoteLines((prev) => prev.filter((line) => line.id !== id));
  };

  const grandTotal = quoteLines.reduce((sum, line) => sum + line.finalPrice * line.quantity, 0);

  const showAreaControls = serviceId === HOME_SERVICE_ID;
  const areaMultiplier = showAreaControls ? multiplierFor(calculation.effectiveRange ?? areaRange) : null;

  return (
    <div className="space-y-20 pb-24">
      <section className="hero-gradient relative overflow-hidden text-white">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-900/10 via-slate-900/40 to-slate-950/90" />
        <div className="pointer-events-none absolute -left-10 top-10 h-56 w-56 rounded-full bg-sky-400/30 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 translate-y-1/3 rounded-full bg-blue-500/30 blur-3xl" />
        <Container className="relative grid gap-10 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6 text-center lg:text-left">
            <span className="inline-flex items-center justify-center rounded-full border border-white/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-blue-100">
              Transparent pricing
            </span>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">Simple estimates, zero surprise add-ons.</h1>
              <p className="text-base text-white/80">
                Every Darbhanga home is unique. Use our estimator to see launch pricing (30% OFF) and lock your quote for 72 hours while we line up the right crew.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
              <Button href="#estimate" size="lg" variant="secondary" className="w-full justify-center text-slate-900 sm:w-auto">
                Get Free Estimate
              </Button>
              <Button href="tel:+919709870726" size="lg" variant="ghost" className="w-full justify-center text-white sm:w-auto">
                Call +91 97098 70726
              </Button>
            </div>
            <div className="grid gap-3 pt-4 text-left sm:grid-cols-3">
              {pricingStats.map((stat) => (
                <div key={stat.title} className="rounded-2xl border border-white/10 bg-white/10 p-4 shadow-sm backdrop-blur">
                  <p className="text-sm font-semibold">{stat.title}</p>
                  <p className="text-xs text-white/70">{stat.detail}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur">
            <div className="flex items-center gap-3 rounded-2xl bg-emerald-500/10 px-4 py-3 text-left text-emerald-100">
              <span className="text-4xl">🎉</span>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.4em]">Launch offer</p>
                <p className="text-base font-semibold text-white">Flat 30% OFF on labour for November bookings</p>
              </div>
            </div>
            <p className="mt-6 text-sm text-white/80">
              Add your services to the estimate, share it on WhatsApp, and we confirm availability within 10 minutes during working hours.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-white/80">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-emerald-300" />
                <span>Verified & background-checked pros</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-emerald-300" />
                <span>Digital invoice + WhatsApp tracking</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-emerald-300" />
                <span>Combo discounts for multi-service bookings</span>
              </li>
            </ul>
          </div>
        </Container>
      </section>

      <div id="estimate">
        <Section
          eyebrow="Interactive tool"
          title="Estimate your price"
          description="Pick your service and flat size to get an approximate starting quote. Final quote will be confirmed after site inspection."
        >
          <div className="grid gap-8 lg:grid-cols-[3fr_2fr]">
          <div className="rounded-3xl border border-slate-100/80 bg-white/95 p-6 shadow-xl">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-slate-600">Service type</label>
                <select
                  value={serviceId}
                  onChange={(event) => {
                      const nextServiceId = event.target.value;
                      setServiceId(nextServiceId);
                    setVariantId(
                        SERVICE_CONFIG.find((svc) => svc.id === nextServiceId)?.variants[0]?.id ??
                          DEFAULT_VARIANT_ID
                    );
                      setQuantityInput("1");
                    setAreaSqft("");
                      setAreaRange(DEFAULT_HOME_AREA_RANGE);
                  }}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                >
                  {SERVICE_CONFIG.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600">Variant / package</label>
                <select
                  value={variantId}
                  onChange={(event) => setVariantId(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                >
                  {selectedService.variants.map((variant) => (
                    <option key={variant.id} value={variant.id}>
                      {variant.label}
                    </option>
                  ))}
                </select>
              </div>
                {quantityEnabled && (
                <div>
                    <label className="text-sm font-medium text-slate-600">Quantity</label>
                  <select
                      value={quantityInput}
                      onChange={(event) => setQuantityInput(event.target.value)}
                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  >
                      {QUANTITY_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}
                {showAreaControls && (
                  <>
                <div>
                  <label className="text-sm font-medium text-slate-600" htmlFor="areaSqftEstimator">
                    Approx area (sq ft)
                  </label>
                  <input
                    id="areaSqftEstimator"
                    type="number"
                    min={100}
                    max={3000}
                    value={areaSqft}
                    onChange={(event) => {
                      const value = event.target.value;
                      setAreaSqft(value);
                      setAreaRange(slabFromArea(value));
                    }}
                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="e.g. 700"
                  />
                      <p className="mt-1 text-xs text-slate-500">Leave blank to stick with the slab selection.</p>
                </div>
                <div>
                      <label className="text-sm font-medium text-slate-600" htmlFor="areaRangeSelect">
                        Or choose an area slab
                      </label>
                      <select
                        id="areaRangeSelect"
                        value={areaRange}
                        onChange={(event) => {
                          setAreaRange(event.target.value);
                          setAreaSqft("");
                        }}
                        className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                      >
                        {HOME_AREA_SLABS.map((slab) => (
                          <option key={slab.range} value={slab.range}>
                            {slab.range} sq ft
                          </option>
                        ))}
                      </select>
                  </div>
                  </>
              )}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end">
              <div className="flex-1">
                <label className="text-sm font-medium text-slate-600">Apply coupon (optional)</label>
                <input
                  value={couponInput}
                  onChange={(event) => setCouponInput(event.target.value)}
                  placeholder="FIRST or SECOND"
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
                {couponError && <p className="mt-1 text-xs text-rose-600">{couponError}</p>}
              </div>
              <Button type="button" variant="secondary" onClick={handleApplyCoupon} className="w-full justify-center sm:w-auto">
                Apply
              </Button>
            </div>

            <div className="mt-6 rounded-2xl bg-gradient-to-br from-blue-50 via-blue-50 to-sky-50 border border-blue-100 px-6 py-6 shadow-sm">
              <p className="text-sm uppercase tracking-[0.3em] text-blue-600 font-semibold">Estimated starting price</p>
              <div className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-blue-100">
                  <span className="font-medium text-slate-700">Original (MRP)</span>
                  <span className="text-lg font-bold text-slate-900">₹{calculation.unitMrp.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-blue-100">
                  <span className="flex items-center gap-2 text-sm font-medium text-slate-700">
                    You Save
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-emerald-700">
                      30% OFF
                    </span>
                  </span>
                  <span className="text-lg font-bold text-emerald-600">-₹{calculation.baseDiscount.toLocaleString()}</span>
                </div>
                {couponCode && calculation.couponSavings > 0 && (
                  <div className="flex justify-between items-center py-2 border-b border-blue-100">
                    <span className="font-medium text-slate-700">Extra coupon savings</span>
                    <span className="text-lg font-bold text-emerald-600">-₹{calculation.couponSavings.toLocaleString()}</span>
                  </div>
                )}
                {serviceId === HOME_SERVICE_ID && (
                  <div className="flex justify-between items-center py-2 text-xs text-slate-500">
                    <span>Area slab</span>
                    <span className="font-medium">{calculation.effectiveRange ?? areaRange}</span>
                  </div>
                )}
                {areaMultiplier && (
                  <div className="flex justify-between items-center py-2 text-xs text-slate-500">
                    <span>Multiplier</span>
                    <span className="font-semibold text-slate-800">{areaMultiplier.toFixed(2)}×</span>
                  </div>
                )}
              </div>
              <div className="mt-6 pt-4 border-t-2 border-blue-200">
                <p className="text-xs uppercase tracking-[0.2em] text-blue-600 font-semibold mb-2">Today's Price</p>
                <p className="text-4xl font-bold text-slate-900">₹{calculation.finalEstimate.toLocaleString()}</p>
              </div>
              <p className="mt-4 text-xs text-slate-500">
                This is an approximate estimate. Final quote will be shared after a quick assessment.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button href={shareHref} className="w-full justify-center">
                  Share this with GrihFix
                </Button>
                <Button href="tel:+919709870726" variant="secondary" className="w-full justify-center text-slate-900">
                  Call for quick guidance
                </Button>
              </div>
              <div className="mt-3 flex gap-3">
                <Button onClick={handleAddToQuote} variant="secondary" className="flex-1 justify-center text-slate-900">
                  Add to Quote
                </Button>
                {quoteLines.length > 0 && (
                  <Button
                    onClick={() => setQuoteLines([])}
                    variant="ghost"
                    className="px-4 text-slate-600 hover:text-slate-900"
                  >
                    Clear
                  </Button>
                )}
              </div>
            </div>
            </div>

            <div className="rounded-3xl border border-slate-100/80 bg-white/95 p-6 shadow-xl h-fit max-h-[calc(100vh-12rem)] flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.4em] text-blue-500">Quote list</p>
                  <h3 className="text-xl font-semibold text-slate-900">Your running estimate</h3>
                </div>
                {quoteLines.length > 0 && (
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                    {quoteLines.length} item{quoteLines.length > 1 ? "s" : ""}
                  </span>
                )}
              </div>
              <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                {quoteLines.length === 0 ? (
                  <p className="text-sm text-slate-500">Add services to build a shareable quote.</p>
                ) : (
                  quoteLines.map((line) => {
                    const lineTotal = line.finalPrice * line.quantity;
                    return (
                      <div key={line.id} className="rounded-xl border border-slate-100 p-3 text-sm text-slate-700">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex-1">
                            <p className="font-semibold text-slate-900">
                              {line.variantLabel} × {line.quantity}
                            </p>
                            <p className="text-xs text-slate-500">{line.serviceLabel}</p>
                            {line.areaRange && (
                              <p className="text-xs text-slate-400">Area slab: {line.areaRange} sq ft</p>
                            )}
                          </div>
                          <button
                            type="button"
                            className="text-xs font-semibold text-rose-500 hover:text-rose-700 flex-shrink-0"
                            onClick={() => handleRemoveLine(line.id)}
                          >
                            Remove
                          </button>
                        </div>
                        <div className="mt-3 space-y-1 text-xs text-slate-500">
                          <div className="flex justify-between">
                            <span>MRP</span>
                            <span>₹{line.unitMrp.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Today's price (30% off)</span>
                            <span>₹{line.unitFinal.toLocaleString()}</span>
                          </div>
                          {line.couponSavings > 0 && (
                            <div className="flex justify-between text-emerald-600">
                              <span>Extra coupon</span>
                              <span>-₹{line.couponSavings.toLocaleString()}</span>
                            </div>
                          )}
                          <div className="flex justify-between font-semibold text-slate-900 pt-1 border-t border-slate-100">
                            <span>Line total</span>
                            <span>₹{lineTotal.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
              {quoteLines.length > 0 && (
                <div className="mt-6 border-t-2 border-slate-200 pt-4 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-slate-900">Grand total</span>
                    <span className="text-2xl font-bold text-blue-600">₹{grandTotal.toLocaleString()}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Section>
      </div>

      <Section
        eyebrow="Starting packages"
        title="Flexible options for every service"
        description="Pricing shown is for standard jobs. Complex scopes may vary once we understand the site condition."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {pricingTiers.map((tier) => (
            <div
              key={tier.id}
              className="flex h-full flex-col rounded-3xl border border-slate-100/80 bg-white/95 p-6 shadow-lg transition hover:-translate-y-1"
            >
              <div className="flex items-center justify-between gap-4">
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-blue-500">
                  {isHi ? tier.serviceHi : tier.service}
                </p>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-emerald-600">
                  30% OFF
                </span>
              </div>
              <p className="mt-3 text-3xl font-bold text-slate-900">{tier.startingAt}</p>
              <p className="text-sm text-slate-500">{isHi ? "शुरुआती पैकेज" : "Starting package"}</p>
              <ul className="mt-6 space-y-3 text-sm text-slate-600">
                {(isHi ? tier.itemsHi : tier.items).map((item) => (
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
          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-md">
            <h3 className="text-lg font-semibold text-slate-900">Visit fee waived</h3>
            <p className="mt-2 text-sm text-slate-600">
              We don’t charge for inspection when you confirm the job with GrihFix.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-md">
            <h3 className="text-lg font-semibold text-slate-900">Digital invoices</h3>
            <p className="mt-2 text-sm text-slate-600">
              Receive invoices via WhatsApp + email, with UPI & cash options available.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-md">
            <h3 className="text-lg font-semibold text-slate-900">Combo discounts</h3>
            <p className="mt-2 text-sm text-slate-600">
              Club multiple services (e.g., cleaning + plumbing) for better per-service pricing.
            </p>
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Need clarity?"
        title="Pricing FAQ"
        description="Most questions get answered in a single WhatsApp chat, but here are the commonly asked ones."
      >
        <div className="space-y-4">
          {faqItems.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-3xl border border-slate-100 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-semibold text-slate-900">
                {faq.question}
                <span className="text-xl text-blue-500 transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{faq.answer}</p>
            </details>
          ))}
        </div>
      </Section>
      <Script id="pricing-faq-schema" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(faqSchema)}
      </Script>
    </div>
  );
}

