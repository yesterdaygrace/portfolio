import { useEffect, useState, useCallback } from "react";
import Navbar from "@/layout/Navbar";
import { sections } from "@/sections";

const SECTION_IDS = sections.map((s) => s.id);
const TOTAL_CHAPTERS = String(sections.length).padStart(2, "0");

function App() {
  const [activeChapter, setActiveChapter] = useState(1);

  const handleScroll = useCallback(() => {
    let currentIdx = 0;
    for (let i = 0; i < SECTION_IDS.length; i++) {
      const el = document.getElementById(SECTION_IDS[i]);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.45) {
          currentIdx = i;
        }
      }
    }
    setActiveChapter(currentIdx + 1);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToChapter = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const headerHeight = 64;
      const top = el.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <>
      <Navbar />

      <main id="content" className="w-full relative">
        {sections.map(({ id, Component }) => (
          <Component key={id} />
        ))}
      </main>

      {/* Vellum Chapter Dots Navigator (from reference template) */}
      <nav
        id="nav-dots"
        aria-label="Chapter jump navigation"
        className="fixed bottom-6 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-2.5 z-40 px-3.5 py-2 border border-[var(--c-border)] backdrop-blur-md shadow-lg no-print"
        style={{ backgroundColor: "rgba(31, 40, 88, 0.85)" }}
      >
        {sections.map((s, idx) => {
          const isCurrent = activeChapter === idx + 1;
          return (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={(e) => scrollToChapter(s.id, e)}
              aria-label={`Jump to Chapter ${idx + 1}: ${s.label}`}
              className="group flex items-center justify-center p-1"
            >
              <span
                className="block transition-all duration-200"
                style={{
                  width: isCurrent ? "18px" : "6px",
                  height: "3px",
                  backgroundColor: isCurrent
                    ? "var(--c-emphasis)"
                    : "rgba(232, 216, 92, 0.35)",
                }}
              />
            </a>
          );
        })}
      </nav>

      {/* Vellum Bottom-Right Chapter Counter */}
      <aside
        id="slide-counter"
        aria-label="Current chapter indicator"
        className="fixed bottom-6 right-6 z-40 font-mono text-xs tracking-widest hidden sm:flex items-center gap-1.5 px-2.5 py-1 border border-[var(--c-border)] select-none no-print"
        style={{
          backgroundColor: "rgba(31, 40, 88, 0.85)",
          color: "var(--c-accent)",
        }}
      >
        <span style={{ color: "var(--c-fg)" }}>
          {String(activeChapter).padStart(2, "0")}
        </span>
        <span style={{ color: "var(--c-fg-3)" }}>/</span>
        <span>{TOTAL_CHAPTERS}</span>
      </aside>
    </>
  );
}

export default App;
