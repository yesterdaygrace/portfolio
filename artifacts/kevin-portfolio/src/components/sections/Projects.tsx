import { projects } from "@/data/projects";
import { ExternalLink, Github } from "lucide-react";

export default function Projects() {
  return (
    <section
      id="projects"
      className="py-24 px-6 md:px-12 lg:px-20"
      style={{ maxWidth: '90rem', margin: '0 auto', width: '100%' }}
    >
      {/* Section label */}
      <div className="reveal-item mb-16">
        <span className="eyebrow">[ 04 ] — Projects</span>
      </div>

      <div className="space-y-0">
        {projects.map((project, i) => (
          <div
            key={project.id}
            className="reveal-item group"
            style={{ borderTop: '1px solid #111', paddingTop: '2rem', paddingBottom: '2rem' }}
          >
            <div className="grid md:grid-cols-[auto_1fr_auto] gap-6 md:gap-10 items-start">
              {/* Serial number */}
              <span
                className="display-heading hidden md:block"
                style={{ fontSize: '1.125rem', color: '#1e1e1e', minWidth: '2.5rem' }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Main content */}
              <div>
                <h3
                  className="display-heading mb-3 transition-colors"
                  style={{
                    fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)',
                    color: '#efefef',
                  }}
                >
                  {project.title}
                </h3>
                <p
                  className="leading-relaxed mb-5"
                  style={{ color: '#505050', fontSize: '0.875rem', maxWidth: '42rem' }}
                >
                  {project.longDescription || project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map(t => (
                    <span
                      key={t}
                      className="font-sans"
                      style={{
                        fontSize: '0.625rem', textTransform: 'uppercase',
                        letterSpacing: '0.1em', color: '#2e2e2e',
                        border: '1px solid #161616', padding: '0.2rem 0.65rem',
                        borderRadius: '999px',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="flex gap-4 items-center pt-1">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank" rel="noreferrer"
                    className="transition-colors"
                    style={{ color: '#2a2a2a' }}
                    onMouseOver={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#818cf8')}
                    onMouseOut={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#2a2a2a')}
                    aria-label="GitHub"
                  >
                    <Github size={17} />
                  </a>
                )}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank" rel="noreferrer"
                    className="transition-colors"
                    style={{ color: '#2a2a2a' }}
                    onMouseOver={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#818cf8')}
                    onMouseOut={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#2a2a2a')}
                    aria-label="Live"
                  >
                    <ExternalLink size={17} />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
