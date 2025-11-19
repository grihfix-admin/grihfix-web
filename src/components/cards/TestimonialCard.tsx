import { Star } from "lucide-react";

type TestimonialCardProps = {
  quote: string;
  name: string;
  location: string;
  rating?: number;
};

const MAX_STARS = 5;

export function TestimonialCard({ quote, name, location, rating = 5 }: TestimonialCardProps) {
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="mb-4 flex gap-1">
        {Array.from({ length: MAX_STARS }).map((_, index) => (
          <Star
            key={`${name}-star-${index}`}
            size={16}
            className={index < rating ? "text-yellow-400 fill-yellow-400" : "text-slate-300"}
          />
        ))}
      </div>
      <p className="text-lg font-medium text-slate-900">“{quote}”</p>
      <figcaption className="mt-auto pt-6 text-sm text-slate-500">
        <p className="font-semibold text-slate-900">{name}</p>
        <p>{location}</p>
      </figcaption>
    </figure>
  );
}

