import Image from "next/image";
import { Star } from "lucide-react";

type TestimonialCardProps = {
  quote: string;
  name: string;
  location: string;
  rating?: number;
  service?: string;
  avatar?: string;
};

const MAX_STARS = 5;

export function TestimonialCard({ quote, name, location, rating = 5, service, avatar }: TestimonialCardProps) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const clampedRating = Math.min(Math.max(rating, 0), MAX_STARS);
  const ratingLabel = Number.isInteger(clampedRating) ? clampedRating.toFixed(0) : clampedRating.toFixed(1);

  return (
    <figure className="flex h-full flex-col rounded-3xl border border-slate-100 bg-white/95 p-6 shadow-md transition hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-amber-600">
          {Array.from({ length: MAX_STARS }).map((_, index) => (
            <Star
              key={`${name}-star-${index}`}
              size={16}
              className={index < clampedRating ? "text-amber-400 fill-amber-400" : "text-slate-300"}
            />
          ))}
          <span className="ml-1 text-xs font-semibold text-amber-700">{ratingLabel}</span>
        </div>
        {service && <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-400">{service}</span>}
      </div>
      <p className="text-base leading-relaxed text-slate-800">“{quote}”</p>
      <figcaption className="mt-auto flex items-center gap-4 pt-6 text-sm text-slate-500">
        {avatar ? (
          <Image
            src={avatar}
            alt={name}
            width={48}
            height={48}
            className="h-12 w-12 rounded-full object-cover ring-2 ring-blue-100"
          />
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold uppercase text-slate-600 ring-2 ring-white shadow-inner">
            {initials}
          </div>
        )}
        <div>
          <p className="font-semibold text-slate-900">{name}</p>
          <p>{location}</p>
        </div>
      </figcaption>
    </figure>
  );
}