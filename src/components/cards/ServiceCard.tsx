import Image from "next/image";

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
}: ServiceCardProps) {
  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50">
          <Image src={icon} alt={title} width={40} height={40} className="h-10 w-10 object-contain" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
          {startingPrice && <p className="text-sm text-slate-500">Starting at {startingPrice}</p>}
        </div>
      </div>

      <p className="mt-4 text-sm text-slate-600">{description}</p>

      <ul className="mt-4 space-y-2 text-sm text-slate-700">
        {bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-2">
            <span className="mt-1 h-2 w-2 rounded-full bg-blue-500" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      {highlight && (
        <p className="mt-3 text-sm font-semibold text-amber-600">
          {highlight}
        </p>
      )}

      <div className="mt-auto pt-6">
        <Button href={href} size="md">
          {actionLabel}
        </Button>
      </div>
    </div>
  );
}

