"use client";

import { ChangeEvent, FormEvent, Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { toast } from "react-hot-toast";
import {
  calculateHomeCleaningPrice,
  roundRule,
  displayedMrpForTarget,
  HOME_AREA_SLABS,
  DEFAULT_HOME_AREA_RANGE,
  slabFromArea,
  type SlabRange,
} from "@/lib/pricingCalculator";

const serviceOptions = [
  { label: "Home Deep Cleaning", value: "home-cleaning" },
  { label: "Water Tank Cleaning", value: "water-tank" },
  { label: "Septic Tank Cleaning", value: "septic-tank" },
  { label: "Plumbing Visit", value: "plumbing" },
  { label: "Electrical Appliance Repair", value: "electrical" },
  { label: "Other Home Maintenance", value: "other" },
  { label: "Car Wash", value: "car-wash" },
];

const CLEANING_SERVICE_IDS = new Set(["home-cleaning"]);
const carWashServiceId = "car-wash";

type ContactFormData = {
  name: string;
  phone: string;
  email: string;
  city: string;
  fullAddress: string;
  service: string;
  preferredDate: string;
  timeSlot: string;
  message: string;
  company: string;
  homeType: string;
  areaSqft: string;
  areaRange: SlabRange;
  washType: string;
  carDetails: string;
  couponCode: string;
};

const defaultForm: ContactFormData = {
    name: "",
    phone: "",
  email: "",
  city: "Darbhanga",
  fullAddress: "",
  service: serviceOptions[0].value,
  preferredDate: "",
  timeSlot: "",
    message: "",
  company: "",
  homeType: "",
  areaSqft: "",
  areaRange: DEFAULT_HOME_AREA_RANGE,
  washType: "",
  carDetails: "",
  couponCode: "",
};

const timeSlots = [
  { value: "morning", label: "9:00 – 11:00 AM", representativeTime: "10:00" },
  { value: "late-morning", label: "11:00 AM – 1:00 PM", representativeTime: "12:00" },
  { value: "afternoon", label: "2:00 – 4:00 PM", representativeTime: "15:00" },
  { value: "evening", label: "4:00 – 6:00 PM", representativeTime: "17:00" },
];

function ContactForm() {
  const [formData, setFormData] = useState(defaultForm);
  const searchParams = useSearchParams();
  const [estimateNote, setEstimateNote] = useState<string | null>(null);

  useEffect(() => {
    const serviceParam = searchParams.get("service");
    const estimateParam = searchParams.get("estimate");

    if (serviceParam) {
      const match = serviceOptions.find((option) => option.value === serviceParam.toLowerCase());
      if (match) {
        setFormData((prev) => ({ ...prev, service: match.value }));
      }
    }

    if (estimateParam && !Number.isNaN(Number(estimateParam))) {
      setEstimateNote(estimateParam);
    } else {
      setEstimateNote(null);
    }
  }, [searchParams]);

  useEffect(() => {
    if (formData.service === "home-cleaning" && formData.areaSqft) {
      const nextRange = slabFromArea(formData.areaSqft);
      if (nextRange !== formData.areaRange) {
        setFormData((prev) => ({ ...prev, areaRange: nextRange }));
      }
    }
  }, [formData.areaSqft, formData.service, formData.areaRange]);

  const liveEstimate = useMemo(() => {
    if (formData.service === "home-cleaning" && formData.homeType) {
      const variant = formData.homeType.includes("1 BHK")
        ? "1 BHK"
        : formData.homeType.includes("2 BHK")
        ? "2 BHK"
        : formData.homeType.includes("3 BHK")
        ? "3 BHK"
        : null;
      if (variant) {
        const result = calculateHomeCleaningPrice({
          variant: variant as "1 BHK" | "2 BHK" | "3 BHK",
          areaSqft: formData.areaSqft,
          areaRange: formData.areaRange,
        });
        let finalPrice = result.unitFinal;
        if (formData.couponCode === "FIRST") {
          finalPrice = Math.max(1, roundRule(result.unitFinal * 0.9));
        } else if (formData.couponCode === "SECOND") {
          finalPrice = Math.max(1, roundRule(result.unitFinal - 100));
        }
        return {
          unitMrp: result.unitMrp,
          unitFinal: result.unitFinal,
          unitSave: result.unitSave,
          finalPrice,
          areaRange: result.areaRange,
        };
      }
    } else if (formData.service === carWashServiceId && formData.washType) {
      const targetAfter = formData.washType === "inside-out" ? 800 : 500;
      const unitMrp = displayedMrpForTarget(targetAfter);
      const unitFinal = roundRule(0.7 * unitMrp);
      const unitSave = unitMrp - unitFinal;
      let finalPrice = unitFinal;
      if (formData.couponCode === "FIRST") {
        finalPrice = Math.max(1, roundRule(unitFinal * 0.9));
      } else if (formData.couponCode === "SECOND") {
        finalPrice = Math.max(1, roundRule(unitFinal - 100));
      }
      return {
        unitMrp,
        unitFinal,
        unitSave,
        finalPrice,
      };
    }
    return null;
  }, [formData.service, formData.homeType, formData.areaSqft, formData.areaRange, formData.washType, formData.couponCode]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const minDate = useMemo(() => new Date().toISOString().split("T")[0], []);
  const maxDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 30);
    return date.toISOString().split("T")[0];
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formData.company.trim().length > 0) {
      console.log("[Contact] Honeypot triggered, skipping booking.");
      return;
    }

    const requiredFields = [
      { value: formData.name.trim(), label: "Name" },
      { value: formData.phone.trim(), label: "Phone" },
      { value: formData.city.trim(), label: "City" },
      { value: formData.service.trim(), label: "Service" },
      { value: formData.message.trim(), label: "Message" },
    ];

    const missingField = requiredFields.find((field) => !field.value);
    if (missingField) {
      toast.error(`${missingField.label} is required.`);
      return;
    }

    if (formData.message.trim().length < 10) {
      toast.error("Please add a few more details so we can help properly.");
      return;
    }

    let scheduledDate: string | null = null;
    if (formData.preferredDate && formData.timeSlot) {
      const slot = timeSlots.find((item) => item.value === formData.timeSlot);
      if (slot) {
        const iso = new Date(`${formData.preferredDate}T${slot.representativeTime}:00`);
        scheduledDate = iso.toISOString();
      }
    }

    const selectedService = serviceOptions.find((option) => option.value === formData.service);
    const serviceLabel = selectedService?.label ?? "Home Service";
    const slug = selectedService?.value ?? serviceOptions[0].value;

    const fullAddress =
      [formData.city.trim(), formData.fullAddress.trim()].filter(Boolean).join(" — ") ||
      formData.city;

    const isCleaningService = CLEANING_SERVICE_IDS.has(formData.service);
    const isCarWash = formData.service === carWashServiceId;

    const detailsLines: string[] = [];
    if (isCleaningService) {
      if (formData.homeType) {
        detailsLines.push(`Home type: ${formData.homeType}`);
      }
      if (formData.areaSqft) {
        detailsLines.push(`Approx area: ${formData.areaSqft} sq ft`);
      }
    }
    if (isCarWash) {
      if (formData.washType) {
        detailsLines.push(
          `Wash type: ${formData.washType === "inside-out" ? "Inside + outside" : "Outside only"}`
        );
      }
      if (formData.carDetails.trim()) {
        detailsLines.push(`Car details: ${formData.carDetails.trim()}`);
      }
    }

    const estimateText = liveEstimate
      ? ` | Estimated: MRP ₹${liveEstimate.unitMrp.toLocaleString()}, Final ₹${liveEstimate.finalPrice.toLocaleString()} (Area: ${liveEstimate.areaRange || "N/A"})`
      : "";
    const combinedNotes = [formData.message.trim(), detailsLines.join(" | "), estimateText]
      .filter(Boolean)
      .join(" — ");

    const payload = {
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim() || undefined,
      address: fullAddress,
      serviceName: serviceLabel,
      serviceSlug: slug,
      scheduledDate,
      notes: combinedNotes,
      finalPrice: liveEstimate?.finalPrice || undefined,
      status: "new",
      source: "contact-page",
    };
    console.log("[Contact] Submitting booking payload:", payload);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      console.log("[Contact] Booking API response:", data);

      if (res.ok && data.success) {
        toast.success("Thanks! Team GrihFix will call you shortly.");
        setFormData(defaultForm);
      } else {
        toast.error("Something went wrong. Please try again or call us directly.");
      }
    } catch (error) {
      console.error("[Contact] Error submitting booking:", error);
      toast.error("Something went wrong. Please try again or call us directly.");
    }
  };

  return (
    <div className="space-y-16 pb-20">
      <section className="bg-slate-900 text-white">
        <Container className="py-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.5em] text-blue-200">Contact GrihFix</p>
          <h1 className="mt-4 text-4xl font-bold">Let’s plan your next service.</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/80">
            Fill the form or ping us on WhatsApp. We respond within 10 minutes during working hours (9am – 8pm).
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="tel:+919709870726" size="lg" variant="secondary" className="text-slate-900">
              Call us directly
            </Button>
            <Button href="https://wa.me/919709870726" size="lg" variant="ghost" className="text-white">
              Chat on WhatsApp
            </Button>
          </div>
        </Container>
      </section>

      <Section title="Tell us about your requirement">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] xl:gap-12">
          <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
            {estimateNote && (
              <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                Estimated starting price from calculator: ₹{estimateNote}. Final quote may vary after inspection.
              </div>
            )}
            <div className="grid gap-6 sm:grid-cols-2">
          <div>
                <label className="text-sm font-medium text-slate-600" htmlFor="name">
                  Name *
            </label>
            <input
                  id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  placeholder="Your full name"
            />
          </div>
          <div>
                <label className="text-sm font-medium text-slate-600" htmlFor="phone">
                  Phone number *
            </label>
            <input
                  id="phone"
                  name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
                  pattern="[6-9][0-9]{9}"
                  title="Enter a valid 10-digit Indian mobile number"
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="+91 97098 70726"
                />
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-slate-600" htmlFor="email">
                  Email (optional)
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600" htmlFor="city">
                  City / Area *
                </label>
                <input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  placeholder="Darbhanga"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-600" htmlFor="fullAddress">
                Full address / landmark (optional)
              </label>
              <textarea
                id="fullAddress"
                name="fullAddress"
                value={formData.fullAddress}
                onChange={handleChange}
                rows={3}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="House no, street, nearby landmark"
            />
          </div>

            <div className="grid gap-6 sm:grid-cols-2">
          <div>
                <label className="text-sm font-medium text-slate-600" htmlFor="service">
                  Service type *
            </label>
            <select
                  id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                >
                  {serviceOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-slate-600" htmlFor="preferredDate">
                    Preferred date
                  </label>
                  <input
                    id="preferredDate"
                    name="preferredDate"
                    type="date"
                    min={minDate}
                    max={maxDate}
                    value={formData.preferredDate}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600" htmlFor="timeSlot">
                    Preferred time slot
                  </label>
                  <select
                    id="timeSlot"
                    name="timeSlot"
                    value={formData.timeSlot}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  >
                    <option value="">Select a time slot</option>
                    {timeSlots.map((slot) => (
                      <option key={slot.value} value={slot.value}>
                        {slot.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {CLEANING_SERVICE_IDS.has(formData.service) && (
              <>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium text-slate-600" htmlFor="homeType">
                      Home type
                    </label>
                    <select
                      id="homeType"
                      name="homeType"
                      value={formData.homeType}
                      onChange={handleChange}
                      className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    >
                      <option value="">Select home type</option>
                      <option value="1 RK / Room">1 RK / Room</option>
                      <option value="1 BHK">1 BHK</option>
                      <option value="2 BHK">2 BHK</option>
                      <option value="3 BHK">3 BHK</option>
                      <option value="4+ BHK">4+ BHK</option>
                      <option value="Independent house">Independent house</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-600" htmlFor="areaRange">
                      Area slab
                    </label>
                    <select
                      id="areaRange"
                      name="areaRange"
                      value={formData.areaRange}
                      onChange={handleChange}
                      className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    >
                      {HOME_AREA_SLABS.map((slab) => (
                        <option key={slab.range} value={slab.range}>
                          {slab.range} sq ft
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600" htmlFor="areaSqft">
                    Or enter exact area (sq ft)
                  </label>
                  <input
                    id="areaSqft"
                    name="areaSqft"
                    type="number"
                    min={100}
                    max={3000}
                    value={formData.areaSqft}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="e.g. 700"
                  />
                </div>
                {liveEstimate && (
                  <div className="rounded-2xl bg-gradient-to-br from-blue-50 via-blue-50 to-sky-50 border border-blue-100 px-6 py-5">
                    <p className="text-sm uppercase tracking-[0.3em] text-blue-600 font-semibold mb-4">Live Estimate</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Original (MRP)</span>
                        <span className="font-bold text-slate-900">₹{liveEstimate.unitMrp.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">You Save (30% OFF)</span>
                        <span className="font-bold text-emerald-600">-₹{liveEstimate.unitSave.toLocaleString()}</span>
                      </div>
                      <div className="pt-2 border-t border-blue-100">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-semibold text-slate-700">Today's Price</span>
                          <span className="text-2xl font-bold text-slate-900">₹{liveEstimate.finalPrice.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {formData.service === carWashServiceId && (
              <>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium text-slate-600" htmlFor="washType">
                      Wash type
                    </label>
                    <select
                      id="washType"
                      name="washType"
                      value={formData.washType}
                      onChange={handleChange}
                      required
                      className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    >
                      <option value="">Select wash type</option>
                      <option value="outside">Outside only</option>
                      <option value="inside-out">Inside + outside</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-600" htmlFor="carDetails">
                      Car details (optional)
                    </label>
                    <input
                      id="carDetails"
                      name="carDetails"
                      value={formData.carDetails}
                      onChange={handleChange}
                      className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                      placeholder="Car model, registration number"
                    />
                  </div>
                </div>
                {liveEstimate && (
                  <div className="rounded-2xl bg-gradient-to-br from-blue-50 via-blue-50 to-sky-50 border border-blue-100 px-6 py-5">
                    <p className="text-sm uppercase tracking-[0.3em] text-blue-600 font-semibold mb-4">Live Estimate</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Original (MRP)</span>
                        <span className="font-bold text-slate-900">₹{liveEstimate.unitMrp.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">You Save (30% OFF)</span>
                        <span className="font-bold text-emerald-600">-₹{liveEstimate.unitSave.toLocaleString()}</span>
                      </div>
                      <div className="pt-2 border-t border-blue-100">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-semibold text-slate-700">Today's Price</span>
                          <span className="text-2xl font-bold text-slate-900">₹{liveEstimate.finalPrice.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
*** End of File***

          <div>
              <label className="text-sm font-medium text-slate-600" htmlFor="message">
                Message / Problem description *
            </label>
            <textarea
                id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
                rows={5}
                required
                minLength={10}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="Share brief details so we can prep the right tools..."
            />
          </div>

            <div className="hidden">
              <label htmlFor="company">
                Company
                <input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </label>
            </div>

            <Button type="submit" size="lg" className="w-full justify-center">
              Submit request
            </Button>
        </form>

          <div className="space-y-6 rounded-3xl border border-slate-100 bg-slate-50/80 p-6 shadow-sm">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-500">Quick contact</p>
              <div className="mt-4 space-y-3 text-sm text-slate-700">
                <p>
                  Phone:{" "}
                  <a href="tel:+919709870726" className="font-semibold text-slate-900">
              +91 97098 70726
            </a>
          </p>
          <p>
                  Email:{" "}
                  <a href="mailto:grihfix.service@gmail.com" className="font-semibold text-slate-900">
              grihfix.service@gmail.com
            </a>
          </p>
        </div>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.4em] text-blue-500">Service hours</p>
              <p className="mt-3 text-sm text-slate-700">Every day, 9:00 AM – 8:00 PM</p>
              <p className="text-sm text-slate-500">Emergency plumbing/electrical visits available on request.</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-500">Office</p>
              <p className="mt-3 text-sm text-slate-700">Allalpatti, Darbhanga 846003</p>
              <p className="text-sm text-slate-500">Service radius: within 20 km of Darbhanga town.</p>
            </div>
          <iframe
              title="Darbhanga map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28784.821!2d85.9!3d26.15!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ec9f7b!2sDarbhanga!5e0!3m2!1sen!2sin!4v123456789"
              className="h-56 w-full rounded-2xl border-0"
              loading="lazy"
            allowFullScreen
            />
          </div>
        </div>
      </Section>
      </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="py-12 text-center text-slate-500">Loading contact form…</div>}>
      <ContactForm />
    </Suspense>
  );
}
