"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

type LanguageToggleProps = {
  className?: string;
  /** Use light styling when placed on a dark background (e.g. footer). */
  variant?: "light" | "dark";
};

export function LanguageToggle({ className, variant = "dark" }: LanguageToggleProps) {
  const { lang, setLang } = useLanguage();

  const isLight = variant === "light";

  return (
    <div
      role="group"
      aria-label="Select language / भाषा चुनें"
      className={cn(
        "inline-flex items-center rounded-full p-1 text-xs font-semibold",
        isLight ? "bg-white/10 ring-1 ring-inset ring-white/20" : "bg-slate-100 ring-1 ring-inset ring-slate-200",
        className
      )}
    >
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className={cn(
          "rounded-full px-3 py-1 transition",
          lang === "en"
            ? "bg-saffron-500 text-white shadow-sm"
            : isLight
              ? "text-white/80 hover:text-white"
              : "text-slate-500 hover:text-slate-700"
        )}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLang("hi")}
        aria-pressed={lang === "hi"}
        className={cn(
          "rounded-full px-3 py-1 transition",
          lang === "hi"
            ? "bg-saffron-500 text-white shadow-sm"
            : isLight
              ? "text-white/80 hover:text-white"
              : "text-slate-500 hover:text-slate-700"
        )}
      >
        हिं
      </button>
    </div>
  );
}
