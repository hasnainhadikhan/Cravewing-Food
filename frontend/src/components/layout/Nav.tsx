import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { Menu, X, Flame, ShoppingCart, LogOut, User } from "lucide-react";
import { RED, ORANGE, GOLD, CHAR } from "../../constants/brand";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";

const navLinks = [
  
  { to: "/menu", label: "Menu" },
  { to: "/about", label: "About" },
  { to: "/career", label: "Career" },
  { to: "/locations", label: "Locations" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { itemCount } = useCart();
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background: scrolled ? CHAR : "transparent",
          boxShadow: scrolled ? "0 2px 24px rgba(0,0,0,0.25)" : "none",
          padding: scrolled ? "10px 0" : "18px 0",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <motion.div className="flex items-center gap-1" whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 15 }}>
              <span style={{ fontFamily: "Anton, sans-serif", fontSize: 28, color: GOLD, letterSpacing: 2 }}>CRAVE</span>
              <span style={{ fontFamily: "Anton, sans-serif", fontSize: 28, color: RED, letterSpacing: 2 }}>WING</span>
              <motion.span
                animate={{ rotate: [0, -12, 12, 0], scale: [1, 1.15, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                style={{ display: "inline-flex", marginLeft: 2 }}
              >
                <Flame size={22} style={{ color: ORANGE }} />
              </motion.span>
            </motion.div>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => {
              const active = location.pathname === l.to;
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className="relative font-semibold text-sm tracking-wide group"
                  style={{
                    color: active ? GOLD : "#fff",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  {l.label}
                  <span
                    className="absolute left-0 -bottom-1.5 h-0.5 rounded-full transition-all duration-300 group-hover:w-full"
                    style={{ background: GOLD, width: active ? "100%" : 0 }}
                  />
                </Link>
              );
            })}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-2">
            {isAuthenticated ? (
              <button
                onClick={logout}
                className="p-2 rounded-lg transition-all duration-200 hover:scale-110 hover:bg-red-500"
                title="Logout"
              >
                <LogOut size={20} color="#fff" />
              </button>
            ) : (
              <Link
                to="/auth"
                className="p-2 rounded-lg transition-all duration-200 hover:scale-110"
                style={{ background: "rgba(255,255,255,0.1)" }}
                title="Sign In"
              >
                <User size={20} color="#fff" />
              </Link>
            )}
       
            <Link
              to="/cart"
              data-cart-icon
              className="relative p-2 rounded-lg transition-all duration-200 hover:scale-110"
              style={{ background: "rgba(255,255,255,0.1)" }}
            >
              <ShoppingCart size={20} color="#fff" />
              {itemCount > 0 && (
                <motion.div
                  key={itemCount}
                  initial={{ scale: 0.4 }}
                  animate={{ scale: [0.4, 1.35, 1] }}
                  transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center shadow-lg"
                  style={{ background: GOLD, color: CHAR, fontFamily: "Anton, sans-serif", fontSize: 14, border: `2px solid ${RED}` }}
                >
                  {itemCount}
                </motion.div>
              )}
            </Link>
                 <Link
              to="/catering"
              className="ml-3 px-4 py-2 rounded-lg border-2 text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              style={{ borderColor: GOLD, color: GOLD, fontFamily: "Inter, sans-serif" }}
            >
              Catering
            </Link>
            <Link
              to="/menu"
              className="px-5 py-2 rounded-lg text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:brightness-110"
              style={{ background: RED, color: "#fff", fontFamily: "Inter, sans-serif" }}
            >
              Order Now
            </Link>
          </div>

          {/* Mobile toggle */}
          <div className="flex items-center gap-2 md:hidden">
            {isAuthenticated ? (
              <button
                onClick={logout}
                className="p-2"
                title="Logout"
              >
                <LogOut size={20} color="#fff" />
              </button>
            ) : (
              <Link
                to="/auth"
                className="p-2"
                title="Sign In"
              >
                <User size={20} color="#fff" />
              </Link>
            )}
            <Link
              to="/cart"
              data-cart-icon
              className="relative p-2"
            >
              <ShoppingCart size={20} color="#fff" />
              {itemCount > 0 && (
                <motion.div
                  key={itemCount}
                  initial={{ scale: 0.4 }}
                  animate={{ scale: [0.4, 1.35, 1] }}
                  transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center shadow-lg"
                  style={{ background: GOLD, color: CHAR, fontFamily: "Anton, sans-serif", fontSize: 14, border: `2px solid ${RED}` }}
                >
                  {itemCount}
                </motion.div>
              )}
            </Link>
            <button
              className="p-2"
              style={{ color: "#fff" }}
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <div
        className="fixed inset-0 z-40 md:hidden transition-all duration-300"
        style={{ pointerEvents: mobileOpen ? "all" : "none", opacity: mobileOpen ? 1 : 0 }}
      >
        <div
          className="absolute inset-0"
          style={{ background: "rgba(34,26,23,0.6)" }}
          onClick={() => setMobileOpen(false)}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-72 flex flex-col pt-20 px-8 gap-6"
          style={{
            background: CHAR,
            transform: mobileOpen ? "translateX(0)" : "translateX(100%)",
            transition: "transform 0.3s ease",
          }}
        >
          {navLinks.map((l, i) => (
            <Link
              key={l.to}
              to={l.to}
              style={{
                color: "#fff",
                fontFamily: "Anton, sans-serif",
                fontSize: 28,
                letterSpacing: 1,
                opacity: mobileOpen ? 1 : 0,
                transition: `opacity 0.3s ${i * 0.07}s`,
              }}
            >
              {l.label.toUpperCase()}
            </Link>
          ))}
          <Link
            to="/catering"
            style={{
              color: GOLD,
              fontFamily: "Anton, sans-serif",
              fontSize: 28,
              letterSpacing: 1,
              opacity: mobileOpen ? 1 : 0,
              transition: "opacity 0.3s 0.35s",
            }}
          >
            CATERING
          </Link>
          <Link
            to="/cart"
            className="mt-2 px-6 py-3 rounded-xl text-center font-bold text-lg"
            style={{ border: `2px solid ${GOLD}`, color: GOLD, fontFamily: "Inter, sans-serif" }}
          >
            View Cart ({itemCount})
          </Link>
          <Link
            to="/menu"
            className="mt-2 px-6 py-3 rounded-xl text-center font-bold text-lg"
            style={{ background: RED, color: "#fff", fontFamily: "Inter, sans-serif" }}
          >
            Order Now
          </Link>
        </div>
      </div>
    </>
  );
}
