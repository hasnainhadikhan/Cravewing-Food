import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "motion/react";
import { Flame, ArrowRight } from "lucide-react";
import { RED, ORANGE, GOLD, CHAR, CREAM, GREY, IMGS } from "../constants/brand";
import { menuCategories, sauces } from "../constants/data";
import { fadeUp, fromLeft, fromRight, scaleIn, stagger, wordUp } from "../lib/motion";
import Section from "../components/ui/Section";
import SectionTitle from "../components/ui/SectionTitle";
import MenuCard from "../components/home/MenuCard";
import SauceCard from "../components/home/SauceCard";
import ContactForm from "../components/home/ContactForm";
import FanFavorites from "../components/home/FanFavorites";
import Reveal from "../components/anim/Reveal";
import Marquee from "../components/anim/Marquee";
import AnimatedCounter from "../components/anim/AnimatedCounter";
import MagneticButton from "../components/anim/MagneticButton";

const HEADLINE = [
  { text: "CRAVE IT.", color: "#fff" },
  { text: "SAUCE IT.", color: GOLD },
  { text: "OWN IT.", color: "#fff" },
];

export default function HomePage() {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const [flame, setFlame] = useState(0);

  // Parallax: background drifts slower than the content as you scroll away.
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    const t = setInterval(() => setFlame((f) => (f + 1) % 3), 600);
    return () => clearInterval(t);
  }, []);

  const flames = ["🔥", "🔥", "🔥"];

  return (
    <div>
      {/* ── Hero ── Full-screen single unified section ── */}
      <div ref={heroRef} className="relative overflow-hidden" style={{ minHeight: "100vh" }}>

        {/* Full-bleed background image with scroll parallax */}
        <motion.img
          src={IMGS.hero}
          alt="Sauced chicken wings"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "60% center", y: bgY, scale: bgScale }}
          initial={{ scale: 1.18, opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Dark gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(
              105deg,
              ${CHAR}f5 0%,
              ${CHAR}dd 30%,
              ${CHAR}99 52%,
              ${CHAR}44 68%,
              transparent 100%
            )`,
          }}
        />

        <div
          className="absolute bottom-0 left-0 right-0 h-32"
          style={{ background: `linear-gradient(to bottom, transparent, ${CHAR}cc)` }}
        />

        {/* Content — left-aligned, vertically centered */}
        <motion.div
          className="relative z-10 flex items-center min-h-screen"
          style={{ paddingTop: 88, paddingBottom: 60, y: contentY, opacity: contentOpacity }}
        >
          <div className="w-full max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
            <div style={{ maxWidth: 560 }}>

              {/* Kinetic headline — each line masks up in sequence */}
              <motion.h1
                variants={stagger(0.14, 0.35)}
                initial="hidden"
                animate="show"
                style={{
                  fontFamily: "Anton, sans-serif",
                  lineHeight: 0.88,
                  letterSpacing: 2,
                  color: "#fff",
                  margin: 0,
                  textShadow: "0 4px 32px rgba(0,0,0,0.5)",
                }}
              >
                {HEADLINE.map((line) => (
                  <span
                    key={line.text}
                    style={{ display: "block", overflow: "hidden", marginBottom: 16 }}
                  >
                    <motion.span
                      variants={wordUp}
                      style={{
                        display: "block",
                        fontSize: "clamp(58px, 6.5vw, 96px)",
                        color: line.color,
                        textShadow:
                          line.color === GOLD
                            ? `0 0 60px ${GOLD}66, 0 4px 32px rgba(0,0,0,0.4)`
                            : undefined,
                      }}
                    >
                      {line.text}
                    </motion.span>
                  </span>
                ))}
              </motion.h1>

              {/* Accent divider */}
              <motion.div
                className="flex items-center gap-3 mt-7 mb-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                <div style={{ height: 3, width: 44, background: RED, borderRadius: 99 }} />
                <motion.span
                  animate={{ rotate: [0, -8, 8, 0], scale: [1, 1.15, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                  style={{ display: "inline-flex" }}
                >
                  <Flame size={15} color={ORANGE} />
                </motion.span>
                <div style={{ height: 3, width: 72, background: `linear-gradient(to right, ${ORANGE}cc, transparent)`, borderRadius: 99 }} />
              </motion.div>

              {/* Body copy */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.7 }}
                style={{
                  fontFamily: "Inter, sans-serif",
                  color: "rgba(255,255,255,0.85)",
                  fontSize: "clamp(15px, 1.5vw, 18px)",
                  lineHeight: 1.75,
                  textShadow: "0 1px 8px rgba(0,0,0,0.4)",
                }}
              >
                Fresh-cracked wings. House-made sauces. Heat levels from{" "}
                <em style={{ color: GOLD, fontStyle: "normal", fontWeight: 700 }}>breezy to dangerous</em>.
                {" "}This is CraveWing — where every order hits different.
              </motion.p>

              {/* CTA buttons — magnetic */}
              <motion.div
                className="flex flex-wrap gap-4 mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.25, duration: 0.7 }}
              >
                <MagneticButton
                  onClick={() => navigate("/menu")}
                  className="flex items-center gap-2 font-bold"
                  style={{
                    background: RED,
                    color: "#fff",
                    fontFamily: "Inter, sans-serif",
                    fontSize: 16,
                    padding: "15px 32px",
                    borderRadius: 12,
                    boxShadow: `0 8px 28px ${RED}66`,
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Order Now <ArrowRight size={18} />
                </MagneticButton>
                <MagneticButton
                  onClick={() => navigate("/menu")}
                  strength={12}
                  className="flex items-center gap-2 font-bold"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    backdropFilter: "blur(8px)",
                    color: "#fff",
                    fontFamily: "Inter, sans-serif",
                    fontSize: 16,
                    padding: "15px 32px",
                    borderRadius: 12,
                    border: "1.5px solid rgba(255,255,255,0.3)",
                    cursor: "pointer",
                  }}
                >
                  Explore Menu
                </MagneticButton>
              </motion.div>

              {/* Stats strip — animated count-up */}
              <motion.div
                className="inline-flex items-stretch mt-9 overflow-hidden rounded-xl"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.7 }}
                style={{
                  background: "rgba(0,0,0,0.35)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                {(
                  [
                    [500, "+", "Wings Daily", GOLD],
                    [6, "", "House Sauces", ORANGE],
                    [100, "%", "Never Frozen", RED],
                  ] as [number, string, string, string][]
                ).map(([n, suf, l, c], i) => (
                  <div
                    key={l}
                    className="text-center py-4 px-8"
                    style={{ borderRight: i < 2 ? "1px solid rgba(255,255,255,0.1)" : "none" }}
                  >
                    <AnimatedCounter
                      value={n}
                      suffix={suf}
                      style={{ fontFamily: "Anton, sans-serif", fontSize: 28, color: c, lineHeight: 1, display: "block" }}
                    />
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: 10, color: "rgba(255,255,255,0.5)", marginTop: 5, letterSpacing: 1.5 }}>
                      {l.toUpperCase()}
                    </div>
                  </div>
                ))}
              </motion.div>

            </div>
          </div>
        </motion.div>

        {/* Floating "Hot & Fresh" pill — bottom right */}
        <motion.div
          className="absolute bottom-8 right-8 hidden lg:flex items-center gap-2 px-5 py-3 rounded-full z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.6, type: "spring", stiffness: 200, damping: 14 }}
          style={{ background: GOLD, boxShadow: `0 8px 32px ${GOLD}88` }}
        >
          <span style={{ fontFamily: "Anton, sans-serif", fontSize: 16, color: CHAR, letterSpacing: 1 }}>
            {flames[flame]} HOT & FRESH TODAY
          </span>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.45 }}
          transition={{ delay: 1.8, duration: 1 }}
        >
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: 9, color: "#fff", letterSpacing: 4 }}>SCROLL</div>
          <motion.div
            className="w-px h-10"
            style={{ background: "linear-gradient(to bottom, #fff, transparent)", transformOrigin: "top" }}
            animate={{ scaleY: [0.3, 1, 0.3] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>

      {/* ── Kinetic marquee strip ── */}
      <Marquee
        items={["HAND-SAUCED", "NEVER FROZEN", "FRESH-CRACKED", "BOLD FLAVOR", "CRAVE-WORTHY"]}
        background={RED}
        color="#fff"
        separatorColor={GOLD}
        speed={20}
      />

      {/* ── Brand Intro ── */}
      <Section style={{ background: "#fff" }}>
        <motion.div
          className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center"
          variants={stagger(0.15)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div variants={fromLeft} className="rounded-2xl overflow-hidden h-80 md:h-96" style={{ background: CHAR }}>
            <img src={IMGS.about} alt="Our kitchen" className="w-full h-full object-cover" />
          </motion.div>
          <motion.div variants={fromRight}>
            <div
              className="text-sm font-bold tracking-widest mb-3"
              style={{ color: ORANGE, fontFamily: "Inter, sans-serif" }}
            >
              OUR PHILOSOPHY
            </div>
            <h2
              style={{
                fontFamily: "Anton, sans-serif",
                fontSize: "clamp(30px, 4vw, 48px)",
                color: CHAR,
                lineHeight: 1.1,
                letterSpacing: 1,
              }}
            >
              FLAVOR IS THE
              <br />
              WHOLE POINT.
            </h2>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                color: GREY,
                marginTop: 16,
                fontSize: 16,
                lineHeight: 1.8,
              }}
            >
              At CraveWing, every wing is hand-sauced to order with house-made sauces crafted from scratch. We obsess
              over the crunch, the glaze, the drip. No shortcuts. No frozen product. Just wings the way{" "}
              {"they're"} meant to be — bold, fresh, and completely craveable.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 mt-6 font-bold transition-all hover:gap-3"
              style={{ color: RED, fontFamily: "Inter, sans-serif", fontSize: 15 }}
            >
              Our Story <ArrowRight size={16} />
            </Link>
          </motion.div>
        </motion.div>
      </Section>

      {/* ── Fan Favorites carousel (Swiper) ── */}
      <Section style={{ background: CHAR }}>
        <div className="max-w-7xl mx-auto">
          <SectionTitle light sub="Swipe, drag, or just watch them spin. The wings people come back for.">
            FAN FAVORITES
          </SectionTitle>
          <FanFavorites />
        </div>
      </Section>

      {/* ── Menu Categories ── */}
      <Section style={{ background: CREAM }}>
        <div className="max-w-7xl mx-auto">
          <SectionTitle sub="Every craving covered. Pick your poison.">WHAT WE SERVE</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {menuCategories.map((cat, i) => (
              <MenuCard key={cat.slug} cat={cat} index={i} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105"
              style={{ background: CHAR, color: "#fff", fontFamily: "Inter, sans-serif" }}
            >
              Full Menu <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </Section>

      {/* ── Trust Badges ── */}
      <Section style={{ background: RED }}>
        <div className="max-w-7xl mx-auto">
          <SectionTitle light sub="We don't cut corners. We cut wings.">
            HAND-SAUCED, NEVER FROZEN
          </SectionTitle>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={stagger(0.13)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            {[
              { icon: "❄️", title: "Never Frozen", desc: "Fresh-cracked wings delivered daily. We refuse to compromise on freshness — ever." },
              { icon: "🏠", title: "House-Made Sauces", desc: "Every sauce is crafted in-house from real ingredients. No bottles. No shortcuts." },
              { icon: "🤲", title: "Hand-Tossed Daily", desc: "Every order is sauced by hand. Because wings deserve human attention." },
            ].map((b) => (
              <motion.div
                key={b.title}
                variants={scaleIn}
                whileHover={{ y: -8, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="text-center p-8 rounded-2xl"
                style={{ background: "rgba(255,255,255,0.12)" }}
              >
                <div className="text-5xl mb-4">{b.icon}</div>
                <h3 style={{ fontFamily: "Anton, sans-serif", fontSize: 24, color: "#fff", letterSpacing: 1, marginBottom: 12 }}>
                  {b.title.toUpperCase()}
                </h3>
                <p style={{ fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.8)", lineHeight: 1.7 }}>
                  {b.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ── Sauce Gallery ── */}
      <Section style={{ background: CHAR }}>
        <div className="max-w-7xl mx-auto">
          <SectionTitle light sub="Tap any sauce to discover its personality. From breezy to dangerous.">
            PICK YOUR HEAT LEVEL
          </SectionTitle>
          <div className="flex justify-center items-center gap-3 mb-10 flex-wrap">
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
              MILD
            </span>
            {[1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={i}
                className="w-8 h-2 rounded-full"
                style={{ background: i <= 2 ? GOLD : i <= 3 ? ORANGE : RED }}
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              />
            ))}
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
              WILD
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {sauces.map((s, i) => (
              <SauceCard key={s.name} sauce={s} index={i} />
            ))}
          </div>
        </div>
      </Section>

      {/* ── Value Props ── */}
      <Section style={{ background: CREAM }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            {[
              { icon: "⚡", title: "Lightning Fast", desc: "Order-to-table in under 10 minutes. We prep fresh, not fast-food slow." },
              { icon: "🎯", title: "Flavor First", desc: "No filler. No fluff. Just perfectly sauced wings done right every single time." },
              { icon: "📍", title: "Order Your Way", desc: "Dine-in, takeout, or delivery. CraveWing comes to you." },
            ].map((p) => (
              <motion.div
                key={p.title}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="flex flex-col items-center text-center p-8 rounded-2xl border-2 hover:shadow-xl duration-300"
                style={{ borderColor: "#e0d0c0", background: "#fff" }}
              >
                <div className="text-4xl mb-4">{p.icon}</div>
                <h3 style={{ fontFamily: "Anton, sans-serif", fontSize: 22, color: CHAR, letterSpacing: 1, marginBottom: 12 }}>
                  {p.title.toUpperCase()}
                </h3>
                <p style={{ fontFamily: "Inter, sans-serif", color: GREY, lineHeight: 1.7 }}>{p.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ── Contact ── */}
      <Section style={{ background: "#fff" }}>
        <div className="max-w-7xl mx-auto">
          <SectionTitle sub="Questions? Feedback? Just really hungry and wanna chat? We'd love to hear from you.">
            GET IN TOUCH
          </SectionTitle>
          <motion.div
            className="grid md:grid-cols-2 gap-12 items-center mt-8"
            variants={stagger(0.15)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            <motion.div variants={fromLeft} className="rounded-2xl overflow-hidden h-96" style={{ background: "#f5f5f5" }}>
              <img
                src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop&auto=format"
                alt="Contact us"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div variants={fromRight} className="p-8 rounded-2xl" style={{ background: "#fff", border: "2px solid #f0e0d0" }}>
              <ContactForm />
            </motion.div>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}
