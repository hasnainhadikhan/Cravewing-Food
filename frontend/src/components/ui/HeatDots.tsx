import { RED, ORANGE, GOLD } from "../../constants/brand";

interface HeatDotsProps {
  level: number;
  size?: number;
}

/**
 * Branded 5-segment heat meter using a flame glyph instead of plain dots or the
 * a flame emoji. Filled flames pick up a red-to-gold gradient so higher heat reads hotter.
 */
export default function HeatDots({ level, size = 16 }: HeatDotsProps) {
  const heatColor = (i: number) => (i <= 2 ? GOLD : i <= 3 ? ORANGE : RED);
  return (
    <div className="flex gap-1 items-center" aria-label={`Heat level ${level} of 5`}>
      {[1, 2, 3, 4, 5].map((i) => {
        const on = i <= level;
        return (
          <svg
            key={i}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            className="transition-all duration-300"
            style={{
              fill: on ? heatColor(i) : "transparent",
              stroke: on ? heatColor(i) : "rgba(214,41,30,0.28)",
              strokeWidth: 1.6,
              filter: on ? `drop-shadow(0 0 4px ${heatColor(i)}66)` : "none",
            }}
          >
            <path d="M12 2c1 3.5-1.5 5-1.5 7 0 1.2.8 2 1.9 2 1.4 0 2.1-1.1 2-2.6C16.6 11 18 13 18 15.5A6 6 0 1 1 6 15.5C6 11.5 9.5 9 9 5.5 10.5 5 11.6 3.7 12 2Z" />
          </svg>
        );
      })}
    </div>
  );
}
