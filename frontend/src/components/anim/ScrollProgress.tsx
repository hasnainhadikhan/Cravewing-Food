import { motion, useScroll, useSpring } from "motion/react";
import { RED, ORANGE, GOLD } from "../../constants/brand";

/**
 * Thin gradient bar pinned to the top of the viewport that fills as the user
 * scrolls the page. Sits above the nav.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{
        scaleX,
        transformOrigin: "0% 50%",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        zIndex: 60,
        background: `linear-gradient(to right, ${RED}, ${ORANGE}, ${GOLD})`,
      }}
    />
  );
}
