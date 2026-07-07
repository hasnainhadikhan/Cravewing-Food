import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Flame } from "lucide-react";
import { RED, GOLD, CHAR } from "../../constants/brand";

/**
 * First-load brand curtain: the CRAVEWING wordmark + a flame draw in over a
 * charcoal screen, a loader bar fills, then the whole panel lifts away to reveal
 * the site. Shows once per session (sessionStorage) and honors reduced-motion.
 */
export default function Preloader() {
  const [done, setDone] = useState(() => {
    if (typeof window === "undefined") return true;
    if (sessionStorage.getItem("crave:booted")) return true;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    if (done) return;
    const t = window.setTimeout(() => {
      sessionStorage.setItem("crave:booted", "1");
      setDone(true);
    }, 1900);
    return () => window.clearTimeout(t);
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
          style={{ background: CHAR }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span style={{ fontFamily: "Anton, sans-serif", fontSize: "clamp(44px, 9vw, 84px)", letterSpacing: 3, color: GOLD }}>
              CRAVE
            </span>
            <span style={{ fontFamily: "Anton, sans-serif", fontSize: "clamp(44px, 9vw, 84px)", letterSpacing: 3, color: "#fff" }}>
              WING
            </span>
            <motion.span
              animate={{ rotate: [0, -12, 12, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
              style={{ display: "inline-flex", marginLeft: 4 }}
            >
              <Flame size={34} color={RED} fill={RED} />
            </motion.span>
          </motion.div>

          {/* Loader bar */}
          <div className="mt-8 h-1 w-40 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.15)" }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: `linear-gradient(to right, ${RED}, ${GOLD})` }}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.7, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
