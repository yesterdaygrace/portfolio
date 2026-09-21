# Implementation Plan: Vellum CV / Portfolio Redesign

## Status

Planning only. No portfolio implementation files are changed by this plan.

## Design read

Reading this as: a software-engineer CV/portfolio for recruiter and CTO scanning, with a quiet scholarly/editorial language, using the existing Vellum visual system as the brand rather than replacing it.

The local design contract and the external reference agree on the same core grammar:

- Deep periwinkle field: `#2A3870`, with only near-navy variants for structural contrast.
- Warm chartreuse-yellow primary type: `#E8D85C`.
- Dusty teal annotation accent: `#3A7878`.
- Cormorant Garamond italic for display and section headlines.
- DM Sans for readable supporting copy.
- Courier Prime for labels, counters, and pin annotations.
- Flat treatment: 1px hairlines, no shadows, no gradients, no rounded content chrome.
- Sparse centered compositions, generous negative space, and a bottom-left pin annotation as the signature.
- Still, low-tempo presentation rather than decorative motion.

The external Vellum reference is a nine-slide essay deck: cover, thesis, observation, stats, numbered method, quote, compare, chart, and closing thought. The CV should borrow that editorial pacing and visual grammar, not copy its essay content or its fixed horizontal deck engine.
The checked-in `screenshots/reference-home.png` is stale and visually unrelated to the current portfolio data: it shows “Surendar Selvaraj” and a different product-design identity, while the live source is Kevin Van Diesel Chansa's software-engineer portfolio. It is excluded from the redesign source of truth; `design/design.md`, the current React implementation, and the supplied Vellum GitHub reference take precedence.


## Current implementation findings

The existing portfolio is a React 19 + Vite + TypeScript workspace package at `artifacts/portfolio`.

Current strengths to preserve:

- Real profile, experience, metrics, skills, project, social, and CV PDF data.
- Stable section IDs and navigation registry in `src/sections/index.ts`.
- GitHub-backed project loading with loading and error states.
- Existing metadata, canonical URL, structured Person data, and GitHub Pages deployment.
- Existing reduced-motion check and cleanup path in the scroll engine.

Current mismatches with Vellum:

- Black surfaces, indigo accent, Inter, and JetBrains Mono replace the Vellum palette and type ladder.
- Pills, rounded cards, icon tiles, shadows, glow, and card grids dominate the UI.
- The app uses fixed full-screen panels, wheel/touch interception, GSAP cover transitions, and a synthetic scroll spacer.
- Experience and project content use dot bullets and dense card containers instead of Vellum's numbered editorial lists and hairlines.
- The hero uses a circular portrait, generic CTA pills, a decorative glow, and a scroll cue.
- The current Vellum design files exist, but the live CSS and components have not adopted their tokens.

## Product and UX decision

Build a **scroll-first Vellum CV**:

- Native document flow remains the primary interaction for accessibility, mobile browsers, recruiters, deep links, and printing.
- Each major section becomes a full-viewport editorial chapter where content fits, but long experience/project chapters may grow beyond one viewport without internal scroll traps.
- Preserve stable anchors: `#about`, `#experience`, `#stack`, `#projects`, and `#contact`.
- Keep the CV PDF download visible at the contact/end chapter.
- Use a semantic navigation bar and chapter counter. Any dot navigation must represent a real section and expose an accessible label/current state.
- Do not reproduce the reference's `overflow: hidden` horizontal deck as the default CV interaction. It is visually faithful but operationally worse for keyboard navigation, browser find, mobile scrolling, print, and recruiter scanning.

## CV information architecture

### Chapter 01 — Cover

Name, role, location, availability, one concise value proposition, and primary links. Remove the circular hero treatment and decorative scroll cue. Use the Vellum display type and one bottom-left pin annotation.

### Chapter 02 — Positioning / About

Convert the existing biography into one short thesis plus a compact fact rail: role, focus, location, availability. Keep factual content; reduce repeated prose.

