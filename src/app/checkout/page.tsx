"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import toast from "react-hot-toast"; // 👈 add toast

const Map = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(mod => mod.Marker), { ssr: false });
import "leaflet/dist/leaflet.css";

interface Service {
  _id: string;
  name: string;
  slug: string;
  priceInr: number;
  discountInr: number | null;
}

export default function CheckoutPage() {
  const params = useSearchParams();
  const router = useRouter();
  const serviceSlug = params.get("service");

  const [service, setService] = useState<Service | null>(null);
  const [coupon, setCoupon] = useState("");
  const [discountPercent, setDiscountPercent] = useState<number | null>(null);

  // form state
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [landmark, setLandmark] = useState("");
  const [fullAddress, setFullAddress] = useState("");

  // map coords
  const [coords, setCoords] = useState<{ lat: number; lng: number }>({
    lat: 26.1522, // Darbhanga approx
    lng: 85.8971,
  });

  // fetch selected service
  useEffect(() => {
    async function fetchService() {
      if (!serviceSlug) return;
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
      const res = await fetch(`${baseUrl}/api/services`);
      const data = await res.json();
      const found = (data.services || data).find((s: Service) => s.slug === serviceSlug);
      setService(found || null);
    }
    fetchService();
  }, [serviceSlug]);

  // apply coupon
  const applyCoupon = async () => {
    try {
      const res = await fetch("/api/coupons/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: coupon }),
      });
      const data = await res.json();
      if (data.valid) {
        setDiscountPercent(data.discountPercent);
        toast.success(`Coupon applied! ${data.discountPercent}% off`);
      } else {
        setDiscountPercent(null);
        toast.error(data.message || "Invalid coupon");
      }
    } catch (err) {
      console.error("Coupon validation error:", err);
      toast.error("Something went wrong with coupon");
    }
  };

  // reverse geocode from coords
  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await res.json();
      setFullAddress(data.display_name || "");
      setCity(data.address?.city || data.address?.town || data.address?.village || "");
      setPincode(data.address?.postcode || "");
    } catch (err) {
      console.error("Reverse geocoding failed:", err);
      toast.error("Could not fetch address from map");
    }
  };

    // confirm booking → save to MongoDB
    const handleConfirmBooking = async () => {
      if (!customerName || !phone || !pincode || !city || !fullAddress) {
        toast.error("Please fill all required fields");
        return;
      }

      if (!service) {
        toast.error("No service selected");
        return;
      }

      const finalPrice = discountPercent
        ? Math.round(service.priceInr - (service.priceInr * discountPercent) / 100)
        : service.priceInr;

      // show loading toast
      const toastId = toast.loading("Booking your service... ⏳");

      try {
        const res = await fetch("/api/bookings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            serviceId: service._id,
            serviceName: service.name,
            customerName,
            phone,
            email,
            pincode,
            city,
            landmark,
            fullAddress,
            coords,
            finalPrice,
            date: new Date(),
          }),
        });

        const data = await res.json();

        if (data.success) {
          toast.success("Booking confirmed 🎉 Redirecting...", { id: toastId });
        
          // ⏳ wait 2 seconds before redirecting
          setTimeout(() => {
            router.push(`/booking-success?booking=${data.booking._id}`);
          }, 2000);
        } else {
          toast.error(data.error || "Failed to save booking", { id: toastId });
        }
      } catch (err) {
        console.error("Booking save error:", err);
        toast.error("Something went wrong while saving booking", { id: toastId });
      }
    };
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-700">
        Checkout
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* LEFT: Service Summary */}
        <div className="p-6 bg-white shadow-md rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Selected Service</h2>
          {service ? (
            <div>
              <p className="font-medium">{service.name}</p>
              <p className="text-gray-600 mt-1">₹{service.priceInr}</p>
              {discountPercent && (
                <p className="text-green-600 font-semibold mt-2">
                  Final Price: ₹
                  {Math.round(
                    service.priceInr - (service.priceInr * discountPercent) / 100
                  )}
                </p>
              )}
            </div>
          ) : (
            <p>No service selected</p>
          )}

          {/* Coupon */}
          <div className="mt-6 flex">
            <input
              type="text"
              placeholder="Enter coupon"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded-l-md w-full"
            />
            <button
              onClick={applyCoupon}
              className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
            >
              Apply
            </button>
          </div>
        </div>

        {/* RIGHT: Booking Form */}
        <div className="p-6 bg-white shadow-md rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Booking Details</h2>

          <div className="space-y-3">
            <input type="text" placeholder="Your Name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="w-full border px-3 py-2 rounded-md text-sm" />
            <input type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full border px-3 py-2 rounded-md text-sm" />
            <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border px-3 py-2 rounded-md text-sm" />
            <input type="text" placeholder="Pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} className="w-full border px-3 py-2 rounded-md text-sm" />
            <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} className="w-full border px-3 py-2 rounded-md text-sm" />
            <input type="text" placeholder="Landmark (optional)" value={landmark} onChange={(e) => setLandmark(e.target.value)} className="w-full border px-3 py-2 rounded-md text-sm" />
            <textarea placeholder="Full Address" value={fullAddress} onChange={(e) => setFullAddress(e.target.value)} className="w-full border px-3 py-2 rounded-md text-sm" />

            {/* Map */}
            <div className="h-64 mt-4">
              <Map
                {...({
                  center: [coords.lat, coords.lng] as [number, number],
                  zoom: 14,
                  style: { height: "100%", width: "100%" },
                  whenReady: () => reverseGeocode(coords.lat, coords.lng),
                } as any)}
              >
                <TileLayer
                  // @ts-expect-error leaflet types are strict
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker
                  // @ts-expect-error draggable missing in types
                  draggable={true}
                  position={[coords.lat, coords.lng] as [number, number]}
                  eventHandlers={{
                    dragend: (e: any) => {
                      const latlng = e.target.getLatLng();
                      setCoords({ lat: latlng.lat, lng: latlng.lng });
                      reverseGeocode(latlng.lat, latlng.lng);
                    },
                  }}
                />
              </Map>
            </div>

            <button
              onClick={handleConfirmBooking}
              className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700"
            >
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}