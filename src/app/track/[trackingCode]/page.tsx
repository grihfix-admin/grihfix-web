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

  return (
    <div className="bg-slate-50">
      <Container className="py-16">
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
          <div className="space-y-8">
            {(() => {
              const status = (booking.status as BookingStatus) ?? "new";
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

                    <p className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
                      {STATUS_GUIDE[status]}
                    </p>
                  </div>
                </Section>
              );
            })()}

            {(pricingInfo || finalPrice) && (
              <Section title="Service & Pricing Details">
                <div className="rounded-2xl bg-gradient-to-br from-blue-50 via-blue-50 to-sky-50 border border-blue-100 p-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-slate-400 mb-1">Service</p>
                      <p className="text-lg font-semibold text-slate-900">{booking.serviceName}</p>
                    </div>
                    {booking.variant && (
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-slate-400 mb-1">Home Size</p>
                        <p className="text-base font-semibold text-slate-900">{booking.variant}</p>
                      </div>
                    )}
                    {pricingInfo?.areaRange && (
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-slate-400 mb-1">Area</p>
                        <p className="text-base font-semibold text-slate-900">{pricingInfo.areaRange} sq ft</p>
                      </div>
                    )}
                    {finalPrice && (
                      <div className="pt-4 border-t-2 border-blue-200">
                        <p className="text-xs uppercase tracking-[0.3em] text-slate-400 mb-2">Estimated Price</p>
                        <p className="text-3xl font-bold text-slate-900">₹{finalPrice.toLocaleString()}</p>
                        {pricingInfo?.mrp && (
                          <p className="text-sm text-slate-500 mt-1">
                            MRP: ₹{pricingInfo.mrp.toLocaleString()}
                          </p>
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

