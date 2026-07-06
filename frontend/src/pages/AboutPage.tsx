import { Link } from "react-router-dom";
import { ArrowRight, Award, Heart, Utensils, Home, Clock } from "lucide-react";
import { RED, ORANGE, GOLD, CHAR, CREAM, GREY, IMGS } from "../constants/brand";
import { useScrollReveal } from "../hooks/useScrollReveal";
import Section from "../components/ui/Section";
import SectionTitle from "../components/ui/SectionTitle";

export default function AboutPage() {
  const { ref: r1, visible: v1 } = useScrollReveal();
  const { ref: r2, visible: v2 } = useScrollReveal();
  const { ref: r3, visible: v3 } = useScrollReveal();
  const { ref: r4, visible: v4 } = useScrollReveal();

  return (
    <div style={{ background: CREAM, minHeight: "100vh" }}>
      {/* Hero */}
      <div className="relative pt-28 pb-12 overflow-hidden" style={{ background: CHAR, minHeight: 480 }}>
        <img
          src={IMGS.team}
          alt="Our team"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(to bottom, ${CHAR}bb, ${CHAR}ee)` }}
        />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div
            className="text-sm font-bold tracking-widest mb-4"
            style={{ color: ORANGE, fontFamily: "Inter, sans-serif" }}
          >
            OUR STORY
          </div>
          <h1
            style={{
              fontFamily: "Anton, sans-serif",
              fontSize: "clamp(40px, 7vw, 72px)",
              color: "#fff",
              letterSpacing: 2,
              lineHeight: 1,
            }}
          >
            CRAVE CHICKEN & GYRO
          </h1>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              color: "rgba(255,255,255,0.8)",
              marginTop: 20,
              fontSize: 18,
              lineHeight: 1.8,
              maxWidth: 600,
              margin: "20px auto 0",
            }}
          >
            At Crave Chicken & Gyro, we believe that great food isn't just about eating, it's about an experience, a moment, and a connection.
          </p>
        </div>
      </div>

      {/* Philosophy Section */}
      <Section style={{ background: "#fff" }}>
        <div
          ref={r1}
          className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center"
          style={{ opacity: v1 ? 1 : 0, transition: "opacity 0.7s" }}
        >
          <div
            className="rounded-2xl overflow-hidden h-80 md:h-96"
            style={{
              background: CHAR,
              opacity: v1 ? 1 : 0,
              transform: v1 ? "translateX(0)" : "translateX(-40px)",
              transition: "all 0.7s ease-out",
            }}
          >
            <img src={IMGS.about} alt="Our kitchen" className="w-full h-full object-cover" />
          </div>
          <div
            style={{
              opacity: v1 ? 1 : 0,
              transform: v1 ? "translateX(0)" : "translateX(40px)",
              transition: "all 0.7s ease-out",
            }}
          >
            <div
              className="text-sm font-bold tracking-widest mb-3"
              style={{ color: ORANGE, fontFamily: "Inter, sans-serif" }}
            >
              OUR PHILOSOPHY
            </div>
            <h2
              style={{
                fontFamily: "Anton, sans-serif",
                fontSize: "clamp(28px, 4vw, 44px)",
                color: CHAR,
                lineHeight: 1.1,
                letterSpacing: 1,
              }}
            >
              FRESH, QUALITY,
              <br />
              AND BOLD FLAVORS
            </h2>
            <p
              style={{ fontFamily: "Inter, sans-serif", color: GREY, marginTop: 16, lineHeight: 1.8 }}
            >
              Every meal we serve starts with fresh, high-quality ingredients. We're committed to using only the best, whether it's our marinated chicken, seasoned beef, or freshly baked burger buns, we prioritize quality in every ingredient.
            </p>
            <p
              style={{ fontFamily: "Inter, sans-serif", color: GREY, marginTop: 12, lineHeight: 1.8 }}
            >
              We know that good food fuels the body and nourishes the soul, which is why every meal at Crave Chicken & Gyro is thoughtfully prepared with care and dedication.
            </p>
          </div>
        </div>
      </Section>

      {/* Founder Story */}
      <Section style={{ background: CREAM }}>
        <div
          ref={r2}
          className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center"
          style={{ opacity: v2 ? 1 : 0, transition: "opacity 0.7s" }}
        >
          <div
            style={{
              opacity: v2 ? 1 : 0,
              transform: v2 ? "translateX(0)" : "translateX(-40px)",
              transition: "all 0.7s ease-out",
            }}
          >
            <div
              className="text-sm font-bold tracking-widest mb-3"
              style={{ color: ORANGE, fontFamily: "Inter, sans-serif" }}
            >
              FOUNDER STORY
            </div>
            <h2
              style={{
                fontFamily: "Anton, sans-serif",
                fontSize: "clamp(28px, 4vw, 44px)",
                color: CHAR,
                lineHeight: 1.1,
                letterSpacing: 1,
              }}
            >
              FROM WASHINGTON HEIGHTS
              <br />
              TO YOUR NEIGHBORHOOD
            </h2>
            <p
              style={{ fontFamily: "Inter, sans-serif", color: GREY, marginTop: 16, lineHeight: 1.8 }}
            >
              Crave Chicken & Gyro was born in 2020, but its roots go back decades. Founders Steve and Mo John grew up surrounded by the bustling energy of their grandfather's restaurant in Washington Heights, Manhattan, where they learned to cook halal food with the precision and passion of true artisans.
            </p>
            <p
              style={{ fontFamily: "Inter, sans-serif", color: GREY, marginTop: 12, lineHeight: 1.8 }}
            >
              Their vision was simple yet bold: to turn Crave into the go-to spot for fresh, authentic halal platters with an unmistakable twist. Inspired by the heat of the grill and the flavor that only comes from fire, "Crave" became more than just a name, it became a promise.
            </p>
          </div>
          <div
            className="rounded-2xl overflow-hidden h-80"
            style={{
              background: CHAR,
              opacity: v2 ? 1 : 0,
              transform: v2 ? "translateX(0)" : "translateX(40px)",
              transition: "all 0.7s ease-out",
            }}
          >
            <img src={IMGS.team} alt="Founders" className="w-full h-full object-cover" />
          </div>
        </div>
      </Section>

      {/* COVID Resilience */}
      <Section style={{ background: CHAR }}>
        <div
          ref={r3}
          className="max-w-4xl mx-auto text-center"
          style={{
            opacity: v3 ? 1 : 0,
            transform: v3 ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.7s",
          }}
        >
          <SectionTitle light sub="A story of resilience and community.">
            BORN IN A TIME OF CHALLENGE
          </SectionTitle>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              color: "rgba(255,255,255,0.85)",
              fontSize: 17,
              lineHeight: 1.8,
            }}
          >
            Crave opened its doors during one of the toughest times in recent history: the COVID-19 pandemic. Despite the challenges, they doubled down; offering curbside service, personally delivering meals door-to-door, and finding ways to connect with every customer.
          </p>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              color: "rgba(255,255,255,0.85)",
              fontSize: 17,
              lineHeight: 1.8,
              marginTop: 16,
            }}
          >
            People didn't just come for a meal; they came for a welcome, a familiar face, and, most importantly, a taste that reminded them why food can feel like family.
          </p>
        </div>
      </Section>

      {/* Menu Highlights */}
      <Section style={{ background: "#fff" }}>
        <div className="max-w-6xl mx-auto">
          <SectionTitle sub="Something for everyone, every craving covered.">
            OUR MENU
          </SectionTitle>
          <div
            ref={r4}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            style={{
              opacity: v4 ? 1 : 0,
              transform: v4 ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.6s",
            }}
          >
            {[
              { icon: <Utensils size={28} />, title: "Handcrafted Burgers", desc: "Juicy, handcrafted burgers made from 100% fresh beef." },
              { icon: <Heart size={28} />, title: "Flavorful Gyro", desc: "Tender, flavorful gyro served with our signature sauces." },
              { icon: <Award size={28} />, title: "Fresh Salads", desc: "Delicious, healthy choices packed with vibrant greens and customizable protein options." },
            ].map((item) => (
              <div
                key={item.title}
                className="text-center p-8 rounded-2xl border-2 transition-all hover:shadow-xl hover:-translate-y-1 duration-300"
                style={{ borderColor: "#f0e0d0", background: "#fff" }}
              >
                <div className="flex justify-center mb-4" style={{ color: RED }}>
                  {item.icon}
                </div>
                <h3
                  style={{
                    fontFamily: "Anton, sans-serif",
                    fontSize: 22,
                    color: CHAR,
                    letterSpacing: 1,
                    marginBottom: 12,
                  }}
                >
                  {item.title.toUpperCase()}
                </h3>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    color: GREY,
                    lineHeight: 1.7,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Commitments */}
      <Section style={{ background: RED }}>
        <div className="max-w-6xl mx-auto">
          <SectionTitle light sub="This is what we stand for.">
            OUR VALUES
          </SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Award size={28} />, title: "Quality First", desc: "Fresh, high-quality ingredients in every meal." },
              { icon: <Clock size={28} />, title: "Fast & Fresh", desc: "We blend speed with quality, so you get delicious food quickly." },
              { icon: <Home size={28} />, title: "Community Focused", desc: "Our roots are in the community, and we're proud to be part of your neighborhood." },
              { icon: <Heart size={28} />, title: "Family Feel", desc: "Crave Chicken & Gyro isn't just a place to eat, it's a place to connect." },
            ].map((item) => (
              <div
                key={item.title}
                className="text-center p-6 rounded-2xl"
                style={{ background: "rgba(255,255,255,0.12)" }}
              >
                <div className="flex justify-center mb-4" style={{ color: GOLD }}>
                  {item.icon}
                </div>
                <h3
                  style={{
                    fontFamily: "Anton, sans-serif",
                    fontSize: 20,
                    color: "#fff",
                    letterSpacing: 1,
                    marginBottom: 10,
                  }}
                >
                  {item.title.toUpperCase()}
                </h3>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 14,
                    color: "rgba(255,255,255,0.8)",
                    lineHeight: 1.6,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Call to Action */}
      <Section style={{ background: CREAM }}>
        <div className="max-w-4xl mx-auto text-center">
          <SectionTitle sub="From the first bite to the last, we want each visit to feel like a celebration of flavor and quality.">
            JOIN THE CRAVE FAMILY
          </SectionTitle>
          <Link
            to="/locations"
            className="inline-flex items-center gap-2 mt-8 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105"
            style={{ background: RED, color: "#fff", fontFamily: "Anton, sans-serif", letterSpacing: 1 }}
          >
            Find a Location <ArrowRight size={20} />
          </Link>
        </div>
      </Section>
    </div>
  );
}
