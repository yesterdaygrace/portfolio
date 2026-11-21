import { useEffect, type RefObject } from "react";
import { gsap } from "./motion";
import { splitWords } from "./splitWords";

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
            start: "top 95%",
            once: true,
          },
          autoAlpha: 0,
          y: 50,
          duration: 0.6,
          stagger: options?.stagger ?? 0.1,
          ease: "power2.out",
          clearProps: "all",
        });

        // Scrubbed word-by-word reveal: each word un-blurs and fades in while
        // the block un-rotates, tied directly to scroll position.
        const restores: Array<() => void> = [];
        el.querySelectorAll<HTMLElement>(".section-title, .section-description").forEach(
          (block, i) => {
            const { words, restore } = splitWords(block);
            restores.push(restore);
            const isTitle = i % 2 === 0;
            const st = {
              trigger: block,
              start: "top bottom-=8%",
              end: isTitle ? "bottom center+=10%" : "bottom center+=25%",
              scrub: true,
            };
            gsap.fromTo(
              block,
              { rotate: isTitle ? 3 : 1.5, transformOrigin: "0% 50%" },
              { rotate: 0, ease: "none", scrollTrigger: st },
            );
            gsap.fromTo(
              words,
              { opacity: 0.1, filter: "blur(4px)", willChange: "opacity, filter" },
              { opacity: 1, filter: "blur(0px)", ease: "none", stagger: 0.05, scrollTrigger: st },
            );
          },
        );
        return () => restores.forEach((r) => r());
      }, el);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, [sectionRef, options?.itemsSelector, options?.stagger]);
}
