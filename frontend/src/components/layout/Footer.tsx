import { lazy, Suspense, useState } from "react";
import { Link } from "react-router-dom";
import { Instagram, Facebook, MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react";
import { RED, ORANGE, GOLD, CHAR, CREAM, GREY } from "../../constants/brand";
import { post } from "../../lib/api";

// Lazy-loaded so the ~330KB dotLottie renderer is code-split out of the main bundle.
const DotLottie = lazy(() => import("../anim/DotLottie"));

const footerLinks = [
  { to: "/menu", label: "Menu" },
  { to: "/locations", label: "Locations" },
  { to: "/about", label: "About" },
  { to: "/career", label: "Career" },
  { to: "/catering", label: "Catering" },
];

const socials = [
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Facebook, label: "Facebook", href: "#" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/\S+@\S+\.\S+/.test(email)) return;
    try {
      await post("/subscribe", { email });
    } catch {
      /* still confirm — subscription is best-effort */
    }
    setSubscribed(true);
  };

  return (
    <footer style={{ background: CHAR, color: CREAM }}>
      {/* Sauce-drip divider — charcoal footer melts down from the section above */}
      <div style={{ lineHeight: 0, marginTop: -1 }} aria-hidden>
        <svg viewBox="0 0 1200 40" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 34 }}>
          <path
            fill={CHAR}
            d="M0,0 H1200 V14 C1150,14 1150,34 1100,34 C1050,34 1050,10 1000,10 C950,10 950,30 900,30 C850,30 850,12 800,12 C760,12 760,38 720,38 C680,38 680,14 640,14 C590,14 590,32 540,32 C495,32 495,10 450,10 C405,10 405,34 360,34 C315,34 315,12 270,12 C225,12 225,30 180,30 C135,30 135,12 90,12 C45,12 45,28 0,20 Z"
          />
        </svg>
      </div>

      {/* Newsletter banner */}
      <div className="border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h3 style={{ fontFamily: "Anton, sans-serif", fontSize: "clamp(24px,3vw,34px)", color: "#fff", letterSpacing: 1 }}>
              GET THE FIRST BITE
            </h3>
            <p style={{ fontFamily: "Inter, sans-serif", color: "#b8b0a8", fontSize: 14, marginTop: 4 }}>
              New sauces, secret drops, and members-only deals — straight to your inbox.
            </p>
          </div>
          {subscribed ? (
            <p className="flex items-center gap-2" style={{ fontFamily: "Inter, sans-serif", color: GOLD, fontWeight: 600 }}>
              <Clock size={16} /> You're on the list. Stay hungry.
            </p>
          ) : (
            <form onSubmit={subscribe} className="flex flex-col sm:flex-row w-full md:w-auto gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="flex-1 md:w-72 px-4 py-3 rounded-lg text-sm"
                style={{ background: "#2c221e", border: "1.5px solid rgba(255,255,255,0.15)", color: "#fff" }}
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-bold uppercase tracking-[0.06em] transition hover:-translate-y-0.5 hover:shadow-lg hover:brightness-110"
                style={{ background: RED, color: "#fff", fontFamily: "Inter, sans-serif" }}
              >
                Subscribe <ArrowRight size={15} />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Main columns */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="lg:pr-6">
          <div className="flex items-center gap-1 mb-4">
            <span style={{ fontFamily: "Anton, sans-serif", fontSize: 30, color: GOLD }}>CRAVE</span>
            <span style={{ fontFamily: "Anton, sans-serif", fontSize: 30, color: RED }}>WING</span>
            <Suspense fallback={<span style={{ width: 38, height: 38, display: "inline-block" }} />}>
              <DotLottie src="/sizzle.json" size={38} />
            </Suspense>
          </div>
          <p style={{ color: "#b8b0a8", fontFamily: "Inter, sans-serif", fontSize: 14, lineHeight: 1.7 }}>
            Fresh-cracked wings, house-made sauces, never frozen. Crave it. Sauce it. Own it.
          </p>
          <div className="flex gap-3 mt-6">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="flex h-10 w-10 items-center justify-center rounded-full transition hover:-translate-y-0.5"
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
              >
                <s.icon size={18} color={GOLD} />
              </a>
            ))}
          </div>
        </div>

        {/* Nav links */}
        <div>
          <h4 className="subhead" style={{ fontSize: 20, color: GOLD, marginBottom: 16 }}>
            Explore
          </h4>
          <div className="flex flex-col gap-3">
            {footerLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="group inline-flex items-center gap-1.5 transition-colors"
                style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#b8b0a8" }}
              >
                <span className="transition-colors group-hover:text-[#FCB316]">{l.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="subhead" style={{ fontSize: 20, color: GOLD, marginBottom: 16 }}>
            Contact
          </h4>
          <div className="flex flex-col gap-3.5" style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#b8b0a8" }}>
            <a href="https://maps.google.com/?q=123 Flavor Street, Chicago, IL" target="_blank" rel="noopener noreferrer" className="flex items-start gap-2.5 hover:text-white transition-colors">
              <MapPin size={16} style={{ color: ORANGE, flexShrink: 0, marginTop: 2 }} /> 123 Flavor Street, Chicago, IL
            </a>
            <a href="tel:+13125559464" className="flex items-center gap-2.5 hover:text-white transition-colors">
              <Phone size={16} style={{ color: ORANGE, flexShrink: 0 }} /> (312) 555-WING
            </a>
            <a href="mailto:hello@cravewing.com" className="flex items-center gap-2.5 hover:text-white transition-colors">
              <Mail size={16} style={{ color: ORANGE, flexShrink: 0 }} /> hello@cravewing.com
            </a>
          </div>
        </div>

        {/* Hours */}
        <div>
          <h4 className="subhead" style={{ fontSize: 20, color: GOLD, marginBottom: 16 }}>
            Hours
          </h4>
          <div className="flex flex-col gap-2" style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#b8b0a8" }}>
            <div className="flex justify-between gap-4"><span>Mon – Thu</span><span style={{ color: "#e6ded6" }}>11am – 11pm</span></div>
            <div className="flex justify-between gap-4"><span>Fri – Sat</span><span style={{ color: "#e6ded6" }}>11am – 1am</span></div>
            <div className="flex justify-between gap-4"><span>Sunday</span><span style={{ color: "#e6ded6" }}>12pm – 10pm</span></div>
          </div>
          <Link
            to="/menu"
            className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold uppercase tracking-[0.06em] transition hover:-translate-y-0.5 hover:shadow-lg hover:brightness-110"
            style={{ background: GOLD, color: CHAR, fontFamily: "Inter, sans-serif" }}
          >
            Order Now <ArrowRight size={15} />
          </Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="border-t px-6 py-6 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3"
        style={{ borderColor: "rgba(255,255,255,0.1)", fontFamily: "Inter, sans-serif", fontSize: 13, color: GREY }}
      >
        <span>© {new Date().getFullYear()} CraveWing. All rights reserved.</span>
        <div className="flex gap-6">
          <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
