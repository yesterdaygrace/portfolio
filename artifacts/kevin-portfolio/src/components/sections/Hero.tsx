import { profile, socialLinks } from "@/data/profile";

const scrollCueKeyframes = `
  @keyframes scrollCueBounce {
    0%, 100% { transform: translateY(0); opacity: 0.7; }
    50% { transform: translateY(6px); opacity: 1; }
  }
`;

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-[100dvh] flex flex-col justify-center pt-14 pb-16 px-6 md:px-12 lg:px-20"
      style={{ maxWidth: '90rem', margin: '0 auto', width: '100%' }}
    >
      {/* Eyebrow row */}
      <div className="flex flex-col gap-1.5 mb-10 reveal-item">
        <span className="eyebrow">{profile.location}</span>
        <span className="eyebrow" style={{ color: '#222' }}>
          Full-Stack Development &nbsp;·&nbsp; Software Engineering &nbsp;·&nbsp; Open Source
        </span>
      </div>

      {/* Name — display serif, two lines */}
      <h1
        className="display-heading reveal-item mb-10"
        style={{ fontSize: 'clamp(3.5rem, 8vw, 8rem)' }}
      >
        <span className="block" style={{ color: '#efefef' }}>Kevin Van Diesel</span>
        <span className="block" style={{ color: '#2a2a2a' }}>Chansa</span>
      </h1>

      {/* Subtitle */}
      <p
        className="reveal-item mb-10 leading-relaxed font-light"
        style={{ color: '#555', fontSize: 'clamp(1rem, 2vw, 1.2rem)', maxWidth: '32rem' }}
      >
        {profile.headline}. {profile.summary}
      </p>

      {/* Pill CTAs */}
      <div className="reveal-item flex flex-wrap gap-3">
        <a href="#projects" className="pill-solid">View Projects</a>
        <a href={`mailto:${profile.email}`} className="pill-accent">Get in Touch</a>
        <a href={socialLinks.github} target="_blank" rel="noreferrer" className="pill-ghost">
          GitHub ↗
        </a>
      </div>

      {/* Scroll cue */}
      <style dangerouslySetInnerHTML={{ __html: scrollCueKeyframes }} />
      <a
        href="#projects"
        className="reveal-item mt-16 inline-flex flex-col items-center gap-2 group"
        aria-label="Scroll to projects"
      >
        <span className="eyebrow text-fg-muted transition-colors group-hover:text-fg">
          Explore my work
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className="text-fg-muted group-hover:text-fg transition-colors"
          style={{ animation: 'scrollCueBounce 2s ease-in-out infinite' }}
          aria-hidden="true"
        >
          <path
            d="M3.5 6L8 10.5L12.5 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </section>
  );
}
