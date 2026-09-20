import { useEffect, useMemo, useRef, useState } from "react";
import { profile } from "@/data/profile";
import {
  ChapterHeader,
  Kicker,
  PinAnnotation,
  AccentRule,
} from "@/components/vellum/VellumComponents";

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
  fork: boolean;
  topics: string[];
}

interface ProjectCard {
  id: string;
  title: string;
  description: string;
  tech: string[];
  year: string;
  type: string;
  demoUrl?: string;
  githubUrl?: string;
  stars?: number;
}

const PINNED: ProjectCard & { thumbnail: string } = {
  id: "DevScout",
  title: "DevScout — Recruitment CRM",
  description:
    "An end-to-end recruitment CRM for sourcing, evaluating, and tracking candidate pipelines with GitHub developer data as the source of truth. Built with domain-driven workflows rather than generic demo CRUD.",
  tech: ["Laravel", "Vue.js 3", "MySQL", "Tailwind CSS"],
  year: "2026",
  type: "Flagship Web App",
  thumbnail: `${import.meta.env.BASE_URL}devscout-dashboard.png`,
  demoUrl: "https://dev-scout-lac.vercel.app",
  githubUrl: "https://github.com/vinkanika/dev-scout",
};

export default function Projects() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetched = useRef(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const startFetch = () => {
      if (fetched.current) return;
      fetched.current = true;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      (async () => {
        try {
          const res = await fetch(
            `https://api.github.com/users/${profile.githubUsername}/repos?sort=updated&per_page=15&type=owner`,
            {
              headers: { Accept: "application/vnd.github+json" },
              signal: controller.signal,
            },
          );
          if (!res.ok) throw new Error(`GitHub API error ${res.status}`);
          const data: GitHubRepo[] = await res.json();
          setRepos(data.filter((r) => !r.fork));
        } catch (e) {
          setError(e instanceof Error ? e.message : "Network error");
        } finally {
          clearTimeout(timeoutId);
          setLoading(false);
        }
      })();
    };

    // Defer network fetch until Projects section is near viewport
    if (typeof IntersectionObserver !== "undefined" && sectionRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            startFetch();
            observer.disconnect();
          }
        },
        { rootMargin: "800px 0px" },
      );
      observer.observe(sectionRef.current);
      return () => observer.disconnect();
    }
    startFetch();
    return undefined;
  }, []);
  const projectCards: ProjectCard[] = useMemo(() => {
    const ARCH_METADATA: Record<string, { desc: string; type: string; tech: string[] }> = {
      dapense: {
        desc: "Financial information system replacing legacy VDOS workflows with a Laravel/MySQL web architecture for ledger, journal, reconciliation, and reporting operations.",
        type: "Financial Information System",
        tech: ["Laravel", "PHP", "MySQL", "Nginx"],
      },
      inventra: {
        desc: "Go/PostgreSQL inventory platform with RBAC, multi-warehouse stock ledgers, reservations, audit trails, and transactional workflows.",
        type: "Backend Inventory Platform",
        tech: ["Go", "PostgreSQL", "Docker", "REST API"],
      },
      "dev-scout": {
        desc: "Recruitment CRM integrating GitHub developer data with structured candidate pipelines and domain-specific recruitment workflows.",
        type: "Recruitment CRM Application",
        tech: ["Laravel", "Vue.js 3", "MySQL", "Tailwind"],
      },
      devscout: {
        desc: "Recruitment CRM integrating GitHub developer data with structured candidate pipelines and domain-specific recruitment workflows.",
        type: "Recruitment CRM Application",
        tech: ["Laravel", "Vue.js 3", "MySQL", "Tailwind"],
      },
      portfolio: {
        desc: "Engineering portfolio documenting production system migrations, backend architecture, and verified software deliverables.",
        type: "Engineering Portfolio",
        tech: ["React 19", "TypeScript", "Tailwind", "Vite"],
      },
    };

    const FEATURED_ORDER = ["dapense", "inventra", "dev-scout", "portfolio"];
    if (repos.length === 0 && !loading) {
      return [
        {
          id: "dapense",
          title: "DAPENSE",
          description: "Financial information system replacing legacy VDOS workflows with a Laravel/MySQL web architecture for ledger, journal, reconciliation, and reporting operations.",
          tech: ["Laravel", "PHP", "MySQL", "Nginx"],
          year: "2025",
          type: "Financial Information System",
          githubUrl: `https://github.com/${profile.githubUsername}/DAPENSE`,
        },
        {
          id: "inventra",
          title: "inventra",
          description: "Go/PostgreSQL inventory platform with RBAC, multi-warehouse stock ledgers, reservations, audit trails, and transactional workflows.",
          tech: ["Go", "PostgreSQL", "Docker", "REST API"],
          year: "2025",
          type: "Backend Inventory Platform",
          githubUrl: `https://github.com/${profile.githubUsername}/inventra`,
        },
        {
          id: "portfolio",
          title: "portfolio",
          description: "Engineering portfolio documenting production system migrations, backend architecture, and verified software deliverables.",
          tech: ["React 19", "TypeScript", "Tailwind", "Vite"],
          year: "2026",
          type: "Engineering Portfolio",
          githubUrl: `https://github.com/${profile.githubUsername}/portfolio`,
        },
      ];
    }

    return [...repos]
      .sort((a, b) => {
        const aKey = a.name.toLowerCase();
        const bKey = b.name.toLowerCase();
        const aRank = FEATURED_ORDER.findIndex((f) => f === aKey || aKey.includes(f));
        const bRank = FEATURED_ORDER.findIndex((f) => f === bKey || bKey.includes(f));
        if (aRank !== -1 && bRank !== -1) return aRank - bRank;
        if (aRank !== -1) return -1;
        if (bRank !== -1) return 1;
        return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime();
      })
      .slice(0, 5)
      .map((repo) => {
        const key = repo.name.toLowerCase();
        const custom = ARCH_METADATA[key] || Object.entries(ARCH_METADATA).find(([k]) => key.includes(k))?.[1];
        return {
          id: String(repo.id),
          title: repo.name,
          description: custom?.desc ?? (repo.description || "Production repository and architecture codebase."),
          tech: custom?.tech ?? ([repo.language, ...(repo.topics ?? [])].filter(Boolean) as string[]),
          year: new Date(repo.pushed_at).getFullYear().toString(),
          type: custom?.type ?? (repo.topics?.includes("app") ? "Web Application" : "Engineering Repository"),
          githubUrl: repo.html_url,
          stars: repo.stargazers_count,
        };
      });
  }, [repos]);

  return (
    <section id="projects" ref={sectionRef} className="vellum-section">
      <ChapterHeader
        number="06"
        title="Project Showcase"
        category="Verified Deliverables"
      />

      <div className="mb-14">
        <Kicker>Flagship Software · 2026</Kicker>
        <h2
          className="font-display italic text-3xl sm:text-5xl lg:text-6xl mb-4 leading-[1.05]"
          style={{ color: "var(--c-fg)" }}
        >
          Selected work, <em>tested in production</em>.
        </h2>
        <p
          className="font-sans text-base sm:text-lg max-w-3xl"
          style={{ color: "var(--c-fg-2)" }}
        >
          Featured application architecture and live repositories fetched
          directly from GitHub to prove verifiable commit history.
        </p>
      </div>

      {/* ── Feature 01: DevScout ─────────────────────────────────────────── */}
      <article className="border border-[var(--c-border)] bg-[var(--c-bg-deep)] p-6 sm:p-10 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Content Column */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <span
              className="font-mono text-xs uppercase tracking-widest block mb-2 font-semibold"
              style={{ color: "var(--c-emphasis)" }}
            >
              FEATURED APPLICATION · {PINNED.year}
            </span>

            <h3
              className="font-display italic text-3xl sm:text-4xl lg:text-5xl mb-4 leading-tight"
              style={{ color: "var(--c-fg)" }}
            >
              {PINNED.title}
            </h3>

            <p
              className="font-sans text-sm sm:text-base leading-relaxed mb-6"
              style={{ color: "var(--c-fg-2)" }}
            >
              {PINNED.description}
            </p>

            <AccentRule />

            {/* Tech badges in Courier Prime mono */}
            <div className="flex flex-wrap gap-2 mb-8">
              {PINNED.tech.map((t) => (
                <span
                  key={t}
                  className="font-mono text-xs px-2.5 py-1 border border-[var(--c-border)]"
                  style={{ color: "var(--c-fg)" }}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 items-center">
              {PINNED.demoUrl && (
                <a
                  href={PINNED.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="vellum-btn-solid"
                >
                  Launch Live Demo ↗
                </a>
              )}
              {PINNED.githubUrl && (
                <a
                  href={PINNED.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="vellum-btn"
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
                  <source
                    srcSet={`${import.meta.env.BASE_URL}devscout-dashboard.webp`}
                    type="image/webp"
                  />
                  <img
                    src={PINNED.thumbnail}
                    alt="DevScout Recruitment CRM Dashboard"
                    width={1916}
                    height={1077}
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
                <span>FIG 02 · PIPELINE CRM VIEW</span>
                <span>STATUS: LIVE</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </article>

      {/* ── Section Header: Public Repositories ─────────────────────────── */}
      <div className="border-t border-[var(--c-border)] pt-10 mb-8">
        <div className="flex items-baseline justify-between mb-4">
          <span
            className="font-mono text-xs uppercase tracking-widest"
            style={{ color: "var(--c-accent)" }}
          >
            Live GitHub Repositories · @{profile.githubUsername}
          </span>
          <a
            href={profile.githubUsername ? `https://github.com/${profile.githubUsername}` : "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs hover:underline"
            style={{ color: "var(--c-fg-2)" }}
          >
            View all on GitHub ↗
          </a>
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="p-4 border border-[rgba(232,216,92,0.20)] font-mono text-xs mb-8 text-[var(--c-fg-2)]">
          GitHub feed note: {error}. Showing curated project index.
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="space-y-4">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="border-b border-[var(--c-border)] pb-6 animate-pulse"
            >
              <div className="h-5 w-48 bg-[var(--c-bg-deep)] mb-2" />
              <div className="h-4 w-96 bg-[var(--c-bg-deep)]" />
            </div>
          ))}
        </div>
      )}

      {/* Repository Archive Ledger */}
      {!loading && (
        <div className="divide-y divide-[var(--c-border)] border-y border-[var(--c-border)]">
          {projectCards.map((proj, idx) => (
            <article
              key={proj.id}
              className="py-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline group"
            >
              <div className="md:col-span-1 font-mono text-xs text-[var(--c-accent)]">
                {String(idx + 1).padStart(2, "0")}.
              </div>

              <div className="md:col-span-4">
                <h4
                  className="font-display italic text-xl sm:text-2xl mb-1 group-hover:text-[var(--c-emphasis)] transition-colors"
                  style={{ color: "var(--c-fg)" }}
                >
                  <a
                    href={proj.githubUrl ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {proj.title}
                  </a>
                </h4>
                <div className="font-mono text-[11px] text-[var(--c-accent)]">
                  {proj.type} · {proj.year}
                  {proj.stars ? ` · ★ ${proj.stars}` : ""}
                </div>
              </div>

              <div className="md:col-span-5 font-sans text-xs sm:text-sm text-[var(--c-fg-2)] leading-relaxed">
                {proj.description}
              </div>

              <div className="md:col-span-2 flex md:justify-end items-center gap-2">
                {proj.githubUrl && (
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs px-2.5 py-1 border border-[var(--c-border)] hover:border-[var(--c-fg)] text-[var(--c-fg-2)] hover:text-[var(--c-emphasis)]"
                  >
                    Repo ↗
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      )}

      <footer className="pt-12 mt-12 border-t border-[var(--c-border)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <PinAnnotation
          counter="PROJECT LEDGER"
          note="Live API query: api.github.com/users/yesterdaygrace/repos"
          secondaryNote="Static fallback enabled for CI & GitHub Pages static preview"
        />
        <a href="#contact" className="vellum-btn">
          Connect &amp; Inquiries ↓
        </a>
      </footer>
    </section>
  );
}
