import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function GSAPReveal({
  children,
  className = "",
  stagger = 0.12,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll<HTMLElement>(".reveal-item");
    if (!items.length) return;

    // Set initial state explicitly — don't rely on gsap.from's immediateRender
    gsap.set(items, { opacity: 0, y: 36 });

    const tween = gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.75,
      stagger,
      ease: "power3.out",
      delay,
      immediateRender: false,
      scrollTrigger: {
        trigger: container,
        start: "top 88%",
        once: true,
      },
    });

    return () => {
      tween.kill();
      // Restore visibility so elements never get stuck hidden
      gsap.set(items, { clearProps: "opacity,y,transform" });
    };
  }, [stagger, delay]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
