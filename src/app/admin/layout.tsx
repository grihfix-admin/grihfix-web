// src/app/admin/layout.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { Toaster } from "react-hot-toast";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />

      {/* Top bar */}
      <header className="h-14 bg-white border-b flex items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <Image src="/grihfix-logo.png" alt="GrihFix" width={34} height={34} />
          <span className="font-semibold">
            <span className="text-[#e53935]">Grih</span>
            <span className="text-[#1976d2]">Fix</span> Admin
          </span>
        </div>
        <nav className="text-sm flex items-center gap-5">
          <Link href="/services" className="hover:text-blue-600">Services</Link>
          <Link href="/contact" className="hover:text-blue-600">Contact</Link>
          <Link href="/" className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700">View Site</Link>
        </nav>
      </header>

      <div className="grid grid-cols-12">
        {/* Sidebar */}
        <aside className="col-span-12 md:col-span-2 border-r bg-white">
          <nav className="p-4 space-y-2 text-sm">
            <Link href="/admin/bookings" className="block px-3 py-2 rounded hover:bg-gray-100">📋 Bookings</Link>
            <Link href="/admin/services" className="block px-3 py-2 rounded hover:bg-gray-100">🧰 Services</Link>
            <Link href="/admin/coupons" className="block px-3 py-2 rounded hover:bg-gray-100">🏷️ Coupons</Link>
            <Link href="/admin/users" className="block px-3 py-2 rounded hover:bg-gray-100">👤 Users</Link>
          </nav>
        </aside>

        {/* Main */}
        <main className="col-span-12 md:col-span-10 p-6">{children}</main>
      </div>
    </div>
  );
}