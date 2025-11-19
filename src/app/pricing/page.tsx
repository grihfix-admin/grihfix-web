"use client";

import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { pricingTiers } from "@/content/pricing";
import {
  calculateHomeCleaningPrice,
  DEFAULT_HOME_AREA_RANGE,
  displayedMrpForTarget,
  HOME_AREA_SLABS,
  HomeCleaningVariant,
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
};

const HOME_SERVICE_ID = "home-cleaning";
const CAR_WASH_SERVICE_ID = "car-wash";
const OTHER_DEFAULT_BASE = 499;

const QUANTITY_SERVICES = new Set(["bathroom-cleaning", "water-tank", "plumbing", "electrical", "other-maintenance"]);
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
    if (baseKey === "bathroom" || baseKey === "kitchen" || baseKey === "tank_cleaning" || baseKey === "plumber" || baseKey === "electrician") {
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
    id: "other-maintenance",
    slug: "other-home-maintenance",
    label: "Other Home Maintenance",
    variants: [{ id: "generic", label: "Custom Visit", base: OTHER_DEFAULT_BASE }],
  },
  {
    id: CAR_WASH_SERVICE_ID,
    slug: "car-wash",
    label: "Car Wash",
    variants: [
      { id: "outside", label: "Outside only" },
      { id: "inside-out", label: "Inside + outside" },
    ],
  },
];

const DEFAULT_SERVICE_ID = SERVICE_CONFIG[0].id;
const DEFAULT_VARIANT_ID = SERVICE_CONFIG[0].variants[0].id;

export default function PricingPage() {
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

  useEffect(() => {
    if (serviceId !== HOME_SERVICE_ID) return;
    if (!areaSqft.trim()) return;
    const nextRange = slabFromArea(areaSqft);
    if (nextRange !== areaRange) {
      setAreaRange(nextRange);
    }
  }, [areaSqft, areaRange, serviceId]);

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
            <Button href="#estimate" size="lg" variant="secondary" className="text-slate-900">
              Get Free Estimate
            </Button>
            <Button href="tel:+919709870726" size="lg" variant="ghost" className="text-white">
              Call +91 97098 70726
            </Button>
          </div>
        </Container>
      </section>

      <div id="estimate">
        <Section
          eyebrow="Interactive tool"
          title="Estimate your price"
          description="Pick your service and flat size to get an approximate starting quote. Final quote will be confirmed after site inspection."
        >
          <div className="grid gap-6 lg:grid-cols-[3fr_2fr]">
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
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
                    onChange={(event) => setAreaSqft(event.target.value)}
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
                        onChange={(event) => setAreaRange(event.target.value)}
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
                  <span className="font-medium text-slate-700">You Save (30% OFF)</span>
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

            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm h-fit max-h-[calc(100vh-12rem)] flex flex-col">
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

