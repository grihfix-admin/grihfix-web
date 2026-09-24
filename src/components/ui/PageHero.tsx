"use client";

import type { ReactNode } from "react";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description?: string;
  /** CTA buttons, stat chips, etc. rendered below the description. */
  children?: ReactNode;
  className?: string;
  size?: "default" | "compact";
};

/**
 * The single dark hero treatment used at the top of every marketing page
 * (Home, Services, Pricing, About, Contact). Centralising it here is what
 * keeps the "gradient navy hero with brand-blue/red glow + eyebrow pill"
 * look identical everywhere instead of each page hand-rolling its own.
 */
export function PageHero({ eyebrow, title, description, children, className, size = "default" }: PageHeroProps) {
  return (
    <section className={cn("hero-gradient relative overflow-hidden text-white", className)}>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-900/10 via-slate-900/50 to-slate-950/90" />
      <div className="pointer-events-none absolute -left-10 top-10 h-56 w-56 rounded-full bg-sky-400/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 translate-y-1/3 rounded-full bg-accent-500/20 blur-3xl" />
      <Container className={cn("relative", size === "compact" ? "py-12 sm:py-14" : "py-16 sm:py-20")}>
        <Reveal>
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <span className="rounded-full border border-white/40 px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-blue-100">
              {eyebrow}
            </span>
            <h1 className="font-display mt-6 text-4xl font-semibold leading-tight sm:text-5xl">{title}</h1>
            {description && <p className="mt-4 text-base text-white/80">{description}</p>}
            {children && <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">{children}</div>}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
