"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function BookingPage() {
  const { slug } = useParams<{ slug: string }>();
  const [service, setService] = useState<any>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    date: "",
    notes: "",
    payment: "online",
  });

  useEffect(() => {
    async function fetchService() {
      try {
        const res = await fetch(`/api/services/${slug}`);
        const data = await res.json();
        setService(data.service);
      } catch (err) {
        console.error(err);
      }
    }
    fetchService();
  }, [slug]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, slug }),
      });
      if (res.ok) {
        alert("✅ Booking placed successfully!");
      } else {
        alert("❌ Failed to place booking");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!service) return <p className="text-center mt-10">Loading...</p>;

  const discounted = service.isDiscounted && service.discountInr
    ? service.discountInr
    : service.priceInr;

  const cashPrice = service.isDiscounted
    ? (service.discountInr ?? service.priceInr) + 100
    : service.priceInr + 100;

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Book {service.name}</h1>

      <div className="mb-6 p-4 border rounded bg-gray-50">
        <p><span className="font-semibold">Price:</span> ₹{service.priceInr}</p>
        {service.isDiscounted && (
          <p>
            <span className="text-red-500 line-through">₹{service.priceInr}</span>{" "}
            <span className="text-green-600 font-bold">₹{service.discountInr}</span>{" "}
            (First-time user discount)
          </p>
        )}
        <p className="text-sm text-gray-600 mt-2">
          Cash payment adds ₹100 → Total ₹{cashPrice}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Your Name" className="w-full p-2 border rounded" value={form.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" className="w-full p-2 border rounded" value={form.email} onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Phone Number" className="w-full p-2 border rounded" value={form.phone} onChange={handleChange} required />
        <input type="text" name="address" placeholder="Address" className="w-full p-2 border rounded" value={form.address} onChange={handleChange} required />
        <input type="date" name="date" className="w-full p-2 border rounded" value={form.date} onChange={handleChange} required />
        <textarea name="notes" placeholder="Any notes..." className="w-full p-2 border rounded" value={form.notes} onChange={handleChange}></textarea>

        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input type="radio" name="payment" value="online" checked={form.payment === "online"} onChange={handleChange} />
            Online (UPI)
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="payment" value="cash" checked={form.payment === "cash"} onChange={handleChange} />
            Cash (+₹100)
          </label>
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Confirm Booking
        </button>
      </form>
    </main>
  );
}