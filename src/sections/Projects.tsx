import { useRef } from "react";
import { useSectionReveal } from "@/lib/useSectionReveal";

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
  imgWidth: number;
  imgHeight: number;
}

const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    id: "dapense",
    badge: "INSTITUTIONAL PRODUCTION · 2024 - 2025",
    title: "DAPENSE: Pension Fund Financial Information System",
    description:
      "Mission-critical financial accounting system engineered for Dana Pensiun Sekolah Kristen Salatiga. Replaced legacy DOS-based VDOS workflows with an audited double-entry general ledger, period closing, investment cash flow tracking, and automated financial statements complying with OJK regulatory standards.",
    tech: ["Laravel", "PHP 8.3", "MySQL (3NF)", "Tailwind CSS", "Nginx", "Linux"],
    year: "2024 - 2025",
    type: "Enterprise Financial Platform",
    thumbnail: `${import.meta.env.BASE_URL}dapense-dashboard.png`,
    thumbnailWebp: `${import.meta.env.BASE_URL}dapense-dashboard.webp`,
    githubUrl: "https://github.com/yesterdaygrace/DAPENSE",
    imgWidth: 1800,
    imgHeight: 1125,
  },
  {
    id: "sijisiyu",
    badge: "LOCAL-FIRST ENGINE · 2026",
    title: "SijiSiyu: Local-First Threads Archive & Sync Engine",
    description:
      "A high-performance local-first Threads library and synchronization backend built with Nuxt 4, Vue 3.5, Nitro Engine, and SQLite in WAL mode. Features AES-256-GCM encryption for Meta OAuth access tokens at rest, real-time Server-Sent Events, dynamic collections, and an OLED minimalist reading interface.",
    tech: ["Nuxt 4", "Vue.js 3.5", "Nitro", "SQLite (WAL)", "Server-Sent Events", "Tailwind CSS", "Meta API"],
    year: "2026",
    type: "Local-First Social Archive & Engine",
    thumbnail: `${import.meta.env.BASE_URL}sijisiyu-dashboard.png`,
    thumbnailWebp: `${import.meta.env.BASE_URL}sijisiyu-dashboard.webp`,
    githubUrl: "https://github.com/yesterdaygrace/SijiSiyu",
    imgWidth: 1920,
    imgHeight: 1080,
  },
  {
    id: "cinemasystem",
    badge: "CONCURRENCY ENGINE · 2026",
    title: "CinemaSystem: High-Concurrency Cinema Ticketing API",
    description:
      "High-throughput online cinema ticketing backend in Go with Gin and PostgreSQL. Prevents double-booking race conditions during seat reservation using PostgreSQL GiST range exclusion constraints (btree_gist) and distributed Redis Redlock locking, accompanied by an interactive auditorium booking console.",
    tech: ["Go", "Gin", "PostgreSQL (btree_gist)", "Redis (Redlock)", "GORM", "Docker"],
    year: "2026",
    type: "Distributed Ticketing Engine",
    thumbnail: `${import.meta.env.BASE_URL}cinemasystem-dashboard.png`,
    thumbnailWebp: `${import.meta.env.BASE_URL}cinemasystem-dashboard.webp`,
    githubUrl: "https://github.com/yesterdaygrace/CinemaSystem",
    imgWidth: 1440,
    imgHeight: 900,
  },
  {
    id: "devscout",
    badge: "FEATURED APPLICATION · 2026",
    title: "DevScout: Developer Recruitment CRM & Scoring",
    description:
      "An end-to-end recruitment CRM for sourcing, evaluating, and tracking candidate pipelines with GitHub developer data as the source of truth. Built with domain-driven workflows rather than generic demo CRUD, featuring interactive Kanban boards and evaluation rubrics.",
    tech: ["Laravel", "Vue.js 3", "MySQL", "Tailwind CSS", "REST API"],
    year: "2026",
    type: "Recruitment CRM Application",
    thumbnail: `${import.meta.env.BASE_URL}devscout-dashboard.png`,
    thumbnailWebp: `${import.meta.env.BASE_URL}devscout-dashboard.webp`,
    demoUrl: "https://dev-scout-lac.vercel.app",
    githubUrl: "https://github.com/yesterdaygrace/DevScout",
    imgWidth: 1916,
    imgHeight: 1077,
  },
  {
    id: "nodex",
    badge: "FULL-STACK WORKSPACE · 2025 - 2026",
    title: "Nodex: Minimalist Workspace & Note Engine",
    description:
      "A fast, distraction-free markdown note-taking workspace backed by a Go (Gin) REST API, PostgreSQL database, and a Vue 3 / Vite reactive frontend. Implements real-time tag filtering, pinned notes prioritization, and responsive card layouts.",
    tech: ["Go", "Gin", "PostgreSQL", "Vue.js 3", "Vite", "Tailwind CSS"],
    year: "2025 - 2026",
    type: "Full-Stack Notes Platform",
    thumbnail: `${import.meta.env.BASE_URL}nodex-dashboard.png`,
    thumbnailWebp: `${import.meta.env.BASE_URL}nodex-dashboard.webp`,
    githubUrl: "https://github.com/yesterdaygrace/Nodex",
    imgWidth: 1440,
    imgHeight: 900,
  },
];

interface ProjectsProps {
  onSelectProject?: (id: string) => void;
}

