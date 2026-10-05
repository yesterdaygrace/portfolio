# Kevin Chansa : Engineering Portfolio & Systems Architecture

> Production system architectures, database designs, and verified application implementations.

A personal software engineering portfolio built with **React 19, TypeScript, Vite, and Tailwind CSS**. Features in-depth architectural case studies for five production-tested systems, covering double-entry accounting ledgers, multi-warehouse stock engines, high-concurrency ticketing APIs, and developer recruitment workflows.

**Live Deployment:** [https://yesterdaygrace.github.io/portfolio/](https://yesterdaygrace.github.io/portfolio/)

---

## Portfolio Overview

This repository contains the complete frontend codebase for Kevin Chansa's engineering portfolio. Unlike typical resume pages that display surface-level card links, this portfolio acts as an engineering whitepaper platform: clicking any project opens an architectural case study detailing database normalization, concurrency handling, transactional guarantees, and verification protocols.

### Live Links

| Surface | Target URL | Description |
| :--- | :--- | :--- |
| **Portfolio (Live)** | [yesterdaygrace.github.io/portfolio](https://yesterdaygrace.github.io/portfolio/) | Production deployment on GitHub Pages |
| **DevScout (Live App)** | [dev-scout-lac.vercel.app](https://dev-scout-lac.vercel.app) | Live candidate sourcing and pipeline CRM |
| **GitHub Profile** | [github.com/yesterdaygrace](https://github.com/yesterdaygrace) | Public repositories and open-source contributions |
| **LinkedIn** | [linkedin.com/in/kevin-chansa](https://www.linkedin.com/in/kevin-chansa/) | Professional background and contact |

---

## Flagship Systems Matrix

The portfolio documents five software systems across financial, inventory, concurrency, and developer tooling domains:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          FLAGSHIP SYSTEMS OVERVIEW                          │
├─────────────────┬──────────────────┬─────────────────┬──────────────────────┤
│ System          │ Domain           │ Primary Stack   │ Core Guarantee       │
├─────────────────┼──────────────────┼─────────────────┼──────────────────────┤
│ 1. DAPENSE      │ Pension Finance  │ Laravel, MySQL  │ Zero-balance trigger │
│ 2. Inventra     │ Warehouse Stock  │ Go, Postgres 17 │ 11 row-level locks   │
│ 3. CinemaSystem │ Concurrency API  │ Go, Redis Lock  │ btree_gist exclusion │
│ 4. DevScout     │ Recruitment CRM  │ Vue 3, Supabase │ 6-factor algorithm   │
│ 5. Nodex        │ Workspace Engine │ Go, Postgres 16 │ Sub-5ms API latency  │
└─────────────────┴──────────────────┴─────────────────┴──────────────────────┘
```

### 1. DAPENSE : Pension Fund Financial Information System
- **Classification:** Institutional Production Platform (2024 - 2025)
- **Target Entity:** Dana Pensiun Sekolah Kristen Salatiga (Salatiga Christian School Pension Fund Foundation)
- **Stack:** Laravel 11, PHP 8.3, MySQL (3NF) with PostgreSQL 16 portable profile, Tailwind CSS, Nginx, Linux
- **Problem Solved:** Replaced legacy DOS-based VDOS accounting software and manual spreadsheets that permitted unbalanced entries, lacked immutable historical snapshots after period close, and struggled with complex pension asset classification.
- **Architectural Highlights:**
  - Database triggers (`trg_jurnal_balance_check`) and `NUMERIC(15,2)` precision combined with PHP `bccomp()` floating-point protection prevent unbalanced vouchers from entering the general ledger.
  - Automated period closing (*Tutup Buku*) locks historical transactions against post-closure tampering and captures immutable trial balance snapshots (`neraca_saldos`).
  - Out-of-the-box statutory reporting engine generating 9 regulatory financial statements conforming to Indonesian PSAK 18 and Otoritas Jasa Keuangan (OJK) pension fund guidelines.
  - Four-tier Role-Based Access Control (`rootsuperuser`, `admin`, `operator`, `bod`) enforced by 8 server-side policies and 4 authorization gates.

### 2. Inventra : Multi-Warehouse Inventory System
- **Classification:** Backend Inventory Management Platform (2026)
- **Stack:** Go 1.24, Gin 1.11, PostgreSQL 17, GORM (pgx driver), golang-migrate, React 19, TypeScript, Tailwind CSS 4
- **Problem Solved:** Prevents inventory overselling and ledger drift across multiple physical warehouse branches during simultaneous checkout and stock movement operations.
- **Architectural Highlights:**
  - Composite key design (`UNIQUE(product_id, warehouse_id)`) tracks identical SKUs independently per warehouse facility across 17 normalized tables and 13 migrations.
  - Eight atomic workflows executed inside database transactions with 11 row-level locks (`SELECT ... FOR UPDATE` via `clause.Locking{Strength: "UPDATE"}`) covering receipts, issues, transfers, and adjustments.
  - Stock availability derived formula (`available = quantity - active reservations`) paired with lazy expiration (`expireStaleReservations`) to prevent double-allocation.
  - Append-only inventory ledger (`inventory_ledger`) where balances are computed dynamically; physical discrepancies are resolved exclusively through audited adjustment entries.
  - Dual-trail auditing: `activity_logs` records actors, IP origins, and before/after JSON diffs; `inventory_ledger` records physical item movements.

### 3. CinemaSystem : High-Concurrency Cinema Ticketing API
- **Classification:** Distributed Concurrency Engine (2026)
- **Assessment Scope:** Technical Assessment for PT Mitra Kasih Perkasa (MKP)
- **Stack:** Go, Gin, PostgreSQL with `btree_gist`, Redis Redlock, GORM, Docker, Swagger / OpenAPI
- **Problem Solved:** Resolves double-booking race conditions during high-traffic ticket flash sales while preventing auditorium schedule collisions and abandoned cart seat leakage.
- **Architectural Highlights:**
  - Decoupled show-seat availability model: records availability in `show_seats` (`schedule_id + seat_id`), eliminating the physical seat bottleneck.
  - PostgreSQL database engine schedule collision prevention: uses `btree_gist` range exclusion constraint `EXCLUDE USING gist (studio_id WITH =, tstzrange(start_time, end_time) WITH &&)` to reject overlapping showtimes in the same auditorium.
  - Distributed Redis Redlock lease management with 10-minute hold TTL and an automated background restock worker returning unpurchased seats to the open pool.
  - Automated cancellation and 100% refund orchestration pipeline: soft deletes cancelled screening schedules and automatically triggers ticket reversals and refund disbursements.

### 4. DevScout : Developer Recruitment CRM & Scoring Platform
- **Classification:** Live Web Application (2026)
- **Live URL:** [dev-scout-lac.vercel.app](https://dev-scout-lac.vercel.app)
- **Stack:** Vue 3.5, TypeScript 6, Vite 8, Pinia 3, Hono 4.7, Supabase (PostgreSQL + RLS), Tailwind CSS 4.3, Chart.js
- **Problem Solved:** Eliminates fragmented hiring workflows where recruiters switch between GitHub tabs, LinkedIn profiles, and private spreadsheets without consistent evaluation criteria.
- **Architectural Highlights:**
  - Two-tier caching architecture: 30-minute client cache paired with a 5-minute memory cache and concurrency queue (`MAX_CONCURRENT=10`) in a Hono proxy to protect GitHub API rate limits.
  - Algorithmic candidate scoring engine: computes a deterministic 0 to 100 score across 6 weighted factors (repository volume, follower traction, pull request count, contribution density, account age, and language breadth).
  - Language byte aggregator: fetches and aggregates code volume across up to 20 non-fork repositories concurrently via `Promise.allSettled`.
  - Multi-tenant data isolation: Supabase PostgreSQL Row Level Security (RLS) policies enforce per-user isolation on shortlists, pipelines, and markdown notes.

### 5. Nodex : Minimalist Workspace & Note Engine
- **Classification:** Full-Stack Notes Platform & Production Go API (2025 - 2026)
- **Stack:** Go 1.25, Gin, GORM, PostgreSQL 16, Vue 3, Vite, Tailwind CSS, Docker, Dokploy
- **Problem Solved:** Provides a fast, distraction-free markdown note-taking environment without heavy client runtimes or opaque database synchronization layers.
- **Architectural Highlights:**
  - Compiled Go Gin backend binary operating at sub-5 millisecond response times with an idle memory footprint under 30MB.
  - Relational tag and note normalization: distinct notes, tags, and join tables indexed with B-tree indexes for zero-latency client-side tag filtering.
  - Production Dokploy deployment specification (`DEPLOY.md`): containerized multi-stage Docker build, Traefik reverse proxy, automated Let's Encrypt TLS certificates, and health monitoring on a Linux VPS.

---

## Portfolio Technical Architecture

The portfolio application is engineered as a standalone Single Page Application with strict performance and accessibility standards.

```
Browser Request
      │
      ▼
Static Web Server / GitHub Pages (Nginx / Edge)
      │
      ├── index.html (Security headers, CSP, OpenGraph metadata)
      │
      └── SPA Bundle (React 19 + Vite 7 + Tailwind CSS)
            │
            ├── App Shell (App.tsx)
            │     ├── Navbar (Active anchor tracking, responsive drawer)
            │     └── Section Registry (Document flow: Hero → About → Experience → Stack → Projects → Contact)
            │
            ├── Client-Side Hash Router (#/projects/:id)
            │     ├── Direct link resolution & browser history (Back/Forward)
            │     └── Dynamic Code Splitting via React.lazy() & Suspense
            │
            └── ProjectDetailPage.tsx
                  ├── Key Indicators & Metrics Grid
                  ├── Problem Statement & Solution Breakdown
                  ├── Topology & Component Technology Matrix
                  ├── Key Architectural Decisions (Problem / Decision / Impact)
                  ├── Relational Schema & Integrity Invariants Table
                  ├── High-Resolution Artifact Gallery
                  └── Sequential Project Switcher Pagination
```

### Core Frontend Decisions

1. **Static-Host Resilient Client-Side Routing (`#/projects/:id`)**
   - GitHub Pages serves static files without server-side rewrite rules. Using hash-based routing guarantees that direct links, manual reloads, and browser history work without 404 errors.
   - Updates document title dynamically on navigation and restores window scroll position to `#projects` when returning to the index.

2. **On-Demand Dynamic Code Splitting**
   - The detailed case study view is isolated into an independent chunk (`ProjectDetailPage.js`) via `React.lazy()` and `<Suspense>`.
   - Visitors on the main landing page only load the core portfolio bundle; case study data loads on demand when a project is opened.

3. **Vellum Editorial Design System**
   - Built on a slate and warm ivory palette (`#252A37` deep, `#2E3344` base, `#F7F1E2` foreground, `#D8A08A` accent).
   - Typography pairings: Cormorant Garamond display serif for headings, Courier Prime monospace for data tags and technical labels, and DM Sans for clean interface readability.

4. **Motion & Interaction Standards**
   - Motion is driven by GSAP 3.15 ScrollTrigger and Framer Motion.
   - Respects `prefers-reduced-motion` media queries by disabling transforms and rendering content synchronously for accessibility.

---

## Repository Structure

```
portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment to GitHub Pages
├── public/
│   ├── .well-known/            # security.txt
│   ├── projects/               # High-res architecture diagrams and screenshots
│   │   ├── cinemasystem/       # Topology, flowchart, and ERD diagrams
│   │   ├── dapense/            # COA workspace, journal entries, ledger views
│   │   └── inventra/           # Inventory stock ledger, transactions, audit logs
│   ├── cinemasystem-dashboard.png
│   ├── dapense-dashboard.png
│   ├── devscout-dashboard.png
│   ├── inventra-dashboard.png
│   ├── nodex-dashboard.png
│   ├── portrait.jpeg
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/             # Reusable UI primitives and stack icons
│   │   ├── StackIcon.tsx
│   │   └── vellum/
│   │       ├── SectionTransition.tsx
│   │       └── VellumComponents.tsx
│   ├── data/                   # Structured portfolio and case study data
│   │   ├── experience.ts
│   │   ├── profile.ts
│   │   ├── projectCaseStudies.ts # Detailed architectural specifications
│   │   └── skills.ts
│   ├── layout/
│   │   └── Navbar.tsx          # Navigation header with section spy
│   ├── lib/
│   │   ├── motion.ts           # GSAP & ScrollTrigger setup
│   │   └── useSectionReveal.ts
│   ├── pages/
│   │   └── ProjectDetailPage.tsx # Dedicated case study & architecture view
│   ├── sections/               # Main portfolio sections
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── Experience.tsx
│   │   ├── Hero.tsx
│   │   ├── Projects.tsx        # Project showcase with case study links
│   │   ├── TechStack.tsx
│   │   └── index.ts
│   ├── App.tsx                 # Root application shell with route coordinator
│   ├── index.css               # Tailwind CSS 4 theme tokens and styles
│   ├── main.tsx
│   └── types.ts
├── index.html                  # HTML entry point with security CSP headers
├── lighthouserc.json           # Lighthouse CI performance & accessibility rules
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml         # Supply chain security and dependency catalog
├── tsconfig.json
└── vite.config.ts              # Vite configuration with base path handling
```

---

## Local Development

### Prerequisites

- **Node.js:** v22 or later
- **pnpm:** v9 or later (required by repository configuration)

### Quick Start Commands

```bash
# 1. Install dependencies with lockfile validation
pnpm install

# 2. Start the local development server (runs on port 5175)
pnpm dev

# 3. Verify TypeScript types without emitting code
pnpm run typecheck

# 4. Compile production build (outputs to dist/public)
pnpm run build

# 5. Preview production build locally
pnpm run serve

# 6. Run supply-chain security audit
pnpm audit --audit-level=high
```

---

## CI/CD & Deployment Pipeline

The portfolio is automatically built and deployed to **GitHub Pages** on every push to the `main` branch via GitHub Actions ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)).

The deployment pipeline runs the following quality gates:
1. **Dependency Installation:** Uses `pnpm install --frozen-lockfile` to prevent lockfile drift.
2. **Security Audit:** Runs `pnpm audit --audit-level=high` to block known high-severity vulnerabilities.
3. **Type Verification:** Executes `pnpm run typecheck` (`tsc -p tsconfig.json --noEmit`).
4. **Production Build:** Executes `pnpm run build` targeting `dist/public`.
5. **Artifact Deployment:** Uploads static output to GitHub Pages with concurrent build cancellation protection.

---

## Author & Contact

**Kevin Van Diesel Chansa**  
*Software Engineer & Database Architect*  
Based in Salatiga, Central Java, Indonesia

- **Email:** [kevandeschans@gmail.com](mailto:kevandeschans@gmail.com)
- **GitHub:** [github.com/yesterdaygrace](https://github.com/yesterdaygrace)
- **LinkedIn:** [linkedin.com/in/kevin-chansa](https://www.linkedin.com/in/kevin-chansa/)
- **Live Portfolio:** [https://yesterdaygrace.github.io/portfolio/](https://yesterdaygrace.github.io/portfolio/)

---

## License

This project is licensed under the [MIT License](LICENSE).
