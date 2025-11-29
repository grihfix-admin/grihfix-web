import type { Metadata } from "next";

import { BOOKING_STATUS_LABELS, BOOKING_STATUS_VALUES, type BookingStatus } from "@/constants/bookings";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { connectToDatabase } from "@/lib/mongodb";
import Booking, { type IBooking } from "@/models/Booking";

function parsePricingFromNotes(notes: string | null | undefined) {
  if (!notes) return null;
  const mrpMatch = notes.match(/MRP ₹([\d,]+)/);
  const finalMatch = notes.match(/Final ₹([\d,]+)/);
  const areaMatch = notes.match(/Area: ([^\s)]+)/);
  return {
    mrp: mrpMatch ? parseInt(mrpMatch[1].replace(/,/g, "")) : null,
    final: finalMatch ? parseInt(finalMatch[1].replace(/,/g, "")) : null,
    areaRange: areaMatch ? areaMatch[1] : null,
  };
}

type PageProps = {
  params: Promise<{ trackingCode: string }>;
};

const STATUS_GUIDE: Record<BookingStatus, string> = {
  new: "We received your request and are reviewing the details.",
  confirmed: "Slot confirmed. The service team will reach out shortly.",
  "in-progress": "Our team is on the way or currently working on the job.",
  completed: "Service is complete. Thank you for choosing GrihFix!",
  cancelled: "This booking was cancelled. Contact support for help.",
};

const timelineSteps = [
  { id: "received", label: "Received", description: "Booking registered with our Darbhanga command center.", index: 0 },
  { id: "assigned", label: "Assigned", description: "Technician and support buddy assigned. Details shared via WhatsApp.", index: 1 },
  { id: "on-the-way", label: "On the way", description: "Team is en route with equipment and consumables.", index: 2 },
  { id: "in-progress", label: "In progress", description: "Crew is executing the job with live updates + photos.", index: 3 },
  { id: "completed", label: "Completed", description: "Sign-off + digital invoice shared.", index: 4 },
] as const;

const statusToTimelineIndex: Record<BookingStatus, number> = {
  new: 0,
  confirmed: 2,
  "in-progress": 3,
  completed: 4,
  cancelled: 0,
};

export const metadata: Metadata = {
  title: "Track your GrihFix booking",
  description: "Live status tracker for GrihFix home service bookings in Darbhanga with timeline, technician info, and support options.",
};

