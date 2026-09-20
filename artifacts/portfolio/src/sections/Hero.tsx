import { useEffect, useRef } from "react";
import { profile, socialLinks } from "@/data/profile";
import {
  Kicker,
  PinAnnotation,
  AccentRule,
} from "@/components/vellum/VellumComponents";
import { gsap } from "@/lib/motion";

export default function Hero() {
  const facts = [
    { label: "Discipline", value: "Full-Stack & Backend Systems" },
    { label: "Specialization", value: "Legacy Modernization" },
    { label: "Location", value: "Salatiga, Central Java" },
    { label: "Availability", value: "Open to Opportunities" },
  ];

  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          defaults: { ease: "power2.out", clearProps: "all" },
        });
        tl.from(
          "[data-hero-header], [data-hero-kicker], [data-hero-title], [data-hero-lead], [data-hero-rule], [data-hero-facts], [data-hero-actions]",
          {
            autoAlpha: 0,
            y: 8,
            duration: 0.24,
            stagger: 0.02,
          },
        ).from(
          "[data-hero-portrait], [data-hero-footer]",
          {
            autoAlpha: 0,
            duration: 0.22,
          },
          "-=0.15",
        );
      }, heroRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="vellum-section min-h-[100dvh] flex flex-col justify-between pt-28 sm:pt-36 pb-20"
    >
      {/* Top chapter identifier */}
      <header
        data-hero-header
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
          <div data-hero-kicker>
            <Kicker>Software Engineer · Web &amp; Distributed Systems</Kicker>
          </div>

          <h1
            data-hero-title
            className="font-display italic text-4xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] tracking-tight mb-8"
            style={{ color: "var(--c-fg)" }}
          >
            Kevin Van Diesel<br />
            Chansa.
          </h1>

          <p
            data-hero-lead
            className="font-sans text-base sm:text-xl leading-relaxed max-w-2xl mb-8"
            style={{ color: "var(--c-fg-2)" }}
          >
            Building <em>practical software</em> that replaces legacy
            workarounds, scales business workflows, and ships reliably to production.
          </p>

          <div data-hero-rule>
            <AccentRule />
          </div>

          {/* Fact bar */}
          <div
            data-hero-facts
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full py-5 mb-8 border-y border-[rgba(232,216,92,0.18)]"
          >
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
          <div data-hero-actions className="flex flex-wrap gap-4 items-center">
            <a href="#experience" className="vellum-btn-solid">
              Explore Work &amp; Systems ↓
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
        <div data-hero-portrait className="lg:col-span-4 flex flex-col items-center lg:items-end w-full">
          <figure className="w-full max-w-[280px] sm:max-w-[320px] p-2 bg-[var(--c-bg-deep)] border border-[var(--c-border)]">
            <div className="aspect-[4/5] overflow-hidden bg-[var(--c-bg-mid)]">
              <picture>
                <source
                  srcSet={`${import.meta.env.BASE_URL}portrait.webp`}
                  type="image/webp"
                />
                <img
                  src={`${import.meta.env.BASE_URL}portrait.jpeg`}
                  alt="Portrait of Kevin Van Diesel Chansa, Software Engineer"
                  width={864}
                  height={1184}
                  fetchPriority="high"
                  decoding="async"
                  loading="eager"
                  className="w-full h-full object-cover grayscale contrast-[1.08] brightness-95 sepia-[0.20] hover:grayscale-0 hover:sepia-0 transition-all duration-500"
                />
              </picture>
            </div>
            <figcaption className="mt-2.5 px-1 py-1 flex items-center justify-between font-mono text-[11px]" style={{ color: "var(--c-accent)" }}>
              <span>FIGURE 01</span>
              <span>SALATIGA · ID</span>
            </figcaption>
          </figure>
        </div>
      </div>

      {/* Bottom bar with pin annotation */}
      <footer data-hero-footer className="pt-12 mt-12 border-t border-[var(--c-border)] flex flex-col sm:flex-row sm:items-end justify-between gap-6">
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
