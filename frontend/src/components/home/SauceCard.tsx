import { useState } from "react";
import { motion } from "motion/react";
import { CHAR, GREY } from "../../constants/brand";
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.08, ease: [0.22, 1, 0.36, 1] }}
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
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
            style={{ background: sauce.color }}
          >
            🔥
          </div>
          <h3
            style={{
              fontFamily: "Anton, sans-serif",
              fontSize: 18,
              color: CHAR,
              textAlign: "center",
              letterSpacing: 0.5,
            }}
          >
            {sauce.name.toUpperCase()}
          </h3>
          <HeatDots level={sauce.heat} />
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: GREY, textAlign: "center" }}>
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
