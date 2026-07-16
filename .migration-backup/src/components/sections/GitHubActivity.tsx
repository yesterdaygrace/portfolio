"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Github,
  Star,
  GitFork,
  Users,
  ExternalLink,
  Clock3,
} from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeader from "@/components/ui/SectionHeader";
import { profile, socialLinks } from "@/data/profile";

interface GitHubUser {
  avatar_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
}

interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
  fork: boolean;
}

function formatCompact(value: number) {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export default function GitHubActivity() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadGitHubData() {
      try {
        const [userResponse, reposResponse] = await Promise.all([
          fetch(`https://api.github.com/users/${profile.githubUsername}`, {
            headers: { Accept: "application/vnd.github+json" },
          }),
          fetch(
            `https://api.github.com/users/${profile.githubUsername}/repos?sort=updated&per_page=100&type=owner`,
            {
              headers: { Accept: "application/vnd.github+json" },
            },
          ),
        ]);

        if (!userResponse.ok || !reposResponse.ok) {
          throw new Error(
            `GitHub API returned ${userResponse.status}/${reposResponse.status}`,
          );
        }

        const [userData, repoData] = (await Promise.all([
          userResponse.json(),
          reposResponse.json(),
        ])) as [GitHubUser, GitHubRepo[]];

        if (!cancelled) {
          setUser(userData);
          setRepos(repoData.filter((repo) => !repo.fork));
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

    loadGitHubData();

    return () => {
      cancelled = true;
    };
  }, []);

  const totals = useMemo(() => {
    const totalStars = repos.reduce(
      (sum, repo) => sum + repo.stargazers_count,
      0,
    );

    const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);

    return {
      repos: user?.public_repos ?? repos.length,
      followers: user?.followers ?? 0,
      stars: totalStars,
      forks: totalForks,
    };
  }, [repos, user]);

  const recentRepos = useMemo(
    () =>
      [...repos]
        .sort(
          (a, b) =>
            new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime(),
        )
        .slice(0, 6),
    [repos],
  );

  const topLanguages = useMemo(() => {
    const counts = new Map<string, number>();

    for (const repo of repos) {
      if (!repo.language) continue;
      counts.set(repo.language, (counts.get(repo.language) ?? 0) + 1);
    }

    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([name, count]) => ({ name, count }));
  }, [repos]);

  const statCards = [
    { icon: Github, label: "Public Repositories", value: totals.repos },
    { icon: Users, label: "Followers", value: totals.followers },
    { icon: Star, label: "Total Stars", value: totals.stars },
    { icon: GitFork, label: "Total Forks", value: totals.forks },
  ];

  return (
    <section
      id="github-activity"
      className="relative py-20 border-b border-[#161616]"
    >
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <SectionHeader
            index="05"
            title="GitHub Snapshot"
            comment={`@${profile.githubUsername}`}
          />
        </ScrollReveal>

        {loadError && (
          <div className="mb-5 bg-[#0d0d0d] border border-[#2a2a2a] rounded-lg px-4 py-3">
            <p className="font-mono text-xs text-neutral-500">
              Unable to load GitHub snapshot ({loadError}).
            </p>
          </div>
        )}

        <ScrollReveal delay={0.05}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {statCards.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="bg-[#0d0d0d] border border-[#1e1e1e] rounded-xl p-4 flex items-start gap-3"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#111] border border-[#2a2a2a] flex items-center justify-center flex-shrink-0">
                    <Icon size={13} className="text-neutral-500" />
                  </div>
                  <div>
                    <p className="font-mono text-base font-semibold text-neutral-100">
                      {loading ? "--" : formatCompact(item.value)}
                    </p>
                    <p className="text-xs text-neutral-600">{item.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-3 gap-3">
          <ScrollReveal delay={0.1}>
            <div className="lg:col-span-2 bg-[#0d0d0d] border border-[#1e1e1e] rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-neutral-500 font-mono">
                  recently updated repositories
                </span>
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-neutral-600 hover:text-neutral-300 inline-flex items-center gap-1"
                >
                  view all <ExternalLink size={11} />
                </a>
              </div>

              {recentRepos.length === 0 && !loading && (
                <p className="text-xs text-neutral-600">
                  No repositories found.
                </p>
              )}

              <div className="space-y-2">
                {recentRepos.map((repo) => (
                  <a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block border border-[#1e1e1e] hover:border-[#2a2a2a] rounded-lg px-3 py-3 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-sm text-neutral-200 font-medium truncate">
                          {repo.name}
                        </p>
                        <p className="text-xs text-neutral-600 mt-1 line-clamp-2">
                          {repo.description ?? "No description provided."}
                        </p>
                      </div>
                      <ExternalLink
                        size={12}
                        className="text-neutral-700 flex-shrink-0 mt-0.5"
                      />
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-3 font-mono text-[10px] text-neutral-600">
                      <span className="inline-flex items-center gap-1">
                        <Star size={10} /> {repo.stargazers_count}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <GitFork size={10} /> {repo.forks_count}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock3 size={10} /> {formatDate(repo.pushed_at)}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="space-y-3">
              <div className="bg-[#0d0d0d] border border-[#1e1e1e] rounded-xl p-5">
                <div className="flex items-center gap-3">
                  {user?.avatar_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={user.avatar_url}
                      alt={`${profile.githubUsername} avatar`}
                      className="w-10 h-10 rounded-full border border-[#2a2a2a]"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full border border-[#2a2a2a] bg-[#111] flex items-center justify-center">
                      <Github size={16} className="text-neutral-500" />
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-neutral-200 font-medium">
                      @{profile.githubUsername}
                    </p>
                    <p className="text-xs text-neutral-600">GitHub profile</p>
                  </div>
                </div>
                <p className="text-xs text-neutral-500 mt-3 leading-relaxed">
                  {user?.bio ??
                    "Open-source work, experiments, and project iterations live here."}
                </p>
              </div>

              <div className="bg-[#0d0d0d] border border-[#1e1e1e] rounded-xl p-5">
                <p className="text-xs text-neutral-500 font-mono mb-3">
                  top repository languages
                </p>
                {topLanguages.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {topLanguages.map((language) => (
                      <span
                        key={language.name}
                        className="inline-flex items-center gap-1 font-mono text-[10px] px-2 py-0.5 rounded-md border border-indigo-500/20 bg-indigo-500/10 text-indigo-300"
                      >
                        {language.name}
                        <span className="text-indigo-200/70">
                          {language.count}
                        </span>
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-neutral-600">
                    No language data yet.
                  </p>
                )}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
