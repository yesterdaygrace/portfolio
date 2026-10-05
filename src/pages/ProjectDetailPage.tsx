import { useEffect } from "react";
import { ProjectCaseStudy, PROJECT_CASE_STUDIES } from "@/data/projectCaseStudies";
import { AccentRule } from "@/components/vellum/VellumComponents";

interface ProjectDetailPageProps {
  project: ProjectCaseStudy;
  onBack: () => void;
  onSelectProject: (id: string) => void;
}

export default function ProjectDetailPage({
  project,
  onBack,
  onSelectProject,
}: ProjectDetailPageProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    const originalTitle = document.title;
    document.title = `${project.title} | Kevin Chansa`;
    return () => {
      document.title = originalTitle;
    };
  }, [project]);

  const currentIndex = PROJECT_CASE_STUDIES.findIndex((p) => p.id === project.id);
  const prevProject =
    currentIndex > 0 ? PROJECT_CASE_STUDIES[currentIndex - 1] : null;
  const nextProject =
    currentIndex < PROJECT_CASE_STUDIES.length - 1
      ? PROJECT_CASE_STUDIES[currentIndex + 1]
      : null;

  return (
    <div className="min-h-screen bg-[var(--c-bg)] text-[var(--c-fg)] selection:bg-[var(--c-accent-deep)] selection:text-[var(--c-fg)]">
      {/* ── Top Navigation / Breadcrumbs ───────────────────────────────── */}
      <nav
        aria-label="Breadcrumb navigation"
        className="sticky top-0 z-40 w-full border-b border-[var(--c-border)] bg-[var(--c-bg-deep)]/90 backdrop-blur-md px-4 sm:px-8 py-3.5"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 sm:gap-3 text-xs font-mono">
            <button
              onClick={onBack}
              className="text-[var(--c-emphasis)] hover:underline flex items-center gap-1.5 focus-visible:outline-none"
            >
              <span aria-hidden="true">←</span>
              <span>Selected Work</span>
            </button>
            <span className="opacity-40">/</span>
            <span className="text-[var(--c-fg-3)] hidden sm:inline truncate max-w-[240px]">
              {project.figNumber} · {project.id.toUpperCase()}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono px-3 py-1.5 bg-[var(--c-emphasis)] text-[var(--c-bg-deep)] font-semibold hover:opacity-90 transition-opacity"
              >
                Launch Demo ↗
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono px-3 py-1.5 border border-[var(--c-border)] hover:border-[var(--c-emphasis)] text-[var(--c-fg)] transition-colors"
              >
                Repository ↗
              </a>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-10 sm:py-16 space-y-16 sm:space-y-24">
        {/* ── Chapter 01: Hero & Identity ──────────────────────────────── */}
        <header className="space-y-6">
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
            <span className="text-[var(--c-emphasis)] font-semibold tracking-wider">
              {project.badge}
            </span>
            <span className="opacity-30">·</span>
            <span className="text-[var(--c-accent)] uppercase tracking-wide">
              {project.type}
            </span>
            <span className="opacity-30">·</span>
            <span className="text-[var(--c-fg-3)]">{project.status}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.1] tracking-tight">
            {project.title}
          </h1>

          <p className="text-lg sm:text-xl text-[var(--c-fg-2)] max-w-3xl font-light leading-relaxed">
            {project.subtitle}
          </p>

          <AccentRule />

          {/* Metadata Block */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 border border-[var(--c-border)] bg-[var(--c-bg-deep)] font-mono text-xs">
            <div>
              <div className="text-[var(--c-accent)] mb-1 uppercase tracking-wider text-[11px]">
                Target Entity / Client
              </div>
              <div className="text-[var(--c-fg)] leading-snug">
                {project.client}
              </div>
            </div>

            <div>
              <div className="text-[var(--c-accent)] mb-1 uppercase tracking-wider text-[11px]">
                Engineering Role
              </div>
              <div className="text-[var(--c-fg)] leading-snug">
                {project.role}
              </div>
            </div>

            <div>
              <div className="text-[var(--c-accent)] mb-1 uppercase tracking-wider text-[11px]">
                Timeline & Scope
              </div>
              <div className="text-[var(--c-fg)] leading-snug">
                {project.year}
              </div>
            </div>

            <div>
              <div className="text-[var(--c-accent)] mb-1 uppercase tracking-wider text-[11px]">
                Primary Stack
              </div>
              <div className="text-[var(--c-fg)] leading-snug">
                {project.tech.slice(0, 4).join(", ")}
              </div>
            </div>
          </div>
        </header>

        {/* ── Chapter 02: High-Resolution Primary Interface ────────────── */}
        <section aria-labelledby="primary-figure-heading">
          <h2 id="primary-figure-heading" className="sr-only">
            Primary Interface Preview
          </h2>
          <figure className="border border-[var(--c-border)] bg-[var(--c-bg-deep)] p-2 sm:p-3">
            <div className="overflow-hidden bg-[var(--c-bg-mid)]">
              <picture>
                {project.thumbnailWebp && (
                  <source srcSet={project.thumbnailWebp} type="image/webp" />
                )}
                <img
                  src={project.thumbnail}
                  alt={`${project.title} interface console`}
                  width={project.imgWidth}
                  height={project.imgHeight}
                  className="w-full h-auto object-cover contrast-[1.02]"
                />
              </picture>
            </div>
            <figcaption className="mt-3 px-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 font-mono text-xs text-[var(--c-accent)]">
              <span>
                {project.figNumber} : {project.figCaption}
              </span>
              <span className="text-[var(--c-fg-3)]">
                VERIFIED OPERATIONAL INTERFACE
              </span>
            </figcaption>
          </figure>
        </section>

        {/* ── Chapter 03: Key Technical Metrics ────────────────────────── */}
        <section aria-labelledby="metrics-heading" className="space-y-6">
          <div className="font-mono text-xs uppercase tracking-widest text-[var(--c-accent)]">
            01 / Key Engineering Indicators
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {project.stats.map((stat) => (
              <div
                key={stat.label}
                className="border border-[var(--c-border)] bg-[var(--c-bg-deep)] p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-wider text-[var(--c-accent)] mb-2">
                    {stat.label}
                  </div>
                  <div className="font-serif text-2xl text-[var(--c-emphasis)] font-medium mb-2">
                    {stat.value}
                  </div>
                </div>
                <div className="text-xs text-[var(--c-fg-3)] leading-relaxed">
                  {stat.detail}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Chapter 04: Executive Summary & Problem Context ──────────── */}
        <section aria-labelledby="summary-heading" className="space-y-6">
          <div className="font-mono text-xs uppercase tracking-widest text-[var(--c-accent)]">
            02 / Problem Statement & Operational Solution
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <article className="border border-[var(--c-border)] bg-[var(--c-bg-deep)] p-6 space-y-3">
              <h3 className="font-mono text-xs uppercase tracking-wider text-[var(--c-emphasis)]">
                The Operational Bottleneck
              </h3>
              <p className="text-sm text-[var(--c-fg-2)] leading-relaxed">
                {project.executiveSummary.problem}
              </p>
            </article>

            <article className="border border-[var(--c-border)] bg-[var(--c-bg-deep)] p-6 space-y-3">
              <h3 className="font-mono text-xs uppercase tracking-wider text-[var(--c-emphasis)]">
                Engineered Solution
              </h3>
              <p className="text-sm text-[var(--c-fg-2)] leading-relaxed">
                {project.executiveSummary.solution}
              </p>
            </article>

            <article className="border border-[var(--c-border)] bg-[var(--c-bg-deep)] p-6 space-y-3">
              <h3 className="font-mono text-xs uppercase tracking-wider text-[var(--c-emphasis)]">
                Delivered Outcome
              </h3>
              <p className="text-sm text-[var(--c-fg-2)] leading-relaxed">
                {project.executiveSummary.outcome}
              </p>
            </article>
          </div>
        </section>

        {/* ── Chapter 05: System Architecture & Stack Decisions ───────── */}
        <section aria-labelledby="architecture-heading" className="space-y-6">
          <div className="font-mono text-xs uppercase tracking-widest text-[var(--c-accent)]">
            03 / System Architecture & Topology
          </div>

          <div className="border border-[var(--c-border)] bg-[var(--c-bg-deep)] p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="font-serif text-2xl text-[var(--c-fg)] mb-3">
                Request Flow & System Boundary
              </h3>
              <p className="text-sm sm:text-base text-[var(--c-fg-2)] leading-relaxed">
                {project.architecture.topology}
              </p>
            </div>

            <div className="border-t border-[var(--c-border)] pt-6">
              <h4 className="font-mono text-xs uppercase tracking-wider text-[var(--c-accent)] mb-4">
                Component Technology Matrix
              </h4>

              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[var(--c-border)] text-[var(--c-accent)]">
                      <th className="py-2.5 pr-4">Layer / Concern</th>
                      <th className="py-2.5 px-4">Technology</th>
                      <th className="py-2.5 pl-4">Architectural Rationale</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--c-border)]">
                    {project.architecture.stackDetails.map((item) => (
                      <tr key={item.category} className="text-[var(--c-fg-2)]">
                        <td className="py-3 pr-4 text-[var(--c-emphasis)] font-medium">
                          {item.category}
                        </td>
                        <td className="py-3 px-4 text-[var(--c-fg)]">
                          {item.tech}
                        </td>
                        <td className="py-3 pl-4 text-xs font-sans leading-relaxed">
                          {item.rationale}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* ── Chapter 06: Key Technical Decisions ─────────────────────── */}
        <section aria-labelledby="decisions-heading" className="space-y-6">
          <div className="font-mono text-xs uppercase tracking-widest text-[var(--c-accent)]">
            04 / Key Technical Decisions & Engineering Depth
          </div>

          <div className="space-y-6">
            {project.keyDecisions.map((decision, idx) => (
              <article
                key={decision.title}
                className="border border-[var(--c-border)] bg-[var(--c-bg-deep)] p-6 sm:p-8 space-y-4"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs px-2 py-0.5 border border-[var(--c-accent)] text-[var(--c-accent)]">
                    DECISION {String(idx + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl text-[var(--c-fg)]">
                    {decision.title}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 font-sans text-sm">
                  <div>
                    <div className="font-mono text-xs uppercase tracking-wider text-[var(--c-accent)] mb-1">
                      Technical Problem
                    </div>
                    <p className="text-[var(--c-fg-3)] leading-relaxed">
                      {decision.problem}
                    </p>
                  </div>

                  <div>
                    <div className="font-mono text-xs uppercase tracking-wider text-[var(--c-accent)] mb-1">
                      Architectural Choice
                    </div>
                    <p className="text-[var(--c-fg-2)] leading-relaxed">
                      {decision.decision}
                    </p>
                  </div>

                  <div>
                    <div className="font-mono text-xs uppercase tracking-wider text-[var(--c-accent)] mb-1">
                      Measured Impact
                    </div>
                    <p className="text-[var(--c-emphasis)] leading-relaxed">
                      {decision.impact}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── Chapter 07: Core Capabilities & Workflows ───────────────── */}
        <section aria-labelledby="features-heading" className="space-y-6">
          <div className="font-mono text-xs uppercase tracking-widest text-[var(--c-accent)]">
            05 / Core Capabilities & Operational Modules
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.features.map((feature) => (
              <article
                key={feature.name}
                className="border border-[var(--c-border)] bg-[var(--c-bg-deep)] p-6 space-y-3"
              >
                <h3 className="font-serif text-xl text-[var(--c-fg)]">
                  {feature.name}
                </h3>
                <p className="text-sm text-[var(--c-fg-2)] leading-relaxed font-sans">
                  {feature.description}
                </p>
                <div className="pt-2 border-t border-[var(--c-border)] font-mono text-xs text-[var(--c-accent)]">
                  <span className="opacity-75">Implementation:</span>{" "}
                  <span className="text-[var(--c-fg-3)] font-sans">
                    {feature.technicalImplementation}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── Chapter 08: Relational Schema & Data Integrity ──────────── */}
        <section aria-labelledby="integrity-heading" className="space-y-6">
          <div className="font-mono text-xs uppercase tracking-widest text-[var(--c-accent)]">
            06 / Relational Schema & Data Integrity Guarantees
          </div>

          <div className="border border-[var(--c-border)] bg-[var(--c-bg-deep)] p-6 sm:p-8 space-y-6">
            <p className="text-sm sm:text-base text-[var(--c-fg-2)] leading-relaxed font-sans">
              {project.dataIntegrity.summary}
            </p>

            <div className="space-y-2">
              <div className="font-mono text-xs uppercase tracking-wider text-[var(--c-accent)] mb-2">
                Enforced Invariants
              </div>
              <ul className="space-y-2 font-mono text-xs text-[var(--c-fg-2)] list-disc pl-5">
                {project.dataIntegrity.rules.map((rule) => (
                  <li key={rule} className="leading-relaxed">
                    {rule}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-[var(--c-border)] pt-6">
              <div className="font-mono text-xs uppercase tracking-wider text-[var(--c-accent)] mb-4">
                Core Entity Schema Highlights
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[var(--c-border)] text-[var(--c-accent)]">
                      <th className="py-2.5 pr-4">Table</th>
                      <th className="py-2.5 px-4">Domain Role</th>
                      <th className="py-2.5 pl-4">Key Constraints & Types</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--c-border)]">
                    {project.dataIntegrity.schemaHighlights.map((highlight) => (
                      <tr key={highlight.table} className="text-[var(--c-fg-2)]">
                        <td className="py-3 pr-4 font-semibold text-[var(--c-emphasis)]">
                          {highlight.table}
                        </td>
                        <td className="py-3 px-4 font-sans text-xs">
                          {highlight.role}
                        </td>
                        <td className="py-3 pl-4 text-xs font-mono text-[var(--c-accent)]">
                          {highlight.constraints}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* ── Chapter 09: Technical Visuals & Architecture Diagrams ────── */}
        {project.visuals && project.visuals.length > 0 && (
          <section aria-labelledby="visuals-heading" className="space-y-8">
            <div className="font-mono text-xs uppercase tracking-widest text-[var(--c-accent)]">
              07 / Engineering Visuals & Artifact Gallery
            </div>

            <div className="grid grid-cols-1 gap-8">
              {project.visuals.map((visual, idx) => (
                <figure
                  key={visual.title}
                  className="border border-[var(--c-border)] bg-[var(--c-bg-deep)] p-3 sm:p-4 space-y-3"
                >
                  <div className="overflow-hidden bg-[var(--c-bg-mid)] border border-[var(--c-border)]">
                    <img
                      src={visual.image}
                      alt={visual.alt}
                      loading="lazy"
                      className="w-full h-auto object-contain max-h-[720px] mx-auto"
                    />
                  </div>
                  <figcaption className="px-1 font-mono text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 text-[var(--c-accent)]">
                    <span>
                      ARTIFACT {String(idx + 1).padStart(2, "0")} : {visual.title}
                    </span>
                    <span className="text-[var(--c-fg-3)] font-sans text-xs">
                      {visual.caption}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

        {/* ── Chapter 10: Verification & Quality Protocol ──────────────── */}
        <section aria-labelledby="verification-heading" className="space-y-6">
          <div className="font-mono text-xs uppercase tracking-widest text-[var(--c-accent)]">
            08 / Verification & Testing Protocol
          </div>

          <div className="border border-[var(--c-border)] bg-[var(--c-bg-deep)] p-6 sm:p-8 space-y-4">
            <p className="text-sm sm:text-base text-[var(--c-fg-2)] leading-relaxed font-sans">
              {project.verification.summary}
            </p>

            <ul className="space-y-2.5 font-mono text-xs text-[var(--c-fg-2)] list-disc pl-5">
              {project.verification.checks.map((check) => (
                <li key={check} className="leading-relaxed">
                  {check}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Project Switcher & Pagination ────────────────────────────── */}
        <section
          aria-label="Project pagination"
          className="border-t border-[var(--c-border)] pt-12 space-y-8"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {prevProject ? (
              <button
                onClick={() => onSelectProject(prevProject.id)}
                className="text-left border border-[var(--c-border)] bg-[var(--c-bg-deep)] p-6 hover:border-[var(--c-emphasis)] transition-colors group focus-visible:outline-none"
              >
                <div className="font-mono text-xs text-[var(--c-accent)] mb-1 flex items-center gap-1">
                  <span>← Previous System</span>
                </div>
                <div className="font-serif text-xl text-[var(--c-fg)] group-hover:text-[var(--c-emphasis)] transition-colors">
                  {prevProject.title.split(":")[0]}
                </div>
                <div className="font-mono text-[11px] text-[var(--c-fg-3)] mt-1">
                  {prevProject.type}
                </div>
              </button>
            ) : (
              <div />
            )}

            {nextProject && (
              <button
                onClick={() => onSelectProject(nextProject.id)}
                className="text-right border border-[var(--c-border)] bg-[var(--c-bg-deep)] p-6 hover:border-[var(--c-emphasis)] transition-colors group focus-visible:outline-none"
              >
                <div className="font-mono text-xs text-[var(--c-accent)] mb-1 flex items-center justify-end gap-1">
                  <span>Next System →</span>
                </div>
                <div className="font-serif text-xl text-[var(--c-fg)] group-hover:text-[var(--c-emphasis)] transition-colors">
                  {nextProject.title.split(":")[0]}
                </div>
                <div className="font-mono text-[11px] text-[var(--c-fg-3)] mt-1">
                  {nextProject.type}
                </div>
              </button>
            )}
          </div>

          <div className="text-center pt-4">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 font-mono text-xs px-6 py-3 border border-[var(--c-emphasis)] text-[var(--c-emphasis)] hover:bg-[var(--c-emphasis)] hover:text-[var(--c-bg-deep)] transition-all font-semibold"
            >
              <span>← Return to Selected Work Index</span>
            </button>
          </div>
        </section>
      </main>

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <footer className="border-t border-[var(--c-border)] py-12 px-4 sm:px-8 mt-24 text-center font-mono text-xs text-[var(--c-fg-3)]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>KEVIN CHANSA · SOFTWARE ENGINEER & DATABASE ARCHITECT</div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/yesterdaygrace"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--c-emphasis)] transition-colors"
            >
              GitHub ↗
            </a>
            <a
              href="https://www.linkedin.com/in/kevin-chansa/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--c-emphasis)] transition-colors"
            >
              LinkedIn ↗
            </a>
            <a
              href="mailto:kevandeschans@gmail.com"
              className="hover:text-[var(--c-emphasis)] transition-colors"
            >
              Contact ↗
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
