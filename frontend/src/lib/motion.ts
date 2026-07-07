// ─── Shared Framer Motion variants ─────────────────────────────────────────────
// A small, reusable vocabulary of motion so the whole site animates consistently.
import type { Variants } from "motion/react";

// A tactile, slightly-overshooting ease used across the site.
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;
export const EASE_SPRING = [0.34, 1.56, 0.64, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: EASE_OUT } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE_SPRING } },
};

// Blur + rise reveal — a distinct signature for sauce / feature cards.
export const blurIn: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(12px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE_OUT },
  },
};

export const fromLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE_OUT } },
};

export const fromRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE_OUT } },
};

// Container that staggers its children on reveal.
export const stagger = (gap = 0.1, delay = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: gap, delayChildren: delay },
  },
});

// A word / letter reveal used for kinetic headlines.
export const wordUp: Variants = {
  hidden: { opacity: 0, y: "110%", rotate: 4 },
  show: {
    opacity: 1,
    y: "0%",
    rotate: 0,
    transition: { duration: 0.75, ease: EASE_OUT },
  },
};
