import { experiences } from "@/data/experience";
import type { Experience } from "@/types";
import { ArrowUpRight } from "lucide-react";

/* ── Helpers ─────────────────────────────────────────────────────────────── */

function getYear(period: string): string {
  const m = period.match(/(\d{4})/);
  return m ? m[1] : "";
}

function formatPeriod(period: string): string {
  // "Aug 2024 – Dec 2025" → "Aug 2024 — Dec 2025"
  return period.replace(/\s*–\s*/, " — ");
}

/** Render description text with **bold** markers as <strong> */
function richText(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      const inner = part.slice(2, -2);
      return (
        <strong key={i} className="font-medium text-[#d4d4d4]">
          {inner}
        </strong>
      );
    }
    return part;
  });
}

/* ── Sub-components ──────────────────────────────────────────────────────── */

function TimelineDot({ year }: { year: string }) {
  return (
    <div className="flex flex-col items-center">
      <span
        className="font-sans text-[11px] uppercase tracking-[0.16em] mb-3"
        style={{ color: "#606060" }}
      >
        {year}
      </span>
      <div
        className="w-[9px] h-[9px] rounded-full flex-shrink-0"
        style={{ background: "#2a2a2a", border: "1.5px solid #3a3a3a" }}
      />
    </div>
  );
}

function TimelineConnector() {
  return (
    <div
      className="w-px flex-shrink-0 mx-auto"
      style={{
        flex: 1,
        background: "linear-gradient(to bottom, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
        minHeight: "2rem",
      }}
    />
  );
}

function MetricBlock({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col gap-0.5 min-w-0">
      <span
        className="font-display leading-none tracking-tight"
        style={{ fontSize: "clamp(1.3rem, 2vw, 1.6rem)", color: "#F5F5F5" }}
      >
        {value}
      </span>
      <span
        className="font-sans text-[11px] uppercase tracking-[0.08em] leading-tight"
        style={{ color: "#707070" }}
      >
        {label}
      </span>
    </div>
  );
}

