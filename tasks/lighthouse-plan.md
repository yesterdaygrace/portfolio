# Lighthouse 85+ Improvement Plan

## Goal

Raise the production portfolio's Lighthouse scores to at least **85 in Performance, Accessibility, Best Practices, and SEO**, on both mobile and desktop runs, without weakening the Vellum editorial design, removing useful content, or hiding real loading/error states.

Stretch target: **90+ in every category** after the 85 floor is stable.

## Baseline rules

- Measure the production build, not the Vite development server. Development overlays and HMR distort Lighthouse results.
- Test the deployed route: `https://yesterdaygrace.github.io/portfolio/`.
- Run three mobile and three desktop audits with the same Lighthouse settings. Record the median score and every failed audit.
- Repeat the same audits after each phase. Keep only changes that improve the measured result without breaking the browser smoke checks.
- Track mobile separately. It is the stricter case for network cost, font loading, image decoding, contrast, and touch interaction.

## Current evidence and likely constraints

- The current production bundle is approximately 72.9 KB gzipped JavaScript and 7.0 KB gzipped CSS. Bundle size is not the first suspected bottleneck.
- The portfolio loads Google Fonts for three families. This is a likely render-path and third-party dependency cost.
- The hero portrait is 136 KB and the DevScout image is 164 KB. Both have stable aspect-ratio containers, but the markup does not yet declare intrinsic dimensions or responsive image candidates.
- Projects fetches up to 100 GitHub repositories on component mount even though only five cards are rendered. This is unnecessary transfer and an external dependency in the initial application lifecycle.
- The document already has a title, description, canonical URL, Open Graph tags, Twitter tags, `lang="en"`, robots rules, and Person JSON-LD. SEO work should validate and strengthen these rather than replace them.
- The page has visible focus styles and labeled navigation controls. The main remaining accessibility risks are contrast at actual rendered sizes, skip navigation, mobile drawer focus behavior, heading/landmark auditing, and image semantics.

## Phase 0 — Establish the baseline

### Task 1: Capture reproducible Lighthouse baselines

**Files likely touched:** `tasks/lighthouse-baseline.md` or CI artifact output only.

**Acceptance criteria:**
- [ ] Mobile and desktop scores are recorded for all four categories.
- [ ] Failed audits include their affected URL, selector, and estimated savings or impact.
- [ ] Core Web Vitals and major diagnostics are recorded: LCP, INP/TBT, CLS, FCP, TTFB, render-blocking resources, image payloads, and unused JavaScript/CSS.

**Verification:** Run Lighthouse against the production build and deployed URL; retain JSON/HTML reports for comparison.

**Dependency:** None.

## Phase 1 — Semantic and accessibility floor

### Task 2: Repair document landmarks and keyboard flow

**Files likely touched:** `artifacts/portfolio/src/App.tsx`, `artifacts/portfolio/src/layout/Navbar.tsx`, `artifacts/portfolio/src/index.css`.

**Acceptance criteria:**
- [ ] A visible-on-focus skip link reaches `#content`.
- [ ] Header/navigation/main/footer landmarks are unambiguous and have one useful accessible name each.
- [ ] Mobile menu opens, closes with Escape, restores focus to its trigger, and does not leave hidden controls in the tab order.
- [ ] Every interactive control has a visible or programmatic name and a visible focus indicator.

**Verification:** Keyboard-only pass at 390 px and 1440 px; inspect the accessibility tree; run axe/Lighthouse accessibility audits.

**Dependency:** Baseline.

### Task 3: Audit contrast, headings, and media semantics

**Files likely touched:** section components, `index.css`, `index.html`.

**Acceptance criteria:**
- [ ] Normal text and small metadata meet WCAG AA contrast at their actual opacity and size.
- [ ] Heading hierarchy has one `h1`, ordered section headings, and no skipped structural levels.
- [ ] Images have useful alt text, intrinsic `width`/`height`, and no layout shift.
- [ ] Reduced-motion behavior keeps content visible and does not depend on animation.

**Verification:** Lighthouse/axe contrast and heading audits; browser screenshots at 320, 390, 768, 1024, and 1440 px; reduced-motion browser run.

**Dependency:** Task 2.

## Phase 2 — Performance and loading path

### Task 4: Optimize fonts and above-the-fold rendering

**Files likely touched:** `artifacts/portfolio/index.html`, `artifacts/portfolio/src/index.css`, `artifacts/portfolio/public/`.

**Acceptance criteria:**
- [ ] Font loading has a documented tradeoff: retain Google Fonts only if the baseline shows acceptable LCP, otherwise self-host a subset of the three required families.
- [ ] The hero portrait has intrinsic dimensions, asynchronous decoding, and an intentional priority appropriate to its actual LCP role.
- [ ] Below-the-fold imagery uses lazy loading and asynchronous decoding without delaying the hero.
- [ ] No new render-blocking stylesheet or font request is introduced.

**Verification:** Compare LCP/FCP and network waterfall against the baseline on mobile; confirm no layout shift around the portrait or project image.

**Dependency:** Task 1.

### Task 5: Reduce GitHub project loading cost

**Files likely touched:** `artifacts/portfolio/src/sections/Projects.tsx`, possibly `App.tsx`.

