import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { Instagram, Facebook } from "lucide-react";
import { RED, ORANGE, GOLD, CHAR, CREAM, GREY } from "../../constants/brand";

// Lazy-loaded so the ~330KB dotLottie renderer is code-split out of the main bundle.
const DotLottie = lazy(() => import("../anim/DotLottie"));

const footerLinks = [
  { to: "/locations", label: "Locations" },
  { to: "/menu", label: "Menu" },
  { to: "/about", label: "About" },
  { to: "/career", label: "Career" },
  { to: "/catering", label: "Catering" },
];

export default function Footer() {
  return (
    <footer style={{ background: CHAR, color: CREAM }}>
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-1 mb-4">
            <span style={{ fontFamily: "Anton, sans-serif", fontSize: 32, color: GOLD }}>CRAVE</span>
            <span style={{ fontFamily: "Anton, sans-serif", fontSize: 32, color: RED }}>WING</span>
            {/* Vector Lottie sizzle mark (@lottiefiles/dotlottie-web) */}
            <Suspense fallback={<span style={{ width: 40, height: 40, display: "inline-block" }} />}>
              <DotLottie src="/sizzle.json" size={40} />
            </Suspense>
          </div>
          <p style={{ color: GREY, fontFamily: "Inter, sans-serif", fontSize: 14, lineHeight: 1.7 }}>
            Crave It. Sauce It. Own It.
            <br />
            Fresh-cracked wings, house-made sauces, never frozen.
          </p>
          <div className="flex gap-4 mt-6">
            <a href="#" className="p-2 rounded-full transition-all hover:scale-110" style={{ background: ORANGE }}>
              <Instagram size={18} color="#fff" />
            </a>
            <a href="#" className="p-2 rounded-full transition-all hover:scale-110" style={{ background: RED }}>
              <Facebook size={18} color="#fff" />
            </a>
          </div>
        </div>

        {/* Nav links */}
        <div>
          <h4 style={{ fontFamily: "Anton, sans-serif", fontSize: 20, color: GOLD, letterSpacing: 1, marginBottom: 16 }}>
            NAVIGATE
          </h4>
          <div className="flex flex-col gap-3">
            {footerLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="transition-colors hover:text-yellow-400"
                style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#ccc" }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 style={{ fontFamily: "Anton, sans-serif", fontSize: 20, color: GOLD, letterSpacing: 1, marginBottom: 16 }}>
            CONTACT
          </h4>
          <div className="flex flex-col gap-3" style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#ccc" }}>
            <p>📍 123 Flavor Street, Chicago, IL</p>
            <p>📞 (312) 555-WING</p>
            <p>✉️ hello@cravewing.com</p>
          </div>
        </div>
      </div>

      <div
        className="border-t px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-3"
        style={{ borderColor: "rgba(255,255,255,0.1)", fontFamily: "Inter, sans-serif", fontSize: 13, color: GREY }}
      >
        <span>© 2025 CraveWing. All rights reserved.</span>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
