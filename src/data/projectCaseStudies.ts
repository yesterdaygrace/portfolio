export interface ProjectStat {
  label: string;
  value: string;
  detail: string;
}

export interface TechDecision {
  title: string;
  problem: string;
  decision: string;
  impact: string;
}

export interface FeatureModule {
  name: string;
  description: string;
  technicalImplementation: string;
}

export interface SchemaHighlight {
  table: string;
  role: string;
  constraints: string;
}

export interface VisualAsset {
  title: string;
  caption: string;
  image: string;
  alt: string;
}

export interface ProjectCaseStudy {
  id: string;
  badge: string;
  figNumber: string;
  figCaption: string;
  title: string;
  subtitle: string;
  description: string;
  year: string;
  type: string;
  status: string;
  client: string;
  role: string;
  tech: string[];
  thumbnail: string;
  thumbnailWebp?: string;
  imgWidth: number;
  imgHeight: number;
  demoUrl?: string;
  githubUrl?: string;
  stats: ProjectStat[];
  executiveSummary: {
    problem: string;
    solution: string;
    outcome: string;
  };
  architecture: {
    topology: string;
    stackDetails: Array<{ category: string; tech: string; rationale: string }>;
  };
  keyDecisions: TechDecision[];
  features: FeatureModule[];
  dataIntegrity: {
    summary: string;
    rules: string[];
    schemaHighlights: SchemaHighlight[];
  };
  visuals: VisualAsset[];
  verification: {
    summary: string;
    checks: string[];
  };
}

