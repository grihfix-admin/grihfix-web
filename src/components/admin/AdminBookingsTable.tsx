"use client";

import { useMemo, useState } from "react";
import { toast } from "react-hot-toast";

import { BOOKING_STATUS_LABELS, BOOKING_STATUS_VALUES, type BookingStatus } from "@/constants/bookings";
import { Button } from "@/components/ui/Button";

type AdminBooking = {
  id: string;
  name: string;
  phone: string;
  email?: string | null;
  serviceName: string;
  serviceSlug: string;
  status: BookingStatus;
  trackingCode?: string | null;
  assignedStaffName?: string | null;
  assignedStaffPhone?: string | null;
  internalNotes?: string | null;
  scheduledDate?: string | null;
  city?: string | null;
  createdAt: string;
};

type Props = {
  bookings: AdminBooking[];
};

type EditableFields = Pick<
  AdminBooking,
  "status" | "assignedStaffName" | "assignedStaffPhone" | "internalNotes"
>;

export function AdminBookingsTable({ bookings }: Props) {
  const [rows, setRows] = useState(bookings);
  const [loadingIds, setLoadingIds] = useState<Record<string, boolean>>({});

  const statusCounts = useMemo(() => {
    return rows.reduce<Record<BookingStatus, number>>(
      (acc, booking) => {
        acc[booking.status] = (acc[booking.status] || 0) + 1;
        return acc;
      },
      {
        new: 0,
        confirmed: 0,
        "in-progress": 0,
        completed: 0,
        cancelled: 0,
      }
    );
  }, [rows]);

  const updateBooking = async (id: string, payload: Partial<EditableFields>) => {
    setLoadingIds((prev) => ({ ...prev, [id]: true }));
    const prevRows = rows;
    setRows((current) =>
      current.map((row) => (row.id === id ? { ...row, ...payload } : row))
    );

    try {
      const res = await fetch(`/api/admin/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setRows(prevRows);
        toast.error(data.message || "Update failed");
        return;
      }
      setRows((current) => current.map((row) => (row.id === id ? data.booking : row)));
      toast.success("Booking updated");
    } catch (error) {
      console.error("[Admin] booking update failed:", error);
      setRows(prevRows);
      toast.error("Request failed");
    } finally {
      setLoadingIds((prev) => ({ ...prev, [id]: false }));
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 md:grid-cols-5">
        {BOOKING_STATUS_VALUES.map((status) => (
          <div key={status} className="rounded-xl border border-slate-200 bg-white p-3 text-center">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
              {BOOKING_STATUS_LABELS[status]}
            </p>
            <p className="text-xl font-semibold text-slate-900">{statusCounts[status]}</p>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <table className="w-full min-w-[960px] text-sm text-slate-700">
          <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Service</th>
              <th className="px-4 py-3">Preferred slot</th>
              <th className="px-4 py-3">City</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Assigned staff</th>
              <th className="px-4 py-3">Notes</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((booking) => {
              const busy = loadingIds[booking.id];
              return (
                <tr key={booking.id} className="border-t border-slate-100">
                  <td className="px-4 py-3 text-xs text-slate-500">
                    <p className="font-semibold text-slate-700">
                      {new Date(booking.createdAt).toLocaleDateString("en-IN", {
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                    <p>{new Date(booking.createdAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}</p>
                    <p className="text-[11px] text-slate-400">{booking.trackingCode}</p>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-semibold">{booking.name}</div>
                    <div className="text-xs text-slate-500">{booking.phone}</div>
                    {booking.email && <div className="text-xs text-slate-400">{booking.email}</div>}
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-semibold">{booking.serviceName}</p>
                    <p className="text-xs text-slate-500">{booking.serviceSlug}</p>
                  </td>
                  <td className="px-4 py-3 text-xs">
                    {booking.scheduledDate ? (
                      <>
                        <p>{new Date(booking.scheduledDate).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}</p>
                        <p className="text-slate-500">
                          {new Date(booking.scheduledDate).toLocaleTimeString("en-IN", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </>
                    ) : (
                      <p className="text-slate-400">Not provided</p>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-500">{booking.city || "—"}</td>
                  <td className="px-4 py-3">
                    <select
                      className="w-full rounded-lg border border-slate-200 px-2 py-1 text-xs"
                      value={booking.status}
                      disabled={busy}
                      onChange={(event) =>
                        updateBooking(booking.id, { status: event.target.value as BookingStatus })
                      }
                    >
                      {BOOKING_STATUS_VALUES.map((status) => (
                        <option key={status} value={status}>
                          {BOOKING_STATUS_LABELS[status]}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <input
                      className="mb-2 w-full rounded-lg border border-slate-200 px-2 py-1 text-xs"
                      placeholder="Staff name"
                      value={booking.assignedStaffName ?? ""}
                      disabled={busy}
                      onBlur={(event) =>
                        updateBooking(booking.id, { assignedStaffName: event.target.value || null })
                      }
                      onChange={(event) =>
                        setRows((current) =>
                          current.map((row) =>
                            row.id === booking.id ? { ...row, assignedStaffName: event.target.value } : row
                          )
                        )
                      }
                    />
                    <input
                      className="w-full rounded-lg border border-slate-200 px-2 py-1 text-xs"
                      placeholder="+91 phone"
                      value={booking.assignedStaffPhone ?? ""}
                      disabled={busy}
                      onBlur={(event) =>
                        updateBooking(booking.id, { assignedStaffPhone: event.target.value || null })
                      }
                      onChange={(event) =>
                        setRows((current) =>
                          current.map((row) =>
                            row.id === booking.id ? { ...row, assignedStaffPhone: event.target.value } : row
                          )
                        )
                      }
                    />
                  </td>
                  <td className="px-4 py-3">
                    <textarea
                      className="h-20 w-full rounded-lg border border-slate-200 px-2 py-1 text-xs"
                      placeholder="Internal notes"
                      value={booking.internalNotes ?? ""}
                      disabled={busy}
                      onBlur={(event) =>
                        updateBooking(booking.id, { internalNotes: event.target.value || null })
                      }
                      onChange={(event) =>
                        setRows((current) =>
                          current.map((row) =>
                            row.id === booking.id ? { ...row, internalNotes: event.target.value } : row
                          )
                        )
                      }
                    />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex flex-col items-end gap-2">
                      <button
                        type="button"
                        className="text-xs font-semibold text-blue-600"
                        onClick={() => {
                          if (!booking.trackingCode) {
                            toast.error("No tracking code yet");
                            return;
                          }
                          if (!navigator.clipboard) {
                            toast.error("Clipboard not supported");
                            return;
                          }
                          navigator.clipboard
                            .writeText(booking.trackingCode)
                            .then(() => toast.success("Tracking code copied"))
                            .catch(() => toast.error("Unable to copy code"));
                        }}
                      >
                        Copy tracking
                      </button>
                      <Button href={`/admin/bookings/${booking.id}`} variant="secondary" className="w-full justify-center text-xs">
                        Open
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

