import { useEffect, useMemo, useRef, useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import { profile } from "@/data/profile";

/* ── Types ────────────────────────────────────────────────────────────────── */

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
  thumbnail?: string;
  demoUrl?: string;
  githubUrl?: string;
  stars?: number;
}

/* ── Static pinned project ────────────────────────────────────────────────── */

const PINNED: ProjectCard = {
  id: "DevScout",
  title: "DevScout",
  description:
    "Recruitment CRM dashboard for sourcing, tracking, and managing developers using GitHub data.",
  tech: ["Laravel", "Vue.js", "MySQL", "Tailwind"],
  year: "2026",
  type: "Web App",
  thumbnail: "/DevScout.png",
  demoUrl: "https://dev-scout-lac.vercel.app",
  githubUrl: "https://github.com/vinkanika/dev-scout",
};

/* ── Helpers ──────────────────────────────────────────────────────────────── */

function repoToCard(repo: GitHubRepo): ProjectCard {
  const year = new Date(repo.pushed_at).getFullYear().toString();
  return {
    id: String(repo.id),
    title: repo.name,
    description: repo.description ?? "No description provided.",
    tech: [repo.language, ...(repo.topics ?? [])].filter(Boolean) as string[],
    year,
      type: repo.topics?.includes("app") ? "Web App" : "Open Source",
    thumbnail: `https://opengraph.githubassets.com/1/${repo.full_name}` as
      | string
      | undefined,
    githubUrl: repo.html_url,
    stars: repo.stargazers_count,
  };
}

/* ── Loading skeleton ─────────────────────────────────────────────────────── */

