import React from "react";
import { CHAR, GREY, ORANGE, GOLD } from "../../constants/brand";

interface SectionTitleProps {
  children: React.ReactNode;
  /** Small uppercase label above the title — the editorial "eyebrow". */
  eyebrow?: string;
  sub?: string;
  light?: boolean;
  align?: "center" | "left";
}

export default function SectionTitle({
  children,
  eyebrow,
  sub,
  light,
  align = "center",
}: SectionTitleProps) {
  const isLeft = align === "left";
  return (
    <div className={`${isLeft ? "text-left" : "text-center"} mb-12`}>
      {eyebrow && (
        <div className={`flex items-center gap-3 mb-4 ${isLeft ? "justify-start" : "justify-center"}`}>
          <span className="h-px w-8" style={{ background: light ? "rgba(255,255,255,0.35)" : "rgba(34,26,23,0.2)" }} />
          <span className="eyebrow" style={{ color: light ? GOLD : ORANGE }}>
            {eyebrow}
          </span>
          <span className="h-px w-8" style={{ background: light ? "rgba(255,255,255,0.35)" : "rgba(34,26,23,0.2)" }} />
        </div>
      )}
      <h2
        style={{
          fontFamily: "Anton, sans-serif",
          fontSize: "clamp(32px, 5vw, 52px)",
          color: light ? "#fff" : CHAR,
          letterSpacing: 1,
          lineHeight: 1.05,
        }}
      >
        {children}
      </h2>
      {sub && (
        <p
          className={isLeft ? "max-w-[54ch]" : "max-w-[54ch] mx-auto"}
          style={{
            fontFamily: "Inter, sans-serif",
            color: light ? "rgba(255,255,255,0.72)" : GREY,
            marginTop: 14,
            fontSize: 16.5,
            lineHeight: 1.65,
          }}
        >
          {sub}
        </p>
      )}
    </div>
  );
}
