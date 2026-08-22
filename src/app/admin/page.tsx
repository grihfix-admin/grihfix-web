import Link from "next/link";
import type { Metadata } from "next";

import { BOOKING_STATUS_LABELS, BOOKING_STATUS_VALUES, type BookingStatus } from "@/constants/bookings";
import { AdminBookingsTable } from "@/components/admin/AdminBookingsTable";
import { Button } from "@/components/ui/Button";
import { connectToDatabase } from "@/lib/mongodb";
import { serializeAdminBooking } from "@/lib/serializers/admin";
import Booking, { type IBooking } from "@/models/Booking";

type PageProps = {
  searchParams?: Promise<{ status?: string; search?: string }>;
};

function isValidStatus(status?: string | null): status is BookingStatus {
  if (!status) return false;
  return (BOOKING_STATUS_VALUES as readonly string[]).includes(status);
}

export const metadata: Metadata = {
  title: "Admin dashboard • GrihFix",
  description: "Review and manage GrihFix Darbhanga bookings, statuses, and technician assignments.",
};

export default async function AdminDashboard({ searchParams }: PageProps) {
  const params = (await searchParams) ?? {};
  const statusFilter = isValidStatus(params.status) ? params.status : undefined;
  const searchFilter = params.search?.trim() ? params.search.trim() : undefined;

  await connectToDatabase();
  const query: Record<string, unknown> = {};
  if (statusFilter) {
    query.status = statusFilter;
  }
  if (searchFilter) {
    query.$or = [
      { name: { $regex: searchFilter, $options: "i" } },
      { phone: { $regex: searchFilter, $options: "i" } },
    ];
  }

  const bookings = await Booking.find(query).sort({ createdAt: -1 }).limit(200).lean();

  const adminBookings = bookings.map((booking) =>
    serializeAdminBooking(booking as IBooking & { _id: { toString(): string } })
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-blue-500">Dashboard</p>
          <h1 className="text-3xl font-bold text-slate-900">Bookings overview</h1>
          <p className="text-sm text-slate-500">
            Manage customer requests, assign technicians, and share tracking links.
          </p>
        </div>
        <Button href="/contact" variant="secondary" className="justify-center text-slate-900">
          View public form
        </Button>
      </div>

      <form className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-[1fr_1fr_auto]">
        <div>
          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500" htmlFor="statusFilter">
            Status
          </label>
          <select
            id="statusFilter"
            name="status"
            defaultValue={statusFilter ?? ""}
            className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
          >
            <option value="">All</option>
            {BOOKING_STATUS_VALUES.map((status) => (
              <option key={status} value={status}>
                {BOOKING_STATUS_LABELS[status]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500" htmlFor="searchFilter">
            Search (name or phone)
          </label>
          <input
            id="searchFilter"
            name="search"
            defaultValue={searchFilter ?? ""}
            className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
            placeholder="e.g. 97098 or Anita"
          />
        </div>
        <div className="flex items-end gap-2">
          <Button type="submit" className="w-full justify-center">
            Apply
          </Button>
          <Link
            href="/admin"
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600"
          >
            Reset
          </Link>
        </div>
      </form>

      <AdminBookingsTable bookings={adminBookings} />
    </div>
  );
}