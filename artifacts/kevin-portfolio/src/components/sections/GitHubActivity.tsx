"use client";

import { useEffect, useMemo, useState } from "react";
import { Github, Star, GitFork, Users, ExternalLink, Clock3 } from "lucide-react";
import GSAPReveal from "@/components/ui/GSAPReveal";
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
  return new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(value);
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(date));
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
            { headers: { Accept: "application/vnd.github+json" } }
          ),
        ]);

        if (!userResponse.ok || !reposResponse.ok) {
          throw new Error(`GitHub API returned ${userResponse.status}/${reposResponse.status}`);
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
          setLoadError(error instanceof Error ? error.message : "unknown error");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }
    loadGitHubData();
    return () => { cancelled = true; };
  }, []);

  const totals = useMemo(() => {
    const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);
    return {
      repos: user?.public_repos ?? repos.length,
      followers: user?.followers ?? 0,
      stars: totalStars,
      forks: totalForks,
    };
  }, [repos, user]);

  const recentRepos = useMemo(
    () => [...repos].sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()).slice(0, 6),
    [repos]
  );

  const topLanguages = useMemo(() => {
    const counts = new Map<string, number>();
    for (const repo of repos) {
      if (!repo.language) continue;
      counts.set(repo.language, (counts.get(repo.language) ?? 0) + 1);
    }
    return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([name, count]) => ({ name, count }));
  }, [repos]);

  const statCards = [
    { icon: Github, label: "Public Repos", value: totals.repos },
    { icon: Users, label: "Followers", value: totals.followers },
    { icon: Star, label: "Total Stars", value: totals.stars },
    { icon: GitFork, label: "Total Forks", value: totals.forks },
  ];

  return (
    <section id="github-activity" className="py-24 border-b border-[#161616]">
      <div className="max-w-6xl mx-auto px-6">
        <GSAPReveal stagger={0.1}>
          <SectionHeader index="05" title="Git Telemetry" comment={`Live feed: @${profile.githubUsername}`} />

          {loadError && (
            <div className="reveal-item mb-6 bg-[#0a0a0a] border border-[#1e1e1e] rounded-lg px-4 py-3">
              <p className="font-mono text-xs text-red-400">Failed to sync: {loadError}</p>
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {statCards.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="reveal-item bg-black border border-[#1e1e1e] rounded-xl p-5 flex items-start gap-4">
                  <div className="w-8 h-8 rounded-md bg-[#0a0a0a] border border-[#1e1e1e] flex items-center justify-center flex-shrink-0">
                    <Icon size={14} className="text-indigo-400" />
                  </div>
                  <div>
                    <p className="font-mono text-xl font-bold text-neutral-100">
                      {loading ? "..." : formatCompact(item.value)}
                    </p>
                    <p className="text-xs text-neutral-500 mt-0.5">{item.label}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="reveal-item bg-black border border-[#1e1e1e] rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm text-neutral-300 font-medium">Recent Commits</span>
                  <a href={socialLinks.github} target="_blank" rel="noreferrer" className="text-xs font-mono text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-1 transition-colors">
                    view all <ExternalLink size={12} />
                  </a>
                </div>

                {recentRepos.length === 0 && !loading && (
                  <p className="text-sm text-neutral-600">No active repositories found.</p>
                )}

                <div className="space-y-3">
                  {recentRepos.map((repo) => (
                    <a key={repo.id} href={repo.html_url} target="_blank" rel="noreferrer" className="block border border-[#1e1e1e] bg-[#050505] hover:border-[#2a2a2a] rounded-lg p-4 transition-colors group">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <p className="text-sm text-neutral-200 font-medium truncate group-hover:text-indigo-400 transition-colors">
                            {repo.name}
                          </p>
                          <p className="text-xs text-neutral-500 mt-1 line-clamp-1">
                            {repo.description ?? "No description provided."}
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap items-center gap-4 font-mono text-[10px] text-neutral-500">
                        {repo.language && (
                          <span className="inline-flex items-center gap-1 text-indigo-300">
                            <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                            {repo.language}
                          </span>
                        )}
                        <span className="inline-flex items-center gap-1"><Star size={12} /> {repo.stargazers_count}</span>
                        <span className="inline-flex items-center gap-1"><GitFork size={12} /> {repo.forks_count}</span>
                        <span className="inline-flex items-center gap-1"><Clock3 size={12} /> {formatDate(repo.pushed_at)}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="reveal-item bg-black border border-[#1e1e1e] rounded-xl p-6">
                <div className="flex items-center gap-4">
                  {user?.avatar_url ? (
                    <img src={user.avatar_url} alt="avatar" className="w-12 h-12 rounded-full border border-[#2a2a2a]" />
                  ) : (
                    <div className="w-12 h-12 rounded-full border border-[#2a2a2a] bg-[#0a0a0a] flex items-center justify-center">
                      <Github size={20} className="text-neutral-500" />
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-neutral-100 font-medium">@{profile.githubUsername}</p>
                    <p className="text-xs font-mono text-neutral-500 mt-0.5">Active Engineer</p>
                  </div>
                </div>
                <p className="text-sm text-neutral-400 mt-4 leading-relaxed">
                  {user?.bio ?? "Open-source work, experiments, and project iterations live here."}
                </p>
              </div>

              <div className="reveal-item bg-black border border-[#1e1e1e] rounded-xl p-6">
                <p className="text-sm text-neutral-300 font-medium mb-4">Language Distribution</p>
                {topLanguages.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {topLanguages.map((lang) => (
                      <span key={lang.name} className="inline-flex items-center gap-1.5 font-mono text-xs px-2.5 py-1 rounded-md border border-[#1e1e1e] bg-[#050505] text-neutral-300">
                        {lang.name}
                        <span className="text-indigo-400">{lang.count}</span>
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-neutral-600">Collecting metrics...</p>
                )}
              </div>
            </div>
          </div>
        </GSAPReveal>
      </div>
    </section>
  );
}
