import { useEffect, useMemo, useState } from "react";
import { Star, GitFork, Clock3, ExternalLink, Github } from "lucide-react";
import { profile } from "@/data/profile";

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
  topics: string[];
}

function formatDate(d: string) {
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(d));
}

export default function Projects() {
  const [repos,   setRepos]   = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(
          `https://api.github.com/users/${profile.githubUsername}/repos?sort=updated&per_page=100&type=owner`,
          { headers: { Accept: "application/vnd.github+json" } }
        );
        if (!res.ok) throw new Error(`GitHub ${res.status}`);
        const data: GitHubRepo[] = await res.json();
        if (!cancelled) setRepos(data.filter(r => !r.fork));
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "unknown error");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const sorted = useMemo(
    () => [...repos].sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()),
    [repos]
  );

  return (
    <section
      id="projects"
      className="py-24 px-6 md:px-12 lg:px-20"
      style={{ maxWidth: '90rem', margin: '0 auto', width: '100%' }}
    >
      {/* Section label */}
      <div className="reveal-item mb-4">
        <span className="eyebrow">[ 04 ] — Projects</span>
      </div>

      {/* Repo count */}
      <div className="reveal-item mb-14 flex items-end justify-between gap-4 flex-wrap">
        <h2
          className="display-heading"
          style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', color: '#efefef' }}
        >
          GitHub Repositories
        </h2>
        {!loading && (
          <span className="eyebrow" style={{ color: '#2a2a2a', paddingBottom: '0.5rem' }}>
            {sorted.length} repos
          </span>
        )}
      </div>

      {/* Error state */}
      {error && (
        <div className="reveal-item mb-8" style={{ border: '1px solid #1e1e1e', borderRadius: '0.75rem', padding: '1rem 1.25rem' }}>
          <p className="font-mono" style={{ fontSize: '0.75rem', color: '#ef4444' }}>Failed to load: {error}</p>
        </div>
      )}

      {/* Loading skeleton */}
      {loading && (
        <div className="space-y-0">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              style={{ borderTop: '1px solid #111', padding: '1.75rem 0' }}
            >
              <div style={{ height: '2rem', width: `${30 + (i % 3) * 15}%`, background: '#0e0e0e', borderRadius: '0.25rem', marginBottom: '0.6rem' }} />
              <div style={{ height: '0.75rem', width: '55%', background: '#0a0a0a', borderRadius: '0.25rem' }} />
            </div>
          ))}
        </div>
      )}

      {/* Repo list */}
      {!loading && (
        <div className="space-y-0">
          {/* ── DevScout (pinned first) ────────────────────────────────────── */}
          <a
            href="https://dev-scout-lac.vercel.app"
            target="_blank"
            rel="noreferrer"
            className="block group"
            style={{ borderTop: '1px solid #111', padding: '1.75rem 0', textDecoration: 'none' }}
          >
            <div className="grid md:grid-cols-[auto_1fr_auto] gap-4 md:gap-8 items-start">
              <span
                className="display-heading hidden md:block"
                style={{ fontSize: '1rem', color: '#181818', minWidth: '2rem', paddingTop: '0.4rem' }}
              >
                ★
              </span>

              <div>
                <div className="rounded-lg overflow-hidden border border-[#161616] group-hover:border-[#2a2a2a] transition-all mb-3">
                  <img
                    src="/devscout.png"
                    alt="DevScout Preview"
                    className="w-full h-auto hidden dark:block"
                  />
                </div>
                <p
                  className="display-heading transition-colors"
                  style={{ fontSize: 'clamp(1.4rem, 2.8vw, 2rem)', color: '#2a2a2a' }}
                  onMouseOver={e => ((e.currentTarget as HTMLElement).style.color = '#efefef')}
                  onMouseOut={e => ((e.currentTarget as HTMLElement).style.color = '#2a2a2a')}
                >
                  DevScout
                </p>
                <p
                  className="leading-relaxed mt-1"
                  style={{ color: '#3d3d3d', fontSize: '0.8125rem', maxWidth: '44rem' }}
                >
                  Developer profile & portfolio discovery platform — browse curated GitHub repositories with live previews.
                </p>
              </div>

              <div
                className="flex md:flex-col items-center md:items-end gap-3 md:gap-1.5 font-mono flex-wrap"
                style={{ fontSize: '0.625rem', color: '#222', flexShrink: 0, paddingTop: '0.3rem' }}
              >
                <span style={{ color: '#333' }}>Live</span>
                <ExternalLink size={14} style={{ color: '#444' }} />
              </div>
            </div>
          </a>

          {sorted.map((repo, i) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              className="block group"
              style={{ borderTop: '1px solid #111', padding: '1.75rem 0', textDecoration: 'none' }}
            >
              <div className="grid md:grid-cols-[auto_1fr_auto] gap-4 md:gap-8 items-start">

                {/* Serial */}
                <span
                  className="display-heading hidden md:block"
                  style={{ fontSize: '1rem', color: '#181818', minWidth: '2rem', paddingTop: '0.4rem' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Content */}
                <div>
                  <p
                    className="display-heading mb-1.5 transition-colors"
                    style={{ fontSize: 'clamp(1.4rem, 2.8vw, 2rem)', color: '#2a2a2a' }}
                    onMouseOver={e => ((e.currentTarget as HTMLElement).style.color = '#efefef')}
                    onMouseOut={e => ((e.currentTarget as HTMLElement).style.color = '#2a2a2a')}
                  >
                    {repo.name}
                  </p>
                  <p
                    className="leading-relaxed mb-3"
                    style={{ color: '#3d3d3d', fontSize: '0.8125rem', maxWidth: '44rem' }}
                  >
                    {repo.description ?? 'No description provided.'}
                  </p>

                  {/* Topics */}
                  {repo.topics?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {repo.topics.slice(0, 6).map(t => (
                        <span
                          key={t}
                          className="font-sans"
                          style={{
                            fontSize: '0.563rem', textTransform: 'uppercase', letterSpacing: '0.1em',
                            color: '#282828', border: '1px solid #161616',
                            padding: '0.15rem 0.55rem', borderRadius: '999px',
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Meta */}
                <div
                  className="flex md:flex-col items-center md:items-end gap-3 md:gap-1.5 font-mono flex-wrap"
                  style={{ fontSize: '0.625rem', color: '#222', flexShrink: 0, paddingTop: '0.3rem' }}
                >
                  {repo.language && (
                    <span style={{ color: '#333' }}>{repo.language}</span>
                  )}
                  <span className="flex items-center gap-1">
                    <Star size={10} />{repo.stargazers_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork size={10} />{repo.forks_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock3 size={10} />{formatDate(repo.pushed_at)}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
