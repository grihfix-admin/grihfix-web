// src/app/admin/layout.tsx
import Link from "next/link";

import { AdminLogoutButton } from "@/components/admin/AdminLogoutButton";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <div>
            <Link href="/admin" className="text-lg font-semibold tracking-tight text-slate-800">
              GrihFix Admin
            </Link>
            <p className="text-xs text-slate-500">Manage customer bookings & updates.</p>
          </div>
          <AdminLogoutButton />
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </div>
  );
}