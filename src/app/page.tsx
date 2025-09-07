import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="grid md:grid-cols-2 items-center gap-12 py-20 px-6 bg-gradient-to-r from-white via-blue-50 to-white">
        {/* Left side: text */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
            Your Home, Perfectly Fixed — in Darbhanga
          </h1>
          <p className="text-lg text-gray-700">
            Home Cleaning • Bathroom/Kitchen Cleaning • Water & Septic Tank
            Cleaning • Plumbing • Electrical Appliance Repairs
          </p>
          <div className="flex gap-4">
            <Link
              href="/book"
              className="rounded-lg bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700 shadow"
            >
              Book Now
            </Link>
            <a
              href="tel:+919709870726"
              className="rounded-lg border border-blue-600 text-blue-600 px-6 py-3 font-medium hover:bg-blue-50 shadow-sm"
            >
              Call Us
            </a>
          </div>
        </div>

        {/* Right side: house image */}
        <div className="flex justify-center md:justify-end">
          <Image
            src="/house-clean.jpg" // ✅ put house-clean.jpg inside /public
            alt="Clean Indian Home"
            width={500}
            height={400}
            priority
            className="rounded-xl shadow-lg"
          />
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-10">
            Why Choose <span className="text-[#1976d2]">Grih</span>
            <span className="text-[#e53935]">Fix</span>?
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            {/* Card 1 */}
            <div className="p-6 bg-blue-50 rounded-xl shadow hover:shadow-md transition">
              <Image
                src="/icons/time.png"
                alt="On-time Service"
                width={50}
                height={50}
                className="mx-auto mb-4"
              />
              <h3 className="font-bold text-lg mb-2 text-gray-900">
                On-Time Service
              </h3>
              <p className="text-gray-700 text-sm">
                We value your time. Our professionals always arrive as scheduled.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-6 bg-blue-50 rounded-xl shadow hover:shadow-md transition">
              <Image
                src="/icons/staff.png"
                alt="Verified Staff"
                width={50}
                height={50}
                className="mx-auto mb-4"
              />
              <h3 className="font-bold text-lg mb-2 text-gray-900">
                Verified Staff
              </h3>
              <p className="text-gray-700 text-sm">
                Skilled and background-verified staff for complete safety.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-6 bg-blue-50 rounded-xl shadow hover:shadow-md transition">
              <Image
                src="/icons/clean.png"
                alt="Hygienic Cleaning"
                width={50}
                height={50}
                className="mx-auto mb-4"
              />
              <h3 className="font-bold text-lg mb-2 text-gray-900">
                Hygienic Cleaning
              </h3>
              <p className="text-gray-700 text-sm">
                We use safe, hygienic, and eco-friendly cleaning practices.
              </p>
            </div>

            {/* Card 4 */}
            <div className="p-6 bg-blue-50 rounded-xl shadow hover:shadow-md transition">
              <Image
                src="/icons/discount.png"
                alt="First Booking Discount"
                width={50}
                height={50}
                className="mx-auto mb-4"
              />
              <h3 className="font-bold text-lg mb-2 text-gray-900">
                30% Off First Booking
              </h3>
              <p className="text-gray-700 text-sm">
                Get a flat 30% discount on your first service booking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-blue-50 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-10">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="p-6 bg-white rounded-xl shadow hover:shadow-md transition">
              <Image
                src="/icons/booking.png"
                alt="Book Service"
                width={60}
                height={60}
                className="mx-auto mb-4"
              />
              <h3 className="font-bold text-lg mb-2 text-gray-900">1. Book</h3>
              <p className="text-gray-700 text-sm">
                Choose your service and book easily through our website or call.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 bg-white rounded-xl shadow hover:shadow-md transition">
              <Image
                src="/icons/service.png"
                alt="Service at Home"
                width={60}
                height={60}
                className="mx-auto mb-4"
              />
              <h3 className="font-bold text-lg mb-2 text-gray-900">
                2. Service at Home
              </h3>
              <p className="text-gray-700 text-sm">
                Our professional staff will arrive at your doorstep on time.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 bg-white rounded-xl shadow hover:shadow-md transition">
              <Image
                src="/icons/payment.png"
                alt="Pay Securely"
                width={60}
                height={60}
                className="mx-auto mb-4"
              />
              <h3 className="font-bold text-lg mb-2 text-gray-900">
                3. Pay Securely
              </h3>
              <p className="text-gray-700 text-sm">
                Pay securely after the service is completed to your satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}