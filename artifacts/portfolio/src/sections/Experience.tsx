import { experiences } from "@/data/experience";
import {
  ChapterHeader,
  Kicker,
  PinAnnotation,
} from "@/components/vellum/VellumComponents";

export default function Experience() {
  return (
    <section id="experience" className="vellum-section">
      <ChapterHeader
        number="03"
        title="Experience Chronology"
        category="Professional Track Record"
      />

      <div className="mb-14">
        <Kicker>Chronological Record · 2024 — 2025</Kicker>
        <h2
          className="font-display italic text-3xl sm:text-5xl lg:text-6xl mb-4 leading-[1.05]"
          style={{ color: "var(--c-fg)" }}
        >
          Production engineering with <em>documented impact</em>.
        </h2>
        <p
          className="font-sans text-base sm:text-lg max-w-2xl"
          style={{ color: "var(--c-fg-2)" }}
        >
          Documented history of architectural delivery, contract responsibilities,
          and verified operational milestones.
        </p>
      </div>

      <div className="space-y-16">
        {experiences.map((exp, idx) => (
          <article
            key={exp.id}
            className="border-t border-[var(--c-border)] pt-8 first:border-t-0 first:pt-0"
          >
            {/* Header: Entry Index + Period + Role */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-baseline mb-6">
              <div className="lg:col-span-3">
                <span
                  className="font-mono text-xs uppercase tracking-widest block mb-1 font-semibold"
                  style={{ color: "var(--c-emphasis)" }}
                >
                  ENTRY 0{idx + 1}
                </span>
                <span
                  className="font-mono text-xs block"
                  style={{ color: "var(--c-accent)" }}
                >
                  {exp.period.replace(/\s*–\s*/, " — ")}
                </span>
                <span
                  className="font-mono text-[11px] block mt-1"
                  style={{ color: "var(--c-fg-2)" }}
                >
                  {exp.company} · {exp.location}
                </span>
              </div>

              <div className="lg:col-span-9">
                <h3
                  className="font-display italic text-2xl sm:text-4xl lg:text-5xl leading-tight mb-3"
                  style={{ color: "var(--c-fg)" }}
                >
                  {exp.role}
                </h3>
                <div
                  className="font-mono text-xs tracking-wider flex items-center gap-3 flex-wrap"
                  style={{ color: "var(--c-fg-2)" }}
                >
                  <span>ROLE TYPE: {exp.type.toUpperCase()}</span>
                  <span>·</span>
                  <span>STATUS: COMPLETED DELIVERABLE</span>
                </div>
              </div>
            </div>

            {/* Metrics if present */}
            {exp.metrics && exp.metrics.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6 py-5 border-y border-[var(--c-border)] bg-[var(--c-bg-deep)] px-6">
                {exp.metrics.map((m) => (
                  <div key={m.label} className="flex flex-col">
                    <span
                      className="font-display italic text-2xl sm:text-3xl mb-1 tracking-tight"
                      style={{ color: "var(--c-emphasis)" }}
                    >
                      {m.value.replace(/–/g, " – ")}
                    </span>
                    <span
                      className="font-mono text-[11px] uppercase tracking-wider"
                      style={{ color: "var(--c-accent)" }}
                    >
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Content List: Key highlights & description */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 mt-6">
              <div className="lg:col-span-3">
                <span
                  className="font-mono text-[11px] uppercase tracking-widest block"
                  style={{ color: "var(--c-accent)" }}
                >
                  Key Contributions
                </span>
              </div>

              <div className="lg:col-span-9">
                {(() => {
                  const highlights = exp.highlights ?? [];
                  return (
                    <div className="space-y-6 mb-6">
                      {highlights.length > 0 && (
                        <div>
                          <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--c-emphasis)] block mb-3 font-semibold">
                            Key System Deliverables:
                          </span>
                          <ul className="space-y-3">
                            {highlights.map((h, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-3 font-sans text-sm sm:text-base leading-relaxed text-[var(--c-fg)]"
                              >
                                <span className="font-mono text-xs flex-shrink-0 mt-1 text-[var(--c-accent)] font-medium">
                                  0{i + 1}.
                                </span>
                                <span>{h.replace(/\*\*(.*?)\*\*/g, "$1")}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {exp.description.length > 0 && (
                        <div className="pt-4 border-t border-[rgba(232,216,92,0.12)]">
                          <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--c-accent)] block mb-3 font-medium">
                            Infrastructure &amp; Operational Scope:
                          </span>
                          <ul className="space-y-2.5">
                            {exp.description.map((d, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-3 font-sans text-xs sm:text-sm leading-relaxed text-[var(--c-fg-2)]"
                              >
                                <span className="font-mono text-xs flex-shrink-0 mt-0.5 text-[var(--c-accent)]">
                                  —
                                </span>
                                <span>{d.replace(/\*\*(.*?)\*\*/g, "$1")}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  );
                })()}

                {/* Tech stack items as Vellum mono tags */}
                <div className="pt-4 border-t border-[rgba(232,216,92,0.14)] flex items-center gap-2 flex-wrap">
                  <span
                    className="font-mono text-[10px] uppercase tracking-wider mr-2"
                    style={{ color: "var(--c-accent)" }}
                  >
                    Tech Applied:
                  </span>
                  {exp.tech.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-xs px-2 py-0.5 border border-[var(--c-border)]"
                      style={{ color: "var(--c-fg-2)" }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <footer className="pt-12 mt-16 border-t border-[var(--c-border)]">
        <PinAnnotation
          counter="CHRONOLOGY"
          note="Full verification documents and employment references available upon request"
          secondaryNote="Archive verified against contract deliverables"
        />
      </footer>
    </section>
  );
}
