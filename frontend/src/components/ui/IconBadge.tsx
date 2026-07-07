import React from "react";
import { ORANGE } from "../../constants/brand";

interface IconBadgeProps {
  /** A lucide icon component, e.g. `Award`. */
  icon: React.ElementType;
  /** Brand color for the glyph + tint. Defaults to orange. */
  color?: string;
  /** Container size in px. */
  size?: number;
  className?: string;
}

/**
 * Gives icons real presence: a tinted brand-colored container with a heavier
 * stroke, so glyphs match the bold Anton headlines instead of reading as thin
 * grey "default" lines. Use everywhere in place of a bare <Icon /> in cards/lists.
 */
export default function IconBadge({ icon: Icon, color = ORANGE, size = 48, className = "" }: IconBadgeProps) {
  return (
    <span
      className={`inline-flex items-center justify-center shrink-0 ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.32,
        background: `${color}18`,
        border: `1px solid ${color}30`,
        color,
      }}
    >
      <Icon size={size * 0.46} strokeWidth={2.4} />
    </span>
  );
}
