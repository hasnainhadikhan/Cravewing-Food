import React from "react";
import { CHAR, GREY } from "../../constants/brand";

interface SectionTitleProps {
  children: React.ReactNode;
  sub?: string;
  light?: boolean;
}

export default function SectionTitle({ children, sub, light }: SectionTitleProps) {
  return (
    <div className="text-center mb-12">
      <h2
        style={{
          fontFamily: "Anton, sans-serif",
          fontSize: "clamp(32px, 5vw, 52px)",
          color: light ? "#fff" : CHAR,
          letterSpacing: 1,
          lineHeight: 1.1,
        }}
      >
        {children}
      </h2>
      {sub && (
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            color: light ? "rgba(255,255,255,0.7)" : GREY,
            marginTop: 12,
            fontSize: 16,
          }}
        >
          {sub}
        </p>
      )}
    </div>
  );
}
