import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Clock, Navigation, ArrowRight } from "lucide-react";
import { RED, ORANGE, GOLD, CHAR, CREAM, GREY } from "../constants/brand";
import { locations } from "../constants/data";

// Simple open-window heuristic — every location opens 11am, closes late (≥11pm).
function isOpenNow() {
  const h = new Date().getHours();
  return h >= 11 && h < 23;
}

export default function LocationsPage() {
  const [selected, setSelected] = useState(0);
  const open = isOpenNow();
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
    locations[selected].address
  )}&z=15&output=embed`;

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
                  className="mt-4 flex items-center justify-center gap-1.5 py-2 rounded-xl font-bold text-sm"
                  style={{ background: GOLD, color: CHAR, fontFamily: "Inter, sans-serif" }}
                >
                  Order from this location <ArrowRight size={15} />
                </Link>
              )}
            </button>
          ))}
        </div>

        {/* Live map */}
        <div
          className="md:col-span-3 rounded-2xl overflow-hidden border-2 relative"
          style={{ borderColor: "#f0e0d0", minHeight: 500 }}
        >
          <iframe
            key={locations[selected].slug}
            title={`Map of ${locations[selected].name}`}
            src={mapSrc}
            className="absolute inset-0 w-full h-full"
            style={{ border: 0, filter: "saturate(0.9) contrast(1.02)" }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />

          {/* Branded info card floating over the map */}
          <div
            className="absolute left-4 right-4 bottom-4 md:left-6 md:right-auto md:bottom-6 md:max-w-sm rounded-2xl p-5 backdrop-blur"
            style={{ background: "rgba(34,26,23,0.92)", boxShadow: "var(--shadow-lift)" }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold"
                style={{
                  background: open ? "rgba(38,180,110,0.18)" : "rgba(214,41,30,0.18)",
                  color: open ? "#3ddc84" : RED,
                  fontFamily: "Inter, sans-serif",
                }}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: open ? "#3ddc84" : RED, boxShadow: open ? "0 0 8px #3ddc84" : "none" }}
                />
                {open ? "OPEN NOW" : "CLOSED"}
              </span>
            </div>
            <h2 style={{ fontFamily: "Anton, sans-serif", fontSize: 24, color: "#fff", letterSpacing: 0.5 }}>
              {locations[selected].name.split("—")[1]?.trim().toUpperCase() || "CRAVEWING"}
            </h2>
            <p style={{ fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.75)", fontSize: 13, marginTop: 4 }}>
              {locations[selected].address}
            </p>
            <p style={{ fontFamily: "Inter, sans-serif", color: GOLD, fontSize: 12, marginTop: 6, lineHeight: 1.5 }}>
              {locations[selected].hours}
            </p>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(locations[selected].address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
              style={{ background: GOLD, color: CHAR, fontFamily: "Inter, sans-serif" }}
            >
              <Navigation size={15} /> Get Directions
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
