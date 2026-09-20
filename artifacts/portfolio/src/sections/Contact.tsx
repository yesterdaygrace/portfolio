import { useRef } from "react";
import { useSectionReveal } from "@/lib/useSectionReveal";
import { profile, socialLinks } from "@/data/profile";
import {
  ChapterHeader,
  Kicker,
  PinAnnotation,
  AccentRule,
} from "@/components/vellum/VellumComponents";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  useSectionReveal(sectionRef);
  const currentYear = new Date().getFullYear();

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="vellum-section min-h-[90vh] flex flex-col justify-between"
    >
      <div>
        <ChapterHeader
          number="07"
          title="Colophon &amp; Inquiries"
          category="Direct Communication"
        />

        <div className="max-w-4xl mb-12">
          <Kicker>Closing Chapter · Connect</Kicker>
          <h2
            className="font-display italic text-4xl sm:text-6xl lg:text-7xl leading-[0.95] mb-6"
            style={{ color: "var(--c-fg)" }}
          >
            Let’s build something <em>durable</em>.
          </h2>

          <p
            className="font-sans text-base sm:text-xl leading-relaxed max-w-2xl mb-8"
            style={{ color: "var(--c-fg-2)" }}
          >
            I am currently {profile.availability.toLowerCase()}. Open to full-stack
            engineering roles, contract system migrations, and high-reliability
            backend development.
          </p>

          <AccentRule />

          {/* Primary Correspondence Row */}
          <div className="mb-6">
            <span className="font-mono text-[11px] text-[var(--c-accent)] uppercase tracking-wider block mb-2">
              Primary Inquiries &amp; Hiring:
            </span>
            <div className="inline-flex items-center gap-2 bg-[var(--c-bg-deep)] px-3 py-1.5 border border-[var(--c-border)]">
              <span className="font-mono text-xs sm:text-sm select-all text-[var(--c-emphasis)]">
                {profile.email}
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3 items-center mb-16">
            <a
              href={`mailto:${profile.email}`}
              className="vellum-btn-solid"
            >
              Send an Email ↗
            </a>
            <a
              href={`${import.meta.env.BASE_URL}cv-kevin-chansa.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="vellum-btn-accent"
            >
              Download CV (PDF) ↗
            </a>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="vellum-btn"
            >
              LinkedIn Profile ↗
            </a>
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="vellum-btn"
            >
              GitHub Profile ↗
            </a>
          </div>
        </div>

        {/* Archival Colophon Box */}
        <div className="border border-[var(--c-border)] bg-[var(--c-bg-deep)] p-6 sm:p-8 mb-12">
          <span
            className="font-mono text-xs uppercase tracking-widest block mb-3 font-medium"
            style={{ color: "var(--c-emphasis)" }}
          >
            Colophon &amp; Design Architecture
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-sans text-xs leading-relaxed" style={{ color: "var(--c-fg-2)" }}>
            <div>
              <span className="font-mono text-[11px] block text-[var(--c-accent)] mb-1 uppercase">
                Typography
              </span>
              <p>
                Set in Cormorant Garamond (italic display), DM Sans (humanist
                body), and Courier Prime (monospaced annotations &amp; ledger
                counters).
              </p>
            </div>
            <div>
              <span className="font-mono text-[11px] block text-[var(--c-accent)] mb-1 uppercase">
                Palette
              </span>
              <p>
                Vellum #2A3870 periwinkle field, #E8D85C chartreuse-yellow
                type, and #3A7878 dusty teal annotation voice. Zero gradients or
                decorative shadows.
              </p>
            </div>
            <div>
              <span className="font-mono text-[11px] block text-[var(--c-accent)] mb-1 uppercase">
                Infrastructure
              </span>
              <p>
                Static Vite build deployed to GitHub Pages via automated
                GitHub Actions pipeline with strict supply-chain dependency pins.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer bar */}
      <footer className="pt-8 border-t border-[var(--c-border)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs text-[var(--c-accent)]">
        <PinAnnotation
          counter={`ARCHIVE / ${currentYear}`}
          note={`${profile.name} — Salatiga, Central Java, Indonesia`}
          secondaryNote="All engineering milestones and performance metrics verified"
        />

        <div className="flex items-center gap-4">
          <a
            href="#hero"
            className="hover:underline"
            style={{ color: "var(--c-fg-2)" }}
          >
            Return to Top ↑
          </a>
          <span>·</span>
          <span style={{ color: "var(--c-fg-2)" }}>
            &copy; {currentYear} {profile.name}
          </span>
        </div>
      </footer>
    </section>
  );
}
