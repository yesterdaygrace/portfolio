import { useRef } from "react";
import { useSectionReveal } from "@/lib/useSectionReveal";
import { AccentRule } from "@/components/vellum/VellumComponents";

interface FeaturedProject {
  id: string;
  badge: string;
  title: string;
  description: string;
  tech: string[];
  year: string;
  type: string;
  thumbnail: string;
  thumbnailWebp?: string;
  demoUrl?: string;
  githubUrl?: string;
  figNumber: string;
  figCaption: string;
  status: string;
  imgWidth: number;
  imgHeight: number;
}

const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    id: "dapense",
    badge: "INSTITUTIONAL PRODUCTION · 2024 — 2025",
    title: "DAPENSE — Pension Fund Financial Information System",
    description:
      "Mission-critical financial accounting system engineered for Dana Pensiun Sekolah Kristen Salatiga. Replaced legacy DOS-based VDOS workflows with an audited double-entry general ledger, period closing, investment cash flow tracking, and automated financial statements complying with OJK regulatory standards.",
    tech: ["Laravel", "PHP 8.3", "MySQL (3NF)", "Tailwind CSS", "Nginx", "Linux"],
    year: "2024 — 2025",
    type: "Enterprise Financial Platform",
    thumbnail: `${import.meta.env.BASE_URL}dapense-dashboard.png`,
    thumbnailWebp: `${import.meta.env.BASE_URL}dapense-dashboard.webp`,
    githubUrl: "https://github.com/yesterdaygrace/DAPENSE",
    figNumber: "FIG 01",
    figCaption: "EXECUTIVE GENERAL LEDGER & CASH AUDIT DASHBOARD",
    status: "INSTITUTIONAL DEPLOYMENT",
    imgWidth: 1800,
    imgHeight: 1125,
  },
  {
    id: "inventra",
    badge: "FEATURED PLATFORM · 2026",
    title: "Inventra — Multi-Warehouse Inventory System",
    description:
      "A production-minded inventory management system built with Go 1.24 (Gin), PostgreSQL 17, React 19, and TypeScript. Features multi-warehouse stock ledgers, reservations with lazy expiration, cycle counts, fine-grained RBAC, and append-only transactional audit trails.",
    tech: ["Go 1.24", "PostgreSQL 17", "React 19", "TypeScript", "Docker", "Tailwind CSS"],
    year: "2026",
    type: "Backend Inventory Platform",
    thumbnail: `${import.meta.env.BASE_URL}inventra-dashboard.png`,
    thumbnailWebp: `${import.meta.env.BASE_URL}inventra-dashboard.webp`,
    githubUrl: "https://github.com/yesterdaygrace/Inventra",
    figNumber: "FIG 02",
    figCaption: "DARK MODE DASHBOARD & STOCK LEDGER",
    status: "PRODUCTION ARCHITECTURE",
    imgWidth: 1905,
    imgHeight: 1128,
  },
  {
    id: "cinemasystem",
    badge: "CONCURRENCY ENGINE · 2026",
    title: "CinemaSystem — High-Concurrency Cinema Ticketing API",
    description:
      "High-throughput online cinema ticketing backend in Go with Gin and PostgreSQL. Prevents double-booking race conditions during seat reservation using PostgreSQL GiST range exclusion constraints (btree_gist) and distributed Redis Redlock locking, accompanied by an interactive auditorium booking console.",
    tech: ["Go", "Gin", "PostgreSQL (btree_gist)", "Redis (Redlock)", "GORM", "Docker"],
    year: "2026",
    type: "Distributed Ticketing Engine",
    thumbnail: `${import.meta.env.BASE_URL}cinemasystem-dashboard.png`,
    thumbnailWebp: `${import.meta.env.BASE_URL}cinemasystem-dashboard.webp`,
    githubUrl: "https://github.com/yesterdaygrace/CinemaSystem",
    figNumber: "FIG 03",
    figCaption: "AUDITORIUM SEAT RESERVATION & SHOWTIME CONSOLE",
    status: "CONCURRENCY ARCHITECTURE",
    imgWidth: 1440,
    imgHeight: 900,
  },
  {
    id: "devscout",
    badge: "FEATURED APPLICATION · 2026",
    title: "DevScout — Developer Recruitment CRM",
    description:
      "An end-to-end recruitment CRM for sourcing, evaluating, and tracking candidate pipelines with GitHub developer data as the source of truth. Built with domain-driven workflows rather than generic demo CRUD, featuring interactive Kanban boards and evaluation rubrics.",
    tech: ["Laravel", "Vue.js 3", "MySQL", "Tailwind CSS", "REST API"],
    year: "2026",
    type: "Recruitment CRM Application",
    thumbnail: `${import.meta.env.BASE_URL}devscout-dashboard.png`,
    thumbnailWebp: `${import.meta.env.BASE_URL}devscout-dashboard.webp`,
    demoUrl: "https://dev-scout-lac.vercel.app",
    githubUrl: "https://github.com/yesterdaygrace/DevScout",
    figNumber: "FIG 04",
    figCaption: "PIPELINE CRM & CANDIDATE TRACKING",
    status: "LIVE APPLICATION",
    imgWidth: 1916,
    imgHeight: 1077,
  },
  {
    id: "nodex",
    badge: "FULL-STACK WORKSPACE · 2025 — 2026",
    title: "Nodex — Minimalist Workspace & Note Engine",
    description:
      "A fast, distraction-free markdown note-taking workspace backed by a Go (Gin) REST API, PostgreSQL database, and a Vue 3 / Vite reactive frontend. Implements real-time tag filtering, pinned notes prioritization, and responsive card layouts.",
    tech: ["Go", "Gin", "PostgreSQL", "Vue.js 3", "Vite", "Tailwind CSS"],
    year: "2025 — 2026",
    type: "Full-Stack Notes Platform",
    thumbnail: `${import.meta.env.BASE_URL}nodex-dashboard.png`,
    thumbnailWebp: `${import.meta.env.BASE_URL}nodex-dashboard.webp`,
    githubUrl: "https://github.com/yesterdaygrace/Nodex",
    figNumber: "FIG 05",
    figCaption: "REACTIVE NOTE CARDS & TAG WORKSPACE",
    status: "FULL-STACK WEB APP",
    imgWidth: 1440,
    imgHeight: 900,
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  useSectionReveal(sectionRef);

  return (
    <section id="projects" ref={sectionRef} className="vellum-section">
      {/* ── Section Header (Normalized Rhythm) ────────────────────────────── */}
      <header className="section-header">
        <span className="section-label">02 / FLAGSHIP SOFTWARE · 2026</span>
        <h2 className="section-title">
          Selected work, <em>tested in production</em>.
        </h2>
        <p className="section-description">
          Production system architectures, database designs, and verified
          application implementations.
        </p>
      </header>

      {/* ── Featured Flagship Applications ─────────────────────────────────── */}
      <div className="space-y-12">
        {FEATURED_PROJECTS.map((project) => (
          <article
            key={project.id}
            className="border border-[var(--c-border)] bg-[var(--c-bg-deep)] p-6 sm:p-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Content Column */}
              <div className="lg:col-span-6 flex flex-col items-start">
                <span
                  className="project-meta text-[var(--c-emphasis)] block mb-2 font-semibold"
                >
                  {project.badge}
                </span>

                <h3 className="project-title mb-3">
                  {project.title}
                </h3>

                <p className="project-description mb-6">
                  {project.description}
                </p>

                <AccentRule />

                {/* Tech metadata: Inline Courier Prime string from task.md */}
                <div className="font-mono text-xs uppercase tracking-wider text-[var(--c-accent)] mb-8 flex flex-wrap items-center gap-x-2 gap-y-1">
                  {project.tech.map((t, idx) => (
                    <span key={t} className="flex items-center gap-2">
                      <span>{t}</span>
                      {idx < project.tech.length - 1 && (
                        <span className="opacity-40 select-none">·</span>
                      )}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3 items-center">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="vellum-btn-solid"
                    >
                      Launch Live Demo ↗
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={project.demoUrl ? "vellum-btn" : "vellum-btn-solid"}
                    >
                      Source Repository ↗
                    </a>
                  )}
                </div>
              </div>

              {/* Screenshot Column */}
              <div className="lg:col-span-6">
                <figure className="border border-[var(--c-border)] bg-[var(--c-bg-mid)] p-2">
                  <div className="aspect-[16/10] overflow-hidden bg-[var(--c-bg-deep)]">
                    <picture>
                      {project.thumbnailWebp && (
                        <source
                          srcSet={project.thumbnailWebp}
                          type="image/webp"
                        />
                      )}
                      <img
                        src={project.thumbnail}
                        alt={`${project.title} Dashboard`}
                        width={project.imgWidth}
                        height={project.imgHeight}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover contrast-[1.03] hover:scale-[1.02] transition-all duration-300"
                      />
                    </picture>
                  </div>
                  <figcaption
                    className="mt-2 px-1 flex items-center justify-between font-mono text-[11px]"
                    style={{ color: "var(--c-accent)" }}
                  >
                    <span>
                      {project.figNumber} · {project.figCaption}
                    </span>
                    <span>STATUS: {project.status}</span>
                  </figcaption>
                </figure>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
