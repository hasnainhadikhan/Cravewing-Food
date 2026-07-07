import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { RED, GOLD } from "../../constants/brand";
import type { FlyPayload } from "../../lib/cartFly";

interface Fly extends FlyPayload {
  id: number;
  tx: number;
  ty: number;
}

/**
 * Overlay that animates a little food puck from an "Add to cart" button up into
 * an arc and down onto the nav cart icon (any element tagged [data-cart-icon]).
 * Mounted once near the app root.
 */
export default function CartFly() {
  const [flies, setFlies] = useState<Fly[]>([]);

  useEffect(() => {
    let n = 0;
    const handler = (e: Event) => {
      const d = (e as CustomEvent<FlyPayload>).detail;
      const targets = Array.from(
        document.querySelectorAll<HTMLElement>("[data-cart-icon]")
      );
      const target = targets.find((t) => t.getBoundingClientRect().width > 0);
      if (!target) return;
      const r = target.getBoundingClientRect();
      const fly: Fly = {
        ...d,
        id: ++n,
        tx: r.left + r.width / 2,
        ty: r.top + r.height / 2,
      };
      setFlies((f) => [...f, fly]);
      window.setTimeout(() => setFlies((f) => f.filter((x) => x.id !== fly.id)), 950);
    };
    window.addEventListener("crave:fly", handler);
    return () => window.removeEventListener("crave:fly", handler);
  }, []);

  return (
    <div className="fixed inset-0 z-[90] pointer-events-none overflow-hidden">
      <AnimatePresence>
        {flies.map((f) => (
          <motion.div
            key={f.id}
            initial={{ x: f.x, y: f.y, opacity: 1, scale: 1, rotate: 0 }}
            animate={{
              x: f.tx,
              // arc: rise before dropping onto the cart
              y: [f.y, Math.min(f.y, f.ty) - 150, f.ty],
              opacity: [1, 1, 0.2],
              scale: [1, 0.9, 0.35],
              rotate: 40,
            }}
            transition={{ duration: 0.85, ease: [0.4, 0, 0.4, 1], times: [0, 0.5, 1] }}
            style={{
              position: "fixed",
              left: 0,
              top: 0,
              width: 54,
              height: 54,
              marginLeft: -27,
              marginTop: -27,
              borderRadius: "50%",
              overflow: "hidden",
              border: `2px solid ${GOLD}`,
              boxShadow: `0 10px 26px ${RED}88`,
              background: RED,
            }}
          >
            {f.image && (
              <img src={f.image} alt="" className="w-full h-full object-cover" />
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
