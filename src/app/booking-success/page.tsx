import Link from "next/link";
import Image from "next/image";

interface Booking {
  _id: string;
  name: string;
  phone: string;
  address: string;
  serviceName: string;
  serviceSlug: string;
  variant?: string | null;
  scheduledDate?: string | null;
  trackingCode?: string | null;
  status?: string;
}

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

async function fetchBooking(bookingId?: string | null): Promise<Booking | null> {
  if (!bookingId) return null;

  try {
    const baseUrl = getBaseUrl();
    const res = await fetch(`${baseUrl}/api/bookings/${bookingId}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      console.error(`Failed to fetch booking ${bookingId}: ${res.status}`);
      return null;
    }
    const data = await res.json();
    return data.booking ?? null;
  } catch (error) {
    console.error("Error fetching booking:", error);
    return null;
  }
}

export default async function BookingSuccessPage({ searchParams }: PageProps) {
  const resolvedParams = (await searchParams) ?? {};
  const statusParam = resolvedParams.status;
  const bookingParam = resolvedParams.bookingId || resolvedParams.booking;
  const bookingId = Array.isArray(bookingParam) ? bookingParam[0] : bookingParam ?? null;
  const booking = await fetchBooking(bookingId);

  const statusMessage =
    statusParam === "success"
      ? "Booking confirmed! We'll reach out shortly."
      : statusParam === "error"
      ? "We received your request but need manual confirmation."
      : "We're reviewing your booking details.";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md text-center w-full">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-50">
          <Image src="/icons/confirm.png" alt="Booking Confirmed" width={50} height={50} />
        </div>

        <h1 className="text-2xl font-bold text-green-600 mb-3">Booking Received</h1>
        <p className="text-gray-600 mb-6">{statusMessage}</p>

        {booking ? (
          <div className="text-left mb-6 text-gray-700 space-y-2">
            <p>
              <span className="font-semibold">Service:</span> {booking.serviceName}
              {booking.variant ? ` (${booking.variant})` : ""}
            </p>
            <p>
              <span className="font-semibold">Customer:</span> {booking.name}
            </p>
            <p>
              <span className="font-semibold">Phone:</span> {booking.phone}
            </p>
            <p>
              <span className="font-semibold">Address:</span> {booking.address}
            </p>
            {booking.scheduledDate && (
              <p>
                <span className="font-semibold">Preferred slot:</span> {new Date(booking.scheduledDate).toLocaleString()}
              </p>
            )}
            <p>
              <span className="font-semibold">Booking ID:</span> {booking._id}
            </p>
            {booking.trackingCode && (
              <p>
                <span className="font-semibold">Tracking code:</span> {booking.trackingCode}
              </p>
            )}
          </div>
        ) : bookingId ? (
          <p className="text-gray-500 mb-6">
            Booking ID: {bookingId}. We will call you shortly on your registered number.
          </p>
        ) : (
          <p className="text-gray-500 mb-6">
            Thank you for choosing GrihFix. Our team will confirm your booking shortly.
          </p>
        )}

        <div className="space-y-3">
          {booking?.trackingCode && (
            <Link
              href={`/track/${booking.trackingCode}`}
              className="block w-full rounded-lg border border-emerald-500 bg-emerald-50 px-4 py-2 text-emerald-700 hover:bg-emerald-100"
            >
              Track this booking
            </Link>
          )}
          <Link href="/" className="block w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            Go Home
          </Link>
          <Link href="/services" className="block w-full border border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-50 transition">
            Book Another Service
          </Link>
        </div>
      </div>
    </div>
  );
}