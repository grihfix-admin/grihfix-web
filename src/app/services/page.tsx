import Image from "next/image";

export default function Services() {
  return (
    <section className="py-16 bg-white px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Our Services
        </h1>
        <p className="text-lg text-gray-600 mb-12">
          Professional home cleaning, repair, and maintenance services in Darbhanga.
        </p>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-10">
          {/* Service 1 */}
          <div className="p-6 bg-blue-50 rounded-xl shadow hover:shadow-md transition text-center">
            <Image
              src="/icons/home-clean.png"
              alt="Home Cleaning"
              width={60}
              height={60}
              className="mx-auto mb-4"
            />
            <h3 className="font-bold text-lg mb-2 text-gray-900">
              Home Cleaning
            </h3>
            <p className="text-gray-700 text-sm">
              Comprehensive cleaning for bedrooms, living rooms, and entire homes.
            </p>
          </div>

          {/* Service 2 */}
          <div className="p-6 bg-blue-50 rounded-xl shadow hover:shadow-md transition text-center">
            <Image
              src="/icons/kitchen.png"
              alt="Bathroom & Kitchen Cleaning"
              width={60}
              height={60}
              className="mx-auto mb-4"
            />
            <h3 className="font-bold text-lg mb-2 text-gray-900">
              Bathroom & Kitchen Cleaning
            </h3>
            <p className="text-gray-700 text-sm">
              Deep cleaning and sanitization for bathrooms and kitchens.
            </p>
          </div>

          {/* Service 3 */}
          <div className="p-6 bg-blue-50 rounded-xl shadow hover:shadow-md transition text-center">
            <Image
              src="/icons/water-tank.png"
              alt="Water Tank Cleaning"
              width={60}
              height={60}
              className="mx-auto mb-4"
            />
            <h3 className="font-bold text-lg mb-2 text-gray-900">
              Water Tank Cleaning
            </h3>
            <p className="text-gray-700 text-sm">
              Ensure clean, safe water with professional tank cleaning.
            </p>
          </div>

          {/* Service 4 */}
          <div className="p-6 bg-blue-50 rounded-xl shadow hover:shadow-md transition text-center">
            <Image
              src="/icons/septic-tank.png"
              alt="Septic Tank Cleaning"
              width={60}
              height={60}
              className="mx-auto mb-4"
            />
            <h3 className="font-bold text-lg mb-2 text-gray-900">
              Septic Tank Cleaning
            </h3>
            <p className="text-gray-700 text-sm">
              Safe and hygienic septic tank cleaning with expert staff.
            </p>
          </div>

          {/* Service 5 */}
          <div className="p-6 bg-blue-50 rounded-xl shadow hover:shadow-md transition text-center">
            <Image
              src="/icons/plumbing.png"
              alt="Plumbing Services"
              width={60}
              height={60}
              className="mx-auto mb-4"
            />
            <h3 className="font-bold text-lg mb-2 text-gray-900">
              Plumbing
            </h3>
            <p className="text-gray-700 text-sm">
              Reliable plumbing services for leaks, fittings, and installations.
            </p>
          </div>

          {/* Service 6 */}
          <div className="p-6 bg-blue-50 rounded-xl shadow hover:shadow-md transition text-center">
            <Image
              src="/icons/appliance.png"
              alt="Appliance Repairs"
              width={60}
              height={60}
              className="mx-auto mb-4"
            />
            <h3 className="font-bold text-lg mb-2 text-gray-900">
              Appliance Repairs
            </h3>
            <p className="text-gray-700 text-sm">
              Repairs and maintenance for electrical appliances like AC, fridge, etc.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}