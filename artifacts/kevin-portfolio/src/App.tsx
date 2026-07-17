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

const PANELS = [Hero, About, Experience, TechStack, Projects, GitHubActivity, Contact];

function App() {
  const spacerRef  = useRef<HTMLDivElement>(null);
  const panelRefs  = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const spacer = spacerRef.current;
    if (!spacer) return;

    const panels = panelRefs.current;
    const N      = PANELS.length;

    // Snapshot vh once; refresh on resize
    let vh = window.innerHeight;

    // ── Helper: which panel is currently "active" ─────────────────────────────
    const activeIndex = () => {
      const scrollY   = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - vh;
      if (docHeight > 0 && scrollY >= docHeight - 8) return N - 1;
      return Math.min(Math.round(scrollY / vh), N - 1);
    };

    // ── Hero reveals on load ──────────────────────────────────────────────────
    const heroItems = panels[0]?.querySelectorAll<HTMLElement>('.reveal-item');
    if (heroItems?.length) {
      gsap.set(heroItems, { opacity: 0, y: 24 });
      gsap.to(heroItems, { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power2.out', delay: 0.4 });
    }

    // ── Per-panel: cover slide + reveal on landing ────────────────────────────
    panels.forEach((panel, i) => {
      if (!panel || i === 0) return;

      gsap.set(panel, { y: vh });

      gsap.to(panel, {
        y: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: spacer,
          start:  `top+=${(i - 1) * vh}px top`,
          end:    `top+=${i * vh}px top`,
          scrub:  1,
        },
      });

      const items = panel.querySelectorAll<HTMLElement>('.reveal-item');
      if (items.length) {
        gsap.set(items, { opacity: 0, y: 20 });
        ScrollTrigger.create({
          trigger: spacer,
          start:  `top+=${i * vh - 40}px top`,
          once:   true,
          onEnter: () =>
            gsap.to(items, { opacity: 1, y: 0, duration: 0.55, stagger: 0.09, ease: 'power2.out' }),
        });
      }
    });

    // ── Global snap — fires after user stops at section boundary ─────────────
    ScrollTrigger.create({
      trigger: spacer,
      start:   'top top',
      end:     'bottom bottom',
      snap: {
        snapTo:   1 / (N - 1),
        duration: { min: 0.4, max: 0.7 },
        delay:    0.18,
        ease:     'power2.inOut',
      },
    });

    // ── Wheel interceptor: prioritise inner panel scroll ─────────────────────
    // If the active panel still has content to scroll in the wheel direction,
    // consume the event inside the panel. Only when the panel hits its boundary
    // does the window scroll — which triggers the GSAP snap above.
    const onWheel = (e: WheelEvent) => {
      const idx   = activeIndex();
      const panel = panels[idx];
      if (!panel) return;

      const { scrollTop, scrollHeight, clientHeight } = panel;
      const overflows    = scrollHeight > clientHeight + 4;
      const atBottom     = scrollTop + clientHeight >= scrollHeight - 4;
      const atTop        = scrollTop <= 4;
      const goingDown    = e.deltaY > 0;

      if (!overflows) return; // panel fits in viewport — let window scroll freely

      if (goingDown && !atBottom) {
        // Still content below — consume inside panel
        e.preventDefault();
        const delta = e.deltaMode === 1 ? e.deltaY * 24
                    : e.deltaMode === 2 ? e.deltaY * clientHeight
                    : e.deltaY;
        panel.scrollTop += delta;
        return;
      }

      if (!goingDown && !atTop) {
        // Still content above — consume inside panel
        e.preventDefault();
        const delta = e.deltaMode === 1 ? e.deltaY * 24
                    : e.deltaMode === 2 ? e.deltaY * clientHeight
                    : e.deltaY;
        panel.scrollTop += delta;
        return;
      }

      // Panel is at its boundary → fall through to window scroll → GSAP snap
    };

    window.addEventListener('wheel', onWheel, { passive: false });

    // ── Touch support (mobile swipe) ──────────────────────────────────────────
    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => { touchStartY = e.touches[0].clientY; };
    const onTouchMove  = (e: TouchEvent) => {
      const idx   = activeIndex();
      const panel = panels[idx];
      if (!panel) return;

      const { scrollTop, scrollHeight, clientHeight } = panel;
      const overflows = scrollHeight > clientHeight + 4;
      const deltaY    = touchStartY - e.touches[0].clientY;
      const goingDown = deltaY > 0;
      const atBottom  = scrollTop + clientHeight >= scrollHeight - 4;
      const atTop     = scrollTop <= 4;

      if (overflows && ((goingDown && !atBottom) || (!goingDown && !atTop))) {
        e.preventDefault();
        panel.scrollTop += deltaY * 1.2;
        touchStartY = e.touches[0].clientY;
      }
    };

    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove',  onTouchMove,  { passive: false });

    // ── Resize ────────────────────────────────────────────────────────────────
    const onResize = () => { vh = window.innerHeight; ScrollTrigger.refresh(); };
    window.addEventListener('resize', onResize);

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      window.removeEventListener('wheel',      onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove',  onTouchMove);
      window.removeEventListener('resize',     onResize);
    };
  }, []);

  return (
    <>
      <AnimatedBackground />
      <Navbar panelCount={PANELS.length} />

      {PANELS.map((Section, i) => (
        <div
          key={i}
          ref={(el) => { panelRefs.current[i] = el; }}
          style={{
            position:        'fixed',
            top: 0, left: 0,
            width:           '100%',
            height:          '100vh',
            overflowY:       'auto',
            zIndex:          i + 2,
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
