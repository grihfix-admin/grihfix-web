"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface Booking {
  _id: string;
  service: string;
  customerName: string;
  phone: string;
  fullAddress: string;
  finalPrice: number;
  createdAt?: string;
}

export default function BookingSuccessPage() {
  const params = useSearchParams();
  const bookingId = params.get("booking");

  const [booking, setBooking] = useState<Booking | null>(null);

  useEffect(() => {
    async function fetchBooking() {
      if (!bookingId) return;
      try {
        const res = await fetch(`/api/bookings/${bookingId}`);
        if (!res.ok) throw new Error("Failed to fetch booking");
        const data = await res.json();
        setBooking(data.booking);
      } catch (err) {
        console.error("Error loading booking:", err);
      }
    }
    fetchBooking();
  }, [bookingId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md text-center w-full">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 150 }}
          className="mx-auto mb-6"
        >
          <Image src="/icons/confirm.png" alt="Booking Confirmed" width={80} height={80} />
        </motion.div>

        <h1 className="text-2xl font-bold text-green-600 mb-3">Booking Confirmed!</h1>

        {booking ? (
          <div className="text-left mb-6 text-gray-700 space-y-2">
            <p><span className="font-semibold">Service:</span> {booking.service}</p>
            <p><span className="font-semibold">Customer:</span> {booking.customerName}</p>
            <p><span className="font-semibold">Phone:</span> {booking.phone}</p>
            <p><span className="font-semibold">Address:</span> {booking.fullAddress}</p>
            <p><span className="font-semibold">Price:</span> ₹{booking.finalPrice}</p>
            {booking.createdAt && (
              <p><span className="font-semibold">Date:</span> {new Date(booking.createdAt).toLocaleString()}</p>
            )}
          </div>
        ) : (
          <p className="text-gray-500 mb-6">Loading booking details...</p>
        )}

        <div className="space-y-3">
          <Link href="/" className="block w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            Go Home
          </Link>
          <Link href="/services" className="block w-full border border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-50 transition">
            Book Another Service
          </Link>
        </div>
      </div>
    </div>
  );
}