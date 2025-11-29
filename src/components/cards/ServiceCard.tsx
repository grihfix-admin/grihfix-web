import Image from "next/image";
import Link from "next/link";
import { Clock3 } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type ServiceCardProps = {
  icon: string;
  title: string;
  description: string;
  bullets: string[];
  startingPrice?: string;
  href?: string;
  actionLabel?: string;
  highlight?: string;
  className?: string;
  timeRequired?: string;
};

export function ServiceCard({
  icon,
  title,
  description,
  bullets,
  startingPrice,
  href = "/contact",
  actionLabel = "Get Estimate",
  highlight,
  className,
  timeRequired,
}: ServiceCardProps) {
  return (
    <div
      className={cn(
        "group flex h-full flex-col rounded-3xl border border-slate-100/80 bg-white/90 p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-200/70 hover:bg-white hover:shadow-2xl",
        className
      )}
    >
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 via-white to-blue-100 text-blue-600 ring-1 ring-inset ring-blue-100/60 transition duration-300 group-hover:scale-105">
          <Image src={icon} alt={title} width={40} height={40} className="h-9 w-9 object-contain mix-blend-multiply" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
          {startingPrice && <p className="text-sm text-slate-500">Starting at {startingPrice}</p>}
        </div>
        {highlight && (
          <span className="ml-auto hidden rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold uppercase text-amber-600 md:inline-flex">
            {highlight}
          </span>
        )}
      </div>

      <p className="mt-4 text-sm text-slate-600">{description}</p>

      {timeRequired && (
        <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600 ring-1 ring-inset ring-slate-100">
          <Clock3 size={14} className="text-blue-600" />
          <span>{timeRequired}</span>
        </div>
      )}

      <ul className="mt-4 space-y-2 text-sm text-slate-700">
        {bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-2">
            <span className="mt-1 h-2 w-2 rounded-full bg-blue-500" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      {highlight && (
        <p className="mt-3 text-sm font-semibold text-amber-600 md:hidden">
          {highlight}
        </p>
      )}

      <div className="mt-auto space-y-2 pt-6">
        <Button href={href} size="md" className="w-full sm:w-auto">
          {actionLabel}
        </Button>
        <Link
          href={href}
          className="inline-flex items-center text-sm font-medium text-blue-600 transition hover:text-blue-700"
        >
          Learn more →
        </Link>
      </div>
    </div>
  );
}