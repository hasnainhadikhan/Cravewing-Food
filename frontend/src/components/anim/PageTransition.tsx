import { motion } from "motion/react";
import { EASE_OUT } from "../../lib/motion";
import { RED, GOLD } from "../../constants/brand";

/**
 * Route transition with a brand-red wipe. Paired with <AnimatePresence mode="wait">
 * keyed on the route:
 *  1. Leaving page → overlay slides down to cover the screen (wipe in).
 *  2. Entering page mounts under the cover → overlay slides up to reveal (wipe out).
 * The page content itself cross-fades so nothing hard-cuts underneath.
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT, delay: 0.35 } }}
        exit={{ opacity: 0, transition: { duration: 0.25 } }}
      >
        {children}
      </motion.div>

      {/* Full-screen wipe overlay */}
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
        style={{ background: RED }}
        initial={{ y: "0%" }}
        animate={{ y: "-100%", transition: { duration: 0.55, ease: EASE_OUT } }}
        exit={{ y: "0%", transition: { duration: 0.45, ease: EASE_OUT } }}
      >
        <motion.span
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
          exit={{ opacity: 1, scale: 1, transition: { duration: 0.3, delay: 0.1 } }}
          style={{
            fontFamily: "Anton, sans-serif",
            fontSize: "clamp(40px, 8vw, 88px)",
            letterSpacing: 3,
            color: "#fff",
          }}
        >
          CRAVE<span style={{ color: GOLD }}>WING</span>
        </motion.span>
      </motion.div>
    </>
  );
}
