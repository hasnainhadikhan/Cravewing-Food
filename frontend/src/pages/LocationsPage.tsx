import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Clock } from "lucide-react";
import { RED, ORANGE, GOLD, CHAR, CREAM, GREY, IMGS } from "../constants/brand";
import { locations } from "../constants/data";

export default function LocationsPage() {
  const [selected, setSelected] = useState(0);

  return (
    <div style={{ background: CREAM, minHeight: "100vh" }}>
      {/* Page header */}
      <div className="pt-28 pb-12 text-center" style={{ background: CHAR }}>
        <h1
          style={{
            fontFamily: "Anton, sans-serif",
            fontSize: "clamp(40px, 7vw, 72px)",
            color: "#fff",
            letterSpacing: 2,
          }}
        >
          FIND US
        </h1>
        <p style={{ fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.6)", marginTop: 8 }}>
          Four locations. One obsession.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-5 gap-8">
        {/* Location list */}
        <div className="md:col-span-2 flex flex-col gap-4">
          {locations.map((loc, i) => (
            <button
              key={loc.slug}
              onClick={() => setSelected(i)}
              className="text-left p-6 rounded-2xl border-2 transition-all duration-200"
              style={{
                background: selected === i ? RED : "#fff",
                borderColor: selected === i ? RED : "#f0e0d0",
                transform: selected === i ? "scale(1.02)" : "scale(1)",
              }}
            >
              <h3
                style={{
                  fontFamily: "Anton, sans-serif",
                  fontSize: 18,
                  color: selected === i ? "#fff" : CHAR,
                  letterSpacing: 0.5,
                }}
              >
                {loc.name.split("—")[1]?.trim().toUpperCase()}
              </h3>
              <div className="flex items-start gap-2 mt-2">
                <MapPin
                  size={14}
                  style={{ color: selected === i ? GOLD : RED, marginTop: 2, flexShrink: 0 }}
                />
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 13,
                    color: selected === i ? "rgba(255,255,255,0.85)" : GREY,
                  }}
                >
                  {loc.address}
                </p>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Phone size={14} style={{ color: selected === i ? GOLD : ORANGE, flexShrink: 0 }} />
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 13,
                    color: selected === i ? "rgba(255,255,255,0.85)" : GREY,
                  }}
                >
                  {loc.phone}
                </p>
              </div>
              <div className="flex items-start gap-2 mt-1">
                <Clock
                  size={14}
                  style={{ color: selected === i ? GOLD : ORANGE, marginTop: 2, flexShrink: 0 }}
                />
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 12,
                    color: selected === i ? "rgba(255,255,255,0.7)" : GREY,
                    lineHeight: 1.5,
                  }}
                >
                  {loc.hours}
                </p>
              </div>
              {selected === i && (
                <Link
                  to="/menu"
                  className="mt-4 block text-center py-2 rounded-xl font-bold text-sm"
                  style={{ background: GOLD, color: CHAR, fontFamily: "Inter, sans-serif" }}
                >
                  Order from this location →
                </Link>
              )}
            </button>
          ))}
        </div>

        {/* Map placeholder */}
        <div
          className="md:col-span-3 rounded-2xl overflow-hidden border-2 relative"
          style={{ borderColor: "#f0e0d0", minHeight: 500 }}
        >
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(135deg, ${CHAR}f0, ${CHAR}88)` }}
          >
            <img
              src={IMGS.about}
              alt="Location"
              className="w-full h-full object-cover opacity-20"
            />
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-8">
            <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: RED }}>
              <MapPin size={36} color="#fff" />
            </div>
            <h2
              style={{
                fontFamily: "Anton, sans-serif",
                fontSize: 32,
                color: "#fff",
                letterSpacing: 1,
                textAlign: "center",
              }}
            >
              {locations[selected].name.toUpperCase()}
            </h2>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                color: "rgba(255,255,255,0.8)",
                textAlign: "center",
                maxWidth: 320,
              }}
            >
              {locations[selected].address}
            </p>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 13,
                color: GOLD,
                textAlign: "center",
              }}
            >
              {locations[selected].hours}
            </p>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(locations[selected].address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl font-bold transition-all hover:scale-105"
              style={{ background: GOLD, color: CHAR, fontFamily: "Inter, sans-serif" }}
            >
              Get Directions
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
