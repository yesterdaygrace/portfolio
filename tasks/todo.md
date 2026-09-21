# CV Redesign Tasks

## Phase 1: Foundation

- [X] Replace live tokens and font roles with Vellum tokens
  - Acceptance: Live CSS uses the approved navy/yellow/teal palette and Cormorant/DM Sans/Courier roles; old black/indigo gradient tokens have no rendered callers.
  - Verify: Run portfolio typecheck and inspect the first viewport.

- [X] Add shared Vellum chapter primitives
  - Acceptance: Chapter headers, pin annotations, counters, hairlines, numbered lists, stats, and compare panels share one consistent implementation.
  - Verify: Render representative primitives in the portfolio and check keyboard/semantic output.

- [X] Replace fixed panels with native document flow
  - Acceptance: Stable anchors remain; no wheel/touch interception or internal section scroll trap is required; content remains reachable without JavaScript.
  - Verify: Browser test scroll, keyboard focus, browser find, mobile touch scroll, and print preview.

- [X] Add responsive and print foundations
  - Acceptance: Mobile typography uses clamped sizes; no horizontal overflow; print output is sequential and readable.
  - Verify: Capture 1440px, 390px, and print/PDF views.

## Phase 2: CV Chapters

- [X] Recompose hero and About chapters
  - Acceptance: Cover and positioning thesis follow Vellum's editorial hierarchy and preserve factual profile content.
  - Verify: First viewport scan and link activation.

- [X] Recompose Experience as numbered chronology
  - Acceptance: Both roles, dates, highlights, and verified metrics remain visible without rounded cards or dot bullets.
  - Verify: Desktop/mobile screenshots and heading/list semantics.

- [X] Add verified impact compare chapter
  - Acceptance: Pension-platform migration is presented as a before/after comparison using only README/experience facts.
  - Verify: Text scan for invented claims and visual contrast check.

- [X] Recompose skills as grouped numbered lists
  - Acceptance: All current skill categories and real skills remain available without icon-tile or pill-grid dependency.
  - Verify: Mobile wrapping and keyboard/readability checks.

- [X] Recompose featured and live projects
  - Acceptance: DevScout is evidence-led; GitHub loading/error/empty/image-failure states remain functional.
  - Verify: Exercise live, error, and empty states in the browser.

- [X] Recompose Contact/end chapter
  - Acceptance: Email, LinkedIn, GitHub, availability, and CV PDF actions remain direct and non-duplicative.
  - Verify: Activate every external/download link.

## Phase 3: Verification and Cleanup

- [X] Run final browser and accessibility verification
  - Acceptance: Desktop/mobile/reduced-motion/keyboard/print checks pass with no console errors or overflow.
  - Verify: Browser captures plus `pnpm --filter @workspace/portfolio run typecheck` and `pnpm --filter @workspace/portfolio run build`.

- [X] Remove obsolete panel and visual-debt code
  - Acceptance: Unused GSAP/panel helpers, stale tokens, unused icon imports, and dead classes are removed after the new flow is proven.
  - Verify: Typecheck, build, and final visual inspection.

- [X] Complete final UI and code review
  - Acceptance: Implementation matches `tasks/plan.md`, Vellum design contract, and all verified content/link requirements.
  - Verify: Run `impeccable` audit/polish and `code-review-and-quality`.

## Checkpoints

- [X] Foundation checkpoint: native document flow works before chapter content migration.
- [X] CV checkpoint: all factual content and stable anchors survive the visual migration.
- [X] Release checkpoint: desktop, mobile, keyboard, reduced motion, print, loading/error, and build checks pass.

## Completed: Lighthouse 85+ Optimization

- [X] Capture reproducible mobile and desktop Lighthouse baselines
- [X] Repair landmarks, skip navigation, and keyboard flow
- [X] Audit contrast, headings, and image semantics
- [X] Optimize fonts and above-the-fold media
- [X] Defer and bound GitHub project loading
- [X] Strengthen metadata, crawlability, and external boundaries
- [X] Add Lighthouse CI regression thresholds
- [X] Verify all four categories clear 85 on production (achieved 99/100/100/100)

## Animation System (GSAP & Framer Motion)

### Phase 1: Foundations & Dependencies
- [ ] Install framer-motion catalog dependency
- [ ] Create motion tokens and reduced-motion detection utilities

### Phase 2: Macro GSAP Scroll Choreography
- [ ] Hero entrance timeline (hairlines, title rise, fact stagger, portrait fade)
- [ ] ScrollTrigger chapter header reveal hook
- [ ] Dapense architecture pipeline sequential flow animation

### Phase 3: Framer Motion Component Micro-Interactions
- [ ] Tactile feedback on buttons (press scale, spring hover)
- [ ] Mobile navigation drawer animated enter/exit with AnimatePresence
- [ ] SystemsMigration Before/After tab cross-fade
- [ ] Project card hover & repository list entrance

### Phase 4: Verification & Performance Gates
- [ ] Full typecheck and production build
- [ ] Browser verification for 60fps smoothness and reduced-motion bypass
- [ ] Lighthouse audit (guarantee Performance ≥ 95 on production)
