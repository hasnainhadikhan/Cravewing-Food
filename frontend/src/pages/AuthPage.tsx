import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { RED, CHAR, GOLD, CREAM, GREY, IMGS } from "../constants/brand";
import { useAuth } from "../contexts/AuthContext";
import { Mail, Lock, ArrowRight } from "lucide-react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      login(email);
      // Redirect to where they came from or home
      const from = (location.state as any)?.from?.pathname || "/";
      navigate(from, { replace: true });
    }
  };

  return (
    <div 
      className="relative" 
      style={{ 
        minHeight: "100vh", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        padding: "20px" 
      }}
    >
      {/* Background Image */}
      <img
        src={IMGS.hero}
        alt="Crave Wings"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Overlay */}
      <div 
        className="absolute inset-0"
        style={{ 
          background: `linear-gradient(105deg, ${CHAR}f5 0%, ${CHAR}dd 30%, ${CHAR}99 52%, ${CHAR}44 68%, transparent 100%)` 
        }}
      />
      {/* Content */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl border" style={{ borderColor: `${GOLD}30` }}>
        <div className="text-center mb-8">
          <h1 style={{ fontFamily: "Anton, sans-serif", fontSize: 36, color: CHAR, letterSpacing: 2 }}>
            {isLogin ? "WELCOME BACK" : "JOIN CRAVE FAMILY"}
          </h1>
          <p style={{ fontFamily: "Inter, sans-serif", color: GREY, fontSize: 15, marginTop: 8, fontWeight: 500 }}>
            {isLogin ? "Login to access your account" : "Create an account to start ordering delicious food"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 600, color: CHAR }}>Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3.5 border-2 rounded-xl focus:outline-none transition-all"
                style={{ borderColor: `${GREY}30`, fontFamily: "Inter, sans-serif", fontSize: 15 }}
                onFocus={(e) => e.target.style.borderColor = GOLD}
                onBlur={(e) => e.target.style.borderColor = `${GREY}30`}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 600, color: CHAR }}>Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3.5 border-2 rounded-xl focus:outline-none transition-all"
                style={{ borderColor: `${GREY}30`, fontFamily: "Inter, sans-serif", fontSize: 15 }}
                onFocus={(e) => e.target.style.borderColor = GOLD}
                onBlur={(e) => e.target.style.borderColor = `${GREY}30`}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-xl text-white font-bold flex items-center justify-center gap-2 transition-all hover:scale-[1.02] shadow-lg"
            style={{ background: RED, fontFamily: "Anton, sans-serif", fontSize: 18, letterSpacing: 1 }}
          >
            {isLogin ? "SIGN IN" : "CREATE ACCOUNT"}
            <ArrowRight size={22} />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t text-center" style={{ borderColor: `${GREY}20` }}>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 15, color: GREY }}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              style={{ color: RED, fontWeight: 700, textDecoration: "none", fontFamily: "Inter, sans-serif" }}
              className="hover:underline"
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
