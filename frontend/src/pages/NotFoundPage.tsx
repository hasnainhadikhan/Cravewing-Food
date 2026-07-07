import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Flame } from "lucide-react";
import { GOLD, RED, ORANGE, CHAR } from "../constants/brand";

export default function NotFoundPage() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center px-6"
      style={{ background: CHAR }}
    >
      <motion.div
        className="mb-4"
        animate={{ rotate: [0, -8, 8, 0], scale: [1, 1.12, 1] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <Flame size={96} color={ORANGE} fill={RED} strokeWidth={1.6} />
      </motion.div>
      <h1 style={{ fontFamily: "Anton, sans-serif", fontSize: 72, color: GOLD, letterSpacing: 2 }}>404</h1>
      <p
        style={{
          fontFamily: "Inter, sans-serif",
          color: "rgba(255,255,255,0.7)",
          fontSize: 20,
          marginBottom: 32,
        }}
      >
        This page got sauced and disappeared.
      </p>
      <Link
        to="/"
        className="px-8 py-4 rounded-xl font-bold text-lg transition-all hover:-translate-y-0.5 hover:shadow-lg"
        style={{ background: RED, color: "#fff", fontFamily: "Inter, sans-serif" }}
      >
        Back to Home
      </Link>
    </div>
  );
}
