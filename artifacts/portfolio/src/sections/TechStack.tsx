import { useRef } from "react";
import { useSectionReveal } from "@/lib/useSectionReveal";
import { skillCategories } from "@/data/skills";
import { Kicker } from "@/components/vellum/VellumComponents";
import { SkillLogo, CategoryStackIcon } from "@/components/StackIcon";

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
            <div className="flex items-baseline justify-between mb-3">
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

            <div className="flex items-center gap-3 mb-2">
              <span
                className="w-8 h-8 rounded border border-[var(--c-border)] bg-[var(--c-bg-mid)] flex items-center justify-center flex-shrink-0 text-[#F7F1E2]"
                style={{ color: "#F7F1E2" }}
                aria-hidden="true"
              >
                <CategoryStackIcon id={cat.id} size={17} color="#F7F1E2" />
              </span>
              <h3
                className="font-display italic text-2xl sm:text-3xl"
                style={{ color: "var(--c-fg)" }}
              >
                {cat.name}
              </h3>
            </div>

            <p
              className="font-sans text-xs sm:text-sm mb-6"
              style={{ color: "var(--c-fg-2)" }}
            >
              {cat.description}
            </p>

            {/* Numbered Skill Items with SVG Logo */}
            <ul className="space-y-1 font-sans text-sm">
              {cat.skills.map((skill, sIdx) => (
                <li
                  key={skill.name}
                  className="flex items-center gap-3 py-2 border-t border-[var(--c-border)] group"
                >
                  <span
                    className="font-mono text-xs flex-shrink-0 w-6"
                    style={{ color: "var(--c-accent)" }}
                  >
                    {String(sIdx + 1).padStart(2, "0")}.
                  </span>
                  <span
                    className="w-5 h-5 flex-shrink-0 flex items-center justify-center text-[#F7F1E2]"
                    style={{ color: "#F7F1E2" }}
                    aria-hidden="true"
                  >
                    <SkillLogo name={skill.name} size={16} color="#F7F1E2" />
                  </span>
                  <span
                    style={{ color: "var(--c-fg)" }}
                    className="font-medium text-sm leading-snug group-hover:text-[var(--c-emphasis)] transition-colors duration-150"
                  >
                    {skill.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
