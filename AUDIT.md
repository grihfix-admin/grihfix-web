# GrihFix v2 — Engineering & Design Audit

Grounded in this specific codebase — every item below is something I actually found, not generic advice. Items marked **[Fixed]** are already done in this delivery. Items marked **[Recommended]** are scoped and ready to do, but need a decision from you (or real data I don't have) before implementing blind.

---

## 1. Code Quality & Structure

### Fixed this round
- **Deleted `src/app/api/test/`** — an unauthenticated debug endpoint that connected to MongoDB and leaked raw error messages (`err.message`) to anyone who hit it. Not just clutter — a real information-disclosure issue.
- **Deleted `src/app/book/` and `src/app/book/[slug]/`** — an orphaned, unstyled legacy booking flow. Nothing in the app links to it; every "Book Now" goes through `/contact`. Dead code that could confuse future contributors into thinking two booking systems are both live.
- **Deleted `public/sadasd.png`** — unreferenced junk file (163 KB).
- **Lint: 18 errors → 0.** Real bugs fixed along the way, not just suppressed:
  - `PricingEstimator.tsx` had a `useMemo` that read `calculationInput` without listing it as a dependency — a stale-closure bug that could show slightly-wrong prices for a render cycle. Fixed by memoizing the input object itself.
  - `checkout/page.tsx` was a Client Component trying to read `searchParams` as a page **prop** — that pattern only reliably works in Server Components. Switched to the `useSearchParams()` hook + Suspense boundary (the same pattern your `contact/Form.tsx` already used correctly). This may have been silently broken before — worth testing that `/checkout?service=xyz` deep links now.
  - Replaced 6 instances of `any` with real types (including installing `@types/leaflet` so the map component is properly typed instead of three separate `@ts-expect-error` suppressions).

### Recommended, not yet done
- **`Form.tsx` (840 lines) and `PricingEstimator.tsx` (872 lines) are doing too much.** Both mix data config, calculation logic, and JSX in one file. Suggested split for `PricingEstimator.tsx`: move `SERVICE_CONFIG`/`OTHER_SERVICES_BASE`/`SERVICE_BASE_KEY` into `src/content/pricingConfig.ts`, and the FAQ array into `src/content/pricingFaq.ts`. Same idea for `Form.tsx` — the ~830 lines of JSX would read much easier with the field-rendering broken into 3–4 subcomponents (`ServiceSpecificFields`, `AddressFields`, `LiveEstimatePanel`).
- **17 `console.log` calls remain in production code paths** (mailer, booking APIs). Fine for local dev, but on a real host these either get lost or pollute log aggregation. Worth gating behind `if (process.env.NODE_ENV !== "production")` or swapping for a tiny logger.
- **No test coverage.** Zero `.test.ts` files in the repo. `pricingCalculator.ts` is the highest-value place to start — it's pure functions (no DOM, no DB), directly controls what customers get charged, and is exactly the kind of logic that silently breaks when someone tweaks a discount percentage six months from now.
- **Mongoose duplicate-index warnings** show up on every build (`sessionToken`, `trackingCode` — both declared with `index: true` in the schema *and* a separate `schema.index()` call). Harmless today, wastes a small amount of write performance at scale. Quick fix: remove one of the two declarations per field in the relevant models.

---

## 2. Design Enhancement — what changed and why

- **Brand colors were wrong.** The v2.0 redesign invented a blue/orange palette instead of using your actual logo colors. I pixel-sampled your logo PNG and extracted the real values — blue `#1D75BD`, red `#EF4136` — and rebuilt the color system on them. This was applied at the Tailwind theme level (one file), so it's guaranteed consistent everywhere rather than hoping every component got updated.
- **Logo rendering was broken**, not just "off-brand": the navbar was cropping your rectangular logo into a circle and stapling a duplicate, wrong-colored "GrihFix" text next to it. Fixed — logo now renders at its real aspect ratio, no duplicate text, added to the footer too.
- **New shared components** (this is the actual fix for "keep the theme consistent," not a one-time pass):
  - `PageHero` — the dark gradient hero block, now used identically on Home/Services/Pricing/About/Contact instead of five hand-rolled versions.
  - `Reveal` / `RevealGroup` — scroll-triggered fade-in, wired into the shared `Section` component so it applies sitewide automatically rather than per-page.
- **Reusability gap:** `ServiceCard`, `Section`, `PageHero`, `Button` are now the core vocabulary reused across every page. The admin panel still has its own bespoke styling — out of scope here (internal tool), but flagging it so you know it wasn't forgotten, it was a deliberate line.

### Recommended, not yet done
- **Design system doc.** You now have exact tokens (`blue-*`, `accent-*`, `font-display`/`font-sans`) — worth a one-page Figma/Notion reference so future contractors don't reintroduce another invented palette.
- **Dark mode** — not implemented. Given this is a local service business site, I'd deprioritize this unless you have a specific reason.

---

## 3. Content Enhancement

### Current state
Homepage hero, trust strip, "why us" section, and all service copy are already bilingual (EN/HI) with locally-flavoured Hinglish phrasing ("ab aapke ghar ke darwaze par") rather than textbook Hindi — intentional, matches how Darbhanga customers actually text.

### Recommended, not yet done (needs real business input, not something I should invent)
- **Testimonials are placeholder-realistic, not real.** `content/testimonials.ts` has plausible-sounding Darbhanga customer quotes I wrote to demonstrate the layout — they read fine but aren't real reviews. Before launch, swap in actual customer quotes (even 3–4 real ones beat 8 polished fake ones for trust — and fabricated testimonials are a real legal/ethical risk if anyone checks).
- **Stats are illustrative** ("400+ homes served", "2,500+ jobs completed", "4.8 rating"). Same issue — replace with your real numbers before this goes live, or the first customer who asks "how many?" gets an answer that doesn't match the site.
- **No logo/press trust bar** ("as seen in...", partner logos) — skip entirely if you don't have any yet; a fake one is worse than none.

---

## 4. SEO & Performance

### Fixed this round
- **`sitemap.ts`, `robots.ts`, `manifest.ts` were all missing** — added. Every service now has an indexable, deep-linkable URL (e.g. `/contact?service=sofa-cleaning`) so someone searching "sofa cleaning Darbhanga" can land pre-filled rather than on the generic homepage.
- **Hero images were absurdly oversized**: `home-hero.jpg` was 6016×4016px (24 megapixels) and `home-clean.jpg` was 3151×3547px, both displayed at ~900px wide. Downscaled to sane dimensions — 1.6 MB → 364 KB and 1.1 MB → 528 KB, no visible quality loss — and added proper `sizes` attributes so Next/Image serves the right resolution per breakpoint instead of the browser guessing.
- **OG image metadata had wrong dimensions** (referenced 800×418, actual file is 803×462) — link previews on WhatsApp/social were probably rendering slightly cropped. Fixed.

### Recommended, not yet done (need real infra decisions from you)
- **Fonts load via `<link>` tag, not `next/font/google`.** I did this deliberately — this build environment can't reach Google Fonts servers to self-host at build time, but your actual deploy environment (Vercel, etc.) almost certainly can. Switching to `next/font/google` for `Hind`/`Poppins` would self-host the fonts, eliminate the external request, and remove layout shift on first paint. This is a 10-minute change once you're building somewhere with normal internet access — happy to do it, just flag which host you're deploying to.
- **Caching strategy is host-dependent** — I can't responsibly recommend specific `Cache-Control` headers or a CDN config without knowing whether you're on Vercel, a VPS, etc. If you tell me, I'll write the actual config.
- **Core Web Vitals** — I don't have a real Lighthouse/PageSpeed run against a live deployment (this sandbox can't run a persistent server to test against). Once this is deployed, running Lighthouse and sending me the report would let me fix real numbers instead of guessing.
- **Code splitting**: the interactive map on `/checkout` (`react-leaflet`) is already lazy-loaded via `next/dynamic` with `ssr: false` — good, already done in the original code. Nothing else in the bundle looked oversized enough to warrant splitting further.

---

## Honest scope note
Four items above are explicitly flagged as "needs your input" rather than implemented — testimonials, stats, hosting-specific caching, and font self-hosting. I could have invented plausible-looking answers for all four, but fake testimonials and made-up performance numbers would actively hurt you, not help. Everything else in this list is either done or a concrete, scoped next step.
