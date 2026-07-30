import { profile, socialLinks } from "@/data/profile";

export default function Contact() {
  return (
    <section
      id="contact"
      className="min-h-[100dvh] flex flex-col justify-center py-24 px-6 md:px-12 lg:px-20"
      style={{ maxWidth: '90rem', margin: '0 auto', width: '100%' }}
    >
      {/* Section label */}
      <span
          className="font-sans text-[11px] uppercase tracking-[0.16em] block mb-4"
          style={{ color: "#606060" }}
        >
          [05] - Contact
        </span>


      {/* Big serif CTA */}
      <h2
        className="display-heading reveal-item mb-8"
        style={{ fontSize: 'clamp(4rem, 9vw, 9rem)', color: '#efefef' }}
      >
        Let's connect.
      </h2>

      <p
        className="reveal-item leading-relaxed mb-12"
        style={{ color: '#505050', fontSize: 'clamp(1rem, 1.8vw, 1.2rem)', maxWidth: '32rem' }}
      >
        I'm currently {profile.availability.toLowerCase()}. Have a project in mind, a collaboration,
        or just want to say hello? My inbox is open.
      </p>

      {/* CTAs */}
      <div className="reveal-item flex flex-wrap gap-4 mb-24">
        <a href={`mailto:${profile.email}`} className="pill-solid">
          Send an email ↗
        </a>
        <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className="pill-ghost">
          LinkedIn ↗
        </a>
        <a href={socialLinks.github} target="_blank" rel="noreferrer" className="pill-ghost">
          GitHub ↗
        </a>
      </div>

      {/* Footer bar */}
      <div
        className="reveal-item pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        style={{ borderTop: '1px solid #111' }}
      >
        <p className="eyebrow">
          &copy; {new Date().getFullYear()} {profile.name}. Designed &amp; built by hand.
        </p>
        <div className="flex items-center gap-6">
          {Object.entries(socialLinks).map(([name, url]) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noreferrer"
              className="eyebrow capitalize transition-colors"
              style={{ textDecoration: 'none' }}
              onMouseOver={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#efefef')}
              onMouseOut={e => ((e.currentTarget as HTMLAnchorElement).style.color = '')}
            >
              {name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
