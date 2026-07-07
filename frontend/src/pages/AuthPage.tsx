import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { RED, ORANGE, GOLD, CHAR, GREY, IMGS } from "../constants/brand";
import { useAuth } from "../contexts/AuthContext";
import { post, setToken, ApiError } from "../lib/api";
import { Mail, Lock, ArrowRight, Eye, EyeOff, User, Check, Flame } from "lucide-react";

const perks = [
  "Earn rewards on every order",
  "Save your favorite sauces & combos",
  "Skip the line with express checkout",
];

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setSubmitting(true);
    setError("");
    try {
      const path = isLogin ? "/login" : "/register";
      const payload = isLogin ? { email, password } : { name, email, password };
      const res = await post<{ token: string; user: { email: string } }>(path, payload);
      setToken(res.token);
      login(res.user.email);
      const from = (location.state as any)?.from?.pathname || "/";
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center px-4 py-24" style={{ minHeight: "100vh", background: CHAR }}>
      {/* Ambient background */}
      <img src={IMGS.hero} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
      <div className="absolute inset-0" style={{ background: `radial-gradient(1200px circle at 50% 0%, ${CHAR}cc, ${CHAR})` }} />

      {/* Auth card */}
      <div className="relative z-10 w-full max-w-4xl overflow-hidden rounded-3xl shadow-2xl grid md:grid-cols-2 bg-white">
        {/* ── Brand panel (left) ── */}
        <div className="relative hidden md:flex flex-col justify-between p-10 overflow-hidden" style={{ background: CHAR }}>
          <img src={IMGS.classicWings} alt="" className="absolute inset-0 w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(160deg, ${RED}cc, ${CHAR}f2)` }} />

          <div className="relative z-10">
            <Link to="/" className="inline-flex items-center gap-1">
              <span style={{ fontFamily: "Anton, sans-serif", fontSize: 30, color: GOLD, letterSpacing: 2 }}>CRAVE</span>
              <span style={{ fontFamily: "Anton, sans-serif", fontSize: 30, color: "#fff", letterSpacing: 2 }}>WING</span>
              <Flame size={22} color={ORANGE} fill={ORANGE} style={{ marginLeft: 2 }} />
            </Link>
          </div>

          <div className="relative z-10">
            <h2 style={{ fontFamily: "Anton, sans-serif", fontSize: 34, color: "#fff", lineHeight: 1.05, letterSpacing: 1 }}>
              CRAVE IT.<br />SAUCE IT.<br /><span style={{ color: GOLD }}>OWN IT.</span>
            </h2>
            <div className="mt-6 flex flex-col gap-3">
              {perks.map((p) => (
                <div key={p} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full" style={{ background: GOLD }}>
                    <Check size={14} color={CHAR} strokeWidth={3} />
                  </span>
                  <span style={{ fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.9)", fontSize: 14 }}>{p}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="relative z-10" style={{ fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.55)", fontSize: 12 }}>
            Fresh-cracked wings · house-made sauces · never frozen
          </p>
        </div>

        {/* ── Form panel (right) ── */}
        <div className="p-8 sm:p-10">
          <div className="mb-8">
            <h1 style={{ fontFamily: "Anton, sans-serif", fontSize: 32, color: CHAR, letterSpacing: 1 }}>
              {isLogin ? "WELCOME BACK" : "JOIN THE CRAVE FAMILY"}
            </h1>
            <p style={{ fontFamily: "Inter, sans-serif", color: GREY, fontSize: 14.5, marginTop: 6 }}>
              {isLogin ? "Sign in to pick up where you left off." : "Create an account and start ordering in seconds."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="space-y-1.5">
                <label className="block text-[13px] font-semibold" style={{ color: CHAR, fontFamily: "Inter, sans-serif" }}>Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2" size={18} color={GREY} />
                  <input
                    type="text"
                    placeholder="Jane Smith"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full pl-11 pr-4 py-3.5 text-[15px]"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="block text-[13px] font-semibold" style={{ color: CHAR, fontFamily: "Inter, sans-serif" }}>Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2" size={18} color={GREY} />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-11 pr-4 py-3.5 text-[15px]"
                  style={{ fontFamily: "Inter, sans-serif" }}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[13px] font-semibold" style={{ color: CHAR, fontFamily: "Inter, sans-serif" }}>Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2" size={18} color={GREY} />
                <input
                  type={showPw ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-11 pr-11 py-3.5 text-[15px]"
                  style={{ fontFamily: "Inter, sans-serif" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPw((s) => !s)}
                  aria-label={showPw ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
                  style={{ color: GREY }}
                >
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {isLogin && (
              <div className="flex items-center justify-between text-[13px]" style={{ fontFamily: "Inter, sans-serif" }}>
                <label className="flex items-center gap-2 cursor-pointer" style={{ color: GREY }}>
                  <input type="checkbox" className="h-4 w-4" style={{ accentColor: RED }} /> Remember me
                </label>
                <a href="#" style={{ color: RED, fontWeight: 600 }} className="hover:underline">Forgot password?</a>
              </div>
            )}

            {error && (
              <p style={{ color: RED, fontFamily: "Inter, sans-serif", fontSize: 13.5 }}>{error}</p>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 rounded-xl py-3.5 font-bold uppercase tracking-[0.06em] text-white transition hover:-translate-y-0.5 hover:shadow-lg hover:brightness-110"
              style={{ background: RED, fontFamily: "Inter, sans-serif", fontSize: 15 }}
            >
              {submitting ? "Please wait..." : isLogin ? "Sign In" : "Create Account"} <ArrowRight size={18} />
            </button>
          </form>

          <div className="mt-7 pt-6 border-t text-center" style={{ borderColor: "rgba(34,26,23,0.1)" }}>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14.5, color: GREY }}>
              {isLogin ? "New to CraveWing?" : "Already have an account?"}{" "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                style={{ color: RED, fontWeight: 700, fontFamily: "Inter, sans-serif" }}
                className="hover:underline"
              >
                {isLogin ? "Create an account" : "Sign in"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
