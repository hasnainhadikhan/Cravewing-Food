import { CHAR, CREAM, GREY, ORANGE } from "../constants/brand";

export interface LegalSection {
  heading: string;
  body: string[];
}

interface LegalPageProps {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}

/**
 * Shared layout for static legal pages (Privacy Policy, Terms of Service).
 * Keeps both pages visually consistent with the rest of the site.
 */
export default function LegalPage({ title, updated, intro, sections }: LegalPageProps) {
  return (
    <div style={{ background: CREAM, minHeight: "100vh" }}>
      {/* Header */}
      <div className="pt-28 pb-14 text-center px-6" style={{ background: CHAR }}>
        <div className="subhead mb-3" style={{ color: ORANGE, fontSize: 18 }}>
          Legal
        </div>
        <h1 style={{ fontFamily: "Anton, sans-serif", fontSize: "clamp(38px, 6vw, 64px)", color: "#fff", letterSpacing: 1.5 }}>
          {title}
        </h1>
        <p style={{ fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.6)", marginTop: 12, fontSize: 14 }}>
          Last updated {updated}
        </p>
      </div>

      {/* Body */}
      <div className="max-w-3xl mx-auto px-6 py-14">
        <p style={{ fontFamily: "Inter, sans-serif", color: GREY, fontSize: 17, lineHeight: 1.8, marginBottom: 40 }}>
          {intro}
        </p>

        <div className="flex flex-col gap-10">
          {sections.map((s, i) => (
            <section key={s.heading}>
              <h2 style={{ fontFamily: "Anton, sans-serif", fontSize: 24, color: CHAR, letterSpacing: 0.5, marginBottom: 12 }}>
                {i + 1}. {s.heading.toUpperCase()}
              </h2>
              {s.body.map((p, j) => (
                <p key={j} style={{ fontFamily: "Inter, sans-serif", color: GREY, fontSize: 16, lineHeight: 1.8, marginBottom: 12 }}>
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>

        <div className="mt-14 pt-8 border-t" style={{ borderColor: "rgba(34,26,23,0.12)" }}>
          <p style={{ fontFamily: "Inter, sans-serif", color: GREY, fontSize: 15, lineHeight: 1.7 }}>
            Questions about this page? Email us at{" "}
            <a href="mailto:hello@cravewing.com" style={{ color: ORANGE, fontWeight: 600 }}>
              hello@cravewing.com
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
