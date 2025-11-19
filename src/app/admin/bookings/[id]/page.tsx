import Link from "next/link";

import { connectToDatabase } from "@/lib/mongodb";
import Booking from "@/models/Booking";

type PageProps = {
  params: Promise<{ id: string }>;
};

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

export default async function BookingDetailPage({ params }: PageProps) {
  await connectToDatabase();
  const { id } = await params;
  const booking = await Booking.findById(id).lean();

  if (!booking) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-6 text-center text-slate-600">
        Booking not found.
      </div>
    );
  }

  const pricingInfo = parsePricingFromNotes(booking.notes);
  const finalPrice = booking.finalPrice || pricingInfo?.final;

  const metaRows: Array<{ label: string; value: React.ReactNode }> = [
    { label: "Booking ID", value: booking._id.toString() },
    { label: "Customer", value: booking.name },
    { label: "Phone", value: booking.phone },
    { label: "Email", value: booking.email || "—" },
    { label: "Service", value: `${booking.serviceName} (${booking.serviceSlug})` },
    { label: "Variant", value: booking.variant || "—" },
    { label: "Tracking code", value: booking.trackingCode || "—" },
    {
      label: "Scheduled",
      value: booking.scheduledDate ? new Date(booking.scheduledDate).toLocaleString() : "—",
    },
    { label: "Address", value: booking.address },
    { label: "City", value: booking.city || "—" },
    { label: "Pincode", value: booking.pincode || "—" },
    { label: "Landmark", value: booking.landmark || "—" },
    { label: "Status", value: booking.status },
    { label: "Assigned staff", value: booking.assignedStaffName || "—" },
    { label: "Staff phone", value: booking.assignedStaffPhone || "—" },
    { label: "Source", value: booking.source },
    { label: "Created", value: new Date(booking.createdAt).toLocaleString() },
    { label: "Updated", value: new Date(booking.updatedAt).toLocaleString() },
    { label: "Notes", value: booking.notes || "—" },
    { label: "Internal notes", value: booking.internalNotes || "—" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">
            <Link href="/admin/bookings" className="text-blue-600 hover:underline">
              ← Back to bookings
            </Link>
          </p>
          <h1 className="text-2xl font-semibold text-slate-900">Booking Details</h1>
        </div>
      </div>

      {(pricingInfo || finalPrice) && (
        <div className="rounded-2xl bg-gradient-to-br from-blue-50 via-blue-50 to-sky-50 border border-blue-100 p-6">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-600 font-semibold mb-4">Pricing Breakdown</p>
          <div className="space-y-3 text-sm">
            {pricingInfo?.mrp && (
              <div className="flex justify-between items-center py-2 border-b border-blue-100">
                <span className="font-medium text-slate-700">Base MRP</span>
                <span className="text-lg font-bold text-slate-900">₹{pricingInfo.mrp.toLocaleString()}</span>
              </div>
            )}
            {pricingInfo?.mrp && finalPrice && (
              <div className="flex justify-between items-center py-2 border-b border-blue-100">
                <span className="font-medium text-slate-700">Final (30% OFF)</span>
                <span className="text-lg font-bold text-emerald-600">₹{finalPrice.toLocaleString()}</span>
              </div>
            )}
            {pricingInfo?.areaRange && (
              <div className="flex justify-between items-center py-2 text-xs text-slate-500">
                <span>Area slab</span>
                <span className="font-medium">{pricingInfo.areaRange}</span>
              </div>
            )}
            {booking.variant && (
              <div className="flex justify-between items-center py-2 text-xs text-slate-500">
                <span>Home type</span>
                <span className="font-medium">{booking.variant}</span>
              </div>
            )}
            {finalPrice && (
              <div className="pt-4 border-t-2 border-blue-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-slate-700">Total Price</span>
                  <span className="text-2xl font-bold text-slate-900">₹{finalPrice.toLocaleString()}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="rounded-lg border border-slate-200 bg-white">
        <dl className="divide-y divide-slate-100">
          {metaRows.map(({ label, value }) => (
            <div key={label} className="grid grid-cols-3 gap-4 px-4 py-3 text-sm text-slate-700">
              <dt className="font-medium text-slate-500">{label}</dt>
              <dd className="col-span-2">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

