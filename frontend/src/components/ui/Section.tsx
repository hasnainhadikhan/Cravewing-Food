import React from "react";

interface SectionProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  id?: string;
}

export default function Section({ children, style, className, id }: SectionProps) {
  return (
    <section id={id} className={`py-20 px-4 ${className || ""}`} style={style}>
      {children}
    </section>
  );
}
