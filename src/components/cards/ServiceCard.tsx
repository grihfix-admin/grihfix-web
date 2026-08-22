"use client";

import Link from "next/link";
import { Clock3 } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { getServiceIcon, type ServiceIconId } from "@/lib/serviceIcons";
import { cn } from "@/lib/utils";

type ServiceCardProps = {
  iconId: ServiceIconId;
  title: string;
  titleHi?: string;
  description: string;
  descriptionHi?: string;
  bullets: string[];
  bulletsHi?: string[];
  startingPrice?: string;
  href?: string;
  actionLabel?: string;
  highlight?: string;
  highlightHi?: string;
  className?: string;
  timeRequired?: string;
  timeRequiredHi?: string;
};

export function ServiceCard({
  iconId,
  title,
  titleHi,
  description,
  descriptionHi,
  bullets,
  bulletsHi,
  startingPrice,
  href = "/contact",
  actionLabel,
  highlight,
  highlightHi,
  className,
  timeRequired,
  timeRequiredHi,
}: ServiceCardProps) {
  const { lang, t } = useLanguage();
  const isHi = lang === "hi";
  const Icon = getServiceIcon(iconId);

  const displayTitle = isHi && titleHi ? titleHi : title;
  const displayDescription = isHi && descriptionHi ? descriptionHi : description;
  const displayBullets = isHi && bulletsHi?.length ? bulletsHi : bullets;
  const displayHighlight = isHi && highlightHi ? highlightHi : highlight;
  const displayTime = isHi && timeRequiredHi ? timeRequiredHi : timeRequired;
  const cta = actionLabel ?? t("common.getEstimate");

  return (
    <div
      className={cn(
        "group flex h-full flex-col rounded-3xl border border-slate-100/80 bg-white/90 p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-saffron-200/70 hover:bg-white hover:shadow-2xl",
        className
      )}
    >
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 via-white to-blue-100 text-blue-600 ring-1 ring-inset ring-blue-100/60 transition duration-300 group-hover:scale-105">
          <Icon className="h-7 w-7" strokeWidth={1.75} aria-hidden />
        </div>
        <div>
          <h3 className="font-display text-xl font-semibold text-slate-900">{displayTitle}</h3>
          {startingPrice && (
            <p className="text-sm text-slate-500">
              {t("common.startingAt")} {startingPrice}
            </p>
          )}
        </div>
        {displayHighlight && (
          <span className="ml-auto hidden rounded-full bg-saffron-50 px-3 py-1 text-xs font-semibold uppercase text-saffron-700 md:inline-flex">
            {displayHighlight}
          </span>
        )}
      </div>

      <p className="mt-4 text-sm text-slate-600">{displayDescription}</p>

      {displayTime && (
        <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600 ring-1 ring-inset ring-slate-100">
          <Clock3 size={14} className="text-blue-600" />
          <span>{displayTime}</span>
        </div>
      )}

      <ul className="mt-4 space-y-2 text-sm text-slate-700">
        {displayBullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-2">
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      {displayHighlight && (
        <p className="mt-3 text-sm font-semibold text-saffron-700 md:hidden">{displayHighlight}</p>
      )}

      <div className="mt-auto space-y-2 pt-6">
        <Button href={href} size="md" className="w-full sm:w-auto">
          {cta}
        </Button>
        <Link
          href={href}
          className="inline-flex items-center text-sm font-medium text-blue-600 transition hover:text-blue-700"
        >
          {t("common.learnMore")} →
        </Link>
      </div>
    </div>
  );
}
