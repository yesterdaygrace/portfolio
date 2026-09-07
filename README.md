# Kevin Van Diesel Chansa — Portfolio

**Software Engineer · Ships practical software, replaces legacy systems, zero-downtime.**

---

## Live


| Surface                         | URL                                           | Notes                                                                     |
| ------------------------------- | --------------------------------------------- | ------------------------------------------------------------------------- |
| **Portfolio** (canonical)       | `https://yesterdaygrace.github.io/portfolio/` | GitHub Pages via Actions, `NODE_ENV=production` → `BASE_PATH=/portfolio/` |
| **DevScout** (flagship product) | `https://dev-scout-lac.vercel.app`            | Recruitment CRM — GitHub-sourced developer pipeline                       |
| **GitHub**                      | `https://github.com/yesterdaygrace`           | Source of live projects section                                           |
| **Local**                       | `http://localhost:5173`                       | `pnpm --filter @workspace/kevin-portfolio run dev`                        |


---

## Showcase — Two case studies a startup CTO cares about

### 1. DevScout — Recruitment CRM

> Sourcing, tracking, and managing developers using GitHub data.

- **Stack:** Laravel · Vue.js 3 · MySQL · Tailwind
- **What it does:** Pipeline sourcing → tracking → hiring workflow, GitHub data as source of truth
- **Links:** [Live](https://dev-scout-lac.vercel.app) · [Repo](https://github.com/vinkanika/dev-scout)
- **Why it matters:** End-to-end product thinking — not a todo demo. Real domain (recruiting), real data integration.

### 2. Pension Fund Platform — DOS → Modern Web

**Dana Pensiun Sekolah Kristen · Fullstack Web Developer · Aug 2024 – Dec 2025 (Contract, Remote)**

Replaced a legacy VDOS/DOS pension administration platform with a browser-accessible system. Owned from normalized schema to production deploy.


| Metric                 | Result      | How                                                                               |
| ---------------------- | ----------- | --------------------------------------------------------------------------------- |
| Operational efficiency | **+30–40%** | Multi-module system: general ledger, journal, cash/bank, financial reports + RBAC |
| Manual input errors    | **−25–30%** | Workflow automation + multi-layer validation                                      |
| Production downtime    | **0**       | Nginx reverse proxy, SSL/TLS, environment management, zero-downtime strategy      |


- Normalized relational schemas for audit trails, period-end reconciliation, and reporting aggregations.
- Previous platform: inaccessible outside on-premise VDOS — new system is role-aware, auditable, available anywhere.

---

## Stack — Honest split

This repo’s code is not its whole story. Startup credibility comes from what *ships*, not just what *renders*.

### Portfolio Stack (this repo — what you’re reading)


| Layer          | Choices                                                                  | Why                                                        |
| -------------- | ------------------------------------------------------------------------ | ---------------------------------------------------------- |
| **Frontend**   | React 19.1, Vite 7.3, TypeScript 5.9, Tailwind 4.1                       | Fast HMR, type-safe, utility-first — ships to GitHub Pages |
| **Motion**     | GSAP 3.15 + ScrollTrigger, animejs                                       | Cover-slide panels, scrub + snap — no jank                 |
| **Routing/UI** | wouter · Radix UI · shadcn · Framer Motion · lucide-react                | Lightweight routing, accessible primitives                 |
| **Monorepo**   | pnpm workspaces + catalog, `minimumReleaseAge: 1440`                     | Supply-chain hardened; pnpm catalog pins shared deps       |
| **Build**      | Vite build → `dist/public`, `BASE_PATH=/portfolio/` in prod              | Static, rewrites `/* → /index.html` for SPA                |
| **Quality**    | `tsc --build` + per-package typecheck, `onlyBuiltDependencies` allowlist | Reproducible, audited deps                                 |


### Production Stack (ships to users — proven in the field)


| Layer       | Choices                                                       | Used for                                             |
| ----------- | ------------------------------------------------------------- | ---------------------------------------------------- |
| **Backend** | Laravel · PHP 8+ · Node.js · REST, Auth, Queues/Jobs          | Pension platform business logic                      |
| **DB**      | MySQL/MariaDB · PostgreSQL · Eloquent · Drizzle ORM           | Financial schemas, Eloquent + drizzle-zod validation |
| **Infra**   | Linux (Debian/Ubuntu) · Nginx · Docker · SSL/TLS · SSH · Cron | Zero-downtime prod, reverse proxy, scheduling        |
| **Tooling** | Git/GitHub · Bash · Replit connectors SDK                     | Team workflow                                        |


> The portfolio’s `artifacts/api-server` (Express 5 + Drizzle + Pino) is workspace scaffolding — the portfolio itself fetches **live GitHub repos** instead of its own API. Intentional: proves integration over mock data.

### Architecture

```
GitHub API (yesterdaygrace/repos)
        ↓
  repoToCard() — language + topics → tech tags, opengraph thumbnail, stars
        ↓
  PINNED DevScout (static) + live cards → Projects section

App shell (App.tsx): 6 fixed panels [Hero, About, Experience, TechStack, Projects, Contact]
  ↕ GSAP cover-slide (x:100% for panels 1–3, y:100vh for rest) + ScrollTrigger scrub:1 + snap 1/(N-1)
  ↕ Wheel/touch interceptor delegates to active panel’s overflow, then global scroll
```

- Panels are `position: fixed` + spacer `height: N*100vh` drives ScrollTrigger.
- `pnpm-workspace.yaml` overrides strip non-linux esbuild/tailwind/rollup binaries — lean CI.
- `replit.md` + `.replit-artifact/artifact.toml` define `run = pnpm --filter @workspace/kevin-portfolio run dev` (PORT 20676) and static prod serve.

---

## Quick Start

**Requirements:** Node 22+ (tested 24.20), **pnpm 9+** (enforced via `preinstall` guard — `npm`/`yarn` will exit 1).

```bash
# 1. Install (honors pnpm-workspace.yaml supply-chain policy)
pnpm install

# 2. Dev — portfolio at http://localhost:5173
pnpm --filter @workspace/kevin-portfolio run dev

# 3. Build — outputs to artifacts/kevin-portfolio/dist/public
pnpm --filter @workspace/kevin-portfolio run build

# 4. Preview prod build
pnpm --filter @workspace/kevin-portfolio run serve

# 5. Typecheck all packages
pnpm run typecheck
```

Other useful commands:

```bash
pnpm --filter @workspace/api-server run dev   # Express API (port 5000, needs DATABASE_URL)
pnpm run build                                 # typecheck + build all packages
pnpm --filter @workspace/kevin-portfolio run deploy:gh-pages  # gh-pages branch deploy
```

Env: Portfolio needs none. API server needs `DATABASE_URL` (Postgres).

---

## Workspace Map


| Path                             | Package                      | Purpose                                                                          |
| -------------------------------- | ---------------------------- | -------------------------------------------------------------------------------- |
| `artifacts/kevin-portfolio`      | `@workspace/kevin-portfolio` | This portfolio (Vite + React) — **you are here**                                 |
| `artifacts/api-server`           | `@workspace/api-server`      | Express 5 API template (Drizzle, Pino) — scaffolding, not required for portfolio |
| `artifacts/mockup-sandbox`       | —                            | Sandbox artifact                                                                 |
| `lib/*` + `lib/integrations/*`   | —                            | Shared libs                                                                      |
| `scripts`                        | —                            | Workspace scripts                                                                |
| `screenshots/reference-home.png` | —                            | Hero reference for README/docs                                                   |
| `.github/workflows/deploy.yml`   | —                            | GH Pages pipeline                                                                |


---

## Deployment

**Canonical:** GitHub Pages via Actions (`.github/workflows/deploy.yml`).

- Triggers: push to `main` + `workflow_dispatch`
- Steps: `pnpm/action-setup` → `setup-node@22` → `pnpm install --no-frozen-lockfile` → `pnpm --filter @workspace/kevin-portfolio run build` (`NODE_ENV=production`) → `configure-pages` → `upload-pages-artifact (dist/public)` → `deploy-pages`
- Production base path: `BASE_PATH=/portfolio/` (see `vite.config.ts: BASE_PATH ?? (NODE_ENV===production ? '/portfolio/' : '/')`)
- Alternative: `pnpm --filter @workspace/kevin-portfolio run deploy:gh-pages` pushes `dist/public` to `gh-pages` branch.

Replit artifact (`artifact.toml`) serves `dist/public` statically with SPA rewrite.

---

## Projects — How live repos work

Portfolio doesn’t hardcode projects (except DevScout). `src/components/sections/Projects.tsx` fetches `https://api.github.com/users/yesterdaygrace/repos`, filters forks, maps via `repoToCard()`:

- `language` + `topics[]` → `tech[]` badges
- `opengraph.githubassets.com/1/<full_name>` → thumbnail
- `topics.includes('app') ? 'Web App' : 'Open Source'`

Note GitHub API rate limits for unauthenticated requests (60/hr) — fine for static deploys.

---

## Tech Stack Detail

Grouped as displayed in-site (`src/data/skills.ts`):

- **Frontend** — Vue.js 3, TypeScript, JS ES2022+, Tailwind CSS, Alpine.js, Vite, Next.js, HTML5/CSS3
- **Backend** — Laravel, PHP 8+, Node.js, RESTful API Design, Auth &amp; Authorization, Queues &amp; Jobs, Schema Design
- **Database** — MySQL/MariaDB, PostgreSQL, Eloquent ORM, Query Optimization, Bank Reconciliation, Data Integrity, Audit Trails
- **Infrastructure** — Linux (Debian/Ubuntu), Nginx, Git &amp; GitHub, Docker, Bash, SSL/TLS, SSH, Cron

---

## Experience &amp; Contact

**Fullstack Web Developer — Dana Pensiun Sekolah Kristen** — see Showcase above.

**Teaching Assistant, Web Dev — Satya Wacana Christian University** (Aug–Dec 2024): Labs for CS fundamentals, 1:1 debugging, feedback on algorithms &amp; architecture.

**Kevin Van Diesel Chansa** — Salatiga, Central Java, Indonesia

- `kevinvandieselchansa@gmail.com` · [LinkedIn](https://www.linkedin.com/in/kevin-van-diesel-chansa/) · [GitHub](https://github.com/yesterdaygrace) · [@kevinnchanssa](https://www.instagram.com/kevinnchanssa)
- **Availability:** Open to collaborations and opportunities

---

## Gotchas

- Use **pnpm** — `npm install` fails by design (`preinstall` guard).
- `minimumReleaseAge: 1440` means a newly published npm version is blocked for 1 day — intentional supply-chain defense. Allowlist via `minimumReleaseAgeExclude`.
- Portfolio base path is `/` in dev, `/portfolio/` in prod — don’t hardcode `/` asset URLs; use `import.meta.env.BASE_URL`.
- `onlyBuiltDependencies` allowlist is strict — adding a dep that needs build scripts requires allowlist update in `pnpm-workspace.yaml`.

---

## License

MIT — this portfolio’s code. Product codebases (DevScout, pension platform) retain their own terms.

---

*Built without “built on Replit” filler. If you’re a startup CTO skim-reading this: the migration table above is the signal — ledger to Nginx, schema to zero downtime.*