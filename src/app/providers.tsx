"use client";

import type { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

import { LanguageProvider } from "@/lib/i18n/LanguageProvider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      {children}
      <Toaster position="top-right" />
    </LanguageProvider>
  );
}
