import { useRef } from "react";
import { useSectionReveal } from "@/lib/useSectionReveal";
import { skillCategories } from "@/data/skills";
import { Kicker } from "@/components/vellum/VellumComponents";

export default function TechStack() {
  const sectionRef = useRef<HTMLElement>(null);
  useSectionReveal(sectionRef);

  return (
    <section id="stack" ref={sectionRef} className="vellum-section">
      <div className="mb-14">
        <Kicker>Capabilities &amp; Production Stack</Kicker>
        <h2
          className="font-display italic text-3xl sm:text-5xl lg:text-6xl mb-4 leading-[1.05]"
          style={{ color: "var(--c-fg)" }}
        >
          Tools selected for <em>reliability</em>, not novelty.
        </h2>
        <p
          className="font-sans text-base sm:text-lg max-w-3xl"
          style={{ color: "var(--c-fg-2)" }}
        >
          A grounded stack focused on transactional data integrity, server-side
          predictability, and accessible web client interfaces.
        </p>
      </div>

      {/* 2x2 Ledger Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 border-t border-[var(--c-border)] pt-8">
        {skillCategories.map((cat, idx) => (
          <div
            key={cat.id}
            className="flex flex-col border-b border-[var(--c-border)] pb-8"
          >
            {/* Category header */}
            <div className="flex items-baseline justify-between mb-2">
              <span
                className="font-mono text-xs uppercase tracking-widest font-semibold"
                style={{ color: "var(--c-emphasis)" }}
              >
                DISCIPLINE 0{idx + 1}
              </span>
              <span
                className="font-mono text-[11px] tracking-wider"
                style={{ color: "var(--c-accent)" }}
              >
                {cat.skills.length} COMPETENCIES
              </span>
            </div>

            <h3
              className="font-display italic text-2xl sm:text-3xl mb-1"
              style={{ color: "var(--c-fg)" }}
            >
              {cat.name}
            </h3>

            <p
              className="font-sans text-xs sm:text-sm mb-6"
              style={{ color: "var(--c-fg-2)" }}
            >
              {cat.description}
            </p>

            {/* Numbered Skill Items */}
            <ul className="space-y-1.5 font-sans text-sm">
              {cat.skills.map((skill, sIdx) => (
                <li
                  key={skill.name}
                  className="flex items-baseline gap-3 py-1.5 border-t border-[var(--c-border)]"
                >
                  <span
                    className="font-mono text-xs flex-shrink-0"
                    style={{ color: "var(--c-accent)" }}
                  >
                    {String(sIdx + 1).padStart(2, "0")}.
                  </span>
                  <span style={{ color: "var(--c-fg)" }}>{skill.name}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