function Thumb({
  project,
  className,
}: {
  project: FeaturedProject;
  className: string;
}) {
  return (
    <picture>
      {project.thumbnailWebp && (
        <source srcSet={project.thumbnailWebp} type="image/webp" />
      )}
      <img
        src={project.thumbnail}
        alt={`${project.title} dashboard`}
        width={project.imgWidth}
        height={project.imgHeight}
        loading="lazy"
        decoding="async"
        className={className}
      />
    </picture>
  );
}

export default function Projects({ onSelectProject }: ProjectsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  useSectionReveal(sectionRef);

  const handleProjectClick = (projectId: string, e: React.MouseEvent) => {
    // If command/ctrl click, let browser handle new tab
    if (e.metaKey || e.ctrlKey) return;
    e.preventDefault();
    if (onSelectProject) {
      onSelectProject(projectId);
    } else {
      window.location.hash = `#/projects/${projectId}`;
    }
  };

  const [lead, ...rest] = FEATURED_PROJECTS;

  return (
    <section id="projects" ref={sectionRef} className="vellum-section">
      <header className="section-header">
        <span className="section-label">FLAGSHIP SOFTWARE · 2026</span>
        <h2 className="section-title">
          Selected work, <em>tested in production</em>.
        </h2>
        <p className="section-description">
          Production systems, database designs, and the applications built on
          them. Open any project for its architecture and documentation.
        </p>
      </header>

      {/* ── Lead project: the production deployment ─────────────────────── */}
      <article className="border border-[var(--c-border)] bg-[var(--c-bg-deep)] p-6 sm:p-10 transition-colors hover:border-[var(--c-accent)] mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-5 flex flex-col items-start">
            <span className="project-meta text-[var(--c-emphasis)] block mb-3 font-semibold">
              {lead.badge}
            </span>
            <h3 className="font-display text-4xl sm:text-5xl leading-[1.05] mb-4">
              <a
                href={`#/projects/${lead.id}`}
                onClick={(e) => handleProjectClick(lead.id, e)}
                className="hover:text-[var(--c-emphasis)] transition-colors"
              >
                {lead.title}
              </a>
            </h3>
            <p className="project-description mb-6">{lead.description}</p>
            <p className="font-mono text-[13px] text-[var(--c-accent)] mb-8 leading-relaxed">
              {lead.tech.join(" · ")}
            </p>
            <div className="flex flex-wrap gap-3 items-center">
              <a
                href={`#/projects/${lead.id}`}
                onClick={(e) => handleProjectClick(lead.id, e)}
                className="vellum-btn-solid cursor-pointer"
              >
                Case study &amp; architecture →
              </a>
              {lead.githubUrl && (
                <a
                  href={lead.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="vellum-btn"
                >
                  Repository ↗
                </a>
              )}
            </div>
          </div>
          <div className="lg:col-span-7">
            <a
              href={`#/projects/${lead.id}`}
              onClick={(e) => handleProjectClick(lead.id, e)}
              aria-label={`View architecture and documentation for ${lead.title}`}
              className="block aspect-[16/10] overflow-hidden border border-[var(--c-border)] bg-[var(--c-bg-mid)] p-2 group"
            >
              <Thumb
                project={lead}
                className="w-full h-full object-cover contrast-[1.03] group-hover:scale-[1.02] transition-transform duration-300"
              />
            </a>
          </div>
        </div>
      </article>

      {/* ── Other projects: compact rows ───────────────────────────────── */}
      <h3 className="font-display text-2xl mb-2">More projects</h3>
      <ul className="divide-y divide-[var(--c-border)] border-y border-[var(--c-border)]">
        {rest.map((project) => (
          <li key={project.id} className="py-6 sm:py-8">
            <div className="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-5 sm:gap-8 items-start">
              <a
                href={`#/projects/${project.id}`}
                onClick={(e) => handleProjectClick(project.id, e)}
                aria-label={`View architecture and documentation for ${project.title}`}
                className="hidden sm:block aspect-[16/10] overflow-hidden border border-[var(--c-border)] bg-[var(--c-bg-mid)] group"
              >
                <Thumb
                  project={project}
                  className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-300"
                />
              </a>
              <div className="min-w-0">
                <span className="project-meta text-[var(--c-accent)] block mb-1">
                  {project.badge}
                </span>
                <h4 className="font-display text-2xl sm:text-3xl leading-tight mb-2">
                  <a
                    href={`#/projects/${project.id}`}
                    onClick={(e) => handleProjectClick(project.id, e)}
                    className="hover:text-[var(--c-emphasis)] transition-colors"
                  >
                    {project.title}
                  </a>
                </h4>
                <p className="text-[15px] leading-relaxed text-[var(--c-fg-2)] max-w-[56ch] line-clamp-3 mb-3">
                  {project.description}
                </p>
                <p className="font-mono text-[13px] text-[var(--c-accent)] mb-4">
                  {project.tech.join(" · ")}
                </p>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-sm font-semibold">
                  <a
                    href={`#/projects/${project.id}`}
                    onClick={(e) => handleProjectClick(project.id, e)}
                    className="inline-flex items-center min-h-11 text-[var(--c-fg)] hover:text-[var(--c-emphasis)]"
                  >
                    Case study →
                  </a>
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center min-h-11 text-[var(--c-fg)] hover:text-[var(--c-emphasis)]"
                    >
                      Live demo ↗
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center min-h-11 text-[var(--c-fg)] hover:text-[var(--c-emphasis)]"
                    >
                      Repository ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
