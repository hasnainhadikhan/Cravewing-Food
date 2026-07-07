# Cravewing — Design & Polish Improvement Guide

A section-by-section plan to take the site from "clean but generic / AI-looking" to a **custom, characterful, premium wings brand**. Every recommendation is written against the actual code in this repo (files, tokens, and libraries you already have).

> **Why the site currently reads "AI-generated":** three tells. (1) Default lucide line-icons + emoji (🔥🍗) used as real UI. (2) Everything animates the *same way* (fade-up on scroll) so nothing feels intentional. (3) Flat fills, uniform rounded corners, evenly-spaced everything, one shadow style. Fixing those three things is 80% of the "make it look designed" job.

---

## 0. Quick Wins (do these first — highest impact per hour)

| # | Change | File(s) | Impact |
|---|--------|---------|--------|
| 1 | Replace emoji (🔥🍗) with real SVG/Lottie assets | `HomePage.tsx`, `CartPage.tsx`, `CheckoutPage.tsx`, `CareerPage.tsx`, `MenuPage.tsx`, `NotFoundPage.tsx` | Removes the #1 "AI" tell |
| 2 | Add a real type scale + tighten headline tracking | `theme.css`, `fonts.css` | Instant "designed" feel |
| 3 | Give icons weight + brand color, not thin grey lines | all pages using `lucide-react` | Custom feel |
| 4 | Add texture/grain + noise over flat cream background | `theme.css`, `App.tsx` | Kills the flat template look |
| 5 | Differentiate animations per section (not all fade-up) | `lib/motion.ts` + pages | Feels intentional |
| 6 | Wire up **Lenis** smooth scroll (installed, unused) | `App.tsx` / `main.tsx` | Premium scroll feel |

---

## 1. Typography — Fonts, Family, Size, Rhythm

### 1.1 What you have now
- `fonts.css` loads **Anton** (display), **Inter** (body), **Permanent Marker** (accent).
- `theme.css` sets a base of `16px` and only maps `h1–h4` to `--text-2xl … --text-base` at `font-weight: 500`, `line-height: 1.5`.

**Problems:**
- Headings are only `text-2xl` at their largest in the base layer — too timid for a bold wings brand.
- `line-height: 1.5` on headings is body spacing; display type needs `1.0–1.15`.
- No **letter-spacing** system — Anton needs slight positive tracking; Inter body needs `-0.011em`.
- Only 3 weights of Inter loaded; you never use a light or black cut for contrast.
- No fluid type scale — sizes don't respond smoothly between mobile and desktop except ad-hoc `clamp()` in the hero.

### 1.2 Recommended font stack (more character, less generic)

Anton is fine but *very* common. Consider a more ownable display face. Pick ONE direction:

| Direction | Display font | Why |
|-----------|-------------|-----|
| **Keep punchy/cheap-eats** | Keep **Anton**, but pair with a condensed grotesk like **Archivo Expanded** or **Bebas Neue** for sub-headers | Familiar but tightened |
| **Premium/craft (recommended)** | **Clash Display**, **Cabinet Grotesk**, or **Uncut Sans** (Fontshare, free) | Feels bespoke, not template |
| **Retro diner/attitude** | **Druk Wide** (paid) or free alt **Anton + tighter tracking** for headers, **Redaction** for accents | Strong personality |

Replace the accent font: **Permanent Marker** is one of the most overused "handwritten" Google Fonts and screams template. Swap for **Caveat**, **Gochi Hand**, or a custom-lettered SVG for the "sauce it" script bits.

