import { profile, socialLinks } from "@/data/profile";

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
      <div className="reveal-item mt-16 inline-flex items-center gap-3">
        <span
          className="block animate-pulse"
          style={{ width: '1px', height: '2.5rem', background: '#1e1e1e' }}
        />
        <span className="eyebrow">Explore my work</span>
      </div>
    </section>
  );
}
