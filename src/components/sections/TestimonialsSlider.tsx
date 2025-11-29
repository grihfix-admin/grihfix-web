"use client";

import { useEffect, useMemo, useRef } from "react";

import { TestimonialCard } from "@/components/cards/TestimonialCard";
import { testimonials } from "@/content/testimonials";

export function TestimonialsSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const isPausedRef = useRef(false);

  const duplicatedTestimonials = useMemo(() => [...testimonials, ...testimonials], [testimonials]);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let frameId: number;
    const speed = 0.4;

    const tick = () => {
      if (!sliderRef.current) return;
      const container = sliderRef.current;
      if (!isPausedRef.current) {
        container.scrollLeft += speed;
        const halfWidth = container.scrollWidth / 2;
        if (container.scrollLeft >= halfWidth) {
          container.scrollLeft -= halfWidth;
        }
      }
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const pauseScroll = () => {
    isPausedRef.current = true;
  };

  const resumeScroll = () => {
    isPausedRef.current = false;
  };

  return (
    <div className="relative">
      <span className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white via-white/80 to-transparent" />
      <span className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white via-white/80 to-transparent" />
      <div
        ref={sliderRef}
        className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 touch-pan-x"
        onMouseEnter={pauseScroll}
        onMouseLeave={resumeScroll}
        onTouchStart={pauseScroll}
        onTouchEnd={resumeScroll}
      >
        {duplicatedTestimonials.map((testimonial, index) => (
          <div key={`${testimonial.id}-${index}`} className="min-w-[260px] snap-center md:min-w-[320px] md:flex-[0_0_33%]">
            <TestimonialCard {...testimonial} />
          </div>
        ))}
      </div>
      <p className="mt-2 text-sm text-slate-500 md:hidden">Swipe sideways to see more stories →</p>
    </div>
  );
}


