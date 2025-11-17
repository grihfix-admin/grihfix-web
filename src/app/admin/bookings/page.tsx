// src/app/admin/bookings/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

type BookingStatus = "pending" | "assigned" | "completed" | "cancelled";

interface Booking {
  _id: string;
  serviceName: string;
  customerName: string;
  phone: string;
  email?: string;
  fullAddress: string;
  city?: string;
  pincode?: string;
  finalPrice: number;
  status: BookingStatus;
  createdAt: string;
}

const statusColors: Record<BookingStatus, string> = {
  pending: "bg-amber-100 text-amber-800",
  assigned: "bg-blue-100 text-blue-800",
  completed: "bg-emerald-100 text-emerald-800",
  cancelled: "bg-rose-100 text-rose-800",
};

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<"all" | BookingStatus>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/bookings");
        const data = await res.json();
        if (data.success) setBookings(data.bookings);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = useMemo(() => {
    const ql = q.trim().toLowerCase();
    return bookings.filter((b) => {
      const matchesStatus = status === "all" ? true : b.status === status;
      const matchesQ =
        !ql ||
        b.customerName.toLowerCase().includes(ql) ||
        b.phone.toLowerCase().includes(ql) ||
        b.serviceName.toLowerCase().includes(ql) ||
        (b.city || "").toLowerCase().includes(ql) ||
        (b.pincode || "").toLowerCase().includes(ql);
      return matchesStatus && matchesQ;
    });
  }, [bookings, q, status]);

  async function updateStatus(id: string, newStatus: BookingStatus) {
    const prev = bookings;
    // optimistic UI
    setBookings((old) => old.map((b) => (b._id === id ? { ...b, status: newStatus } : b)));
    const t = toast.loading("Updating status…");
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Update failed");
      toast.success("Status updated", { id: t });
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status", { id: t });
      setBookings(prev); // rollback
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <span>📋</span> All Bookings
        </h1>
        <div className="text-sm text-gray-500">
          Total: <b>{bookings.length}</b>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search name, phone, city, service…"
          className="w-full md:w-80 border rounded px-3 py-2"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as any)}
          className="w-full md:w-48 border rounded px-3 py-2"
        >
          <option value="all">All statuses</option>
          <option value="pending">Pending</option>
          <option value="assigned">Assigned</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-auto rounded border bg-white">
        <table className="min-w-[900px] w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-2 text-left">Service</th>
              <th className="px-4 py-2 text-left">Customer</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">City</th>
              <th className="px-4 py-2">Pincode</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={9} className="px-4 py-10 text-center text-gray-500">
                  Loading…
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-4 py-10 text-center text-gray-500">
                  No bookings found
                </td>
              </tr>
            ) : (
              filtered.map((b) => (
                <tr key={b._id} className="border-t">
                  <td className="px-4 py-2">{b.serviceName}</td>
                  <td className="px-4 py-2">
                    <div className="flex flex-col">
                      <span className="font-medium">{b.customerName}</span>
                      {b.email && (
                        <span className="text-gray-500 text-xs">{b.email}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-2 text-center">{b.phone}</td>
                  <td className="px-4 py-2 text-center">{b.city || "-"}</td>
                  <td className="px-4 py-2 text-center">{b.pincode || "-"}</td>
                  <td className="px-4 py-2 text-center">₹{b.finalPrice}</td>
                  <td className="px-4 py-2 text-center">
                    {new Date(b.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[b.status]}`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex flex-wrap gap-2 justify-center">
                      <button
                        onClick={() => updateStatus(b._id, "assigned")}
                        className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
                      >
                        Assign
                      </button>
                      <button
                        onClick={() => updateStatus(b._id, "completed")}
                        className="px-3 py-1 rounded bg-emerald-600 text-white hover:bg-emerald-700"
                      >
                        Complete
                      </button>
                      <button
                        onClick={() => updateStatus(b._id, "cancelled")}
                        className="px-3 py-1 rounded bg-rose-600 text-white hover:bg-rose-700"
                      >
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}