### Chapter 03 — Experience

Retain both real roles and their dates. Replace rounded experience cards with a centered numbered chronology using hairlines. Keep measurable outcomes visible: `30–40%`, `25–30%`, and `0`.

### Chapter 04 — Impact / Systems

Use the pension platform migration as the strongest proof chapter. Show the legacy-to-browser-accessible transformation as a two-panel Vellum compare treatment, using only verified claims from the README and experience data.

### Chapter 05 — Capabilities

Replace the 2×2 icon/card grid and pill tags with grouped numbered lists. Keep the four existing categories and real skills. Icons are optional and should not carry information that the labels already provide.

### Chapter 06 — Featured Project

Give DevScout a full editorial feature treatment: problem, workflow, stack, live link, repository link, and the reason it demonstrates product thinking. Use the existing dashboard image as evidence, not as a decorative card thumbnail.

### Chapter 07 — Selected Work

Keep live GitHub repository integration as a secondary project index. Use a sparse list or small set of editorial rows rather than a uniform card wall. Preserve loading, error, empty, external-link, and image-failure states.

### Chapter 08 — Engineering Notes / Optional proof

Only include this chapter if the content is materially useful: production infrastructure, database integrity, audit trails, zero-downtime deployment, or teaching experience. Do not add a section merely to reach a slide count.

### Chapter 09 — Contact / End

Close with one direct contact thesis, email, LinkedIn, GitHub, and the existing CV PDF. No duplicate CTA intent and no decorative version/build labels.

If the final content does not justify all nine chapters, merge Chapters 07 and 08 rather than filling space with invented material.

## Visual system implementation

### Tokens

Replace the current black/indigo token set in `src/index.css` with the approved Vellum tokens from `design/design.md`:

- `--c-bg: #2A3870`
- `--c-bg-alt: #343F80`
- `--c-bg-deep: #1F2858`
- `--c-bg-mid: #34407A`
- `--c-fg: #E8D85C`
- `--c-fg-2: rgba(232,216,92,.62)`
- `--c-fg-3: rgba(232,216,92,.32)`
- `--c-emphasis: #F5E168`
- `--c-accent: #3A7878`
- `--c-border: rgba(232,216,92,.20)`

Use one theme only. Remove unused indigo gradient and black-card utilities after callers migrate.

### Typography

Update `index.html` and CSS to use the reference family roles:

- Cormorant Garamond italic: display/headings/stat values.
- DM Sans: body/lead/captions.
- Courier Prime: kickers, chapter counters, metadata, pin notes.

Use `clamp()` values rather than raw `vw` alone so small screens remain legible. Preserve the reference's italic-to-roman `em` treatment for headline emphasis. Add explicit descender clearance and mobile line-height rules for italic display text.

### Components

Create or refactor small shared primitives in existing files only where they remove duplication:

- `VellumChapterHeader`
- `PinAnnotation`
- `ChapterCounter`
- `HairlineRule`
- `NumberedList`
- `PinStat`
- `ComparePanel`

Do not create a generic card system. The visual hierarchy should come from typography, spacing, hairlines, opacity tiers, and restrained near-navy panel changes.

### Motion

Default motion intensity: `1–2`.

- Remove autonomous glow, bounce, and scroll-cue animation.
- Remove GSAP cover-slide motion unless an approved follow-up explicitly requests a deck-like transition.
- Keep content visible without JavaScript.
- If any reveal remains, use a single short opacity/position transition, gate it with `prefers-reduced-motion`, and keep it subordinate to reading.

## Implementation order

### Phase 1 — Foundation

1. Replace live tokens and font roles with the Vellum contract.
2. Add the shared chapter/pin/hairline/list primitives.
3. Replace the fixed panel and wheel/touch interception with native document flow while preserving stable anchors and nav behavior.
4. Add responsive and print foundations.

