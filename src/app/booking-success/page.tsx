import Link from "next/link";
import Image from "next/image";

interface Booking {
  _id: string;
  service: string;
  customerName: string;
  phone: string;
  fullAddress: string;
  finalPrice: number;
  createdAt?: string;
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
  const bookingParam = resolvedParams.booking;
  const bookingId = Array.isArray(bookingParam) ? bookingParam[0] : bookingParam ?? null;
  const booking = await fetchBooking(bookingId);

  const renderDetails = () => {
    if (booking) {
      return (
        <div className="text-left mb-6 text-gray-700 space-y-2">
          <p>
            <span className="font-semibold">Service:</span> {booking.service}
          </p>
          <p>
            <span className="font-semibold">Customer:</span> {booking.customerName}
          </p>
          <p>
            <span className="font-semibold">Phone:</span> {booking.phone}
          </p>
          <p>
            <span className="font-semibold">Address:</span> {booking.fullAddress}
          </p>
          <p>
            <span className="font-semibold">Price:</span> ₹{booking.finalPrice}
          </p>
          {booking.createdAt && (
            <p>
              <span className="font-semibold">Date:</span> {new Date(booking.createdAt).toLocaleString()}
            </p>
          )}
        </div>
      );
    }

    if (!bookingId) {
      return <p className="text-gray-500 mb-6">We couldn’t find a booking reference. Please check your link.</p>;
    }

    return <p className="text-gray-500 mb-6">Booking details are not available right now. Please contact support.</p>;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md text-center w-full">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-50">
          <Image src="/icons/confirm.png" alt="Booking Confirmed" width={50} height={50} />
        </div>

        <h1 className="text-2xl font-bold text-green-600 mb-3">Booking Confirmed!</h1>

        {renderDetails()}

        <div className="space-y-3">
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