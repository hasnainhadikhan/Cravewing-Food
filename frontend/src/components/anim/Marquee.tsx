import { motion } from "motion/react";

interface MarqueeProps {
  items: string[];
  /** seconds for one full loop */
  speed?: number;
  reverse?: boolean;
  background?: string;
  color?: string;
  separatorColor?: string;
}

/**
 * An infinite kinetic ticker strip ("HAND-SAUCED • NEVER FROZEN • …").
 * Two identical tracks translated -50% give a seamless loop.
 */
export default function Marquee({
  items,
  speed = 22,
  reverse = false,
  background,
  color = "#fff",
  separatorColor,
}: MarqueeProps) {
  const track = [...items, ...items];
  return (
    <div
      className="relative overflow-hidden"
      style={{ background }}
      aria-hidden
    >
      <motion.div
        className="flex whitespace-nowrap"
        style={{ willChange: "transform" }}
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: speed, ease: "linear", repeat: Infinity }}
      >
        {track.map((item, i) => (
          <span key={i} className="flex items-center">
            <span
              style={{
                fontFamily: "Anton, sans-serif",
                fontSize: "clamp(22px, 3vw, 40px)",
                letterSpacing: 2,
                color,
                padding: "14px 28px",
              }}
            >
              {item}
            </span>
            <span
              style={{
                fontSize: "clamp(14px, 2vw, 22px)",
                color: separatorColor || color,
                opacity: 0.6,
              }}
            >
              ✦
            </span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