function CardSkeleton() {
  return (
    <div
      style={{
        background: "#0a0a0a",
        border: "1px solid rgba(255,255,255,0.04)",
        borderRadius: "16px",
        padding: "24px",
      }}
    >
      {/* Thumbnail placeholder */}
      <div
        style={{
          width: "100%",
          aspectRatio: "16 / 10",
          background: "rgba(255,255,255,0.03)",
          borderRadius: "10px",
          marginBottom: "16px",
        }}
      />
      {/* Title */}
      <div
        style={{
          height: "20px",
          width: "65%",
          background: "rgba(255,255,255,0.05)",
          borderRadius: "4px",
          marginBottom: "10px",
        }}
      />
      {/* Description */}
      <div
        style={{
          height: "12px",
          width: "100%",
          background: "rgba(255,255,255,0.03)",
          borderRadius: "4px",
          marginBottom: "6px",
        }}
      />
      <div
        style={{
          height: "12px",
          width: "70%",
          background: "rgba(255,255,255,0.03)",
          borderRadius: "4px",
          marginBottom: "16px",
        }}
      />
      {/* Tags */}
      <div className="flex gap-1.5">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              height: "22px",
              width: `${50 + i * 12}px`,
              background: "rgba(255,255,255,0.04)",
              borderRadius: "999px",
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Project Card ─────────────────────────────────────────────────────────── */

function ProjectCard({ project }: { project: ProjectCard }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className="group flex flex-col transition-all duration-300"
      style={{
        background: "#111111",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "16px",
        padding: "0",
        overflow: "hidden",
        transition:
          "transform 300ms ease-out, border-color 300ms ease-out, box-shadow 300ms ease-out",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px) scale(1.02)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)";
        e.currentTarget.style.boxShadow =
          "0 20px 60px rgba(0,0,0,0.5)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0) scale(1)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Thumbnail */}
      {project.thumbnail && !imgError ? (
        <a
          href={project.demoUrl ?? project.githubUrl ?? "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="block overflow-hidden flex-shrink-0"
          style={{ borderRadius: "16px 16px 0 0" }}
        >
          <img
            src={project.thumbnail}
            alt={`${project.title} preview`}
            loading="lazy"
            className="w-full transition-transform duration-300 ease-out group-hover:scale-105"
            style={{
              display: "block",
              aspectRatio: "16 / 10",
              objectFit: "cover",
            }}
            onError={() => setImgError(true)}
          />
        </a>
      ) : (
        /* Placeholder when no thumbnail */
        <div
          className="flex-shrink-0"
          style={{
            width: "100%",
            aspectRatio: "16 / 10",
            background: "rgba(255,255,255,0.02)",
            borderRadius: "16px 16px 0 0",
          }}
        />
      )}

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        {/* Title */}
        <h3
          className="font-display leading-tight tracking-tight mb-2"
          style={{ fontSize: "1.35rem", color: "#FFFFFF" }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p
          className="leading-relaxed mb-4 flex-1"
          style={{ color: "#A1A1AA", fontSize: "0.875rem" }}
        >
          {project.description}
        </p>

        {/* Tech stack badges */}
        {project.tech.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tech.slice(0, 4).map((t) => (
              <span
                key={t}
                className="font-sans text-[11px] font-medium"
                style={{
                  color: "#A1A1AA",
                  background: "rgba(255,255,255,0.05)",
                  padding: "0.2rem 0.65rem",
                  borderRadius: "999px",
                  letterSpacing: "0.02em",
                }}
              >
                {t}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span
                className="font-sans text-[11px]"
                style={{ color: "#555" }}
              >
                +{project.tech.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Metadata row */}
        <div
          className="font-sans text-xs flex items-center gap-3 mb-4"
          style={{ color: "#707070" }}
        >
          <span>{project.year}</span>
          <span aria-hidden style={{ color: "#333" }}>
            ·
          </span>
          <span>{project.type}</span>
          {project.stars !== undefined && project.stars > 0 && (
            <>
              <span aria-hidden style={{ color: "#333" }}>
                ·
              </span>
              <span>{project.stars} ★</span>
            </>
          )}
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-2.5 mt-auto">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-sans text-sm font-medium transition-all duration-200"
              style={{
                color: "#FFFFFF",
                background: "rgba(255,255,255,0.1)",
                padding: "0.5rem 1.1rem",
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background =
                  "rgba(255,255,255,0.16)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background =
                  "rgba(255,255,255,0.1)";
              }}
            >
              <ExternalLink size={13} />
              Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-sans text-sm font-medium transition-all duration-200"
              style={{
                color: "#A1A1AA",
                background: "transparent",
                padding: "0.5rem 1.1rem",
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background =
                  "rgba(255,255,255,0.05)";
                e.currentTarget.style.color = "#d4d4d4";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#A1A1AA";
              }}
            >
              <Github size={13} />
              GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Main Section ─────────────────────────────────────────────────────────── */

export default function Projects() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetched = useRef(false);

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;

    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(
          `https://api.github.com/users/${profile.githubUsername}/repos?sort=updated&per_page=100&type=owner`,
          { headers: { Accept: "application/vnd.github+json" } },
        );
        if (!res.ok) throw new Error(`GitHub ${res.status}`);
        const data: GitHubRepo[] = await res.json();
        if (!cancelled) setRepos(data.filter((r) => !r.fork));
      } catch (e) {
        if (!cancelled)
          setError(e instanceof Error ? e.message : "unknown error");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Sort by most recently updated, map to card format
  const projectCards: ProjectCard[] = useMemo(() => {
    const mapped = [...repos]
      .sort(
        (a, b) =>
          new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime(),
      )
      .slice(0, 8) // limit to keep it curated
      .map(repoToCard);
    return [PINNED, ...mapped];
  }, [repos]);

  return (
    <section
      id="projects"
      className="py-24 px-6 md:px-12 lg:px-20"
      style={{ maxWidth: "90rem", margin: "0 auto", width: "100%" }}
    >
      {/* ── Section header ─────────────────────────────────────────────── */}
      <div className="reveal-item mb-14">
        <span
          className="font-sans text-[11px] uppercase tracking-[0.16em] block mb-4"
          style={{ color: "#606060" }}
        >
          [04] — Projects
        </span>
         <div className="w-full" style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
          </div>
          {!loading && (
            <span
              className="font-sans text-xs whitespace-nowrap flex-shrink-0"
              style={{ color: "#505050", paddingBottom: "0.25rem" }}
            >
              {projectCards.length} Projects
            </span>
          )}
        </div>
      </div>

      {/* ── Error state ──────────────────────────────────────────────────── */}
      {error && (
        <div
          className="reveal-item mb-8"
          style={{
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "12px",
            padding: "1rem 1.25rem",
          }}
        >
          <p className="font-mono text-xs" style={{ color: "#ef4444" }}>
            Failed to load: {error}
          </p>
        </div>
      )}

      {/* ── Loading grid ─────────────────────────────────────────────────── */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      )}

      {/* ── Project card grid ─────────────────────────────────────────────── */}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projectCards.map((project, i) => (
            <div
              key={project.id}
              className="reveal-item"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
