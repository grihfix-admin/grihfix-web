"use client";

import { MessageCircle } from "lucide-react";

const WHATSAPP_LINK = "https://wa.me/919709870726?text=Hi%20GrihFix%2C%20I%20need%20help%20with%20a%20home%20service.";

export function WhatsappFloat() {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with GrihFix on WhatsApp"
      className="fixed bottom-20 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl ring-4 ring-white/60 transition hover:scale-105 md:bottom-6"
    >
      <MessageCircle className="h-7 w-7" fill="white" strokeWidth={0} aria-hidden />
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-20" />
    </a>
  );
}
