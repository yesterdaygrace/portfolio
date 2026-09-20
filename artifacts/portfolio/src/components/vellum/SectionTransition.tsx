import React, { useRef, useState, useEffect } from "react";
import { SectionSkeleton } from "./SectionSkeleton";
import { gsap, ScrollTrigger } from "@/lib/motion";

interface SectionTransitionProps {
  id: string;
  children: React.ReactNode;
}

export function SectionTransition({ id, children }: SectionTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skeletonRef = useRef<HTMLDivElement>(null);
  const [resolved, setResolved] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    const content = contentRef.current;
    const skeleton = skeletonRef.current;
    if (!el || !content) return;

    // For Hero, resolve immediately so LCP is instant
    if (id === "hero") {
      setResolved(true);
      return;
    }

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: reduce)", () => {
      // Reduced motion: resolve immediately without animation
      setResolved(true);
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        // 1. Entrance Trigger: Instant skeleton dissolve & rapid content reveal
        ScrollTrigger.create({
          trigger: el,
          start: "top 98%",
          once: true,
          onEnter: () => {
            if (skeleton) {
              gsap.to(skeleton, {
                opacity: 0,
                duration: 0.12,
                ease: "power3.out",
                onComplete: () => setResolved(true),
              });
            } else {
              setResolved(true);
            }

            gsap.fromTo(
              content,
              { opacity: 0, y: 6 },
              {
                opacity: 1,
                y: 0,
                duration: 0.2,
                ease: "power3.out",
                clearProps: "all",
              },
            );
          },
        });

        // 2. Section Exit Animation: Clean, subtle transition before next section
        ScrollTrigger.create({
          trigger: el,
          start: "bottom 15%",
          end: "bottom 0%",
          onLeave: () => {
            gsap.to(content, {
              opacity: 0.88,
              y: -6,
              duration: 0.25,
              ease: "power2.out",
            });
          },
          onEnterBack: () => {
            gsap.to(content, {
              opacity: 1,
              y: 0,
              duration: 0.2,
              ease: "power2.out",
              clearProps: "transform",
            });
          },
        });
      }, el);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, [id]);

  if (id === "hero") {
    return <>{children}</>;
  }

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden">
      {/* Blueprint Skeleton Render State */}
      {!resolved && (
        <div
          ref={skeletonRef}
          className="absolute inset-0 z-10 vellum-section bg-[var(--c-bg)] pointer-events-none transition-opacity"
        >
          <SectionSkeleton sectionId={id} />
        </div>
      )}

      {/* Live High-Fidelity Content */}
      <div ref={contentRef} className="w-full">
        {children}
      </div>
    </div>
  );
}
