import { useState } from "react";
import { Check, Send, Star, Drumstick, Flame, Crown } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { RED, ORANGE, GOLD, CHAR, CREAM, GREY } from "../constants/brand";
import { cateringPackages } from "../constants/data";
import { post } from "../lib/api";
import Section from "../components/ui/Section";
import SectionTitle from "../components/ui/SectionTitle";

// Package → branded icon (replaces emoji emblems in the data).
const PKG_ICONS: Record<string, LucideIcon> = {
  "The Snack Pack": Drumstick,
  "The Party Tray": Flame,
  "The Flavor Feast": Crown,
};

export default function CateringPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    guests: "",
    pkg: "",
    notes: "",
  });
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await post("/catering", {
        name: form.name,
        email: form.email,
        phone: form.phone,
        event_date: form.date,
        guests: Number(form.guests),
        package: form.pkg,
        notes: form.notes,
      });
      setSent(true);
    } catch {
      setError("Couldn't send your request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ background: CREAM, minHeight: "100vh" }}>
      {/* Page header */}
      <div className="pt-28 pb-16" style={{ background: CHAR }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div
            className="text-sm font-bold tracking-widest mb-4"
            style={{ color: ORANGE, fontFamily: "Inter, sans-serif" }}
          >
            CATERING
          </div>
          <h1
            style={{
              fontFamily: "Anton, sans-serif",
              fontSize: "clamp(40px, 7vw, 80px)",
              color: "#fff",
              letterSpacing: 2,
              lineHeight: 1,
            }}
          >
            FEED YOUR
            <br />
            <span style={{ color: GOLD }}>CROWD RIGHT.</span>
          </h1>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              color: "rgba(255,255,255,0.7)",
              marginTop: 16,
              fontSize: 17,
              lineHeight: 1.7,
              maxWidth: 500,
              margin: "16px auto 0",
            }}
          >
            Office parties, game nights, weddings, birthday feasts — CraveWing shows up with wings that steal the
            show.
          </p>
        </div>
      </div>

      {/* Packages */}
      <Section style={{ background: CREAM }}>
        <div className="max-w-6xl mx-auto">
          <SectionTitle eyebrow="Feed The Crew" sub="Pick your level. We handle the rest.">CATERING PACKAGES</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cateringPackages.map((pkg) => (
              <div
                key={pkg.name}
                className="rounded-2xl overflow-hidden border-2 transition-all hover:shadow-2xl hover:-translate-y-1 duration-300 relative"
                style={{
                  borderColor: pkg.featured ? RED : "#f0e0d0",
                  background: pkg.featured ? CHAR : "#fff",
                }}
              >
                {pkg.featured && (
                  <div
                    className="absolute top-0 left-0 right-0 py-2 flex items-center justify-center gap-1.5 text-xs font-bold tracking-widest"
                    style={{ background: RED, color: "#fff", fontFamily: "Inter, sans-serif" }}
                  >
                    <Star size={13} fill="#fff" strokeWidth={0} /> MOST POPULAR
                  </div>
                )}
                <div className={`p-8 ${pkg.featured ? "pt-12" : ""}`}>
                  <div className="mb-3">
                    {(() => {
                      const Icon = PKG_ICONS[pkg.name] ?? Drumstick;
                      return (
                        <span
                          className="inline-flex items-center justify-center"
                          style={{
                            width: 56,
                            height: 56,
                            borderRadius: 16,
                            background: pkg.featured ? `${GOLD}22` : `${ORANGE}18`,
                            border: `1px solid ${pkg.featured ? GOLD : ORANGE}35`,
                            color: pkg.featured ? GOLD : ORANGE,
                          }}
                        >
                          <Icon size={26} strokeWidth={2.2} />
                        </span>
                      );
                    })()}
                  </div>
                  <h3
                    style={{
                      fontFamily: "Anton, sans-serif",
                      fontSize: 26,
                      color: pkg.featured ? "#fff" : CHAR,
                      letterSpacing: 1,
                    }}
                  >
                    {pkg.name.toUpperCase()}
                  </h3>
                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: 14,
                      color: pkg.featured ? GOLD : ORANGE,
                      fontWeight: 600,
                      marginTop: 4,
                    }}
                  >
                    {pkg.serves}
                  </p>
                  <div
                    style={{
                      fontFamily: "Anton, sans-serif",
                      fontSize: 42,
                      color: pkg.featured ? GOLD : RED,
                      margin: "16px 0",
                    }}
                  >
                    {pkg.price}
                  </div>
                  <div className="flex flex-col gap-2 mb-8">
                    {pkg.items.map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <Check
                          size={14}
                          style={{ color: pkg.featured ? GOLD : RED, flexShrink: 0 }}
                        />
                        <span
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: 14,
                            color: pkg.featured ? "rgba(255,255,255,0.85)" : GREY,
                          }}
                        >
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => {
                      setForm((p) => ({ ...p, pkg: pkg.name }));
                      document.getElementById("catering-form")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="w-full py-3 rounded-xl font-bold transition-all hover:-translate-y-0.5 hover:shadow-lg"
                    style={{
                      background: pkg.featured ? GOLD : RED,
                      color: pkg.featured ? CHAR : "#fff",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    Book This Package
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Inquiry form */}
      <Section id="catering-form" style={{ background: "#fff" }}>
        <div className="max-w-2xl mx-auto">
          <SectionTitle sub="Tell us about your event and we'll get back to you within 24 hours.">
            REQUEST A QUOTE
          </SectionTitle>
          <div
            className="rounded-2xl border p-6 sm:p-8"
            style={{ borderColor: "rgba(34,26,23,0.15)", background: "#fffdfa", boxShadow: "var(--shadow-card)" }}
          >
          {sent ? (
            <div className="text-center py-12">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: GOLD }}
              >
                <Check size={28} color={CHAR} />
              </div>
              <h3 style={{ fontFamily: "Anton, sans-serif", fontSize: 28, color: CHAR }}>REQUEST SENT!</h3>
              <p style={{ fontFamily: "Inter, sans-serif", color: GREY, marginTop: 8 }}>
                {"We'll"} reach out within 24 hours with a custom quote. Your crowd is about to eat well.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(
                  [
                    ["name", "Your Name", "text", "Jane Smith"],
                    ["email", "Email", "email", "you@company.com"],
                    ["phone", "Phone", "tel", "(312) 555-0000"],
                    ["date", "Event Date", "date", ""],
                    ["guests", "Number of Guests", "number", "50"],
                  ] as [keyof typeof form, string, string, string][]
                ).map(([k, l, t, ph]) => (
                  <div key={k}>
                    <label
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: 13,
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
                      placeholder={ph}
                      value={form[k]}
                      onChange={(e) => setForm((p) => ({ ...p, [k]: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border-2 outline-none"
                      style={{ borderColor: "rgba(34,26,23,0.22)", fontFamily: "Inter, sans-serif" }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = GOLD; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(34,26,23,0.22)"; }}
                    />
                  </div>
                ))}
                <div>
                  <label
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: 13,
                      fontWeight: 600,
                      color: CHAR,
                      display: "block",
                      marginBottom: 6,
                    }}
                  >
                    Package Interest
                  </label>
                  <select
                    value={form.pkg}
                    onChange={(e) => setForm((p) => ({ ...p, pkg: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border-2 outline-none"
                    style={{ borderColor: "rgba(34,26,23,0.22)", fontFamily: "Inter, sans-serif", background: "#fff" }}
                  >
                    <option value="">Select a package...</option>
                    {cateringPackages.map((p) => (
                      <option key={p.name} value={p.name}>
                        {p.name} — {p.price}
                      </option>
                    ))}
                    <option value="Custom">Custom quote</option>
                  </select>
                </div>
              </div>
              <div>
                <label
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 13,
                    fontWeight: 600,
                    color: CHAR,
                    display: "block",
                    marginBottom: 6,
                  }}
                >
                  Additional Notes
                </label>
                <textarea
                  rows={4}
                  placeholder="Event type, dietary restrictions, delivery address..."
                  value={form.notes}
                  onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border-2 outline-none resize-none"
                  style={{ borderColor: "rgba(34,26,23,0.22)", fontFamily: "Inter, sans-serif" }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = GOLD; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(34,26,23,0.22)"; }}
                />
              </div>
              {error && (
                <p style={{ color: RED, fontFamily: "Inter, sans-serif", fontSize: 14 }}>{error}</p>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 hover:shadow-lg"
                style={{ background: RED, color: "#fff", fontFamily: "Inter, sans-serif" }}
              >
                <Send size={18} /> {submitting ? "Sending..." : "Submit Catering Request"}
              </button>
            </form>
          )}
          </div>
        </div>
      </Section>
    </div>
  );
}
