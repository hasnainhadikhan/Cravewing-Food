import { motion } from "motion/react";
import type { Variants } from "motion/react";
import { fadeUp } from "../../lib/motion";

interface RevealProps {
  children: React.ReactNode;
  variants?: Variants;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  /** viewport amount (0-1) before triggering */
  amount?: number;
  once?: boolean;
  as?: "div" | "section" | "li" | "span";
}

/**
 * Drop-in wrapper that reveals its child once it scrolls into view.
 * Defaults to a soft fade-up; pass any variant for other motion.
 */
export default function Reveal({
  children,
  variants = fadeUp,
  className,
  style,
  delay = 0,
  amount = 0.25,
  once = true,
  as = "div",
}: RevealProps) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      style={style}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </MotionTag>
  );
}
