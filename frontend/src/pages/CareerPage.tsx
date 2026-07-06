import { useState } from "react";
import { X, Check, MapPin } from "lucide-react";
import { RED, ORANGE, GOLD, CHAR, CREAM, GREY } from "../constants/brand";
import { openRoles } from "../constants/data";
import Section from "../components/ui/Section";
import SectionTitle from "../components/ui/SectionTitle";

export default function CareerPage() {
  const [applyFor, setApplyFor] = useState<string | null>(null);
  const [appForm, setAppForm] = useState({ name: "", email: "", phone: "", why: "" });
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div style={{ background: CREAM, minHeight: "100vh" }}>
      {/* Page header */}
      <div className="pt-28 pb-16 relative overflow-hidden" style={{ background: CHAR }}>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div
            className="text-sm font-bold tracking-widest mb-4"
            style={{ color: ORANGE, fontFamily: "Inter, sans-serif" }}
          >
            JOIN THE CREW
          </div>
          <h1
            style={{
              fontFamily: "Anton, sans-serif",
              fontSize: "clamp(40px, 7vw, 80px)",
              color: "#fff",
              letterSpacing: 2,
            }}
          >
            WORK WHERE THE
            <br />
            <span style={{ color: GOLD }}>FLAVOR LIVES.</span>
          </h1>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              color: "rgba(255,255,255,0.7)",
              marginTop: 16,
              fontSize: 17,
              lineHeight: 1.7,
              maxWidth: 520,
              margin: "16px auto 0",
            }}
          >
            We are building a team of people who love great food, love taking care of guests, and love being part
            of something bold. Sound like you?
          </p>
        </div>
      </div>

      {/* Perks */}
      <Section style={{ background: "#fff" }}>
        <div className="max-w-6xl mx-auto">
          <SectionTitle sub="We take care of our people.">WHY CRAVEWING</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "💰", title: "Competitive Pay", desc: "Above minimum wage, tips on top, and performance bonuses." },
              { icon: "🍗", title: "Free Wings", desc: "Every shift includes a free meal. Yes, you get to eat the wings." },
              { icon: "📈", title: "Grow With Us", desc: "We promote from within. Our managers started on the line." },
              { icon: "🏥", title: "Benefits", desc: "Full-time crew gets health, dental, and vision coverage." },
            ].map((p) => (
              <div
                key={p.title}
                className="text-center p-6 rounded-2xl border-2 hover:shadow-lg transition-all hover:-translate-y-1 duration-200"
                style={{ borderColor: "#f0e0d0" }}
              >
                <div className="text-4xl mb-3">{p.icon}</div>
                <h3
                  style={{
                    fontFamily: "Anton, sans-serif",
                    fontSize: 18,
                    color: CHAR,
                    letterSpacing: 0.5,
                    marginBottom: 8,
                  }}
                >
                  {p.title.toUpperCase()}
                </h3>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: GREY, lineHeight: 1.6 }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Open roles */}
      <Section style={{ background: CREAM }}>
        <div className="max-w-6xl mx-auto">
          <SectionTitle sub="See something that fits? Apply below.">OPEN POSITIONS</SectionTitle>
          <div className="flex flex-col gap-4">
            {openRoles.map((role) => (
              <div
                key={role.title}
                className="p-6 rounded-2xl bg-white border-2 hover:shadow-md transition-all"
                style={{ borderColor: "#f0e0d0" }}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3
                        style={{
                          fontFamily: "Anton, sans-serif",
                          fontSize: 22,
                          color: CHAR,
                          letterSpacing: 0.5,
                        }}
                      >
                        {role.title.toUpperCase()}
                      </h3>
                      <span
                        className="px-3 py-1 rounded-full text-xs font-bold"
                        style={{
                          background: ORANGE + "22",
                          color: ORANGE,
                          fontFamily: "Inter, sans-serif",
                        }}
                      >
                        {role.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin size={14} style={{ color: RED }} />
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: GREY }}>
                        {role.location}
                      </span>
                    </div>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: GREY, lineHeight: 1.6 }}>
                      {role.desc}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setApplyFor(role.title);
                      setSent(false);
                    }}
                    className="flex-shrink-0 px-6 py-3 rounded-xl font-bold transition-all hover:scale-105"
                    style={{ background: RED, color: "#fff", fontFamily: "Inter, sans-serif" }}
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Application modal */}
      {applyFor && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(34,26,23,0.7)" }}
          onClick={() => setApplyFor(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl p-8 relative"
            style={{ background: "#fff" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100"
              onClick={() => setApplyFor(null)}
              aria-label="Close modal"
            >
              <X size={20} style={{ color: CHAR }} />
            </button>

            {sent ? (
              <div className="text-center py-8">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: GOLD }}
                >
                  <Check size={28} color={CHAR} />
                </div>
                <h3 style={{ fontFamily: "Anton, sans-serif", fontSize: 28, color: CHAR }}>
                  APPLICATION SENT!
                </h3>
                <p style={{ fontFamily: "Inter, sans-serif", color: GREY, marginTop: 8 }}>
                  {"We'll"} be in touch within 48 hours. Get ready to wing it.
                </p>
                <button
                  onClick={() => setApplyFor(null)}
                  className="mt-6 px-6 py-3 rounded-xl font-bold"
                  style={{ background: RED, color: "#fff", fontFamily: "Inter, sans-serif" }}
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <h2
                  style={{
                    fontFamily: "Anton, sans-serif",
                    fontSize: 26,
                    color: CHAR,
                    marginBottom: 4,
                  }}
                >
                  APPLY: {applyFor.toUpperCase()}
                </h2>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 13,
                    color: GREY,
                    marginBottom: 20,
                  }}
                >
                  {"We'd"} love to meet you. Fill this out and {"we'll"} follow up fast.
                </p>
                <form onSubmit={submit} className="flex flex-col gap-4">
                  {(
                    [
                      ["name", "Full Name", "text"],
                      ["email", "Email", "email"],
                      ["phone", "Phone Number", "tel"],
                    ] as [keyof typeof appForm, string, string][]
                  ).map(([k, l, t]) => (
                    <div key={k}>
                      <label
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: 12,
                          fontWeight: 600,
                          color: CHAR,
                          display: "block",
                          marginBottom: 6,
                        }}
                      >
                        {l}
                      </label>
                      <input
                        required
                        type={t}
                        value={appForm[k]}
                        onChange={(e) => setAppForm((p) => ({ ...p, [k]: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border-2 outline-none"
                        style={{ borderColor: "#e0d0c0", fontFamily: "Inter, sans-serif" }}
                        onFocus={(e) => { e.currentTarget.style.borderColor = GOLD; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = "#e0d0c0"; }}
                      />
                    </div>
                  ))}
                  <div>
                    <label
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: 12,
                        fontWeight: 600,
                        color: CHAR,
                        display: "block",
                        marginBottom: 6,
                      }}
                    >
                      Why CraveWing?
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={appForm.why}
                      onChange={(e) => setAppForm((p) => ({ ...p, why: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border-2 outline-none resize-none"
                      style={{ borderColor: "#e0d0c0", fontFamily: "Inter, sans-serif" }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = GOLD; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "#e0d0c0"; }}
                    />
                  </div>
                  <button
                    type="submit"
                    className="py-3 rounded-xl font-bold transition-all hover:scale-105"
                    style={{ background: RED, color: "#fff", fontFamily: "Inter, sans-serif" }}
                  >
                    Submit Application
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
