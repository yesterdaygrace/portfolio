import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/motion";
import { useSectionReveal } from "@/lib/useSectionReveal";
import { skillCategories } from "@/data/skills";
import { SkillLogo, CategoryStackIcon } from "@/components/StackIcon";

export default function TechStack() {
  const sectionRef = useRef<HTMLElement>(null);
  useSectionReveal(sectionRef);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const names = skillCategories.flatMap((c) => c.skills.map((k) => k.name));

  // Infinite marquee that speeds up with scroll velocity and pauses on hover.
  useEffect(() => {
    const track = marqueeRef.current;
    if (!track) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tween = gsap.to(track, {
        xPercent: -50,
        duration: 40,
        ease: "none",
        repeat: -1,
      });
      const st = ScrollTrigger.create({
        onUpdate: (self) => {
          const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 300, 5);
          gsap.to(tween, { timeScale: boost * (self.direction || 1), duration: 0.2, overwrite: true });
          gsap.to(tween, { timeScale: self.direction || 1, duration: 1, delay: 0.2 });
        },
      });
      const wrap = track.parentElement!;
      const pause = () => gsap.to(tween, { timeScale: 0, duration: 0.4 });
      const play = () => gsap.to(tween, { timeScale: 1, duration: 0.4 });
      wrap.addEventListener("mouseenter", pause);
      wrap.addEventListener("mouseleave", play);
      return () => {
        wrap.removeEventListener("mouseenter", pause);
        wrap.removeEventListener("mouseleave", play);
        st.kill();
        tween.kill();
      };
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="stack" ref={sectionRef} className="vellum-section">
      {/* ── Section Header (Normalized Rhythm) ────────────────────────────── */}
      <header className="section-header">
        <span className="section-label">CAPABILITIES &amp; PRODUCTION STACK</span>
        <h2 className="section-title">
          Tools selected for <em>reliability</em>, not novelty.
        </h2>
        <p className="section-description">
          A grounded stack focused on transactional data integrity, server-side
          predictability, and accessible web client interfaces.
        </p>
      </header>

      {/* Marquee */}
      <div
        data-reveal
        aria-hidden="true"
        className="overflow-hidden border-y border-[var(--c-border)] py-4 mb-10"
      >
        <div ref={marqueeRef} className="flex w-max whitespace-nowrap will-change-transform">
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0">
              {names.map((n) => (
                <span
                  key={`${k}-${n}`}
                  className="font-mono text-xs uppercase tracking-widest px-6"
                  style={{ color: "var(--c-fg-2)" }}
                >
                  {n} <span style={{ color: "var(--c-accent)" }}>✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
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
                className="font-mono text-[13px] tracking-wider uppercase"
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
                className="font-sans text-xl sm:text-2xl font-semibold tracking-tight"
                style={{ color: "var(--c-fg)" }}
              >
                {cat.name}
              </h3>
            </div>

            <p
              className="font-sans text-sm leading-relaxed mb-6"
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
