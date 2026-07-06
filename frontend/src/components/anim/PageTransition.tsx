import { motion } from "motion/react";
import { EASE_OUT } from "../../lib/motion";

/**
 * Wraps each routed page so navigation cross-fades + lifts into place instead
 * of hard-cutting. Paired with <AnimatePresence> keyed on the route.
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.5, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}
