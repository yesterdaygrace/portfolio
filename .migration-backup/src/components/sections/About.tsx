"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeader from "@/components/ui/SectionHeader";
import Badge from "@/components/ui/Badge";

const TAGS = [
  "Financial Systems",
  "Web Architecture",
  "Backend Engineering",
  "Linux",
  "Debugging",
  "Scalable Design",
  "Data Integrity",
  "Clean Code",
];

export default function About() {
  return (
    <section id="about" className="relative py-20 border-b border-[#161616]">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <SectionHeader
            index="01"
            title="About"
            comment="background & context"
          />
        </ScrollReveal>
        <div className="flex justify-center">
          <div className="max-w-3xl space-y-5 text-center">
            <ScrollReveal delay={0.05}>
              <p className="text-neutral-300 leading-relaxed text-sm">
                I&apos;m a software engineer with a focus on building{" "}
                <span className="text-neutral-100 font-medium">
                  reliable, scalable backend systems
                </span>{" "}
                and full-stack web applications. My work sits at the
                intersection of financial systems, data integrity, and web
                architecture — where correctness isn&apos;t optional.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="text-neutral-500 leading-relaxed text-sm">
                I thrive in Linux environments, designing systems that are
                straightforward to reason about, debug, and extend. I care
                deeply about clean architecture, separation of concerns, and
                writing code that communicates its intent — not just to
                machines, but to future engineers.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <p className="text-neutral-500 leading-relaxed text-sm">
                My background spans fullstack development, database design, and
                server-side deployment. I&apos;ve worked on production financial
                systems where a single logic error can cascade into
                reconciliation failures — so I build with discipline, validation
                layers, and audit trails in mind.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {TAGS.map((t) => (
                  <Badge key={t} variant="default">
                    {t}
                  </Badge>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