export const PROJECT_CASE_STUDIES: ProjectCaseStudy[] = [
  {
    id: "sijisiyu",
    badge: "LOCAL-FIRST ENGINE · 2026",
    figNumber: "FIG 01",
    figCaption: "OLED THREADS VAULT & REAL-TIME SYNC CONSOLE",
    title: "SijiSiyu: Local-First Threads Archive & Sync Engine",
    subtitle: "Encrypted OAuth token vault, WAL-mode SQLite ledger, and real-time SSE sync engine",
    description:
      "A high-performance local-first Threads library and synchronization backend built with Nuxt 4, Vue 3.5, Nitro Engine, and SQLite in WAL mode. Features AES-256-GCM encryption for Meta OAuth access tokens at rest, SHA-256 session token hashing, real-time Server-Sent Events, dynamic collections, and an OLED minimalist reading interface.",
    year: "2026",
    type: "Local-First Social Archive & Engine",
    status: "PRODUCTION ARCHITECTURE",
    client: "Personal Open-Source Project",
    role: "Full-Stack Systems Engineer & Database Architect",
    tech: [
      "Nuxt 4",
      "Vue.js 3.5",
      "Nitro Engine",
      "SQLite (WAL)",
      "better-sqlite3",
      "Server-Sent Events",
      "Tailwind CSS",
      "Meta Threads API",
      "AES-256-GCM",
      "TypeScript 5.8",
    ],
    thumbnail: `${import.meta.env.BASE_URL}sijisiyu-dashboard.png`,
    thumbnailWebp: `${import.meta.env.BASE_URL}sijisiyu-dashboard.webp`,
    imgWidth: 1920,
    imgHeight: 1080,
    githubUrl: "https://github.com/yesterdaygrace/SijiSiyu",
    stats: [
      {
        label: "Token Security",
        value: "AES-256-GCM",
        detail: "Zero plaintext credentials at rest; separate IV, ciphertext, and authentication tags",
      },
      {
        label: "Storage Engine",
        value: "SQLite WAL Mode",
        detail: "Sub-millisecond read/write latency with concurrent readers and atomic transactions",
      },
      {
        label: "Real-Time Push",
        value: "Server-Sent Events",
        detail: "Low-overhead unidirectional SSE stream (/api/events) pushing reactive Vue updates",
      },
      {
        label: "Session Hardening",
        value: "SHA-256 Hash Vault",
        detail: "HttpOnly SameSite cookies where database stores only cryptographic token hashes",
      },
    ],
    executiveSummary: {
      problem:
        "Modern social platforms like Meta Threads lack a robust native saved-post organization system, offer limited categorization, and do not provide an open endpoint for bookmark browsing, while exposing users to credential vulnerabilities and tracking parameters when sharing permalinks. The official API also lacks direct endpoints for bookmarks, requiring private local storage and scanner ingestion.",
      solution:
        "Architected SijiSiyu as a local-first archiving engine pairing an official Meta Threads OAuth API backend with an encrypted local SQLite database, WAL-mode concurrency, real-time Server-Sent Events, and an OLED-optimized minimalist Vue 3 interface.",
      outcome:
        "Delivers instant sub-millisecond local search across thousands of posts, complete user ownership of saved content, bulletproof cryptographic credential security, and clean parameter-stripped link generation.",
    },
    architecture: {
      topology:
        "Local-first client-server topology powered by Nuxt 4 and Nitro engine, executing against an embedded SQLite WAL database with unidirectional SSE sync streaming and client-side reactive Pinia/composables state.",
      stackDetails: [
        {
          category: "Full-Stack Framework",
          tech: "Nuxt 4 & Nitro Engine",
          rationale:
            "Unified server routes for SQLite, Meta OAuth flow, and Server-Sent Events with Vue 3 Composition API frontend.",
        },
        {
          category: "Storage Engine",
          tech: "better-sqlite3 with WAL Mode",
          rationale:
            "Enables PRAGMA journal_mode = WAL and PRAGMA foreign_keys = ON for non-blocking concurrent reads and ACID transactions.",
        },
        {
          category: "Real-Time Sync",
          tech: "Server-Sent Events (SSE)",
          rationale:
            "Provides a lightweight unidirectional communication channel from Nitro server to frontend without WebSocket connection overhead.",
        },
        {
          category: "Security & Encryption",
          tech: "AES-256-GCM & SHA-256",
          rationale:
            "Encrypts access tokens at rest using authenticated ciphertext, IV, and tag; sessions store only SHA-256 hashes.",
        },
        {
          category: "Styling & Design System",
          tech: "Tailwind CSS (OLED Pure Black)",
          rationale:
            "Custom dark theme (#000000, #0c0c0c, #141414, #222222) built for low power consumption, clarity, and zero visual clutter.",
        },
      ],
    },
    keyDecisions: [
      {
        title: "Authenticated Token Encryption at Rest (AES-256-GCM)",
        problem:
          "Meta Threads OAuth tokens grant access to user profile data and must never be stored in plaintext or exposed to client-side scripts.",
        decision:
          "Implemented AES-256-GCM authenticated encryption in security utilities. Each token encryption generates a unique initialization vector (IV) and stores ciphertext, IV, and authentication tag in separate columns.",
        impact:
          "Guarantees data confidentiality and tamper detection. Access tokens are decrypted strictly in server memory during outgoing Graph API requests and are never leaked to the client.",
      },
      {
        title: "SQLite WAL Mode & Singleton Account Enforcement",
        problem:
          "Standard SQLite rollbacks lock the entire database during write operations, causing UI pauses during bulk post sync, and multi-user contamination must be prevented.",
        decision:
          "Enabled PRAGMA journal_mode = WAL and PRAGMA foreign_keys = ON, accompanied by a singleton CHECK constraint (`CHECK (singleton = 1)`) on the account table.",
        impact:
          "Concurrent reads and writes proceed without blocking, reducing query latency below 1ms while enforcing single-tenant security invariants at the database level.",
      },
      {
        title: "Unidirectional Server-Sent Events (SSE) for Ingestion Feedback",
        problem:
          "Importing large batches of saved posts or syncing via browser extensions requires live progress feedback without heavy bidirectional WebSocket connections.",
        decision:
          "Built a dedicated SSE channel (`/api/events`) with heartbeats and event broadcasting integrated directly into Nitro server utilities.",
        impact:
          "Clients receive instant optimistic UI updates and progress percentages during sync runs with minimal server memory and zero protocol overhead.",
      },
      {
        title: "Canonical Link Sanitization & Tracking Stripping",
        problem:
          "Copying permalinks from social networks includes pervasive marketing query parameters (`?s=...`, `?utm_source=...`) that compromise reader privacy.",
        decision:
          "Engineered a 1-click clipboard utility that parses and strips extraneous query parameters, leaving only canonical threads.net permalinks with instant visual feedback.",
        impact:
          "Ensures clean, tracking-free links shared to external platforms with guaranteed 2-second inline visual confirmations.",
      },
    ],
    features: [
      {
        name: "Local-First Post Vault & Categorization",
        description:
          "Instant search, filtering, and multi-tag organization across all saved Threads posts without external server dependencies.",
        technicalImplementation:
          "Indexed SQLite queries with dynamic category detection (Development, Design, Articles, Ideas) and custom user collections.",
      },
      {
        name: "Official Meta Threads OAuth Integration",
        description:
          "Seamless OAuth 2.0 handshake with Meta Graph API for authenticated profile and post retrieval.",
        technicalImplementation:
          "Nitro server handlers manage authorization codes, token exchange, and long-lived token refresh with state parameter validation.",
      },
      {
        name: "Real-Time Ingestion & Sync Monitor",
        description:
          "Live progress tracking and status indicators for manual imports, sample population, and scanner syncs.",
        technicalImplementation:
          "SyncManager utility broadcasts progress payloads over SSE, updating Vue reactive state in real time.",
      },
      {
        name: "Clean Link Generation & Clipboard Utility",
        description:
          "One-click URL sanitization that strips tracking parameters and generates clean canonical permalinks.",
        technicalImplementation:
          "URL parsing and regex filtering coupled with browser clipboard API and animated status notifications.",
      },
    ],
    dataIntegrity: {
      summary:
        "The relational SQLite database enforces strict relational constraints, foreign keys with cascade deletions, and singleton table constraints.",
      rules: [
        "Singleton constraint (singleton = 1) guarantees only one authenticated account exists at any time.",
        "Foreign key constraints with ON DELETE CASCADE ensure post_collections links are automatically pruned when collections are removed.",
        "Session tokens stored strictly as SHA-256 hashes to prevent token leakage even during physical database inspection.",
        "Unique primary keys on post permalinks prevent duplicate imports during repeated sync runs.",
      ],
      schemaHighlights: [
        {
          table: "account",
          role: "Stores connected Threads account and encrypted OAuth credentials",
          constraints: "PRIMARY KEY (singleton CHECK (singleton = 1)), NOT NULL (user_id, access_token_ciphertext)",
        },
        {
          table: "saved_posts",
          role: "Primary post archive storing author, text content, timestamps, and payload JSON",
          constraints: "PRIMARY KEY (permalink), INDEX (username), INDEX (timestamp)",
        },
        {
          table: "collections",
          role: "User-defined categories and auto-tagging keyword definitions",
          constraints: "PRIMARY KEY (id), NOT NULL (name)",
        },
        {
          table: "post_collections",
          role: "Join table associating saved posts with user collections",
          constraints: "PRIMARY KEY (post_permalink, collection_id), FOREIGN KEY ON DELETE CASCADE",
        },
        {
          table: "sessions",
          role: "Server-side sessions authenticated with HttpOnly cookies",
          constraints: "PRIMARY KEY (token_hash), NOT NULL (expires_at)",
        },
      ],
    },
    visuals: [
      {
        title: "OLED Threads Vault Dashboard",
        caption: "Main library view displaying active post collections, category tags, and responsive card layouts.",
        image: `${import.meta.env.BASE_URL}sijisiyu-dashboard.png`,
        alt: "SijiSiyu OLED Library Dashboard",
      },
    ],
    verification: {
      summary:
        "Validated with comprehensive automated test suites including database tests, clipboard utilities, AES encryption validation, and TypeScript strict checks.",
      checks: [
        "Verified database CRUD operations, cascade deletions, and singleton constraints with better-sqlite3 in WAL mode.",
        "Tested AES-256-GCM encryption and decryption roundtrips verifying IV uniqueness and auth tag tamper rejection.",
        "Confirmed URL sanitization strips all tracking query parameters (?s=..., ?utm_...) reliably.",
        "Ran strict TypeScript and Vue typecheck suites confirming zero compilation errors.",
      ],
    },
  },
  {
    id: "dapense",
    badge: "INSTITUTIONAL PRODUCTION · 2024 - 2025",
    figNumber: "FIG 02",
    figCaption: "EXECUTIVE GENERAL LEDGER & CASH AUDIT DASHBOARD",
    title: "DAPENSE: Pension Fund Financial Information System",
    subtitle: "Audited double-entry general ledger, period closing, and regulatory reporting platform",
    description:
      "Mission-critical financial accounting system built for Dana Pensiun Sekolah Kristen Salatiga. Replaced legacy DOS-based VDOS workflows with an audited double-entry general ledger, period closing, investment cash flow tracking, and automated financial statements complying with OJK regulatory standards.",
    year: "2024 - 2025",
    type: "Enterprise Financial Platform",
    status: "INSTITUTIONAL DEPLOYMENT",
    client: "Dana Pensiun Sekolah Kristen Salatiga (Salatiga Christian School Foundation)",
    role: "Full-Stack Software Engineer & Database Architect",
    tech: ["Laravel 11", "PHP 8.3", "MySQL (3NF)", "PostgreSQL 16", "Tailwind CSS", "Nginx", "Linux"],
    thumbnail: `${import.meta.env.BASE_URL}dapense-dashboard.png`,
    thumbnailWebp: `${import.meta.env.BASE_URL}dapense-dashboard.webp`,
    imgWidth: 1800,
    imgHeight: 1125,
    githubUrl: "https://github.com/yesterdaygrace/DAPENSE",
    stats: [
      {
        label: "Database Integrity",
        value: "3NF Relational",
        detail: "15 normalized tables with check constraints and SQL balance triggers",
      },
      {
        label: "Compliance Standards",
        value: "OJK & PSAK 18",
        detail: "9-sheet statutory financial reporting engine for Indonesian pension funds",
      },
      {
        label: "Access Control",
        value: "4 Roles / 8 Policies",
        detail: "Enforced at server layer with rootsuperuser, admin, operator, and bod tiers",
      },
      {
        label: "Balance Guarantee",
        value: "0.00 Variance",
        detail: "NUMERIC(15,2) decimal storage with bccomp() floating-point protection",
      },
    ],
    executiveSummary: {
      problem:
        "The pension fund previously relied on legacy DOS-based VDOS software and spreadsheet files. These tools lacked relational validation, allowing one-sided transactions, arithmetic rounding drift, and unrecorded post-closure modifications. Tracking specialized pension investments like government bonds (SBN), corporate sukuk, and time deposits required extensive manual reconciliation.",
      solution:
        "Engineered a web-based general ledger system adhering to Indonesian pension fund regulatory requirements (PSAK 18 / SAK ETAP and Otoritas Jasa Keuangan). The platform enforces double-entry accounting at the database level, locks accounting periods upon closure, and automates 9 statutory financial reports.",
      outcome:
        "Eliminated ledger imbalances and historical tampering. Reduced statutory report compilation time from several manual days to automated real-time generation with zero decimal discrepancies.",
    },
    architecture: {
      topology:
        "Client browser requests terminate at Nginx, which serves static assets and routes application requests to PHP 8.3-FPM running Laravel 11. Data persistence uses a normalized 3NF MySQL relational database (with an available PostgreSQL 16 portable profile). Database transactions and balance validation triggers guard ledger consistency.",
      stackDetails: [
        {
          category: "Backend Framework",
          tech: "Laravel 11 & PHP 8.3",
          rationale: "Provides typed service classes, database migrations, model policies, and strict request validation.",
        },
        {
          category: "Database Engines",
          tech: "MySQL 8.0 & PostgreSQL 16",
          rationale: "Portable dual-engine architecture supporting transactional isolation and SQL triggers.",
        },
        {
          category: "Frontend UI",
          tech: "Tailwind CSS & Blade / Livewire",
          rationale: "Delivers responsive ledger screens, journal voucher forms, and printable accounting statements.",
        },
        {
          category: "Web Server & OS",
          tech: "Nginx on Linux",
          rationale: "Configured with strict HTTP headers, rate limiting, and process management via Supervisor.",
        },
      ],
    },
    keyDecisions: [
      {
        title: "Database-Level Balance Constraint & SQL Triggers",
        problem:
          "Relying solely on frontend or controller validation risks bad data entering the database if an unexpected error occurs mid-request.",
        decision:
          "Implemented database triggers (trg_jurnal_balance_check) and wrapped all journal postings inside database transactions. Combined this with NUMERIC(15,2) decimal fields and PHP bccomp() comparisons.",
        impact:
          "Mathematical balance is enforced as an invariant. No one-sided or unbalanced debit-credit journal entry can be stored in the database.",
      },
      {
        title: "Period-Close Locking with Snapshot Tables",
        problem:
          "Once an accounting period is officially reported to regulatory bodies, prior entries must never be modified or deleted.",
        decision:
          "Built an automated period-close workflow (Tutup Buku). Closing a period flips its active status and generates immutable trial balance snapshots in neraca_saldos.",
        impact:
          "Historical audit records are preserved without vulnerability to back-dated alterations.",
      },
      {
        title: "Server-Side Policy Enforcement",
        problem:
          "Client-side role checks can be bypassed by forged HTTP requests or manipulated browser state.",
        decision:
          "Implemented 8 Laravel model policies and 4 authorization gates enforced directly in middleware and controller actions across rootsuperuser, admin, operator, and bod roles.",
        impact:
          "Unauthorized users cannot trigger posting actions, adjust periods, or export sensitive financial records.",
      },
    ],
    features: [
      {
        name: "Double-Entry Journal Voucher System",
        description:
          "Interactive voucher interface supporting multi-line debits and credits with real-time balance calculations.",
        technicalImplementation:
          "Validates account eligibility, period status, and balance equality before committing records to the jurnalings table.",
      },
      {
        name: "General Ledger & Trial Balance Explorer",
        description:
          "Dynamic ledger views filtering transactions by Chart of Accounts, date ranges, and posting status.",
        technicalImplementation:
          "Executes indexed SQL queries computing running balances with debit/credit positioning per account code.",
      },
      {
        name: "9-Sheet Regulatory Report Generator",
        description:
          "Generates complete statutory financial statements matching Indonesian pension fund filing standards.",
        technicalImplementation:
          "Aggregates balances into Laporan Aset Neto, Perubahan Aset Neto, Neraca, Hasil Usaha, Arus Kas, Laporan Investasi, and Analisa Likuiditas.",
      },
      {
        name: "Chart of Accounts (COA) Management",
        description:
          "Hierarchical account master supporting assets, liabilities, equity, investment yields, and operational expenses.",
        technicalImplementation:
          "Enforces unique account numbering and parent-child relational links across headers and sub-accounts.",
      },
    ],
    dataIntegrity: {
      summary:
        "The schema strictly adheres to Third Normal Form (3NF). Decimal monetary amounts are stored in NUMERIC(15,2) fields to prevent binary floating-point inaccuracies.",
      rules: [
        "Every journal entry must balance: Total Debits == Total Credits before insert/update.",
        "Transactions belonging to closed periods (periodes.status = 'closed') cannot be modified or deleted.",
        "Foreign key constraints enforce referential integrity between accounts (coas) and journal items (jurnalings).",
        "Every state modification is logged with user timestamp and IP address in activity_logs.",
      ],
      schemaHighlights: [
        {
          table: "coas",
          role: "Chart of Accounts master defining account codes, names, classifications, and normal balances",
          constraints: "PRIMARY KEY (id), UNIQUE (kode_akun), FOREIGN KEY (header_id)",
        },
        {
          table: "jurnalings",
          role: "Double-entry transaction lines with debit/credit amounts and account foreign keys",
          constraints: "FOREIGN KEY (coa_id), FOREIGN KEY (periode_id), NUMERIC(15,2) for amounts",
        },
        {
          table: "periodes",
          role: "Monthly and annual accounting periods with status flags (active, closed)",
          constraints: "PRIMARY KEY (id), UNIQUE (tahun, bulan)",
        },
        {
          table: "neraca_saldos",
          role: "Immutable period trial balance snapshots captured upon period close",
          constraints: "FOREIGN KEY (periode_id), FOREIGN KEY (coa_id)",
        },
      ],
    },
    visuals: [
      {
        title: "Chart of Accounts Workspace",
        caption: "Hierarchical master data management with account numbering and normal balance designations.",
        image: `${import.meta.env.BASE_URL}projects/dapense/04-coa-workspace.png`,
        alt: "DAPENSE Chart of Accounts Workspace",
      },
      {
        title: "Double-Entry Journal Entry Console",
        caption: "Voucher entry form enforcing mathematical debit-credit balance before posting.",
        image: `${import.meta.env.BASE_URL}projects/dapense/06-journal-entry.png`,
        alt: "DAPENSE Double-Entry Journal Entry Console",
      },
      {
        title: "General Ledger Detail View",
        caption: "Running balance calculations and audit references per account code.",
        image: `${import.meta.env.BASE_URL}projects/dapense/09-buku-besar.png`,
        alt: "DAPENSE General Ledger Detail View",
      },
      {
        title: "Trial Balance & Period Close Recap",
        caption: "Reconciliation screen displaying opening balances, period movements, and ending totals.",
        image: `${import.meta.env.BASE_URL}projects/dapense/10-neraca-saldo.png`,
        alt: "DAPENSE Trial Balance Recap",
      },
    ],
    verification: {
      summary:
        "The application was tested against historical VDOS datasets to verify mathematical fidelity, period transition accuracy, and policy barriers.",
      checks: [
        "Tested unclosed period journal entries against SQL balance trigger (rejected unbalanced vouchers).",
        "Verified period close process generated identical trial balance sums across 100+ accounts.",
        "Confirmed operator role accounts cannot access posting operations or user management routes.",
        "Executed dual-engine migration scripts on both MySQL 8 and PostgreSQL 16 with zero schema divergence.",
      ],
    },
  },
  {
    id: "cinemasystem",
    badge: "CONCURRENCY ENGINE · 2026",
    figNumber: "FIG 03",
    figCaption: "AUDITORIUM SEAT RESERVATION & SHOWTIME CONSOLE",
    title: "CinemaSystem: High-Concurrency Cinema Ticketing API",
    subtitle: "High-throughput ticketing engine with PostgreSQL GiST exclusion constraints and Redis Redlock",
    description:
      "High-throughput online cinema ticketing backend in Go with Gin and PostgreSQL. Prevents double-booking race conditions during seat reservation using PostgreSQL GiST range exclusion constraints (btree_gist) and distributed Redis Redlock locking, accompanied by an interactive auditorium booking console.",
    year: "2026",
    type: "Distributed Ticketing Engine",
    status: "CONCURRENCY ARCHITECTURE",
    client: "Technical Assessment for PT Mitra Kasih Perkasa (MKP)",
    role: "Backend Architect & Concurrency Engineer",
    tech: ["Go", "Gin", "PostgreSQL (btree_gist)", "Redis (Redlock)", "GORM", "Docker", "Swagger / OpenAPI"],
    thumbnail: `${import.meta.env.BASE_URL}cinemasystem-dashboard.png`,
    thumbnailWebp: `${import.meta.env.BASE_URL}cinemasystem-dashboard.webp`,
    imgWidth: 1440,
    imgHeight: 900,
    githubUrl: "https://github.com/yesterdaygrace/CinemaSystem",
    stats: [
      {
        label: "Concurrency Safety",
        value: "btree_gist Exclusion",
        detail: "PostgreSQL engine rejects overlapping studio schedules automatically",
      },
      {
        label: "Distributed Locking",
        value: "Redis Redlock",
        detail: "10-minute hold TTL with automated background restock worker",
      },
      {
        label: "Data Normalization",
        value: "14 Tables (3NF)",
        detail: "Decoupled physical seats from schedule-specific seat availability states",
      },
      {
        label: "Resilience",
        value: "100% Automated Refund",
        detail: "Orchestrated refund pipeline when cinema operators cancel screenings",
      },
    ],
    executiveSummary: {
      problem:
        "High-demand cinema ticket releases cause traffic spikes where thousands of customers attempt to book identical seats within seconds. Typical architectures suffer from double-booking race conditions, studio schedule overlaps, and inventory leakage when users abandon payment carts.",
      solution:
        "Designed a high-throughput ticketing engine using Go, PostgreSQL with btree_gist range exclusion constraints, and Redis Redlock distributed locks. Built a decoupled seat inventory model where availability is tracked per screening schedule rather than on physical seats.",
      outcome:
        "Guaranteed zero double-booking under concurrent load. Schedule collisions are blocked directly at the database engine level, and abandoned seat holds automatically return to inventory via a 10-minute TTL worker.",
    },
    architecture: {
      topology:
        "Incoming traffic passes through Cloudflare CDN/WAF and an Application Load Balancer to a stateless cluster of Go Gin worker instances. The workers use Redis for caching movie schedules and coordinating distributed Redlock seat reservations. PostgreSQL acts as the single source of transactional truth with multi-AZ replication.",
      stackDetails: [
        {
          category: "Backend Engine",
          tech: "Go & Gin",
          rationale: "Enables sub-millisecond route handling and high concurrent connection density.",
        },
        {
          category: "Transactional Database",
          tech: "PostgreSQL with btree_gist",
          rationale: "Provides native GiST range exclusion constraints preventing time range overlaps.",
        },
        {
          category: "Distributed Caching & Lock",
          tech: "Redis & Redlock",
          rationale: "Coordinates multi-seat hold locks with explicit TTLs during checkout.",
        },
        {
          category: "API Documentation",
          tech: "Swagger / OpenAPI & Postman",
          rationale: "Provides complete interactive documentation and exportable test collections.",
        },
      ],
    },
    keyDecisions: [
      {
        title: "Decoupled Show-Seat Inventory Model",
        problem:
          "Storing seat status directly on physical seat records (e.g. Seat A10 = SOLD) prevents physical seats from hosting multiple movie showtimes throughout the day.",
        decision:
          "Modeled seat availability in show_seats as a composite entity (schedule_id + seat_id).",
        impact:
          "Physical auditorium layouts remain static while seat availability is isolated per screening schedule.",
      },
      {
        title: "PostgreSQL btree_gist Range Exclusion Constraints",
        problem:
          "Application-level checks for overlapping movie showtimes in the same auditorium are vulnerable to race conditions under rapid admin entry.",
        decision:
          "Implemented PostgreSQL exclusion constraint: EXCLUDE USING gist (studio_id WITH =, tstzrange(start_time, end_time) WITH &&).",
        impact:
          "The database engine itself rejects any overlapping showtime for the same studio with mathematical certainty.",
      },
      {
        title: "Distributed Seat Holds with Automated Restock",
        problem:
          "Users selecting seats without completing payment cause inventory lockup if holds do not expire reliably.",
        decision:
          "Configured 10-minute hold leases in Redis Redlock tied to database transaction state, supported by an asynchronous restock worker.",
        impact:
          "Expired reservations are immediately returned to available inventory without manual operator intervention.",
      },
    ],
    features: [
      {
        name: "Interactive Auditorium Seat Booking Console",
        description:
          "Real-time visual seat map rendering available, held, and sold seats with instant tier pricing.",
        technicalImplementation:
          "Fetches show_seats state and applies Redis Redlock reservation upon seat selection.",
      },
      {
        name: "Collision-Proof Schedule Management",
        description:
          "Admin portal for scheduling movie screenings with automatic cleaning gap enforcement.",
        technicalImplementation:
          "Leverages PostgreSQL btree_gist exclusion to prevent overlapping time ranges in any auditorium.",
      },
      {
        name: "Automated Cancellation & 100% Refund Pipeline",
        description:
          "Orchestrates full ticket refunds and notifications if a cinema operator cancels a scheduled screening.",
        technicalImplementation:
          "Performs logical soft delete on schedule, queries affected orders, generates refund records, and releases seats.",
      },
      {
        name: "Role-Based Authentication & JWT Security",
        description:
          "Secures customer and administrative endpoints with cryptographic tokens and permission checks.",
        technicalImplementation:
          "Gin middleware validates JWT bearer tokens, enforcing customer, cashier, and admin boundaries.",
      },
    ],
    dataIntegrity: {
      summary:
        "The schema spans 14 normalized tables in 3NF with foreign keys, composite unique constraints, and PostgreSQL range exclusion rules.",
      rules: [
        "A seat can only be booked once per screening schedule: UNIQUE(schedule_id, seat_id).",
        "Screening schedules in the same studio cannot overlap in time via GiST range exclusion.",
        "Order totals must equal the sum of itemized ticket prices within the database transaction.",
        "Schedule deletions use soft delete flags to preserve historical audit trails for financial reconciliation.",
      ],
      schemaHighlights: [
        {
          table: "schedules",
          role: "Screening showtimes tied to movies and auditoriums with range constraints",
          constraints: "EXCLUDE USING gist (studio_id WITH =, tstzrange(start_time, end_time) WITH &&)",
        },
        {
          table: "show_seats",
          role: "Stateful seat availability per schedule (AVAILABLE, HELD, BOOKED)",
          constraints: "UNIQUE (schedule_id, seat_id), FOREIGN KEY (schedule_id), FOREIGN KEY (seat_id)",
        },
        {
          table: "orders",
          role: "Customer purchase records with payment statuses (PENDING, PAID, CANCELLED, REFUNDED)",
          constraints: "PRIMARY KEY (id), FOREIGN KEY (user_id), NUMERIC(12,2) for totals",
        },
        {
          table: "refunds",
          role: "Audit log of refund disbursements linked to orders and original payments",
          constraints: "FOREIGN KEY (order_id), FOREIGN KEY (payment_id), NUMERIC(12,2) amount",
        },
      ],
    },
    visuals: [
      {
        title: "Cloud Architecture Topology",
        caption: "High-level national scale topology: Cloudflare, ALB, stateless Go workers, Redis, and multi-AZ PostgreSQL.",
        image: `${import.meta.env.BASE_URL}projects/cinemasystem/system-topology.jpg`,
        alt: "CinemaSystem Cloud Architecture Topology",
      },
      {
        title: "Transaction & Auto-Restock Flowchart",
        caption: "End-to-end flowchart from seat selection through 10-minute hold, payment, and refund processing.",
        image: `${import.meta.env.BASE_URL}projects/cinemasystem/flowchart-pemesanan.jpg`,
        alt: "CinemaSystem Transaction Flowchart",
      },
      {
        title: "Database Entity Relationship Diagram (ERD)",
        caption: "14 relational tables in 3NF modeling branches, studios, schedules, seats, orders, and refunds.",
        image: `${import.meta.env.BASE_URL}projects/cinemasystem/database-erd.jpg`,
        alt: "CinemaSystem Database ERD Diagram",
      },
    ],
    verification: {
      summary:
        "Verified with automated Go test suites, concurrent booking simulation scripts, and Swagger API documentation.",
      checks: [
        "Tested 100 concurrent reservation requests competing for the same single seat (1 winner, 99 clean 409 rejections).",
        "Verified PostgreSQL btree_gist rejects overlapping schedule inserts with 23P01 exclusion violation.",
        "Confirmed 10-minute hold TTL expires and returns unpurchased seats to available status.",
        "Executed full Postman collection covering authentication, schedule CRUD, booking, and refund flows.",
      ],
    },
  },
  {
    id: "devscout",
    badge: "FEATURED APPLICATION · 2026",
    figNumber: "FIG 04",
    figCaption: "PIPELINE CRM & CANDIDATE TRACKING",
    title: "DevScout: Developer Recruitment CRM & Scoring Platform",
    subtitle: "GitHub developer sourcing and evaluation workspace with algorithmic scoring and Supabase RLS",
    description:
      "An end-to-end recruitment CRM for sourcing, evaluating, and tracking candidate pipelines with GitHub developer data as the source of truth. Built with domain-driven workflows rather than generic demo CRUD, featuring interactive Kanban boards and evaluation rubrics.",
    year: "2026",
    type: "Recruitment CRM Application",
    status: "LIVE APPLICATION",
    client: "Talent Acquisition & Engineering Teams",
    role: "Full-Stack Engineer & Frontend Architect",
    tech: ["Vue 3.5", "TypeScript 6", "Vite 8", "Pinia 3", "Hono 4.7", "Supabase", "Tailwind CSS 4.3", "Chart.js 4.5"],
    thumbnail: `${import.meta.env.BASE_URL}devscout-dashboard.png`,
    thumbnailWebp: `${import.meta.env.BASE_URL}devscout-dashboard.webp`,
    imgWidth: 1916,
    imgHeight: 1077,
    demoUrl: "https://dev-scout-lac.vercel.app",
    githubUrl: "https://github.com/yesterdaygrace/DevScout",
    stats: [
      {
        label: "Candidate Scoring",
        value: "6-Factor Algorithm",
        detail: "Weights repositories, followers, PR counts, contribution density, age, and language breadth",
      },
      {
        label: "Rate-Limit Protection",
        value: "Two-Tier Caching",
        detail: "30-minute client cache + 5-minute Hono proxy cache with concurrency queue",
      },
      {
        label: "Multi-Tenant Security",
        value: "Supabase RLS",
        detail: "PostgreSQL Row Level Security isolating pipeline collections and candidate notes",
      },
      {
        label: "Skill Aggregation",
        value: "Promise.allSettled",
        detail: "Aggregates language bytes across up to 20 non-fork repositories with Chart.js display",
      },
    ],
    executiveSummary: {
      problem:
        "Technical recruiters evaluate developers across disconnected browser tabs: GitHub profiles, LinkedIn pages, and private spreadsheets. Sourcing directly on GitHub triggers strict API rate limits, while manual evaluation introduces subjective bias and lost evaluation notes.",
      solution:
        "Developed a dedicated recruitment workspace that treats GitHub as the source of truth. Features a Hono backend proxy with PAT caching, a 6-factor candidate scoring rubric, side-by-side profile comparisons, and Supabase PostgreSQL persistence with Row Level Security.",
      outcome:
        "Streamlined sourcing from discovery to candidate ranking. Recruiters can shortlist candidates, track pipeline stages in collections, take markdown notes with tags, and evaluate candidates using objective code metrics.",
    },
    architecture: {
      topology:
        "Vue 3 single-page application served via Vite communicates with a Hono API proxy on Node. The proxy validates requests with Zod, applies rate-limiting, and queries the GitHub REST API using authenticated token pooling. User collections, notes, and pipelines persist to Supabase PostgreSQL secured by Row Level Security.",
      stackDetails: [
        {
          category: "Frontend Framework",
          tech: "Vue 3.5 & Composition API",
          rationale: "Clean state separation using <script setup>, TypeScript 6, and reactive Pinia stores.",
        },
        {
          category: "Backend Proxy",
          tech: "Hono 4.7 & Zod",
          rationale: "Lightweight request-id tracing, CORS handling, rate limiting, and OpenAPI docs.",
        },
        {
          category: "Database & Auth",
          tech: "Supabase (PostgreSQL 15)",
          rationale: "Provides instant auth, relation integrity, and per-user row isolation via RLS policies.",
        },
        {
          category: "Data Visualization",
          tech: "Chart.js 4.5 & vue-chartjs",
          rationale: "Renders interactive doughnut charts representing candidate language byte distributions.",
        },
      ],
    },
    keyDecisions: [
      {
        title: "Two-Tier Caching & Rate-Limit Queue",
        problem:
          "GitHub API enforces a 60 req/hr unauthenticated limit or 5,000 req/hr authenticated limit, quickly exhausted during recruiter search sessions.",
        decision:
          "Built a two-tier caching architecture: 30-minute client cache in localStorage and 5-minute memory cache in Hono, backed by a client concurrency queue (MAX_CONCURRENT=10).",
        impact:
          "Reduced redundant external API calls by over 75% and prevented 403 Rate Limit Exceeded errors.",
      },
      {
        title: "6-Factor Weighted Scoring Model",
        problem:
          "Recruiters often evaluate GitHub profiles purely on vanity stars or follower counts, which do not reflect engineering depth.",
        decision:
          "Engineered an algorithmic score (0 to 100) combining repository count (20%), follower traction (15%), pull request activity (25%), contribution consistency (20%), account tenure (10%), and language breadth (10%).",
        impact:
          "Provides an objective baseline ranking candidates into Emerging, Established, and Exceptional tiers.",
      },
      {
        title: "Supabase Row Level Security (RLS)",
        problem:
          "Recruiter notes, candidate ratings, and custom pipelines contain sensitive hiring data that must never leak between accounts.",
        decision:
          "Configured PostgreSQL Row Level Security policies where user_id = auth.uid() on all collections, notes, and saved searches.",
        impact:
          "Multi-tenant isolation is enforced directly by the database engine, preventing cross-tenant data exposure.",
      },
    ],
    features: [
      {
        name: "GitHub Developer Discovery & Filter Engine",
        description:
          "Multi-parameter search filtering developers by location, primary language, follower count, and public repository counts.",
        technicalImplementation:
          "Translates form parameters into GitHub search qualifiers with cursor pagination via Hono proxy.",
      },
      {
        name: "Side-by-Side Candidate Comparison",
        description:
          "Compares 2 to 3 candidate profiles simultaneously across code metrics, language distributions, and commit frequency.",
        technicalImplementation:
          "Reads profile metrics from Pinia compare store and renders comparative metric rows with difference highlighting.",
      },
      {
        name: "Candidate Pipeline Collections",
        description:
          "Organizes sourced developers into custom pipeline stages (e.g. Backend Lead, Q2 Interns).",
        technicalImplementation:
          "Persists collections and collection items to Supabase tables with optimistic UI updates.",
      },
      {
        name: "Markdown Notes & Tag Taxonomy",
        description:
          "Allows hiring teams to log interview notes, candidate compensation expectations, and tags.",
        technicalImplementation:
          "Provides in-browser markdown editor with real-time preview and tag indexing.",
      },
    ],
    dataIntegrity: {
      summary:
        "Supabase PostgreSQL manages user sessions and relational candidate data with strict foreign key constraints and per-user row level policies.",
      rules: [
        "Every collection and note is owned by a single user: user_id = auth.uid().",
        "Zod validation on the Hono proxy enforces parameter boundaries before external calls.",
        "Candidate scores are calculated deterministically from verifiable GitHub API attributes.",
        "Demo mode isolates state to browser session without contaminating production databases.",
      ],
      schemaHighlights: [
        {
          table: "collections",
          role: "Candidate grouping pipelines created by recruiters",
          constraints: "PRIMARY KEY (id), FOREIGN KEY (user_id), RLS ENABLED",
        },
        {
          table: "collection_items",
          role: "Developer references associated with specific collections",
          constraints: "UNIQUE (collection_id, github_login), FOREIGN KEY (collection_id)",
        },
        {
          table: "developer_notes",
          role: "Markdown notes and tags recorded for individual candidates",
          constraints: "PRIMARY KEY (id), FOREIGN KEY (user_id), RLS ENABLED",
        },
        {
          table: "saved_searches",
          role: "Saved search queries with JSONB filter parameters",
          constraints: "FOREIGN KEY (user_id), JSONB filters column",
        },
      ],
    },
    visuals: [
      {
        title: "Developer Sourcing Dashboard",
        caption: "Main recruitment dashboard showing candidate search, shortlisted profiles, and pipeline metrics.",
        image: `${import.meta.env.BASE_URL}devscout-dashboard.png`,
        alt: "DevScout Sourcing Dashboard",
      },
    ],
    verification: {
      summary:
        "Covered by Vitest unit tests for composables and utilities, Playwright end-to-end test suites, and live Vercel deployments.",
      checks: [
        "Tested scoring algorithm against synthetic developer profiles to verify score boundary stability.",
        "Verified Hono proxy rate-limiting middleware queues concurrent requests without memory leaks.",
        "Confirmed Supabase RLS policies block unauthorized reads across separate test user sessions.",
        "Validated live demo deployment runs zero-config on Vercel with automated API rewrites.",
      ],
    },
  },
  {
    id: "nodex",
    badge: "FULL-STACK WORKSPACE · 2025 - 2026",
    figNumber: "FIG 05",
    figCaption: "REACTIVE NOTE CARDS & TAG WORKSPACE",
    title: "Nodex: Minimalist Workspace & Note Engine",
    subtitle: "High-speed notes platform with Go Gin REST API, PostgreSQL persistence, and Dokploy VPS pipeline",
    description:
      "A fast, distraction-free markdown note-taking workspace backed by a Go (Gin) REST API, PostgreSQL database, and a Vue 3 / Vite reactive frontend. Implements real-time tag filtering, pinned notes prioritization, and responsive card layouts.",
    year: "2025 - 2026",
    type: "Full-Stack Notes Platform",
    status: "FULL-STACK WEB APP",
    client: "Open Source Developer Workspace",
    role: "Full-Stack Software Engineer",
    tech: ["Go 1.25", "Gin", "PostgreSQL 16", "GORM", "Vue 3", "Vite", "Tailwind CSS", "Docker", "Dokploy"],
    thumbnail: `${import.meta.env.BASE_URL}nodex-dashboard.png`,
    thumbnailWebp: `${import.meta.env.BASE_URL}nodex-dashboard.webp`,
    imgWidth: 1440,
    imgHeight: 900,
    githubUrl: "https://github.com/yesterdaygrace/Nodex",
    stats: [
      {
        label: "Backend Speed",
        value: "Sub-5ms Response",
        detail: "Compiled Go Gin binary serving REST routes with GORM query optimization",
      },
      {
        label: "Database Engine",
        value: "PostgreSQL 16",
        detail: "Structured relational tables for notes and tags with B-tree index support",
      },
      {
        label: "Deployment Spec",
        value: "Dokploy on Linux VPS",
        detail: "Docker containerization, Traefik reverse proxy, and automated SSL termination",
      },
      {
        label: "Frontend Architecture",
        value: "Vue 3 & Vite",
        detail: "Instant reactive tag filtering, pinned note pinning, and markdown previews",
      },
    ],
    executiveSummary: {
      problem:
        "Modern note-taking tools are often encumbered by slow Electron desktop runtimes, proprietary database formats, and complex synchronization systems that get in the way of fast writing and clear note organization.",
      solution:
        "Built a minimalist, high-speed note engine combining a compiled Go (Gin) REST backend with a reactive Vue 3 / Vite frontend and PostgreSQL storage. Designed a clear production deployment specification using Dokploy and Docker on a Linux VPS.",
      outcome:
        "Delivered an instantaneous markdown note-taking workspace with clean REST API contracts, low server resource consumption, and predictable database persistence.",
    },
    architecture: {
      topology:
        "Client browser renders a Vue 3 SPA communicating via Axios to a Go Gin server running inside a Docker container. In production, Dokploy manages the deployment on a Linux VPS with Traefik handling reverse proxying, TLS termination, and health check monitoring. PostgreSQL stores notes, tags, and relational associations.",
      stackDetails: [
        {
          category: "Backend Engine",
          tech: "Go 1.25 & Gin",
          rationale: "Small compiled binary footprint, rapid startup, and typed HTTP handler safety.",
        },
        {
          category: "Database Layer",
          tech: "PostgreSQL 16 & GORM",
          rationale: "Relational foreign key constraints, timestamp auditing, and query indexing.",
        },
        {
          category: "Frontend Layer",
          tech: "Vue 3, Vite & Tailwind CSS",
          rationale: "Reactive state bindings, instant client filtering, and responsive card grids.",
        },
        {
          category: "Infrastructure",
          tech: "Docker & Dokploy on Linux VPS",
          rationale: "Automated container builds, Traefik reverse proxying, and zero-downtime restarts.",
        },
      ],
    },
    keyDecisions: [
      {
        title: "Compiled Go REST Service over Bulky Runtimes",
        problem:
          "Heavy application servers consume hundreds of megabytes of memory even while idle.",
        decision:
          "Implemented the backend as a single compiled Go binary using Gin and GORM.",
        impact:
          "Memory footprint stays below 30MB at idle, and API endpoints respond in under 5 milliseconds.",
      },
      {
        title: "Relational Tag & Note Normalization",
        problem:
          "Storing tags as comma-separated text strings in note rows makes filtering slow and prevents tag rename refactoring.",
        decision:
          "Created distinct notes and tags entities with a relational join table and B-tree indexes.",
        impact:
          "Instant tag filtering across thousands of notes with clean relational integrity.",
      },
      {
        title: "Dokploy Containerized Deployment Specification",
        problem:
          "Public portfolio live demos often fail if manual VPS setups require complex maintenance or exposed ports.",
        decision:
          "Authored a comprehensive production deployment specification (DEPLOY.md) utilizing Dokploy, Docker Compose, Traefik HTTPS, and container healthchecks.",
        impact:
          "Provides a reproducible, production-like deployment pipeline that can be spun up on any Linux VPS with one command.",
      },
    ],
    features: [
      {
        name: "Reactive Note Management & Card Grid",
        description:
          "Create, edit, pin, and archive notes with responsive card grid layouts.",
        technicalImplementation:
          "Vue 3 reactive state updates DOM immediately while syncing changes via REST API calls.",
      },
      {
        name: "Real-Time Tag Filtering & Search",
        description:
          "Instant client-side filtering by single or multiple tags with note count badges.",
        technicalImplementation:
          "Maintains indexed tag dictionaries for zero-latency UI list filtering.",
      },
      {
        name: "Markdown Content Editing",
        description:
          "Distraction-free markdown editor with formatted heading, list, and code block rendering.",
        technicalImplementation:
          "Parses markdown text into semantic HTML while sanitizing rendered output.",
      },
      {
        name: "Dockerized Multi-Stage Builds",
        description:
          "Lightweight production container images packaging compiled Go binaries.",
        technicalImplementation:
          "Multi-stage Dockerfile compiles Go code in build stage and runs in minimal Alpine runtime.",
      },
    ],
    dataIntegrity: {
      summary:
        "PostgreSQL 16 enforces data integrity through primary keys, foreign key cascades, and timestamp auditing.",
      rules: [
        "Every note must have a title and non-empty content payload.",
        "Foreign key constraints on note_tags cascade deletions when a note is removed.",
        "Database connections use connection pooling and parameterized SQL queries to prevent injection.",
      ],
      schemaHighlights: [
        {
          table: "notes",
          role: "Main note entity storing titles, markdown content, and pinned status",
          constraints: "PRIMARY KEY (id), NOT NULL (title), TIMESTAMP created_at/updated_at",
        },
        {
          table: "tags",
          role: "Reusable categorization tags",
          constraints: "PRIMARY KEY (id), UNIQUE (name)",
        },
        {
          table: "note_tags",
          role: "Relational join table linking notes and tags",
          constraints: "PRIMARY KEY (note_id, tag_id), FOREIGN KEY cascades",
        },
      ],
    },
    visuals: [
      {
        title: "Reactive Note Workspace",
        caption: "Main workspace view displaying active notes, category tags, and responsive card layouts.",
        image: `${import.meta.env.BASE_URL}nodex-dashboard.png`,
        alt: "Nodex Note Workspace",
      },
    ],
    verification: {
      summary:
        "Verified with Go automated test suites, REST endpoint integration tests, and Docker container verification.",
      checks: [
        "Tested REST CRUD endpoints verifying 200, 201, 400, and 404 HTTP status responses.",
        "Verified database foreign key cascade behavior upon note deletion.",
        "Confirmed Docker container starts cleanly with healthy status under 30MB memory.",
      ],
    },
  },
];
