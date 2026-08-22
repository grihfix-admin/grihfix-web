import { ReactNode } from "react";

import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

type SectionProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  align?: "left" | "center";
  background?: "default" | "muted" | "brand";
  className?: string;
  children?: ReactNode;
  id?: string;
};

const backgroundMap = {
  default: "bg-white",
  muted: "bg-slate-50",
  brand: "bg-gradient-to-br from-blue-600 via-blue-500 to-sky-400 text-white",
};

export function Section({
  eyebrow,
  title,
  description,
  align = "left",
  background = "default",
  className,
  children,
  id,
}: SectionProps) {
  const isCentered = align === "center";

  return (
    <section id={id} className={cn("py-12 sm:py-16", backgroundMap[background], className)}>
      <Container>
        {(eyebrow || title || description) && (
          <div className={cn("mb-10", isCentered ? "text-center mx-auto max-w-3xl" : "max-w-2xl")}>
            {eyebrow && (
              <p className={cn("text-sm font-semibold uppercase tracking-[0.2em]", background === "brand" ? "text-white/80" : "text-blue-600")}>
                {eyebrow}
              </p>
            )}
            {title && (
              <h2
                className={cn(
                  "mt-2 text-3xl font-bold sm:text-4xl",
                  background === "brand" ? "text-white" : "text-slate-900"
                )}
              >
                {title}
              </h2>
            )}
            {description && (
              <p
                className={cn(
                  "mt-4 text-base sm:text-lg",
                  background === "brand" ? "text-white/90" : "text-slate-600"
                )}
              >
                {description}
              </p>
            )}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}