**Checkpoint:** typecheck passes; the page renders as one accessible document with no internal scroll traps.

### Phase 2 — CV chapters

5. Recompose the hero and About chapters around the Vellum cover/thesis patterns.
6. Recompose Experience into numbered chronology plus pin stats.
7. Add the impact compare chapter from verified pension-platform data.
8. Recompose skills as numbered grouped lists.
9. Recompose DevScout and the live project index as evidence-led editorial treatments.
10. Recompose Contact/end with CV download and direct links.

**Checkpoint:** all factual content is present, all stable anchors work, and no old card/pill/gradient treatment remains in the rendered path.

### Phase 3 — Verification and cleanup

11. Verify desktop, mobile, keyboard, reduced motion, loading/error states, external links, and print output.
12. Remove obsolete GSAP/panel helpers, dead tokens, unused icon imports, and any stale comments only after the new flow is proven.
13. Run the final UI audit and code review.

## Verification gates

Run:

```bash
pnpm --filter @workspace/portfolio run typecheck
pnpm --filter @workspace/portfolio run build
```

Manual browser verification:

- Desktop at 1440px: first viewport communicates name, role, and value proposition immediately.
- Mobile at 390px: no horizontal overflow, clipped italic descenders, trapped scroll, or unreadable metadata.
- Keyboard: all links/buttons are reachable, focus is visible, nav current state is understandable, and Escape closes any mobile menu.
- Reduced motion: no autonomous animation and no hidden content.
- Content: CV PDF, email, LinkedIn, GitHub, DevScout demo/repository, and live repository links resolve correctly.
- States: GitHub loading, error, empty, and image failure remain understandable.
- Print: content is sequential, backgrounds do not make text disappear, and links/download affordances remain useful.
- Accessibility: semantic heading order, link names, image alt text, color contrast, and no information conveyed by color alone.

## Risks and mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Copying the reference's horizontal deck too literally | High | Keep Vellum's visual grammar but use native vertical document flow. |
| Raw `vw` typography becomes tiny on mobile | High | Use `clamp()`, mobile-specific line-height, and 390px browser capture. |
| Fixed panels and wheel interception break find/print/keyboard | High | Remove internal scroll ownership and synthetic spacer before section work. |
| Remote font loading changes first render | Medium | Keep preconnect, fallbacks, and readable body sizing; verify with fonts unavailable if possible. |
| GitHub API rate limit or network failure | Medium | Keep the current loading/error/empty path and ensure featured work is static and truthful. |
| Sparse editorial layout hides important CV facts | Medium | Keep role, dates, metrics, links, and a visible PDF affordance in the first relevant chapter. |
| Dark navy/yellow contrast is weak for small text | High | Reserve `fg-2`/`fg-3` for secondary metadata only and verify contrast at actual sizes. |

## Selected skills

- `impeccable`: redesign audit, shape, responsive/accessibility audit, and final polish.
- `design-taste-frontend`: portfolio-specific visual direction and anti-template composition.
- `antislop` + `antislop-ui`: prevent generic cards, pills, gradients, glow, and filler sections.
- `antislop-human`: contrast, focus, keyboard, and readable interaction states.
- `antislop-layoutmobile`: mobile reflow, tap targets, and overflow prevention.
- `frontend-ui-engineering`: semantic React, responsive implementation, and accessible components.
- `incremental-implementation`: land the redesign in verifiable slices.
- `animation-systems`: optional only for restrained, purposeful transitions.
- `code-review-and-quality`: final implementation review.
- `git-workflow-and-versioning`: keep the redesign atomic and reviewable.

Not selected: WebGL, glassmorphism, dashboard, or generic SaaS skills. They conflict with the approved Vellum identity and CV reading task.

## Open decision before implementation

The plan assumes a scroll-first CV with Vellum styling. The external template's exact horizontal deck navigation remains a deliberate alternative, not the default, because it conflicts with mobile, print, keyboard, and recruiter scanning requirements.
