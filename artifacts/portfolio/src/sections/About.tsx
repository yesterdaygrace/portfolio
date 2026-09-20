import { profile } from "@/data/profile";
import {
  ChapterHeader,
  Kicker,
  AccentRule,
  PinAnnotation,
  QuoteMark,
} from "@/components/vellum/VellumComponents";

export default function About() {
  const dossier = [
    {
      num: "01",
      label: "Professional Focus",
      value: "Full-Stack & Backend Systems",
      detail: "Backend architecture, transactional databases, and resilient APIs",
    },
    {
      num: "02",
      label: "Academic Foundation",
      value: "Universitas Kristen Satya Wacana (UKSW)",
      detail: "Bachelor of Computer Science / Informatics Engineering",
    },
    {
      num: "03",
      label: "Primary Practice",
      value: "Financial Systems & Ledger Platforms",
      detail: "General Ledger, multi-module reconciliation & audit integrity",
    },
    {
      num: "04",
      label: "Operating Base",
      value: profile.location,
      detail: "Available for remote contracts, hybrid teams, and full-time roles",
    },
    {
      num: "05",
      label: "Availability",
      value: profile.availability,
      detail: "Immediate start for product teams and high-impact engineering",
    },
  ];

  return (
    <section id="about" className="vellum-section">
      <ChapterHeader
        number="02"
        title="Positioning &amp; Background"
        category="Profile Dossier"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-16">
        {/* Left Column: Thesis & Background (7 cols) */}
        <div className="lg:col-span-7">
          <Kicker>Engineering Philosophy</Kicker>
          <h2
            className="font-display italic text-3xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight mb-8"
            style={{ color: "var(--c-fg)" }}
          >
            Engineering for durability over <em>transient trends</em>.
          </h2>

          <div className="space-y-6 font-sans text-base sm:text-lg leading-relaxed" style={{ color: "var(--c-fg-2)" }}>
            <p>
              I am an Informatics Engineering graduate from Universitas Kristen
              Satya Wacana with over a year and five months of hands-on
              production experience owning backend business logic, database
              schemas, and web platform architecture.
            </p>
            <p>
              My primary field work centers on replacing brittle legacy workflows
              with auditable software systems. At Dana Pensiun Sekolah Kristen,
              I single-handedly replaced a decade-old DOS financial
              administration tool with an auditable multi-user platform,
              handling general ledger, journal processing, bank reconciliations,
              and executive reporting.
            </p>
            <p>
              Whether structuring PostgreSQL and MySQL schemas for complex audit
              trails, configuring Nginx reverse proxies with SSL/TLS on Debian,
              or architecting recruiting CRMs with Laravel and Vue 3, my focus is
              predictable reliability and maintainable simplicity.
            </p>
          </div>

          {/* Editorial quote block */}
          <div className="mt-10 pt-6 border-t border-[rgba(232,216,92,0.16)]">
            <QuoteMark className="mb-3" />
            <blockquote
              className="font-display italic text-xl sm:text-2xl leading-snug mb-3 max-w-xl"
              style={{ color: "var(--c-fg)" }}
            >
              "Software credibility comes from what runs reliably in
              production — not what merely renders."
            </blockquote>
            <span
              className="font-mono text-xs uppercase tracking-widest"
              style={{ color: "var(--c-accent)" }}
            >
              — Engineering Operating Standard
            </span>
          </div>
        </div>

        {/* Right Column: Numbered Dossier (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          <div className="bg-[var(--c-bg-deep)] border border-[var(--c-border)] p-6 sm:p-8">
            <div
              className="font-mono text-xs uppercase tracking-widest pb-4 mb-6 border-b border-[var(--c-border)] flex items-center justify-between"
              style={{ color: "var(--c-emphasis)" }}
            >
              <span>Dossier Overview</span>
              <span style={{ color: "var(--c-accent)" }}>[CV-REF-2026]</span>
            </div>

            <div className="divide-y divide-[var(--c-border)]">
              {dossier.map((item) => (
                <div key={item.num} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs text-[var(--c-accent)]">
                      {item.num}.
                    </span>
                    <span
                      className="font-mono text-[11px] uppercase tracking-wider"
                      style={{ color: "var(--c-accent)" }}
                    >
                      {item.label}
                    </span>
                  </div>
                  <div
                    className="font-sans text-sm sm:text-base font-medium mb-0.5"
                    style={{ color: "var(--c-fg)" }}
                  >
                    {item.value}
                  </div>
                  <div
                    className="font-sans text-xs leading-relaxed"
                    style={{ color: "var(--c-fg-2)" }}
                  >
                    {item.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[var(--c-bg-mid)] border border-[var(--c-border)] p-5">
            <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--c-emphasis)] block mb-1 font-semibold">
              Primary Focus Area
            </span>
            <p className="font-sans text-xs text-[var(--c-fg-2)] leading-relaxed">
              Fullstack application architecture, transactional database normalization, and automated Linux server administration.
            </p>
          </div>
        </div>
      </div>

      <footer className="pt-6 border-t border-[var(--c-border)]">
        <PinAnnotation
          counter="CHAPTER 02"
          note="Informatics Engineering · Satya Wacana Christian University"
          secondaryNote="Focus: Full-Stack Architecture, Enterprise Accounting Platforms"
        />
      </footer>
    </section>
  );
}
