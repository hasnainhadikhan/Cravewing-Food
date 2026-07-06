import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { RED, GOLD, CHAR } from "../../constants/brand";
import { menuCategories } from "../../constants/data";

interface MenuCardProps {
  cat: (typeof menuCategories)[0];
  index: number;
}

export default function MenuCard({ cat, index }: MenuCardProps) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <motion.div
      className="cursor-pointer rounded-2xl overflow-hidden relative group"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: (index % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
      style={{
        boxShadow: hovered ? "0 22px 44px rgba(0,0,0,0.22)" : "0 4px 16px rgba(0,0,0,0.08)",
        transition: "box-shadow 0.3s",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate("/menu")}
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden" style={{ background: CHAR }}>
        <img
          src={cat.img}
          alt={cat.title}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{ transform: hovered ? "scale(1.08)" : "scale(1)" }}
        />
        <div
          className="absolute inset-0 transition-all duration-300"
          style={{ background: hovered ? "rgba(34,26,23,0.7)" : "rgba(34,26,23,0.15)" }}
        />
        {hovered && (
          <div className="absolute inset-0 flex flex-col justify-center px-6 py-4">
            {cat.items.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="text-white text-sm py-1 flex items-center gap-2"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: GOLD }} />
                {item}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-5 py-4 flex items-center justify-between" style={{ background: "#fff" }}>
        <h3 style={{ fontFamily: "Anton, sans-serif", fontSize: 22, color: CHAR, letterSpacing: 0.5 }}>
          {cat.title.toUpperCase()}
        </h3>
        <motion.div
          className="p-1.5 rounded-full"
          animate={{ rotate: hovered ? -45 : 0 }}
          style={{ background: hovered ? RED : GOLD }}
        >
          <ArrowRight size={16} color="#fff" />
        </motion.div>
      </div>
    </motion.div>
  );
}
