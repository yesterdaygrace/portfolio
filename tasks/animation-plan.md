# Animation System Plan: GSAP & Framer Motion

## Executive Summary

Integrate a restrained, high-craft animation system using **GSAP (ScrollTrigger & Timelines)** and **Framer Motion (`motion/react`)** into Kevin Van Diesel Chansa's portfolio.

Per the `animation-systems` and `design-taste-frontend` principles, motion will serve clarity, hierarchy, and tactile feedback—maintaining the scholarly Vellum editorial aesthetic (`MOTION_INTENSITY: 4`) without gaming effects or performance jank.

---

## Architecture: Division of Roles

| Layer | Technology | Scope & Responsibility |
| :--- | :--- | :--- |
| **Macro Choreography** | **GSAP 3.15 + ScrollTrigger** | **Scroll-driven page entrances & sequenced timelines.**<br>• Hero opening sequence (hairlines, title, fact bar, portrait).<br>• Section chapter headers (`[01]...[07]`) scroll-triggered reveals.<br>• Systems migration runtime pipeline sequenced data-flow trigger. |
| **Micro-Interactions** | **Framer Motion (`framer-motion`)** | **Component state transitions & tactile feedback.**<br>• Tactile button presses (`whileTap`, `whileHover`).<br>• Mobile drawer slide & backdrop blur (`AnimatePresence`).<br>• Before/After tab crossfade in Systems Migration.<br>• Selected repository card hover focus & badge springs. |
| **Accessibility & Safety** | **WCAG 2.1 AA / Reduced Motion** | **Full `prefers-reduced-motion` compliance.**<br>• GSAP `matchMedia()` bypass.<br>• Framer Motion `useReducedMotion()` instant display fallback.<br>• Guaranteed 0 layout shift (CLS ≤ 0.001) and 0 TBT impact. |

---

## Phased Implementation Breakdown

### Phase 1: Dependencies & Motion Foundations
- [ ] Install `framer-motion` catalog dependency in `@workspace/portfolio`.
- [ ] Create shared motion utilities & tokens:
  - Easing curves: `power2.out` (GSAP) and `[0.25, 1, 0.5, 1]` (cubic-bezier / Framer Motion).
  - Durations: micro `160ms`, UI state `240ms`, section reveal `600ms`.
  - Stagger defaults: `40ms–60ms`.
- [ ] Implement `usePrefersReducedMotion` / GSAP context helper to ensure safe SSR/React 19 lifecycle cleanup.

### Phase 2: GSAP Hero & Scroll-Triggered Chapter Entrances
- [ ] **Hero Staggered Sequence (`Hero.tsx`):**
  - Timeline beat 1: Chapter kicker and top hairline expand (`width: 0 -> 100%`).
  - Timeline beat 2: Display headline *Kevin Van Diesel Chansa* fades and rises (`y: 20 -> 0`, `opacity: 0 -> 1`).
  - Timeline beat 3: Fact bar items stagger reveal (`40ms` stagger).
  - Timeline beat 4: CTAs and archival portrait frame reveal with subtle focus.
- [ ] **Section Chapter Reveal Hook (`useSectionReveal`):**
  - Reusable `ScrollTrigger` wrapper for Chapters 02–07: triggers once when 20% visible, smoothly revealing section title, divider, and content without re-triggering on scroll reversals.

### Phase 3: Framer Motion Component Micro-Interactions
- [ ] **Tactile Vellum Buttons (`VellumComponents.tsx` / `Hero.tsx` / `Contact.tsx`):**
  - Physical press feedback (`whileTap={{ scale: 0.98, y: 1 }}`).
  - Refined hover border state with spring transition.
- [ ] **Mobile Navigation Drawer (`Navbar.tsx`):**
  - Replace CSS toggle with `AnimatePresence`:
  - Drawer slides down (`y: -12px -> 0`, `opacity: 0 -> 1`, `duration: 0.22s`).
  - Scrim backdrop fades in smoothly.
- [ ] **Systems Migration Before/After Tab Transition (`SystemsMigration.tsx`):**
  - Smooth animated tab switch between Legacy VDOS and Cloud Architecture on mobile.
- [ ] **DevScout & Repository Cards Hover Polish (`Projects.tsx`):**
  - Staggered initial entrance for repository list rows.
  - Subtle spring hover highlighting on repository items.

### Phase 4: Systems Case Study Sequenced Pipeline (GSAP)
- [ ] **Dapense Runtime Pipeline Animation (`SystemsMigration.tsx`):**
  - Sequenced SVG arrow and tier pulse when scrolling into view:
  - Step 1: Authenticated Clients highlights.
  - Step 2: Nginx reverse proxy arrow draws.
  - Step 3: Laravel Core application box illuminates.
  - Step 4: MySQL 3NF database connection establishes.

### Phase 5: Verification & Quality Gates
- [ ] Run full workspace typecheck (`pnpm run typecheck`).
- [ ] Verify production build bundle size (`pnpm run build`).
- [ ] Run Lighthouse audits (confirm Performance ≥ 95, Accessibility = 100, Best Practices = 100, SEO = 100).
- [ ] Verify `prefers-reduced-motion` disabling all non-essential movement in browser.
- [ ] Commit and deploy to GitHub Pages.

---

## Verification Criteria
1. **Zero Layout Thrashing:** No animated `width`, `height`, `margin`, or `padding` on scroll. Only `transform` and `opacity`.
2. **Clean Lifecycle Cleanup:** Every GSAP tween wrapped in `gsap.context()`; triggers killed on unmount.
3. **Accessibility:** Motion is never the sole indicator of state; all text remains fully readable with JavaScript disabled or reduced motion enabled.
4. **Lighthouse Target:** Desktop Performance stays ≥ 95; Mobile Performance stays ≥ 90.
