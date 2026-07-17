"use client";

import { useEffect, useMemo, useState } from "react";
import { Star, GitFork, Users, ExternalLink, Clock3, Github } from "lucide-react";
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

function formatCompact(n: number) {
  return new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(n);
}
function formatDate(d: string) {
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(d));
}

export default function GitHubActivity() {
  const [user,      setUser]      = useState<GitHubUser | null>(null);
  const [repos,     setRepos]     = useState<GitHubRepo[]>([]);
  const [loading,   setLoading]   = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [ur, rr] = await Promise.all([
          fetch(`https://api.github.com/users/${profile.githubUsername}`, { headers: { Accept: "application/vnd.github+json" } }),
          fetch(`https://api.github.com/users/${profile.githubUsername}/repos?sort=updated&per_page=100&type=owner`, { headers: { Accept: "application/vnd.github+json" } }),
        ]);
        if (!ur.ok || !rr.ok) throw new Error(`GitHub ${ur.status}/${rr.status}`);
        const [u, r] = await Promise.all([ur.json(), rr.json()]) as [GitHubUser, GitHubRepo[]];
        if (!cancelled) { setUser(u); setRepos(r.filter(x => !x.fork)); }
      } catch (e) {
        if (!cancelled) setLoadError(e instanceof Error ? e.message : "unknown error");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const totals = useMemo(() => ({
    repos:     user?.public_repos ?? repos.length,
    followers: user?.followers ?? 0,
    stars:     repos.reduce((s, r) => s + r.stargazers_count, 0),
    forks:     repos.reduce((s, r) => s + r.forks_count, 0),
  }), [repos, user]);

  const allRepos = useMemo(
    () => [...repos].sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()),
    [repos]
  );

  const topLanguages = useMemo(() => {
    const m = new Map<string, number>();
    repos.forEach(r => r.language && m.set(r.language, (m.get(r.language) ?? 0) + 1));
    return Array.from(m.entries()).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([n, c]) => ({ name: n, count: c }));
  }, [repos]);

  const statItems = [
    { label: "Public Repos", value: totals.repos },
    { label: "Followers",    value: totals.followers },
    { label: "Total Stars",  value: totals.stars },
    { label: "Total Forks",  value: totals.forks },
  ];

  return (
    <section
      id="github-activity"
      className="py-24 px-6 md:px-12 lg:px-20"
      style={{ maxWidth: '90rem', margin: '0 auto', width: '100%' }}
    >
      {/* Section label */}
      <div className="reveal-item mb-16">
        <span className="eyebrow">[ 05 ] — GitHub</span>
      </div>

      {loadError && (
        <div className="reveal-item mb-8" style={{ border: '1px solid #1e1e1e', borderRadius: '0.75rem', padding: '1rem 1.25rem' }}>
          <p className="font-mono" style={{ fontSize: '0.75rem', color: '#ef4444' }}>Failed to sync: {loadError}</p>
        </div>
      )}

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-0 reveal-item mb-16" style={{ borderTop: '1px solid #111' }}>
        {statItems.map(item => (
          <div key={item.label} className="py-8 pr-6" style={{ borderBottom: '1px solid #111' }}>
            <p
              className="display-heading mb-2"
              style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', color: '#efefef', lineHeight: 1 }}
            >
              {loading ? '—' : formatCompact(item.value)}
            </p>
            <span className="eyebrow">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Repos list */}
      <div className="space-y-0">
        {allRepos.length === 0 && !loading && (
          <p className="eyebrow">No repositories found.</p>
        )}
        {allRepos.map(repo => (
          <a
            key={repo.id}
            href={repo.html_url}
            target="_blank" rel="noreferrer"
            className="block group"
            style={{ borderTop: '1px solid #111', padding: '1.5rem 0', textDecoration: 'none' }}
          >
            <div className="grid md:grid-cols-[1fr_auto] gap-4 items-start">
              <div>
                <p
                  className="display-heading mb-1.5 transition-colors"
                  style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)', color: '#2a2a2a' }}
                  onMouseOver={e => ((e.currentTarget as HTMLElement).style.color = '#efefef')}
                  onMouseOut={e => ((e.currentTarget as HTMLElement).style.color = '#2a2a2a')}
                >
                  {repo.name}
                </p>
                <p style={{ color: '#3a3a3a', fontSize: '0.8125rem' }} className="leading-relaxed">
                  {repo.description ?? 'No description.'}
                </p>
              </div>
              <div
                className="flex items-center gap-4 font-mono"
                style={{ fontSize: '0.688rem', color: '#2a2a2a', flexShrink: 0 }}
              >
                {repo.language && <span style={{ color: '#404040' }}>{repo.language}</span>}
                <span className="flex items-center gap-1"><Star size={11} />{repo.stargazers_count}</span>
                <span className="flex items-center gap-1"><GitFork size={11} />{repo.forks_count}</span>
                <span className="flex items-center gap-1"><Clock3 size={11} />{formatDate(repo.pushed_at)}</span>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Language distribution */}
      {topLanguages.length > 0 && (
        <div className="reveal-item mt-16 pt-8" style={{ borderTop: '1px solid #111' }}>
          <span className="eyebrow block mb-5">Language Distribution</span>
          <div className="flex flex-wrap gap-2">
            {topLanguages.map(l => (
              <span
                key={l.name}
                className="font-mono"
                style={{
                  fontSize: '0.688rem', color: '#404040',
                  border: '1px solid #161616', padding: '0.25rem 0.75rem',
                  borderRadius: '999px',
                }}
              >
                {l.name}&nbsp;<span style={{ color: '#818cf8' }}>{l.count}</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
