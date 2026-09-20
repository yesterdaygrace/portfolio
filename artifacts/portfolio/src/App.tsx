import { lazy, Suspense } from "react";
import Navbar from "@/layout/Navbar";
import { sections } from "@/sections";
import { SectionTransition } from "@/components/vellum/SectionTransition";

const LazyAgentation = lazy(() =>
  import("agentation").then((m) => ({ default: m.Agentation }))
);

function App() {
  return (
    <>
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--c-emphasis)] focus:text-[#151C3F] focus:font-mono focus:text-xs focus:font-bold focus:shadow-lg focus:border focus:border-[var(--c-fg)] focus:outline-none"
      >
        Skip to main content ↓
      </a>
      <Navbar />

      <main id="content" className="w-full relative">
        {sections.map(({ id, Component }) => (
          <SectionTransition key={id} id={id}>
            <Component />
          </SectionTransition>
        ))}
      </main>

      {process.env.NODE_ENV === "development" &&
        typeof window !== "undefined" &&
        window.location.search.includes("agentation") && (
          <Suspense fallback={null}>
            <LazyAgentation />
          </Suspense>
        )}
    </>
  );
}

export default App;
