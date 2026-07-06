import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "motion/react";

interface AnimatedCounterProps {
  /** numeric target, e.g. 500 */
  value: number;
  /** text appended after the number, e.g. "+" or "%" */
  suffix?: string;
  prefix?: string;
  style?: React.CSSProperties;
  className?: string;
}

/**
 * Counts up from 0 to `value` the first time it scrolls into view.
 */
export default function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  style,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 60, damping: 18 });

  useEffect(() => {
    if (inView) mv.set(value);
  }, [inView, value, mv]);

  useEffect(() => {
    return spring.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${Math.round(latest)}${suffix}`;
      }
    });
  }, [spring, prefix, suffix]);

  return (
    <span ref={ref} style={style} className={className}>
      {prefix}0{suffix}
    </span>
  );
}
