"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Stagger delay in seconds — use for grids where items should cascade in. */
  delay?: number;
  className?: string;
  /** Distance (px) the element travels while fading in. */
  distance?: number;
};

/**
 * Fades + slides content in once when it scrolls into view. Only animates
 * once (`once: true`) so re-scrolling past a section doesn't re-trigger it.
 */
export function Reveal({ children, delay = 0, className, distance = 20 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: { opacity: 0, y: distance },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Wraps a grid/list of children so each direct child staggers in with a
 * small delay after the previous one. Pass the same children you'd normally
 * .map() — this just wraps each in a Reveal with an incrementing delay.
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
}: {
  children: ReactNode[];
  className?: string;
  stagger?: number;
}) {
  return (
    <div className={className}>
      {children.map((child, i) => (
        <Reveal key={i} delay={i * stagger}>
          {child}
        </Reveal>
      ))}
    </div>
  );
}