**New `fonts.css`** (example using Fontshare's Clash + keeping Inter, adding weights):
```css
@import url('https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&f[]=cabinet-grotesk@800,900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Caveat:wght@600&display=swap');
```

### 1.3 A real type scale (add to `theme.css`)

Add fluid, named tokens and use them everywhere instead of arbitrary `text-xl`:
```css
:root {
  /* Fluid type scale — clamp(min, preferred, max) */
  --text-hero:   clamp(3.5rem, 8vw, 7rem);    /* Anton/Clash headlines */
  --text-h1:     clamp(2.5rem, 5vw, 4rem);
  --text-h2:     clamp(2rem, 3.5vw, 3rem);
  --text-h3:     clamp(1.5rem, 2.2vw, 2rem);
  --text-lead:   clamp(1.125rem, 1.4vw, 1.375rem); /* intros */
  --text-body:   1rem;
  --text-small:  0.875rem;
  --text-eyebrow:0.75rem;  /* uppercase labels */

  /* Tracking */
  --track-display: 0.01em;   /* Anton slightly open */
  --track-eyebrow: 0.18em;   /* wide uppercase labels */
  --track-body:   -0.011em;  /* Inter optically tighter */
}
```

**Fix the heading base styles** (they're too small and too loose):
```css
h1 { font-family: 'Clash Display', sans-serif; font-size: var(--text-h1);
     line-height: 1.02; letter-spacing: var(--track-display); font-weight: 700; }
h2 { font-size: var(--text-h2); line-height: 1.08; letter-spacing: var(--track-display); }
h3 { font-size: var(--text-h3); line-height: 1.15; }
p  { line-height: 1.6; letter-spacing: var(--track-body); }
```

### 1.4 The "eyebrow" pattern (adds instant editorial polish)
Above every section title, add a small uppercase label — the single most effective way to stop looking generic:
```tsx
<span className="text-eyebrow uppercase tracking-[0.18em] font-semibold"
      style={{ color: ORANGE }}>Our Menu</span>
<h2>Wings Worth Craving</h2>
```
Add this to `SectionTitle.tsx` so it's consistent site-wide.

### 1.5 Body copy rules
- Max line length **~66ch** for paragraphs (`max-w-[62ch]`). Currently full-width text blocks read like a wall.
- Use `font-weight: 300` Inter for large lead paragraphs — thin + big = premium.
- Never center long paragraphs; center only 1–2 line intros.

---

## 2. Icons — Stop Looking AI-Generated

### 2.1 The problem
- **Emoji as UI** (`🔥`, `🍗`, `flames = ["🔥","🔥","🔥"]` in `HomePage.tsx:45`, `CartPage.tsx:70`, `CheckoutPage.tsx:160`, `CareerPage.tsx:65`, `NotFoundPage.tsx:10`). Emoji render differently per OS and instantly look unpolished/placeholder.
- **Thin grey lucide line-icons** used at default 24px/1.5 stroke — the exact look of every AI-scaffolded site.

### 2.2 Fixes

**A. Kill the emoji.** Replace with one of:
- **Lottie** (you already have `@lottiefiles/dotlottie-web`): use an animated flame / wing loop for the hero "flame" indicator and the 404. This is a huge upgrade and you already installed the library.
- **Custom SVG icon set**: draw or commission 6–10 branded glyphs (wing, drumstick, flame, sauce bottle, crown, pepper). Store in `src/components/icons/`. Even simple filled SVGs beat emoji.
- Free sources for a more custom look: **Iconoir**, **Phosphor** (has `duotone` + `fill` weights), **Solar**, **Streamline**. Phosphor duotone especially reads far less "default" than lucide.

**B. Give icons real presence** (when you do keep lucide):
```tsx
// Instead of: <Flame className="text-gray-500" />
<span className="inline-flex items-center justify-center w-11 h-11 rounded-full"
      style={{ background: `${ORANGE}1a`, color: ORANGE }}>
  <Flame strokeWidth={2.4} className="w-5 h-5" />
</span>
```
Rules: icons live in a **colored container** (tinted circle/squircle), get **brand color** not grey, and use a **heavier stroke (2.2–2.6)** to match the bold Anton headlines. Thin icons next to a black display font is the visual mismatch that reads as "auto-generated."

**C. Consistency:** pick ONE icon library and ONE stroke weight. Right now you mix lucide + `@mui/icons-material` (both installed). Standardize on one (recommend Phosphor or lucide) and remove the other to cut bundle + visual inconsistency.

**D. Spice meter:** replace the 🔥🔥🔥 flame level with a custom 3-segment SVG meter (empty → filled pepper shapes) that animates fill on hover. Small detail, big "someone designed this" signal.

---

## 3. Color, Texture & Depth — Kill the "Flat Template" Look

Your palette (red `#D6291E`, orange `#F26B21`, gold `#FCB316`, char `#221A17`, cream `#FFF6EC`) is genuinely good. The problem is **how flatly it's applied**.

### 3.1 Add texture (biggest anti-generic move)
Flat cream `#FFF6EC` everywhere = template. Add:
- **Film grain / noise overlay** — a subtle SVG noise at 3–5% opacity over the whole page:
```css
body::before {
  content: ""; position: fixed; inset: 0; pointer-events: none; z-index: 1;
  opacity: 0.035; mix-blend-mode: multiply;
  background-image: url("data:image/svg+xml,..."); /* fractalNoise turbulence */
}
```
- **Paper/kraft texture** behind menu sections (evokes takeaway packaging).
- **Grease-paper / halftone** accents behind price tags.

### 3.2 Depth instead of flat cards
- Replace the single uniform `--radius: 0.75rem` with a **radius scale**: tight `4px` on tags, `12px` cards, `24px` feature panels, `999px` pills. Uniform radius = generic.
- **Layered shadows** not one soft box-shadow. Warm-tinted shadow for food photos:
```css
--shadow-card: 0 1px 2px rgba(34,26,23,.06),
               0 8px 24px -8px rgba(214,41,30,.18);
```
- Add **1px inner highlight** on cards (`inset 0 1px 0 rgba(255,255,255,.6)`) for a tactile edge.

### 3.3 Color usage
- Use gold `#FCB316` as an **accent only** (prices, stars, underlines), not large fills.
- Introduce **gradients with intent**: red→orange diagonal on CTAs only. Add a subtle noise to gradients so they don't band.
- **Duotone your food photos' hover state** or add a warm color grade so Unsplash stock stops looking like stock (see §4).

---

## 4. Imagery — The Unsplash Stock Tell

All images are Unsplash (`brand.ts → IMGS`). Stock URLs with `photo-xxxx` are a strong "not a real brand" signal.

**Fixes (in priority order):**
1. **Shoot real food** — even phone photos of the actual product beat perfect stock. Highest trust signal for a restaurant.
2. If stuck with stock short-term:
   - Apply a **consistent color grade** (warm, slightly crushed blacks) via a CSS `filter` or an overlay so all images feel like one shoot.
   - Add a **grain + subtle vignette** over each.
   - Use a **duotone treatment** on secondary images (char + cream) so they read as brand art, not photos.
3. Add **image loading polish**: blur-up placeholder (LQIP) or a shimmer, not a hard pop-in. You have `skeleton.tsx` — use it.
4. Serve properly sized images and `loading="lazy"` (Unsplash `w=`/`h=` params are there, good — keep tuning).

---

## 5. Animation — Make It Feel Intentional, Not Uniform

You have a strong foundation: `motion`, `gsap`, `lenis`, `canvas-confetti`, plus `lib/motion.ts` variants and `useScrollReveal`. The issue is **everything uses `fadeUp`**, so nothing stands out.

### 5.1 Wire up Lenis (installed, currently unused)
Smooth momentum scroll is the single biggest "premium" upgrade. In `App.tsx`:
```tsx
import Lenis from 'lenis';
useEffect(() => {
  const lenis = new Lenis({ duration: 1.1, easing: (t)=>1-Math.pow(1-t,3) });
  const raf = (t:number)=>{ lenis.raf(t); requestAnimationFrame(raf); };
  requestAnimationFrame(raf);
  return () => lenis.destroy();
}, []);
```
Then drive GSAP ScrollTrigger / motion off the same scroll for buttery pinned sections.

### 5.2 Give each section its OWN motion signature
| Section | Motion (not just fade-up) |
|---------|---------------------------|
| Hero | Keep kinetic headline mask-up (good already) + parallax layers, add a slow floating garnish/sauce splash |
| Menu grid | **Stagger + scale-in** cards, tilt-on-hover (3D `rotateX/Y` follow cursor) |
| Fan favorites | Horizontal **pinned scroll** (GSAP ScrollTrigger) — cards slide sideways as you scroll down |
| Sauces | Cards **flip/blur-in**, spice meter fills on reveal |
| Stats/counters | `AnimatedCounter` (have it) triggered on view + odometer roll |
| About | Split-text word reveal + image parallax opposite directions (`fromLeft`/`fromRight` already exist — use them here, not everywhere) |
| Reviews | Marquee auto-scroll (have `Marquee`) + drag-to-scroll |
| CTA/footer | Confetti (`canvas-confetti`) on "Order now", magnetic button (have `MagneticButton`) |

### 5.3 Micro-interactions (the details that sell "custom")
- **Buttons:** press-down scale `0.97`, animated gradient sweep, arrow that slides on hover. Extend `MagneticButton` to all primary CTAs.
- **Cards:** lift + warm shadow bloom on hover; image zoom `scale(1.06)` inside a clipped container.
- **Add-to-cart:** fly-to-cart animation + cart badge bounce + tiny confetti burst. Huge delight, low effort with libs you have.
- **Nav:** underline that draws in (SVG stroke), sticky nav that shrinks + gains a blurred glass background on scroll.
- **Links:** `text-underline-offset` animated underline instead of default.
- **Cursor:** optional custom cursor (a small sauce dot) on desktop — very "designed," use sparingly.

### 5.4 Respect motion preferences & performance
- Add `@media (prefers-reduced-motion: reduce)` to disable transforms — currently missing; important for polish + accessibility.
- Animate only `transform`/`opacity` (GPU). Avoid animating layout props.
- Use `will-change` sparingly on pinned/parallax elements.

### 5.5 Add a page-load & route-transition experience
- A **brand preloader** (logo + flame Lottie) on first load masks font/image loading and sets tone.
- **Route transitions** with `AnimatePresence` (a wipe in brand red) so page changes feel app-like, not full reloads.

---

## 6. Section-by-Section Detail

### 6.1 Global — Nav & Footer
- **Sticky nav:** starts transparent over hero → on scroll gains `backdrop-blur` + cream/90 bg + shrinks height + logo scales down. Animated.
- Add an **order/cart affordance** always visible with item count badge.
- **Footer:** currently likely a plain list. Make it a *statement* — oversized Anton wordmark, newsletter input with animated submit, opening hours, map embed, social icons in tinted circles. Add a top "sauce drip" SVG divider.
- Consistent **section rhythm**: vertical padding scale (`py-24 md:py-32`), and alternating backgrounds (cream / char / kraft-texture) so sections read as distinct chapters.

### 6.2 HomePage — Hero
- Strong already (parallax + kinetic type). Enhancements:
  - Add a **floating hero product** (PNG wing with transparent bg) that parallaxes independently and rotates slightly with cursor.
  - Replace the emoji flame indicator (`flames`) with a **Lottie flame** or animated SVG.
  - Add a **scroll cue** (animated chevron / "scroll" vertical text).
  - Add a thin **marquee strip** under the hero: "FREE DELIVERY • 12 SAUCES • OPEN LATE •" (you have `Marquee`).

### 6.3 Menu / MenuPage
- **Card design:** photo top with zoom-on-hover, price as a **gold tag/badge** (not inline text), spice meter, quick "+ Add" button that animates.
- Sticky **category filter bar** with an animated active pill that slides between categories.
- Replace the `🔥 with {selectedSauce}` (`MenuPage.tsx:146`) text with the branded spice meter component.
- Empty/loading states use `skeleton.tsx` shimmer, not blank.

### 6.4 Sauces
- **Signature moment.** Each sauce = a card with its color, a spice meter, and a tilt/parallax bottle image. Hover reveals flavor notes. Consider a **draggable sauce carousel** (embla is installed).

### 6.5 About / AboutPage
- Editorial layout: **asymmetric** two-column, big pull-quote in Anton, timeline of the brand story with scroll-reveal per milestone.
- Icons (`Award, Heart, Utensils…`) → put in tinted circles per §2.2B.
- Parallax the team/about images opposite scroll directions.

### 6.6 Reviews / ReviewsPage
- Star ratings: fill animation on reveal; use a custom star, keep gold.
- **Marquee row** of short reviews + a featured large testimonial with `Quote` icon oversized and faded behind text.

### 6.7 Locations / LocationsPage
- Real **map** (embed or Mapbox) instead of a plain list; cards with hours, an "Open now" live pill, directions button. Animate cards in as a stagger.

### 6.8 Cart / Checkout / Order Tracking
- **Cart:** replace `🍗` placeholder (`CartPage.tsx:70`) with real item thumbnails; animate quantity changes (number roll), item remove (slide + fade), running total count-up.
- **Checkout:** multi-step with an animated progress indicator; validate inline with micro-feedback.
- **Order tracking:** you have great icons (`ChefHat, Bike, Package`). Build an **animated progress timeline** where the active stage pulses and the connector line fills — this can be a signature screen.

### 6.9 Auth / Career / Catering / 404
- **Auth:** icons in inputs (have `Mail, Lock`), animated focus states, brand-side panel with imagery.
- **Career:** replace `icon: "🍗"` perk emoji (`CareerPage.tsx:65`) with SVGs; animate perk cards on reveal.
- **404:** replace `🔥` (`NotFoundPage.tsx:10`) with a Lottie flame + a witty line + magnetic "Back home" button.

---

## 7. Consistency System (prevents future "generic" drift)

Create these so the site stays coherent:
- **`SectionTitle`** with eyebrow + heading + optional description (one source of truth).
- **`Icon` wrapper** component enforcing tinted container + stroke weight + size.
- **Motion tokens** already in `lib/motion.ts` — add `tiltHover`, `pinnedScroll`, `flyToCart`, and USE the directional variants instead of defaulting to `fadeUp`.
- **Spacing scale** (4/8/12/16/24/32/48/64/96) and stick to it — irregular gaps read as generic.
- **Radius scale** and **shadow scale** (see §3.2).
- Document the do/don't in a short `DESIGN.md`.

---

## 8. Accessibility & Performance (polish that separates pro from template)
- Color-contrast check gold/cream text (gold on cream fails WCAG — use char text on gold).
- Focus-visible rings using `--ring` (already defined) on all interactives.
- `prefers-reduced-motion` support (§5.4).
- Lazy-load below-fold images + code-split routes (Vite supports it).
- Preload the display font to avoid FOUT on the hero headline.
- Semantic landmarks (`<nav> <main> <footer>`), alt text on all food images.

---

## 9. Suggested Order of Execution

1. **Foundations:** type scale + tracking (§1), texture/grain (§3.1), Lenis (§5.1). *→ instant premium feel.*
2. **De-AI pass:** remove all emoji, build icon system, differentiate a photo grade (§2, §4).
3. **Signature animations:** hero polish, menu tilt cards, one pinned scroll section, add-to-cart delight (§5).
4. **Section-by-section** refinement (§6).
5. **System + a11y/perf** hardening (§7, §8).

---

### Appendix — Files referenced
- Fonts: [`frontend/src/styles/fonts.css`](frontend/src/styles/fonts.css)
- Tokens/type base: [`frontend/src/styles/theme.css`](frontend/src/styles/theme.css)
- Brand tokens: [`frontend/src/constants/brand.ts`](frontend/src/constants/brand.ts)
- Motion variants: [`frontend/src/lib/motion.ts`](frontend/src/lib/motion.ts)
- Scroll reveal hook: [`frontend/src/hooks/useScrollReveal.ts`](frontend/src/hooks/useScrollReveal.ts)
- Emoji-as-UI to replace: `HomePage.tsx:45`, `CartPage.tsx:70`, `CheckoutPage.tsx:160`, `CareerPage.tsx:65`, `MenuPage.tsx:146`, `NotFoundPage.tsx:10`
- Installed-but-underused libs to exploit: `lenis`, `gsap`, `@lottiefiles/dotlottie-web`, `canvas-confetti`, `embla-carousel-react`
Want to set all the button in website do the professional not ai  and its radius that outside the cards only and also want to set footer more profession 