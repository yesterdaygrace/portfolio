import { profile, socialLinks } from "@/data/profile";
import {
  Kicker,
  PinAnnotation,
  AccentRule,
} from "@/components/vellum/VellumComponents";

export default function Hero() {
  const facts = [
    { label: "Discipline", value: "Full-Stack & Backend Systems" },
    { label: "Specialization", value: "Legacy Modernization" },
    { label: "Location", value: "Salatiga, Central Java" },
    { label: "Availability", value: "Open to Opportunities" },
  ];

  return (
    <section
      id="hero"
      className="vellum-section min-h-[100dvh] flex flex-col justify-between pt-28 sm:pt-36 pb-20"
    >
      {/* Top chapter identifier */}
      <header
        className="flex items-baseline justify-between border-b pb-3 mb-12 sm:mb-16"
        style={{ borderColor: "var(--c-border)" }}
      >
        <span
          className="font-mono text-xs uppercase tracking-widest font-medium"
          style={{ color: "var(--c-accent)" }}
        >
          [01] · Curriculum Vitae
        </span>
        <span
          className="font-mono text-xs tracking-wider"
          style={{ color: "var(--c-fg-2)" }}
        >
          {profile.role}
        </span>
      </header>

      {/* Main Cover Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start my-auto">
        {/* Left / Primary Column (8 cols) */}
        <div className="lg:col-span-8 flex flex-col items-start">
          <Kicker>Software Engineer · Web &amp; Distributed Systems</Kicker>

          <h1
            className="font-display italic text-4xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] tracking-tight mb-8"
            style={{ color: "var(--c-fg)" }}
          >
            Kevin Van Diesel<br />
            Chansa.
          </h1>

          <p
            className="font-sans text-base sm:text-xl leading-relaxed max-w-2xl mb-8"
            style={{ color: "var(--c-fg-2)" }}
          >
            Building <em>practical software</em> that replaces legacy
            workarounds, scales business workflows, and ships reliably to production.
          </p>

          <AccentRule />

          {/* Fact bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full py-5 mb-8 border-y border-[rgba(232,216,92,0.18)]">
            {facts.map((f) => (
              <div key={f.label} className="flex flex-col">
                <span
                  className="font-mono text-xs uppercase tracking-wider mb-1"
                  style={{ color: "var(--c-accent)" }}
                >
                  {f.label}
                </span>
                <span
                  className="font-sans text-xs sm:text-sm font-medium"
                  style={{ color: "var(--c-fg)" }}
                >
                  {f.value}
                </span>
              </div>
            ))}
          </div>

          {/* Direct actions */}
          <div className="flex flex-wrap gap-3 items-center">
            <a href="#experience" className="vellum-btn-solid">
              View Experience ↓
            </a>
            <a
              href="#systems"
              className="vellum-btn"
              style={{ borderColor: "rgba(232,216,92,0.35)" }}
            >
              Case Study: Pension Migration ↓
            </a>
            <a
              href={`${import.meta.env.BASE_URL}cv-kevin-chansa.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="vellum-btn-accent"
            >
              Download CV (PDF) ↗
            </a>
          </div>
        </div>

        {/* Right Column: Framed Archival Portrait (4 cols) */}
        <div className="lg:col-span-4 flex flex-col items-center lg:items-end w-full">
          <figure className="w-full max-w-[280px] sm:max-w-[320px] p-2 bg-[var(--c-bg-deep)] border border-[var(--c-border)]">
            <div className="aspect-[4/5] overflow-hidden bg-[var(--c-bg-mid)]">
              <img
                src={`${import.meta.env.BASE_URL}portrait.jpeg`}
                alt="Kevin Van Diesel Chansa"
                className="w-full h-full object-cover sepia-[0.15] contrast-105 brightness-95 hover:sepia-0 transition-all duration-300"
                loading="eager"
              />
            </div>
            <figcaption className="mt-2.5 px-1 py-1 flex items-center justify-between font-mono text-[11px]" style={{ color: "var(--c-accent)" }}>
              <span>FIGURE 01</span>
              <span>SALATIGA · ID</span>
            </figcaption>
          </figure>
        </div>
      </div>

      {/* Bottom bar with pin annotation */}
      <footer className="pt-12 mt-12 border-t border-[var(--c-border)] flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <PinAnnotation
          counter="FOLIO / 2026"
          note="Fullstack Web Developer · Laravel · PHP · MySQL · Vue · TypeScript · Linux"
          secondaryNote="Available for engineering roles & technical consulting"
        />

        <div className="flex items-center gap-4 font-mono text-xs" style={{ color: "var(--c-accent)" }}>
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
            style={{ color: "var(--c-fg-2)" }}
          >
            GitHub ↗
          </a>
          <span>·</span>
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
            style={{ color: "var(--c-fg-2)" }}
          >
            LinkedIn ↗
          </a>
          <span>·</span>
          <a
            href={`mailto:${profile.email}`}
            className="hover:underline"
            style={{ color: "var(--c-fg-2)" }}
          >
            Email ↗
          </a>
        </div>
      </footer>
    </section>
  );
}
