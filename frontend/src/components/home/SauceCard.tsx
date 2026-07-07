import { useState } from "react";
import { motion } from "motion/react";
import { Flame } from "lucide-react";
import HeatDots from "../ui/HeatDots";
import { sauces } from "../../constants/data";

interface SauceCardProps {
  sauce: (typeof sauces)[0];
  index: number;
}

export default function SauceCard({ sauce, index }: SauceCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      className="cursor-pointer select-none"
      initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: (index % 6) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.04 }}
      style={{ perspective: 600 }}
      onClick={() => setFlipped((f) => !f)}
    >
      <div
        style={{
          position: "relative",
          height: 220,
          transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1)",
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center gap-3 p-5"
          style={{
            backfaceVisibility: "hidden",
            background: sauce.color + "22",
            border: `2px solid ${sauce.color}40`,
          }}
        >
          <div className="relative w-20 h-20">
            {/* Round sauce photo, tinted toward the sauce's brand color */}
            <div
              className="w-20 h-20 rounded-full overflow-hidden relative"
              style={{ border: `3px solid ${sauce.color}`, boxShadow: `0 6px 18px ${sauce.color}55` }}
            >
              <img
                src={sauce.img}
                alt={sauce.name}
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{ background: sauce.color, mixBlendMode: "color", opacity: 0.55 }}
              />
              <div className="absolute inset-0" style={{ background: `${sauce.color}22` }} />
            </div>
            {/* Flame badge */}
            <div
              className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center"
              style={{ background: sauce.color, border: "2px solid #fff" }}
            >
              <Flame size={14} color="#fff" fill="#ffffff66" strokeWidth={2.2} />
            </div>
          </div>
          <h3
            style={{
              fontFamily: "Anton, sans-serif",
              fontSize: 18,
              color: "#fff",
              textAlign: "center",
              letterSpacing: 0.5,
              textShadow: "0 1px 6px rgba(0,0,0,0.4)",
            }}
          >
            {sauce.name.toUpperCase()}
          </h3>
          <HeatDots level={sauce.heat} />
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "rgba(255,255,255,0.75)", textAlign: "center" }}>
            Tap to reveal
          </p>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center gap-4 p-6"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: sauce.color,
            color: "#fff",
          }}
        >
          <h3
            style={{ fontFamily: "Anton, sans-serif", fontSize: 18, letterSpacing: 0.5, textAlign: "center" }}
          >
            {sauce.name.toUpperCase()}
          </h3>
          <p
            style={{ fontFamily: "Inter, sans-serif", fontSize: 13, textAlign: "center", lineHeight: 1.6 }}
          >
            {sauce.desc}
          </p>
          <div>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 11,
                color: "rgba(255,255,255,0.7)",
                marginBottom: 6,
                textAlign: "center",
              }}
            >
              HEAT LEVEL
            </p>
            <HeatDots level={sauce.heat} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
