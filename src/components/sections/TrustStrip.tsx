"use client";

import { Banknote, Clock3, MessageCircle, ShieldCheck, Sparkles } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function TrustStrip() {
  const { t } = useLanguage();

  const items = [
    { icon: Clock3, labelKey: "trust.onTime" as const },
    { icon: ShieldCheck, labelKey: "trust.verifiedStaff" as const },
    { icon: Sparkles, labelKey: "trust.transparentPricing" as const },
    { icon: Banknote, labelKey: "trust.securePayments" as const },
    { icon: MessageCircle, labelKey: "trust.support" as const },
  ];

  return (
    <div className="border-y border-slate-100 bg-slate-50/70">
      <Container className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-4 text-center">
        {items.map((item) => (
          <div key={item.labelKey} className="flex items-center gap-2 text-sm font-medium text-slate-600">
            <item.icon className="h-4 w-4 text-saffron-600" />
            <span>{t(item.labelKey)}</span>
          </div>
        ))}
      </Container>
    </div>
  );
}