function badgeColor(status: BookingStatus) {
  switch (status) {
    case "completed":
      return "bg-emerald-100 text-emerald-700";
    case "in-progress":
      return "bg-amber-100 text-amber-700";
    case "confirmed":
      return "bg-blue-100 text-blue-700";
    case "cancelled":
      return "bg-rose-100 text-rose-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

export default async function TrackingPage({ params }: PageProps) {
  const { trackingCode } = await params;
  const normalizedCode = trackingCode.toUpperCase();

  await connectToDatabase();
  const booking = await Booking.findOne({ trackingCode: normalizedCode }).lean<IBooking>();

  const pricingInfo = booking ? parsePricingFromNotes(booking.notes) : null;
  const finalPrice = booking?.finalPrice || pricingInfo?.final;

  const heroCta = (
    <section className="hero-gradient relative overflow-hidden text-white">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-900/10 via-slate-900/50 to-slate-950/90" />
      <Container className="relative flex flex-col gap-6 py-12 text-center sm:text-left sm:py-16">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-blue-100">GrihFix tracking</p>
          <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">Live status for your booking</h1>
          <p className="mt-3 text-sm text-white/80 sm:text-base">
            Share this link with your family, monitor technician assignment, and tap WhatsApp support anytime.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="https://wa.me/919709870726" variant="secondary" className="text-slate-900">
            WhatsApp support
          </Button>
          <Button href="tel:+919709870726" variant="ghost" className="text-white">
            Call +91 97098 70726
          </Button>
        </div>
      </Container>
    </section>
  );

  return (
    <div className="bg-slate-50">
      {heroCta}
      <Container className="py-12 sm:py-16">
        {!booking ? (
          <Section
            title="Booking not found"
            description="Unable to find a booking with this tracking code. Double-check the code or contact us directly."
          >
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-600">
              <p>Tracking code: {normalizedCode}</p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <Button href="/contact" className="w-full justify-center">
                  Go to contact form
                </Button>
                <Button href="tel:+919709870726" variant="secondary" className="w-full justify-center text-slate-900">
                  Call support
                </Button>
              </div>
            </div>
          </Section>
        ) : (
          <div className="space-y-10">
            {(() => {
              const status = (booking.status as BookingStatus) ?? "new";
              const currentStepIndex = statusToTimelineIndex[status] ?? 0;

              const getStepState = (index: number) => {
                if (status === "cancelled") return "pending";
                if (index < currentStepIndex) return "done";
                if (index === currentStepIndex) return "current";
                return "pending";
              };

              return (
                <Section
                  eyebrow="Track booking"
                  title={`Hi ${booking.name.split(" ")[0] || "there"}, here’s your status`}
                  description="Share this page with your family so everyone stays updated."
                >
                  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Tracking code</p>
                        <p className="text-2xl font-bold text-slate-900">{booking.trackingCode}</p>
                      </div>
                      <span className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold ${badgeColor(status)}`}>
                        {BOOKING_STATUS_LABELS[status]}
                      </span>
                    </div>

                    <dl className="mt-6 grid gap-4 text-sm text-slate-600 md:grid-cols-2">
                      <div>
                        <dt className="text-xs uppercase tracking-[0.3em] text-slate-400">Service</dt>
                        <dd className="text-base font-semibold text-slate-900">{booking.serviceName}</dd>
                      </div>
                      <div>
                        <dt className="text-xs uppercase tracking-[0.3em] text-slate-400">City / Area</dt>
                        <dd className="text-base font-semibold text-slate-900">{booking.city || "Darbhanga"}</dd>
                      </div>
                      <div>
                        <dt className="text-xs uppercase tracking-[0.3em] text-slate-400">Preferred slot</dt>
                        <dd>
                          {booking.scheduledDate
                            ? new Date(booking.scheduledDate).toLocaleString()
                            : "We’ll coordinate this over call."}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs uppercase tracking-[0.3em] text-slate-400">Assigned staff</dt>
                        <dd>
                          {booking.assignedStaffName ? (
                            <>
                              <p className="font-semibold text-slate-900">{booking.assignedStaffName}</p>
                              <p>{booking.assignedStaffPhone || "Phone will be shared soon"}</p>
                            </>
                          ) : (
                            "Technician details will be shared soon."
                          )}
                        </dd>
                      </div>
                    </dl>

                    <div className="mt-8 space-y-4">
                      <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Timeline</p>
                      <ol className="space-y-4">
                        {timelineSteps.map((step) => {
                          const state = getStepState(step.index);
                          return (
                            <li
                              key={step.id}
                              className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-slate-50/70 p-4"
                            >
                              <span
                                className={`mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                                  state === "done"
                                    ? "bg-emerald-500/10 text-emerald-700"
                                    : state === "current"
                                    ? "bg-blue-500/10 text-blue-600"
                                    : "bg-slate-200 text-slate-500"
                                }`}
                              >
                                {step.index + 1}
                              </span>
                              <div>
                                <p className="text-sm font-semibold text-slate-900">{step.label}</p>
                                <p className="text-xs text-slate-500">{step.description}</p>
                              </div>
                            </li>
                          );
                        })}
                      </ol>
                    </div>

                    <p className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
                      {STATUS_GUIDE[status]}
                    </p>
                  </div>
                </Section>
              );
            })()}

            {(pricingInfo || finalPrice) && (
              <Section title="Service & Pricing Details">
                <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 via-blue-50 to-sky-50 p-6">
                  <div className="space-y-4">
                    <div>
                      <p className="mb-1 text-xs uppercase tracking-[0.3em] text-slate-400">Service</p>
                      <p className="text-lg font-semibold text-slate-900">{booking.serviceName}</p>
                    </div>
                    {booking.variant && (
                      <div>
                        <p className="mb-1 text-xs uppercase tracking-[0.3em] text-slate-400">Home Size</p>
                        <p className="text-base font-semibold text-slate-900">{booking.variant}</p>
                      </div>
                    )}
                    {pricingInfo?.areaRange && (
                      <div>
                        <p className="mb-1 text-xs uppercase tracking-[0.3em] text-slate-400">Area</p>
                        <p className="text-base font-semibold text-slate-900">{pricingInfo.areaRange} sq ft</p>
                      </div>
                    )}
                    {finalPrice && (
                      <div className="border-t-2 border-blue-200 pt-4">
                        <p className="mb-2 text-xs uppercase tracking-[0.3em] text-slate-400">Estimated Price</p>
                        <p className="text-3xl font-bold text-slate-900">₹{finalPrice.toLocaleString()}</p>
                        {pricingInfo?.mrp && (
                          <p className="mt-1 text-sm text-slate-500">MRP: ₹{pricingInfo.mrp.toLocaleString()}</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </Section>
            )}

            <Section title="What each status means">
              <div className="grid gap-4 md:grid-cols-2">
                {BOOKING_STATUS_VALUES.map((status) => (
                  <div key={status} className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-sm font-semibold text-slate-900">{BOOKING_STATUS_LABELS[status]}</p>
                    <p className="text-sm text-slate-600">{STATUS_GUIDE[status]}</p>
                  </div>
                ))}
              </div>
            </Section>
          </div>
        )}
      </Container>
    </div>
  );
}

