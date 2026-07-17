import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Experience from '@/components/sections/Experience';
import TechStack from '@/components/sections/TechStack';
import Projects from '@/components/sections/Projects';
import GitHubActivity from '@/components/sections/GitHubActivity';
import Contact from '@/components/sections/Contact';
import AnimatedBackground from '@/components/ui/AnimatedBackground';

gsap.registerPlugin(ScrollTrigger);

// Order matches NAV_LINKS in Navbar
const PANELS = [Hero, About, Experience, TechStack, Projects, GitHubActivity, Contact];

function App() {
  const spacerRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const spacer = spacerRef.current;
    if (!spacer) return;

    const vh = window.innerHeight;
    const panels = panelRefs.current;

    // ── Hero: animate reveal items on load ──────────────────────────────────
    const heroItems = panels[0]?.querySelectorAll<HTMLElement>('.reveal-item');
    if (heroItems?.length) {
      gsap.set(heroItems, { opacity: 0, y: 24 });
      gsap.to(heroItems, {
        opacity: 1, y: 0,
        duration: 0.7, stagger: 0.12, ease: 'power2.out', delay: 0.4,
      });
    }

    // ── Each subsequent panel: cover slide + reveal on landing ───────────────
    panels.forEach((panel, i) => {
      if (!panel || i === 0) return;

      // Start fully off-screen below
      gsap.set(panel, { y: vh });

      // Scrub the panel up to cover the previous one
      gsap.to(panel, {
        y: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: spacer,
          start: `top+=${(i - 1) * vh}px top`,
          end:   `top+=${i * vh}px top`,
          scrub: 1.2,
        },
      });

      // After the panel fully lands, stagger reveal items inside it
      const items = panel.querySelectorAll<HTMLElement>('.reveal-item');
      if (items.length) {
        gsap.set(items, { opacity: 0, y: 22 });
        ScrollTrigger.create({
          trigger: spacer,
          start: `top+=${i * vh - 40}px top`,
          once: true,
          onEnter: () => {
            gsap.to(items, {
              opacity: 1, y: 0,
              duration: 0.55, stagger: 0.09, ease: 'power2.out',
            });
          },
        });
      }
    });

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', onResize);

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <>
      <AnimatedBackground />
      <Navbar panelCount={PANELS.length} />

      {/* Fixed panels — GSAP drives their Y, each covers the previous */}
      {PANELS.map((Section, i) => (
        <div
          key={i}
          ref={(el) => { panelRefs.current[i] = el; }}
          style={{
            position: 'fixed',
            top: 0, left: 0,
            width: '100%', height: '100vh',
            overflowY: 'auto',
            zIndex: i + 2,          // hero = 2, contact = 8; navbar is z-50
            backgroundColor: '#000',
          }}
        >
          <Section />
        </div>
      ))}

      {/* Scroll spacer — total distance = N × 100vh */}
      <div
        ref={spacerRef}
        style={{ height: `${PANELS.length * 100}vh`, position: 'relative', zIndex: 0 }}
      />
    </>
  );
}

export default App;