**Acceptance criteria:**
- [ ] Projects data is fetched when the section is near the viewport, not during the first viewport render.
- [ ] The GitHub request asks for only the data needed by the UI and has an abort/timeout path.
- [ ] Loading, success, empty, API error, rate-limit, and image-failure states remain understandable.
- [ ] The page remains useful if GitHub is unavailable because DevScout and the core CV content are static.

**Verification:** Network waterfall before/after; offline/failed-request browser run; Lighthouse mobile audit with the Projects section below the fold.

**Dependency:** Task 1.

### Task 6: Keep the initial JavaScript path lean

**Files likely touched:** `artifacts/portfolio/src/App.tsx`, section registry, Vite configuration only if measurement justifies it.

**Acceptance criteria:**
- [ ] Agentation remains development-only and is absent from the production bundle/runtime.
- [ ] No speculative `useMemo`, `React.memo`, or animation removal is added without a measured bottleneck.
- [ ] Any code split or deferred section preserves native anchors, keyboard navigation, and direct deep links.

**Verification:** Compare production bundle output and Lighthouse transfer/CPU diagnostics; typecheck and build after each change.

**Dependency:** Tasks 4–5.

## Phase 3 — Best Practices and SEO hardening

### Task 7: Strengthen metadata and crawlability

**Files likely touched:** `artifacts/portfolio/index.html`, `artifacts/portfolio/public/robots.txt`, new `artifacts/portfolio/public/sitemap.xml` if justified.

**Acceptance criteria:**
- [ ] Title and description describe the actual portfolio and remain unique.
- [ ] Canonical, Open Graph, Twitter, image alt, viewport, and theme metadata resolve correctly under `/portfolio/`.
- [ ] Person structured data validates and contains only truthful profile data.
- [ ] Robots and sitemap URLs use the deployed `/portfolio/` path and return successfully.
- [ ] The primary identity, role, and portfolio value proposition remain available to crawlers without depending entirely on GitHub API content.

**Verification:** Lighthouse SEO audit, structured-data validation, direct HTTP checks for canonical/robots/sitemap, and production browser inspection.

**Dependency:** Baseline.

### Task 8: Audit browser best practices and external boundaries

**Files likely touched:** `artifacts/portfolio/index.html`, `Projects.tsx`, deployment workflow/config only where GitHub Pages supports it.

**Acceptance criteria:**
- [ ] No mixed-content, broken resource, console error, or failed navigation issues exist.
- [ ] External links retain `noopener noreferrer` where they open new tabs.
- [ ] HTTPS is used for all external requests and metadata URLs.
- [ ] GitHub API failures are bounded and do not create an unhandled promise or noisy console error.
- [ ] Dependency audit is run against the committed pnpm lockfile; findings are triaged by reachability rather than force-fixed.

**Verification:** Lighthouse Best Practices audit, browser console/network scan, `pnpm audit` or equivalent lockfile audit, and link checks.

**Dependency:** Tasks 5 and 7.

## Phase 4 — Regression gates and release

### Task 9: Add a Lighthouse CI gate

**Files likely touched:** `lighthouserc.cjs` or `lighthouserc.json`, `.github/workflows/deploy.yml`, `package.json`/lockfile if the CLI is added.

**Acceptance criteria:**
- [ ] CI audits the production artifact or deployed preview, not the dev server.
- [ ] Category floors are enforced at 85 for mobile and desktop.
- [ ] The gate checks accessibility, Best Practices, SEO, and Performance without allowing score gaming through hidden content.
- [ ] Reports are retained when a run fails.

**Verification:** One intentional failing threshold run and one passing run; GitHub Actions deployment remains green.

**Dependency:** Tasks 1–8.

### Checkpoint: Release readiness

- [ ] Mobile and desktop medians are at least 85 in all four categories.
- [ ] LCP ≤ 2.5 s, INP ≤ 200 ms, and CLS ≤ 0.1 on the chosen test profile, or deviations are documented with evidence.
- [ ] Typecheck and production build pass.
- [ ] Browser verification passes at 390 px and 1440 px.
- [ ] Keyboard, reduced-motion, offline GitHub API, and direct `/portfolio/` navigation paths pass.
- [ ] No new accessibility, console, broken-link, or security findings remain.

## Risks and decisions

| Risk | Impact | Decision |
|---|---:|---|
| Lighthouse scores vary by run and third-party font/API availability | High | Use three-run medians and test the deployed production route. |
| Removing fonts or motion can damage the chosen Vellum identity | Medium | Measure first; preserve typography and motion unless the metric proves the cost. |
| GitHub API content is dynamic and rate-limited | Medium | Keep featured work static, defer live repos, and preserve graceful failure states. |
| GitHub Pages cannot provide arbitrary response headers | Medium | Validate what the host supports; do not claim CSP/HSTS changes that Pages cannot emit. |
| Lighthouse score gaming can harm real users | High | Require browser, keyboard, reduced-motion, offline, and content checks alongside scores. |

## Definition of done

The work is complete only when the measured production route clears the 85 floor in all four requested Lighthouse categories on both device profiles, the portfolio remains visually faithful and usable, and CI can detect a future regression.