function ExperienceCard({ exp }: { exp: Experience }) {
  return (
    <div
      className="group relative w-full transition-all duration-250"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "16px",
        padding: "1.75rem 1.75rem 1.5rem",
        transition: "transform 250ms ease-out, border-color 250ms ease-out, box-shadow 250ms ease-out",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.16)";
        e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.5)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Header row: role + button */}
      <div className="flex items-start justify-between gap-4 mb-2.5">
        <h3
          className="font-display leading-tight tracking-tight"
          style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)", color: "#F5F5F5" }}
        >
          {exp.role}
        </h3>

        <button
          className="flex items-center gap-1.5 flex-shrink-0 font-sans text-xs font-medium transition-all duration-200"
          style={{
            color: "#606060",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "8px",
            padding: "0.4rem 0.85rem",
            marginTop: "0.15rem",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.04)";
            e.currentTarget.style.color = "#b0b0b0";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "#606060";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
          }}
        >
          View Details
          <ArrowUpRight size={12} className="transition-transform duration-200 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]" />
        </button>
      </div>

      {/* Company + type + period */}
      <div
        className="font-sans text-sm mb-4 flex flex-wrap gap-x-2"
        style={{ color: "#909090" }}
      >
        <span style={{ color: "#b0b0b0" }}>{exp.company}</span>
        <span aria-hidden="true" style={{ color: "#505050" }}>·</span>
        <span>{exp.type}</span>
        <span aria-hidden="true" style={{ color: "#505050" }}>·</span>
        <span>{formatPeriod(exp.period)}</span>
      </div>

      {/* Impact metrics */}
      {exp.metrics && exp.metrics.length > 0 && (
        <div
          className="flex flex-wrap gap-x-8 gap-y-2 mb-5 pb-5"
          style={{
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {exp.metrics.map((m) => (
            <MetricBlock key={m.label} value={m.value} label={m.label} />
          ))}
        </div>
      )}

      {/* Highlights (key achievements) */}
      {exp.highlights && exp.highlights.length > 0 && (
        <ul className="space-y-2.5 mb-4">
          {exp.highlights.map((h, i) => (
            <li
              key={i}
              className="flex gap-3 leading-relaxed"
              style={{ color: "#C8C8C8", fontSize: "0.8125rem" }}
            >
              <span
                aria-hidden
                className="flex-shrink-0"
                style={{ color: "#505050", marginTop: "0.25rem" }}
              >
                •
              </span>
              <span>{richText(h)}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Description bullets */}
      {exp.description.length > 0 && (
        <ul className="space-y-2 mb-4">
          {exp.description.map((d, i) => (
            <li
              key={i}
              className="flex gap-3 leading-relaxed"
              style={{ color: "#909090", fontSize: "0.8125rem" }}
            >
              <span
                aria-hidden
                className="flex-shrink-0"
                style={{ color: "#404040", marginTop: "0.25rem" }}
              >
                •
              </span>
              <span>{richText(d)}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Tech tags */}
      {exp.tech.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {exp.tech.map((t) => (
            <span
              key={t}
              className="font-sans text-[10px] uppercase tracking-[0.1em] font-medium transition-all duration-200"
              style={{
                color: "#707070",
                border: "1px solid rgba(255,255,255,0.06)",
                padding: "0.2rem 0.7rem",
                borderRadius: "999px",
                letterSpacing: "0.1em",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                e.currentTarget.style.color = "#a0a0a0";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                e.currentTarget.style.color = "#707070";
              }}
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Layout ───────────────────────────────────────────────────────────────── */

export default function Experience() {
  // Group experiences by year for timeline
  const groups: { year: string; items: Experience[] }[] = [];
  for (const exp of experiences) {
    const year = getYear(exp.period);
    const last = groups[groups.length - 1];
    if (last && last.year === year) {
      last.items.push(exp);
    } else {
      groups.push({ year, items: [exp] });
    }
  }

  return (
    <section
      id="experience"
      className="py-24 px-6 md:px-12 lg:px-20"
      style={{ maxWidth: "90rem", margin: "0 auto", width: "100%" }}
    >
      {/* ── Section header ─────────────────────────────────────────────── */}
      <div className="reveal-item mb-16">
        <span
          className="font-sans text-[11px] uppercase tracking-[0.16em] block mb-4"
          style={{ color: "#606060" }}
        >
          [02] - Experiences
        </span>
        <div
          className="w-full"
          style={{
            height: "1px",
            background: "rgba(255,255,255,0.06)",
          }}
        />
      </div>

      {/* ── Timeline + Cards ────────────────────────────────────────────── */}
      <div className="relative">
        {groups.map((group, gi) => (
          <div key={group.year} className="relative">
            {/* Each experience in the year group */}
            {group.items.map((exp, ei) => {
              const isFirst = ei === 0;
              const isLast = ei === group.items.length - 1 && gi === groups.length - 1;

              return (
                <div
                  key={exp.id}
                  className="grid md:grid-cols-[auto_1fr] gap-5 md:gap-8"
                  style={{ marginBottom: isLast ? 0 : "2rem" }}
                >
                  {/* ── Timeline column ──────────────────────────────────── */}
                  <div className="hidden md:flex flex-col items-center min-w-[60px]">
                    {/* Connector above (not for first item) */}
                    {!isFirst ? <TimelineConnector /> : <div style={{ height: "1.5rem" }} />}

                    {/* Dot + year */}
                    <TimelineDot year={group.year} />

                    {/* Connector below (not for last item) */}
                    {!isLast ? <TimelineConnector /> : <div style={{ height: "1rem" }} />}
                  </div>

                  {/* ── Card column ──────────────────────────────────────── */}
                  <div className="min-w-0 reveal-item" style={{ animationDelay: `${ei * 0.1}s` }}>
                    <ExperienceCard exp={exp} />
                  </div>
                </div>
              );
            })}

            {/* Inter-group connector (thin line across gap) */}
            {gi < groups.length - 1 && (
              <div
                className="hidden md:block absolute left-[30px]"
                style={{
                  width: "1px",
                  height: "3rem",
                  background: "rgba(255,255,255,0.04)",
                  top: "100%",
                }}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
