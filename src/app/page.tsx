import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-gray-50">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl font-bold mb-4">
            Your Home, Perfectly Fixed — in Darbhanga
          </h1>
          <p className="text-gray-700 mb-6">
            Home Cleaning • Bathroom/Kitchen Cleaning • Water & Septic Tank
            Cleaning • Plumbing • Electrical Appliance Repairs
          </p>
          <div className="flex gap-4">
            <a
              href="#"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
            >
              Book Now
            </a>
            <a
              href="tel:+919709870726"
              className="px-6 py-3 border rounded-lg hover:bg-gray-100"
            >
              Call Us
            </a>
          </div>
        </div>
        <div className="rounded-lg shadow-lg overflow-hidden">
          <Image
            src="/home-clean.jpg"
            alt="Clean Indian Home"
            width={500}
            height={400}
            className="object-cover"
          />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose <span className="text-red-600">Grih</span>
          <span className="text-blue-600">Fix</span>?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="bg-blue-50 p-6 rounded-lg shadow text-center">
            <Image
              src="/icons/ontime.png"
              alt="On-Time Service"
              width={50}
              height={50}
              className="mx-auto"
            />
            <h3 className="font-bold mt-4 mb-2">On-Time Service</h3>
            <p className="text-gray-600 text-sm">
              We value your time. Our professionals always arrive as scheduled.
            </p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg shadow text-center">
            <Image
              src="/icons/staff.png"
              alt="Verified Staff"
              width={50}
              height={50}
              className="mx-auto"
            />
            <h3 className="font-bold mt-4 mb-2">Verified Staff</h3>
            <p className="text-gray-600 text-sm">
              Skilled and background-verified staff for complete safety.
            </p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg shadow text-center">
            <Image
              src="/icons/cleaning.png"
              alt="Hygienic Cleaning"
              width={50}
              height={50}
              className="mx-auto"
            />
            <h3 className="font-bold mt-4 mb-2">Hygienic Cleaning</h3>
            <p className="text-gray-600 text-sm">
              We use safe, hygienic, and eco-friendly cleaning practices.
            </p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg shadow text-center">
            <Image
              src="/icons/discount.png"
              alt="Discount"
              width={50}
              height={50}
              className="mx-auto"
            />
            <h3 className="font-bold mt-4 mb-2">30% Off First Booking</h3>
            <p className="text-gray-600 text-sm">
              Get a flat 30% discount on your first service booking.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-blue-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <Image
                src="/icons/book.png"
                alt="Book"
                width={50}
                height={50}
                className="mx-auto"
              />
              <h3 className="font-bold mt-4 mb-2">1. Book</h3>
              <p className="text-gray-600 text-sm">
                Choose your service and book easily through our website or call.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <Image
                src="/icons/service.png"
                alt="Service"
                width={50}
                height={50}
                className="mx-auto"
              />
              <h3 className="font-bold mt-4 mb-2">2. Service at Home</h3>
              <p className="text-gray-600 text-sm">
                Our professional staff will arrive at your doorstep on time.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <Image
                src="/icons/payment.png"
                alt="Pay Securely"
                width={50}
                height={50}
                className="mx-auto"
              />
              <h3 className="font-bold mt-4 mb-2">3. Pay Securely</h3>
              <p className="text-gray-600 text-sm">
                Pay securely after the service is completed to your satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/919709870726"
        className="fixed bottom-6 right-6 z-50"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src="/icons/whatsapp.png"
          alt="WhatsApp"
          width={60}
          height={60}
        />
      </a>
    </main>
  );
}