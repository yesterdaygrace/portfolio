# Kevin Chansa : Engineering Portfolio & Systems Architecture

> Production system architectures, database designs, and verified application implementations.

Personal software engineering portfolio built with **React 19, TypeScript, Vite, and Tailwind CSS**. Features in-depth architectural case studies for production systems across local-first data storage, recruitment analytics pipelines, and transactional inventory ledgers.

**Live Deployment:** [https://yesterdaygrace.github.io/portfolio/](https://yesterdaygrace.github.io/portfolio/)

---

## Live Links

| Surface | URL | Description |
| :--- | :--- | :--- |
| **Portfolio (Live)** | [yesterdaygrace.github.io/portfolio](https://yesterdaygrace.github.io/portfolio/) | Production deployment on GitHub Pages |
| **DevScout (Live App)** | [dev-scout-lac.vercel.app](https://dev-scout-lac.vercel.app) | Candidate sourcing and recruitment CRM |
| **GitHub Profile** | [github.com/yesterdaygrace](https://github.com/yesterdaygrace) | Open-source repositories and codebases |
| **LinkedIn** | [linkedin.com/in/kevin-chansa](https://www.linkedin.com/in/kevin-chansa/) | Professional background and contact |

---

## Flagship Systems

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         CORE FEATURED ARCHITECTURES                         │
├─────────────────┬──────────────────┬─────────────────┬──────────────────────┤
│ System          │ Domain           │ Primary Stack   │ Core Guarantee       │
├─────────────────┼──────────────────┼─────────────────┼──────────────────────┤
│ 1. SijiSiyu     │ Social Archive   │ Nuxt 4, SQLite  │ AES-256-GCM Vault    │
│ 2. DevScout     │ Recruitment CRM  │ Vue 3, Supabase │ 6-Factor Scoring     │
│ 3. Inventra     │ Warehouse Stock  │ Go, Postgres 17 │ 11 Row-Level Locks   │
└─────────────────┴──────────────────┴─────────────────┴──────────────────────┘
```

### 1. SijiSiyu : Local-First Threads Archive & Sync Engine
- **Classification:** Local-First Social Archive & Sync Backend (2026)
- **Repository:** [github.com/yesterdaygrace/SijiSiyu](https://github.com/yesterdaygrace/SijiSiyu)
- **Stack:** Nuxt 4, Vue 3.5, Nitro Engine, TypeScript 5.8, SQLite (`better-sqlite3` in WAL mode), Server-Sent Events, Tailwind CSS, Meta Threads API, AES-256-GCM
- **Problem:** Social platforms like Meta Threads lack post taxonomy, offline archival endpoints, and personal data portability, while leaking user tracking tokens in shared permalinks.
- **Key Architecture Decisions:**
  - **AES-256-GCM Credential Vault:** Encrypts OAuth access tokens at rest with unique IVs and authentication tags. Credentials decrypt solely in server memory during outbound API dispatch.
  - **WAL-Mode SQLite Concurrency:** `PRAGMA journal_mode = WAL` and strict foreign key cascade invariants deliver sub-millisecond query latency without read/write thread contention.
  - **Database Singleton Guard:** Enforces single-tenant boundaries at the database engine level via `CHECK (singleton = 1)`.
  - **Real-Time SSE Sync Stream:** Pushes bidirectional sync status and ledger mutations to reactive Vue composables via Server-Sent Events (`/api/events`).
  - **Tracking-Free Permalinks:** Built-in sanitizer strips referral parameters (`?s=...`, `?utm_...`) before clipboard copying.

### 2. DevScout : Developer Recruitment CRM & Scoring Platform
- **Classification:** Live Sourcing Application (2026)
- **Live URL:** [dev-scout-lac.vercel.app](https://dev-scout-lac.vercel.app)
- **Repository:** [github.com/yesterdaygrace/DevScout](https://github.com/yesterdaygrace/DevScout)
- **Stack:** Vue 3.5, TypeScript 6, Vite 8, Pinia 3, Hono 4.7, Supabase (PostgreSQL + RLS), Tailwind CSS 4.3, Chart.js
- **Problem:** Recruiters evaluate developers across disconnected platforms (GitHub, LinkedIn, spreadsheets) without unified candidate ranking, hitting strict API rate limits during search sessions.
- **Key Architecture Decisions:**
  - **Two-Tier Proxy & Queue:** Combines 30-minute client cache with 5-minute server memory cache and concurrency queue (`MAX_CONCURRENT=10`) on a Hono proxy to safeguard GitHub API limits.
  - **6-Factor Algorithmic Scoring:** Computes an objective 0 to 100 candidate rating across repository count, followers, pull request volume, contribution consistency, account tenure, and language diversity.
  - **Concurrent Byte Aggregator:** Aggregates code distribution across up to 20 non-fork repositories simultaneously using `Promise.allSettled`.
  - **Multi-Tenant Row-Level Security:** Enforces per-recruiter isolation across pipelines, candidate notes, and saved queries using PostgreSQL RLS policies (`auth.uid() = user_id`).

### 3. Inventra : Multi-Warehouse Inventory System
- **Classification:** Backend Inventory Platform (2026)
- **Repository:** [github.com/yesterdaygrace/Inventra](https://github.com/yesterdaygrace/Inventra)
- **Stack:** Go 1.24, Gin 1.11, PostgreSQL 17, GORM (pgx driver), golang-migrate, React 19, TypeScript, Docker, Tailwind CSS 4
- **Problem:** Concurrent checkout orders and warehouse transfers cause stock overselling, race conditions, and untracked ledger discrepancies.
- **Key Architecture Decisions:**
  - **Composite Warehouse Keys:** Tracks identical SKUs independently across facilities via `UNIQUE(product_id, warehouse_id)` backed by 17 relational tables and 13 migrations.
  - **Row-Level Transaction Locking:** Employs 11 `SELECT ... FOR UPDATE` locks (`clause.Locking{Strength: "UPDATE"}`) across 8 atomic workflows, preventing race conditions during simultaneous stock mutations.
  - **Lazy-Expiry Reservations:** Isolates order reservations from physical stock (`available = quantity - active reservations`), automatically recycling stale holds.
  - **Append-Only Movement Ledger:** Every stock change creates an immutable ledger row; balances are derived dynamically on read. Discrepancies require explicit audited adjustments.
  - **Dual Audit Infrastructure:** Asynchronously logs actor identity, IP origins, and before/after JSON diffs in `activity_logs` without blocking stock ledger operations.

---

## Technical Architecture & Design System

The portfolio runs as an accessible, high-performance Single Page Application:

- **Client-Side Hash Routing (`#/projects/:id`):** Ensures direct URL sharing, full browser history (Back/Forward), and persistent state on static edge hosting without 404 rewrite requirements.
- **Dynamic Code-Splitting:** Deep case studies load via `React.lazy()` and `<Suspense>`, keeping initial page load bundle size lean.
- **Vellum Design System:** Built on a deep slate (`#252A37`) and warm ivory (`#F7F1E2`) palette with terracotta accents (`#D8A08A`). Typography pairs Cormorant Garamond display serifs with Courier Prime mono labels and DM Sans body text.
- **Accessibility & Motion:** Driven by GSAP ScrollTrigger and Framer Motion with full `prefers-reduced-motion` compliance.

---

## Local Development & CI/CD

```bash
# Install dependencies (requires pnpm 9+)
pnpm install

# Start development server
pnpm dev

# Typecheck and build production bundle
pnpm run typecheck
pnpm run build

# Preview build locally
pnpm run serve

# Security audit
pnpm audit --audit-level=high
```

### Automated CI/CD Pipeline
Every push to `main` executes [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):
1. Validates dependencies via `pnpm install --frozen-lockfile`.
2. Runs automated vulnerability audit (`pnpm audit --audit-level=high`).
3. Executes static typecheck (`tsc -p tsconfig.json --noEmit`).
4. Compiles production assets into `dist/public`.
5. Deploys to GitHub Pages with concurrency controls.

---

## Author

**Kevin Van Diesel Chansa**  
Software Engineer & Database Architect  
Salatiga, Central Java, Indonesia  
[kevandeschans@gmail.com](mailto:kevandeschans@gmail.com) · [GitHub](https://github.com/yesterdaygrace) · [LinkedIn](https://www.linkedin.com/in/kevin-chansa/)
