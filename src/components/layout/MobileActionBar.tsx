"use client";

import Link from "next/link";
import { CalendarCheck, MessageCircle, PhoneCall } from "lucide-react";

import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function MobileActionBar() {
  const { t } = useLanguage();

  return (
    <nav
      aria-label="Quick actions"
      className="mobile-actionbar fixed inset-x-0 bottom-0 z-40 flex items-stretch border-t border-slate-200 bg-white/95 shadow-[0_-4px_20px_rgba(15,23,42,0.08)] backdrop-blur md:hidden"
    >
      <a
        href="tel:+919709870726"
        className="flex flex-1 flex-col items-center justify-center gap-0.5 py-2.5 text-xs font-semibold text-slate-600 active:bg-slate-50"
      >
        <PhoneCall className="h-5 w-5 text-blue-600" />
        {t("nav.callNow")}
      </a>
      <a
        href="https://wa.me/919709870726"
        target="_blank"
        rel="noreferrer"
        className="flex flex-1 flex-col items-center justify-center gap-0.5 border-x border-slate-100 py-2.5 text-xs font-semibold text-slate-600 active:bg-slate-50"
      >
        <MessageCircle className="h-5 w-5 text-[#25D366]" />
        WhatsApp
      </a>
      <Link
        href="/contact"
        className="flex flex-1 flex-col items-center justify-center gap-0.5 bg-saffron-500 py-2.5 text-xs font-semibold text-white active:bg-saffron-600"
      >
        <CalendarCheck className="h-5 w-5" />
        {t("nav.bookService")}
      </Link>
    </nav>
  );
}
