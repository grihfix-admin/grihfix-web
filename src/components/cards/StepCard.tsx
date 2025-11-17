import Image from "next/image";

import { cn } from "@/lib/utils";

type StepCardProps = {
  step: number | string;
  title: string;
  description: string;
  icon: string;
  className?: string;
};

export function StepCard({ step, title, description, icon, className }: StepCardProps) {
  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm",
        className
      )}
    >
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-xl font-bold text-blue-600">
        <Image src={icon} alt={title} width={32} height={32} className="h-8 w-8 object-contain" />
      </div>
      <p className="mt-4 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Step {step}</p>
      <h3 className="mt-2 text-xl font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm text-slate-600">{description}</p>
    </div>
  );
}

