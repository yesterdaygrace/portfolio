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

gsap.registerPlugin(ScrollTrigger);

const PANELS = [Hero, About, Experience, TechStack, Projects, GitHubActivity, Contact];

function App() {
  const spacerRef    = useRef<HTMLDivElement>(null);
  const panelRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const counterRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const spacer = spacerRef.current;
    if (!spacer) return;

    const panels = panelRefs.current;
    const N = PANELS.length;
    let vh = window.innerHeight;

    // ── Active panel helper ───────────────────────────────────────────────────
    const activeIndex = () => {
      const sy  = window.scrollY;
      const dh  = document.documentElement.scrollHeight - vh;
      if (dh > 0 && sy >= dh - 8) return N - 1;
      return Math.min(Math.round(sy / vh), N - 1);
    };

    // ── Hero reveals on load ──────────────────────────────────────────────────
    const heroItems = panels[0]?.querySelectorAll<HTMLElement>('.reveal-item');
    if (heroItems?.length) {
      gsap.set(heroItems, { opacity: 0, y: 28 });
      gsap.to(heroItems, { opacity: 1, y: 0, duration: 0.85, stagger: 0.13, ease: 'power2.out', delay: 0.5 });
    }

    // ── Per-panel cover slide + reveal ───────────────────────────────────────
    panels.forEach((panel, i) => {
      if (!panel || i === 0) return;
      gsap.set(panel, { y: vh });

      gsap.to(panel, {
        y: 0, ease: 'none',
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
          start:   `top+=${i * vh - 40}px top`,
          once:    true,
          onEnter: () =>
            gsap.to(items, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' }),
        });
      }
    });

    // ── Global snap ───────────────────────────────────────────────────────────
    ScrollTrigger.create({
      trigger: spacer,
      start: 'top top', end: 'bottom bottom',
      snap: {
        snapTo:   1 / (N - 1),
        duration: { min: 0.4, max: 0.7 },
        delay:    0.18,
        ease:     'power2.inOut',
      },
    });

    // ── Scroll progress counter (bottom-right, ref-driven like reference site) ─
    const updateCounter = () => {
      const sy  = window.scrollY;
      const dh  = document.documentElement.scrollHeight - vh;
      const pct = dh > 0 ? Math.round((sy / dh) * 100) : 0;
      if (counterRef.current) counterRef.current.textContent = String(pct);
    };
    window.addEventListener('scroll', updateCounter, { passive: true });
    updateCounter();

    // ── Wheel interceptor: prioritise inner panel scroll ─────────────────────
    const onWheel = (e: WheelEvent) => {
      const panel = panels[activeIndex()];
      if (!panel) return;
      const { scrollTop, scrollHeight, clientHeight } = panel;
      const overflows = scrollHeight > clientHeight + 4;
      const atBottom  = scrollTop + clientHeight >= scrollHeight - 4;
      const atTop     = scrollTop <= 4;
      const goingDown = e.deltaY > 0;
      if (!overflows) return;
      if ((goingDown && !atBottom) || (!goingDown && !atTop)) {
        e.preventDefault();
        const delta = e.deltaMode === 1 ? e.deltaY * 24
                    : e.deltaMode === 2 ? e.deltaY * clientHeight
                    : e.deltaY;
        panel.scrollTop += delta;
      }
    };
    window.addEventListener('wheel', onWheel, { passive: false });

    // ── Touch support ─────────────────────────────────────────────────────────
    let touchY = 0;
    const onTouchStart = (e: TouchEvent) => { touchY = e.touches[0].clientY; };
    const onTouchMove  = (e: TouchEvent) => {
      const panel = panels[activeIndex()];
      if (!panel) return;
      const { scrollTop, scrollHeight, clientHeight } = panel;
      const dy  = touchY - e.touches[0].clientY;
      const overflows = scrollHeight > clientHeight + 4;
      const atBottom  = scrollTop + clientHeight >= scrollHeight - 4;
      const atTop     = scrollTop <= 4;
      if (overflows && ((dy > 0 && !atBottom) || (dy < 0 && !atTop))) {
        e.preventDefault();
        panel.scrollTop += dy * 1.2;
        touchY = e.touches[0].clientY;
      }
    };
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove',  onTouchMove,  { passive: false });

    // ── Resize ────────────────────────────────────────────────────────────────
    const onResize = () => { vh = window.innerHeight; ScrollTrigger.refresh(); };
    window.addEventListener('resize', onResize);

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      window.removeEventListener('wheel',      onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove',  onTouchMove);
      window.removeEventListener('scroll',     updateCounter);
      window.removeEventListener('resize',     onResize);
    };
  }, []);

  return (
    <>
      <Navbar panelCount={PANELS.length} />

      {/* Fixed cover-scroll panels */}
      {PANELS.map((Section, i) => (
        <div
          key={i}
          ref={el => { panelRefs.current[i] = el; }}
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

      {/* Scroll spacer */}
      <div
        ref={spacerRef}
        style={{ height: `${PANELS.length * 100}vh`, position: 'relative', zIndex: 0 }}
      />

      {/* Scroll progress counter — mirrors reference site's bottom-right number */}
      <div
        ref={counterRef}
        style={{
          position:      'fixed',
          bottom:        '1.5rem',
          right:         '1.5rem',
          zIndex:        200,
          fontFamily:    "'Cormorant Garamond', Georgia, serif",
          fontSize:      '0.8125rem',
          fontWeight:    400,
          letterSpacing: '0.04em',
          color:         '#282828',
          pointerEvents: 'none',
          lineHeight:    1,
        }}
      >
        0
      </div>
    </>
  );
}

export default App;
