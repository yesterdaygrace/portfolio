import { lazy, Suspense, useState, useEffect, useCallback } from "react";
import Navbar from "@/layout/Navbar";
import { sections } from "@/sections";
import { SectionTransition } from "@/components/vellum/SectionTransition";

const ProjectDetailPage = lazy(() => import("@/pages/ProjectDetailPage"));

const LazyAgentation = lazy(() =>
  import("agentation").then((m) => ({ default: m.Agentation }))
);

function parseHashRoute(): { view: "home" | "project"; projectId?: string } {
  if (typeof window === "undefined") return { view: "home" };
  const hash = window.location.hash || "";
  const match = hash.match(/^#\/?projects?\/([a-zA-Z0-9_-]+)/i);
  if (match && match[1]) {
    return { view: "project", projectId: match[1].toLowerCase() };
  }
  return { view: "home" };
}

function App() {
  const [route, setRoute] = useState(parseHashRoute);

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(parseHashRoute());
    };

    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("popstate", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("popstate", handleHashChange);
    };
  }, []);

  const handleSelectProject = useCallback((id: string) => {
    window.location.hash = `#/projects/${id}`;
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const handleBackToHome = useCallback(() => {
    window.location.hash = "#projects";
    setTimeout(() => {
      const el = document.getElementById("projects");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 50);
  }, []);

  if (route.view === "project" && route.projectId) {
    return (
      <Suspense
        fallback={
          <div className="min-h-screen bg-[var(--c-bg)] flex items-center justify-center p-8">
            <div className="font-mono text-xs text-[var(--c-accent)] tracking-wider">
              LOADING ARCHITECTURAL SPECIFICATION...
            </div>
          </div>
        }
      >
        <ProjectDetailPage
          projectId={route.projectId}
          onBack={handleBackToHome}
          onSelectProject={handleSelectProject}
        />
      </Suspense>
    );
  }

  return (
    <>
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--c-emphasis)] focus:text-[var(--c-bg-deep)] focus:font-mono focus:text-xs focus:font-bold focus:shadow-lg focus:border focus:border-[var(--c-fg)] focus:outline-none"
      >
        Skip to main content ↓
      </a>
      <Navbar />

      <main id="content" className="w-full relative">
        {sections.map(({ id, Component }) => (
          <SectionTransition key={id} id={id}>
            {id === "projects" ? (
              // @ts-expect-error onSelectProject is accepted by Projects
              <Component onSelectProject={handleSelectProject} />
            ) : (
              <Component />
            )}
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
