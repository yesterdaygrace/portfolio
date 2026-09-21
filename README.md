# DevScout

This repository contains the portfolio site for one startup product: DevScout, a recruitment CRM for sourcing, evaluating, and tracking developer pipelines with GitHub data as the source of truth.

---

## Live

| Surface             | URL                                           | Notes                                        |
| ------------------- | --------------------------------------------- | -------------------------------------------- |
| **Portfolio**       | `https://yesterdaygrace.github.io/portfolio/` | GitHub Pages deployment                      |
| **DevScout**        | `https://dev-scout-lac.vercel.app`            | Live recruitment CRM                         |
| **Repository**      | `https://github.com/vinkanika/dev-scout`      | DevScout source                              |
| **Local portfolio** | `http://localhost:5173`                       | `pnpm --filter @workspace/portfolio run dev` |

![Updated portfolio preview](screenshots/overview/desktop-fullpage.png)

The preview reflects the current six-section portfolio: Hero, About, Experience, Stack, Projects, and Contact.

---

## Startup

### DevScout

DevScout is a recruitment CRM built around GitHub developer data. It gives a hiring team one place to source candidates, review profiles, and move people through a structured pipeline.

- **Product:** Recruitment CRM
- **Stack:** Laravel, Vue.js 3, MySQL, Tailwind CSS
- **Data source:** GitHub developer and repository data
- **Live product:** [dev-scout-lac.vercel.app](https://dev-scout-lac.vercel.app)
- **Source:** [github.com/vinkanika/dev-scout](https://github.com/vinkanika/dev-scout)

The portfolio keeps this single product story visible in the Projects section. The product is pinned as the featured application, while the remaining repository list provides supporting engineering context from GitHub.
---

## Stack

### Portfolio site

| Layer        | Choices                                            | Role                                               |
| ------------ | -------------------------------------------------- | -------------------------------------------------- |
| **Frontend** | React 19.1, Vite 7.3, TypeScript 5.9, Tailwind 4.1 | Static case-study site with fast local iteration   |
| **Motion**   | GSAP 3.15, ScrollTrigger, Framer Motion            | Editorial transitions and section movement         |
| **UI**       | wouter, Radix UI, shadcn, lucide-react             | Lightweight UI primitives and navigation           |
| **Monorepo** | pnpm workspaces and catalog                        | Shared dependency versions and repeatable installs |
| **Build**    | Vite to `dist/public`                              | Static GitHub Pages deployment                     |
| **Quality**  | TypeScript typecheck and package build             | Catches integration errors before release          |

### DevScout application

| Layer           | Choices                   | Role                                    |
| --------------- | ------------------------- | --------------------------------------- |
| **Backend**     | Laravel and PHP           | Recruitment workflow and domain logic   |
| **Frontend**    | Vue.js 3 and Tailwind CSS | Candidate review and pipeline interface |
| **Database**    | MySQL                     | Candidate and pipeline records          |
| **Integration** | GitHub data               | Developer sourcing and profile context  |

The portfolio is the presentation layer. DevScout is the single product case study it presents.

### Architecture

```
GitHub API (yesterdaygrace/repos)
        ↓
  repoToCard() — language + topics → tech tags, opengraph thumbnail, stars
        ↓
  PINNED DevScout (static) + live cards → Projects section

App shell (`App.tsx`): semantic document flow for [Hero, About, Experience, Systems, TechStack, Projects, Contact]
  ↕ Fixed navigation with offset-aware anchor scrolling and section chapter markers
  ↕ Responsive editorial sections with a mobile-safe drawer and native page scrolling
```

- Sections stay in normal document flow so browser navigation, touch scrolling, and reduced-motion behavior remain reliable.
- `pnpm-workspace.yaml` overrides strip non-linux esbuild/tailwind/rollup binaries — lean CI.
- `replit.md` + `.replit-artifact/artifact.toml` define `run = pnpm --filter @workspace/portfolio run dev` (PORT 20676) and static prod serve.

---

## Quick Start

**Requirements:** Node 22+ (tested 24.20), **pnpm 9+** (enforced via `preinstall` guard — `npm`/`yarn` will exit 1).

```bash
# 1. Install (honors pnpm-workspace.yaml supply-chain policy)
pnpm install

# 2. Dev — portfolio at http://localhost:5173
pnpm portfolio

# 3. Build — outputs to artifacts/portfolio/dist/public
pnpm --filter @workspace/portfolio run build

# 4. Preview prod build
pnpm --filter @workspace/portfolio run serve

# 5. Typecheck all packages
pnpm run typecheck
```

Other useful commands:

```bash
pnpm --filter @workspace/api-server run dev   # Express API (port 5000, needs DATABASE_URL)
pnpm run build                                 # typecheck + build all packages
pnpm --filter @workspace/portfolio run deploy:gh-pages  # gh-pages branch deploy
```

Env: Portfolio needs none. API server needs `DATABASE_URL` (Postgres).

---

## Workspace Map

| Path                                        | Package                 | Purpose                                                                          |
| ------------------------------------------- | ----------------------- | -------------------------------------------------------------------------------- |
| `artifacts/portfolio`                       | `@workspace/portfolio`  | This portfolio (Vite + React) — **you are here**                                 |
| `artifacts/api-server`                      | `@workspace/api-server` | Express 5 API template (Drizzle, Pino) — scaffolding, not required for portfolio |
| `screenshots/overview/desktop-fullpage.png` | —                       | Verified desktop preview for README/docs                                         |
| `lib/*` + `lib/integrations/*`              | —                       | Shared libs                                                                      |
| `scripts`                                   | —                       | Workspace scripts                                                                |
| `screenshots/reference-home.png`            | —                       | Hero reference for README/docs                                                   |
| `.github/workflows/deploy.yml`              | —                       | GH Pages pipeline                                                                |

---

## Deployment

**Canonical:** GitHub Pages via Actions (`.github/workflows/deploy.yml`).

- Triggers: push to `main` + `workflow_dispatch`
- Steps: `pnpm/action-setup` → `setup-node@22` → `pnpm install --no-frozen-lockfile` → `pnpm --filter @workspace/portfolio run build` (`NODE_ENV=production`) → `configure-pages` → `upload-pages-artifact (dist/public)` → `deploy-pages`
- Production base path: `BASE_PATH=/portfolio/` (see `vite.config.ts: BASE_PATH ?? (NODE_ENV===production ? '/portfolio/' : '/')`)
- Alternative: `pnpm --filter @workspace/portfolio run deploy:gh-pages` pushes `dist/public` to `gh-pages` branch.

Replit artifact (`artifact.toml`) serves `dist/public` statically with SPA rewrite.

---

## Projects — How live repos work

Portfolio doesn’t hardcode projects (except DevScout). `artifacts/portfolio/src/sections/Projects.tsx` fetches `https://api.github.com/users/yesterdaygrace/repos`, filters forks, maps via `repoToCard()`:

- `language` + `topics[]` → `tech[]` badges
- `opengraph.githubassets.com/1/<full_name>` → thumbnail
- `topics.includes('app') ? 'Web App' : 'Open Source'`

Note GitHub API rate limits for unauthenticated requests (60/hr) — fine for static deploys.

---

## Tech Stack Detail

Grouped as displayed in-site (`artifacts/portfolio/src/data/skills.ts`):

- **Backend Systems** — Go, Laravel, PHP, RESTful API Architecture, RBAC, Queues & Jobs, Schema Design
- **Databases & Storage** — PostgreSQL, MySQL/MariaDB, Eloquent ORM & GORM, Query Optimization, Financial Reconciliation, Data Integrity, Audit Logging
- **Production Infrastructure** — Linux, Nginx, Docker, SSL/TLS, GitHub Actions/CI/CD, Bash/Cron, SSH
- **Client Applications** — Vue, TypeScript, JavaScript, Tailwind, Alpine, Vite, HTML/CSS

---

## Operator

The site presents work by **Kevin Van Diesel Chansa**, a fullstack engineer based in Salatiga, Central Java, Indonesia.

- `kevinvandieselchansa@gmail.com`
- [LinkedIn](https://www.linkedin.com/in/kevin-van-diesel-chansa/)
- [GitHub](https://github.com/yesterdaygrace)
- [Instagram](https://www.instagram.com/kevinnchanssa)
- **Availability:** Open to collaborations and opportunities

---

## Gotchas

- Use **pnpm** — `npm install` fails by design (`preinstall` guard).
- `minimumReleaseAge: 1440` means a newly published npm version is blocked for 1 day — intentional supply-chain defense. Allowlist via `minimumReleaseAgeExclude`.
- Portfolio base path is `/` in dev, `/portfolio/` in prod — don’t hardcode `/` asset URLs; use `import.meta.env.BASE_URL`.
- `onlyBuiltDependencies` allowlist is strict — adding a dep that needs build scripts requires allowlist update in `pnpm-workspace.yaml`.

---

## License

MIT for this portfolio repository. DevScout retains its own product terms.

---

The README keeps one startup product in focus: DevScout, its workflow, its evidence, and the code that presents it.
