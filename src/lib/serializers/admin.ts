import type { IBooking } from "@/models/Booking";

export type AdminSerializableBooking = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  serviceName: string;
  serviceSlug: string;
  status: IBooking["status"];
  trackingCode: string | null;
  assignedStaffName: string | null;
  assignedStaffPhone: string | null;
  internalNotes: string | null;
  scheduledDate: string | null;
  city: string | null;
  createdAt: string;
};

type MongoBooking = IBooking & { _id: { toString(): string } };
type SerializedInput = MongoBooking | (IBooking & { id: string });

function hasMongoId(booking: SerializedInput): booking is MongoBooking {
  return "_id" in booking && typeof booking._id?.toString === "function";
}

export function serializeAdminBooking(booking: SerializedInput): AdminSerializableBooking {
  const createdAt =
    booking.createdAt instanceof Date ? booking.createdAt.toISOString() : new Date(booking.createdAt).toISOString();

  return {
    id: hasMongoId(booking) ? booking._id.toString() : booking.id,
    name: booking.name,
    phone: booking.phone,
    email: booking.email ?? null,
    serviceName: booking.serviceName,
    serviceSlug: booking.serviceSlug,
    status: booking.status,
    trackingCode: booking.trackingCode ?? null,
    assignedStaffName: booking.assignedStaffName ?? null,
    assignedStaffPhone: booking.assignedStaffPhone ?? null,
    internalNotes: booking.internalNotes ?? null,
    scheduledDate: booking.scheduledDate ? booking.scheduledDate.toISOString() : null,
    city: booking.city ?? null,
    createdAt,
  };
}

