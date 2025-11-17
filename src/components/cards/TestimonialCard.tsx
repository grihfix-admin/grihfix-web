type TestimonialCardProps = {
  quote: string;
  name: string;
  area: string;
};

export function TestimonialCard({ quote, name, area }: TestimonialCardProps) {
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <p className="text-lg font-medium text-slate-900">“{quote}”</p>
      <figcaption className="mt-auto pt-6 text-sm text-slate-500">
        <p className="font-semibold text-slate-900">{name}</p>
        <p>{area}</p>
      </figcaption>
    </figure>
  );
}

