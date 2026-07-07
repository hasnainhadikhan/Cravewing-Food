import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import { menuCategories } from "../../constants/data";

interface MenuCardProps {
  cat: (typeof menuCategories)[0];
  index: number;
}

export default function MenuCard({ cat, index }: MenuCardProps) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);

  // ── 3D tilt that follows the cursor — the menu grid's own motion signature ──
  const mx = useMotionValue(0); // -0.5 … 0.5
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), { stiffness: 250, damping: 20 });
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 250, damping: 20 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const reset = () => {
    setHovered(false);
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className="group relative flex flex-col overflow-hidden cursor-pointer"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: (index % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      style={{
        borderRadius: 16,
        background: "#fff",
        border: "1px solid #eadfce",
        rotateX,
        rotateY,
        transformPerspective: 900,
        y: hovered ? -6 : 0,
        boxShadow: hovered
          ? "0 22px 46px -18px rgba(214,41,30,0.30), inset 0 1px 0 rgba(255,255,255,0.7)"
          : "0 1px 2px rgba(34,26,23,0.05), 0 12px 30px -14px rgba(34,26,23,0.18)",
        transition: "box-shadow 0.3s, transform 0.3s",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onClick={() => navigate("/menu")}
    >
      {/* Product image on a clean, light backdrop */}
      <div className="relative flex h-52 items-center justify-center overflow-hidden bg-gradient-to-b from-[#faf3e9] to-white">
        <img
          src={cat.img}
          alt={cat.title}
          loading="lazy"
          className="food-img h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <h3 style={{ fontFamily: "Anton, sans-serif", fontSize: 22, color: "#221A17", letterSpacing: 0.5 }}>
          {cat.title.toUpperCase()}
        </h3>
        <p className="line-clamp-2 min-h-[2.5rem] mt-1.5 text-sm leading-6 text-[#5E5650] font-[Inter,_sans-serif]">
          {cat.items.join(" · ")}
        </p>

        <div className="mt-auto pt-4">
          <button
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#D6291E] py-3 text-sm font-bold uppercase tracking-[0.06em] text-white transition duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:brightness-110 font-[Inter,_sans-serif]"
          >
            View Menu <ArrowRight size={16} strokeWidth={2.6} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
