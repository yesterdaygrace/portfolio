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
        // 1. Entrance Trigger: Dissolve skeleton & reveal content
        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          once: true,
          onEnter: () => {
            if (skeleton) {
              gsap.to(skeleton, {
                opacity: 0,
                duration: 0.35,
                ease: "power2.out",
                onComplete: () => setResolved(true),
              });
            } else {
              setResolved(true);
            }

            gsap.fromTo(
              content,
              { opacity: 0, y: 16 },
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                delay: 0.1,
                ease: "power2.out",
                clearProps: "transform",
              },
            );
          },
        });

        // 2. Section Exit Animation: Ease out when scrolling past
        ScrollTrigger.create({
          trigger: el,
          start: "bottom 30%",
          end: "bottom 0%",
          onLeave: () => {
            gsap.to(content, {
              opacity: 0.35,
              y: -14,
              duration: 0.45,
              ease: "power2.out",
            });
          },
          onEnterBack: () => {
            gsap.to(content, {
              opacity: 1,
              y: 0,
              duration: 0.4,
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
