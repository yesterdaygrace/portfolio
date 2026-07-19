"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ExternalLink,
  Github,
  Zap,
  Box,
  GitBranch,
} from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeader from "@/components/ui/SectionHeader";
import Badge from "@/components/ui/Badge";
import { profile, projectSettings } from "@/data/profile";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  archived: boolean;
  pushed_at: string;
  fork: boolean;
  topics?: string[];
}

const STATUS = {
  production: { label: "active", variant: "success" as const, icon: Zap },
  development: {
    label: "maintained",
    variant: "warning" as const,
    icon: GitBranch,
  },
  archived: { label: "archived", variant: "ghost" as const, icon: Box },
};

const TYPE_ICONS: Record<string, React.ElementType> = {
  "GitHub Repository": Github,
  "Archived Repository": Box,
};

function formatMonthYear(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function getRepoStatus(repo: GitHubRepo): Project["status"] {
  if (repo.archived) return "archived";

  const daysSinceUpdate =
    (Date.now() - new Date(repo.pushed_at).getTime()) / (1000 * 60 * 60 * 24);

  if (daysSinceUpdate <= 45) return "production";
  return "development";
}

function mapRepoToProject(repo: GitHubRepo, featured: boolean): Project {
  const tech = Array.from(
    new Set(
      [repo.language, ...(repo.topics ?? [])].filter((value): value is string =>
        Boolean(value && value.trim()),
      ),
    ),
  );

  const normalizedHomepage = repo.homepage?.trim();
  const demo = normalizedHomepage
    ? normalizedHomepage.startsWith("http")
      ? normalizedHomepage
      : `https://${normalizedHomepage}`
    : undefined;

  return {
    id: String(repo.id),
    title: repo.name,
    description: repo.description ?? "No repository description provided.",
    longDescription: `${repo.description ?? "Repository from GitHub."} ⭐ ${repo.stargazers_count} stars · 🍴 ${repo.forks_count} forks · last updated ${formatMonthYear(repo.pushed_at)}.`,
    tech: tech.length > 0 ? tech : ["Open Source"],
    status: getRepoStatus(repo),
    github: repo.html_url,
    demo,
    featured,
    type: repo.archived ? "Archived Repository" : "GitHub Repository",
  };
}

function scoreRepo(repo: GitHubRepo) {
  const daysSinceUpdate =
    (Date.now() - new Date(repo.pushed_at).getTime()) / (1000 * 60 * 60 * 24);

  return (
    repo.stargazers_count * 5 +
    repo.forks_count * 3 +
    Math.max(0, 90 - daysSinceUpdate)
  );
}

function mapReposToProjects(repos: GitHubRepo[]): Project[] {
  const owned = repos.filter((repo) => !repo.fork);

  const sortedByFreshness = [...owned]
    .sort(
      (a, b) =>
        new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime(),
    )
    .slice(0, projectSettings.reposToShow);

  const featuredIds = new Set(
    [...owned]
      .sort((a, b) => scoreRepo(b) - scoreRepo(a))
      .slice(0, projectSettings.featuredCount)
      .map((repo) => repo.id),
  );

  return sortedByFreshness.map((repo) =>
    mapRepoToProject(repo, featuredIds.has(repo.id)),
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const status = STATUS[project.status];
  const TypeIcon = TYPE_ICONS[project.type] ?? Box;

  return (
    <ScrollReveal delay={index * 0.07}>
      <div
        className={cn(
          "bg-[#0d0d0d] border rounded-xl transition-all duration-200",
          expanded
            ? "border-[#2a2a2a]"
            : "border-[#1e1e1e] hover:border-[#2a2a2a]",
        )}
      >
        <div className="p-5">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 bg-[#111] border border-[#2a2a2a] rounded-lg flex items-center justify-center flex-shrink-0">
                <TypeIcon size={13} className="text-neutral-500" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-neutral-100">
                  {project.title}
                </h3>
                <p className="font-mono text-[10px] text-neutral-600 mt-0.5">
                  {project.type}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <Badge variant={status.variant} size="sm">
                {status.label}
              </Badge>
              {project.featured && (
                <Badge variant="accent" size="sm">
                  featured
                </Badge>
              )}
            </div>
          </div>
          <p className="text-xs text-neutral-500 leading-relaxed">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1 mt-3">
            {project.tech.slice(0, 5).map((t) => (
              <Badge key={t} variant="default" size="sm">
                {t}
              </Badge>
            ))}
            {project.tech.length > 5 && (
              <Badge variant="ghost" size="sm">
                +{project.tech.length - 5}
              </Badge>
            )}
          </div>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full px-5 py-2.5 border-t border-[#1e1e1e] flex items-center justify-between text-xs text-neutral-600 hover:text-neutral-400 hover:bg-[#111] transition-all rounded-b-xl"
        >
          <span className="font-mono">
            {expanded ? "collapse" : "view details"}
          </span>
          <ChevronDown
            size={12}
            className={cn(
              "transition-transform duration-200",
              expanded && "rotate-180",
            )}
          />
        </button>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-5 pt-3 border-t border-[#161616]">
                <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                  {project.longDescription}
                </p>
                <div className="mb-4">
                  <p className="font-mono text-[10px] text-neutral-600 mb-2 uppercase tracking-wider">
                    Languages & Topics
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {project.tech.map((t) => (
                      <Badge key={t} variant="accent" size="sm">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-200 border border-[#2a2a2a] px-3 py-1.5 rounded-md transition-all"
                    >
                      <Github size={11} /> Source
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-200 border border-[#2a2a2a] px-3 py-1.5 rounded-md transition-all"
                    >
                      <ExternalLink size={11} /> Live
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ScrollReveal>
  );
}

export default function Projects() {
  const [githubProjects, setGithubProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadRepos() {
      try {
        const response = await fetch(
          `https://api.github.com/users/${profile.githubUsername}/repos?sort=updated&per_page=100&type=owner`,
          {
            headers: {
              Accept: "application/vnd.github+json",
            },
          },
        );

        if (!response.ok) {
          throw new Error(`GitHub API returned ${response.status}`);
        }

        const repos = (await response.json()) as GitHubRepo[];
        const mapped = mapReposToProjects(repos);

        if (!cancelled) {
          setGithubProjects(mapped);
          setLoadError(null);
        }
      } catch (error) {
        if (!cancelled) {
          setLoadError(
            error instanceof Error ? error.message : "unknown error",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadRepos();

    return () => {
      cancelled = true;
    };
  }, []);

  const visibleProjects = useMemo(
    () => (githubProjects.length > 0 ? githubProjects : projects),
    [githubProjects],
  );

  const featured = useMemo(
    () => visibleProjects.filter((p) => p.featured),
    [visibleProjects],
  );

  const rest = useMemo(
    () => visibleProjects.filter((p) => !p.featured),
    [visibleProjects],
  );

  return (
    <section id="projects" className="relative py-20 border-b border-[#161616]">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <SectionHeader
            index="03"
            title="Projects"
            comment={`@${profile.githubUsername} repositories`}
          />
        </ScrollReveal>

        {loading && (
          <p className="font-mono text-xs text-neutral-600 mb-5">
            Loading repositories from GitHub...
          </p>
        )}

        {loadError && (
          <div className="mb-5 bg-[#0d0d0d] border border-[#2a2a2a] rounded-lg px-4 py-3">
            <p className="font-mono text-xs text-neutral-500">
              Could not load GitHub repositories ({loadError}). Showing fallback
              data.
            </p>
          </div>
        )}

        {featured.length > 0 && (
          <div className="mb-6">
            <p className="font-mono text-[10px] text-neutral-600 uppercase tracking-wider mb-3">
              Featured
            </p>
            <div className="grid md:grid-cols-2 gap-3">
              {featured.map((p, i) => (
                <ProjectCard key={p.id} project={p} index={i} />
              ))}
            </div>
          </div>
        )}

        {rest.length > 0 && (
          <div>
            <p className="font-mono text-[10px] text-neutral-600 uppercase tracking-wider mb-3">
              Other
            </p>
            <div className="grid md:grid-cols-2 gap-3">
              {rest.map((p, i) => (
                <ProjectCard
                  key={p.id}
                  project={p}
                  index={featured.length + i}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
