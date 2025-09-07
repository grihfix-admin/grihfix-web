"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Booking = {
  id: number;
  name: string;
  phone: string;
  address: string;
  service: string;
  date: string;
  time: string;
  instructions?: string;
  status: string;
};

export default function AdminDashboard() {
  const { user, isSignedIn } = useUser();
  const router = useRouter();
  const ADMIN_EMAIL = "grihfix.service@gmail.com";

  const [bookings, setBookings] = useState<Booking[]>([]);

  // Fetch bookings
  useEffect(() => {
    if (!isSignedIn) {
      router.push("/");
    } else if (user?.primaryEmailAddress?.emailAddress !== ADMIN_EMAIL) {
      router.push("/");
    } else {
      fetch("/api/bookings")
        .then((res) => res.json())
        .then((data) => setBookings(data));
    }
  }, [isSignedIn, user, router]);

  // Update booking status
  const updateStatus = async (id: number, newStatus: string) => {
    const res = await fetch(`/api/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    if (res.ok) {
      const updated = await res.json();
      setBookings((prev) =>
        prev.map((b) => (b.id === updated.id ? updated : b))
      );
    }
  };

  if (!isSignedIn || user?.primaryEmailAddress?.emailAddress !== ADMIN_EMAIL) {
    return <p className="text-center py-16">Redirecting...</p>;
  }

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Admin Dashboard
        </h1>

        <div className="overflow-x-auto bg-blue-50 p-6 rounded-xl shadow">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-100 text-left">
                <th className="p-3 border">ID</th>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Phone</th>
                <th className="p-3 border">Service</th>
                <th className="p-3 border">Date</th>
                <th className="p-3 border">Time</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-blue-100">
                  <td className="p-3 border">{booking.id}</td>
                  <td className="p-3 border">{booking.name}</td>
                  <td className="p-3 border">{booking.phone}</td>
                  <td className="p-3 border">{booking.service}</td>
                  <td className="p-3 border">{booking.date}</td>
                  <td className="p-3 border">{booking.time}</td>
                  <td className="p-3 border font-semibold">
                    {booking.status}
                  </td>
                  <td className="p-3 border space-x-2">
                    <button
                      onClick={() => updateStatus(booking.id, "Confirmed")}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => updateStatus(booking.id, "Completed")}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Complete
                    </button>
                    <button
                      onClick={() => updateStatus(booking.id, "Cancelled")}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}