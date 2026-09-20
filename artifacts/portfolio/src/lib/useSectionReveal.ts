import { useEffect, type RefObject } from "react";
import { gsap, ScrollTrigger } from "./motion";

/**
 * Attaches a restrained, single-run scroll reveal to an editorial section.
 * Automatically respects prefers-reduced-motion and cleans up on unmount.
 */
export function useSectionReveal(
  sectionRef: RefObject<HTMLElement | null>,
  options?: {
    triggerSelector?: string;
    itemsSelector?: string;
    stagger?: number;
  },
) {
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        // Target elements: either custom selector or standard data-reveal elements
        const targets = el.querySelectorAll(
          options?.itemsSelector || "[data-reveal], header, article, .vellum-section-content",
        );

        if (targets.length === 0) return;

        gsap.from(targets, {
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
          autoAlpha: 0,
          y: 16,
          duration: 0.65,
          stagger: options?.stagger ?? 0.08,
          ease: "power2.out",
          clearProps: "transform,opacity,visibility",
        });
      }, el);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, [sectionRef, options?.itemsSelector, options?.stagger]);
}
