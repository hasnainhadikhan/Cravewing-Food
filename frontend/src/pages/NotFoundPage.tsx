import { Link } from "react-router-dom";
import { GOLD, RED, CHAR } from "../constants/brand";

export default function NotFoundPage() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center px-6"
      style={{ background: CHAR }}
    >
      <div className="text-8xl mb-4">🔥</div>
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
        className="px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105"
        style={{ background: RED, color: "#fff", fontFamily: "Inter, sans-serif" }}
      >
        Back to Home
      </Link>
    </div>
  );
}
