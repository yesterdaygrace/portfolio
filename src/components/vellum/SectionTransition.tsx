import React, { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/motion";

interface SectionTransitionProps {
  id: string;
  children: React.ReactNode;
}

/**
 * Synchronous Section Transition Wrapper.
 * Provides an immediate, zero-lag synchronous render with a subtle
 * exit transition before moving to adjacent sections.
 */
export function SectionTransition({ id, children }: SectionTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    const content = contentRef.current;
    if (!el || !content || id === "hero") return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        // 1. Synchronous Entrance: Fast, immediate settle as section meets viewport
        gsap.fromTo(
          content,
          { opacity: 0.88, y: 6 },
          {
            scrollTrigger: {
              trigger: el,
              start: "top 98%",
              once: true,
            },
            opacity: 1,
            y: 0,
            duration: 0.2,
            ease: "power2.out",
            clearProps: "all",
          },
        );

        // 2. Section Exit Animation: Subtle ease-out before scrolling past
        ScrollTrigger.create({
          trigger: el,
          start: "bottom 15%",
          end: "bottom 0%",
          onLeave: () => {
            gsap.to(content, {
              opacity: 0.92,
              y: -4,
              duration: 0.2,
              ease: "power2.out",
            });
          },
          onEnterBack: () => {
            gsap.to(content, {
              opacity: 1,
              y: 0,
              duration: 0.18,
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
    <div ref={containerRef} className="relative w-full">
      <div ref={contentRef} className="w-full">
        {children}
      </div>
    </div>
  );
}
