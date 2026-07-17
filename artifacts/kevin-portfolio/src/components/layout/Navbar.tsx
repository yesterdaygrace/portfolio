import { useState, useEffect, useRef, useCallback } from "react";
import { Github, Linkedin, Mail, Instagram, Menu, X } from "lucide-react";
import { profile, socialLinks } from "@/data/profile";
import gsap from "gsap";

const NAV_LINKS = [
  { label: "About",      href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Stack",      href: "#stack" },
  { label: "Projects",   href: "#projects" },
  { label: "Contact",    href: "#contact" },
];

const SECTION_IDS = [
  "hero", "about", "experience", "stack", "projects", "contact",
];

const SOCIAL_LINKS = [
  { icon: Github,    href: socialLinks.github,    label: "GitHub"    },
  { icon: Linkedin,  href: socialLinks.linkedin,  label: "LinkedIn"  },
  { icon: Mail,      href: socialLinks.email,     label: "Email"     },
  { icon: Instagram, href: socialLinks.instagram, label: "Instagram" },
] as const;

interface Props { panelCount: number; }

export default function Navbar({ panelCount }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  const headerRef   = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const navRefs     = useRef<Record<string, HTMLAnchorElement | null>>({});
  const activeSect  = useRef("hero");

  const handleScroll = useCallback(() => {
    const scrollY   = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const vh        = window.innerHeight;

    // Progress bar
    if (progressRef.current) {
      progressRef.current.style.width = docHeight > 0 ? `${(scrollY / docHeight) * 100}%` : '0%';
    }

    // Backdrop — appears after first scroll
    if (headerRef.current) {
      const past = scrollY > 20;
      headerRef.current.style.background      = past ? 'rgba(0,0,0,0.85)' : 'transparent';
      headerRef.current.style.backdropFilter  = past ? 'blur(16px)' : 'none';
      headerRef.current.style.borderBottom    = past ? '1px solid #101010' : '1px solid transparent';
    }

    // Active section
    const atBottom = docHeight > 0 && scrollY >= docHeight - 8;
    const idx = atBottom ? SECTION_IDS.length - 1 : Math.min(Math.round(scrollY / vh), SECTION_IDS.length - 1);
    const next = SECTION_IDS[idx];
    if (next !== activeSect.current) {
      const oldEl = navRefs.current[activeSect.current];
      if (oldEl) { oldEl.style.color = ''; }
      const newEl = navRefs.current[next];
      if (newEl) { newEl.style.color = '#efefef'; }
      activeSect.current = next;
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (!headerRef.current) return;
    gsap.fromTo(headerRef.current, { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: 0.3 });
  }, []);

  const scrollTo = useCallback((href: string, e: React.MouseEvent) => {
    e.preventDefault();
    const id  = href.replace("#", "");
    const idx = SECTION_IDS.indexOf(id);
    if (idx >= 0) window.scrollTo({ top: idx * window.innerHeight, behavior: "smooth" });
    setMenuOpen(false);
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{ background: 'transparent', borderBottom: '1px solid transparent' }}
      >
        <div
          className="flex items-center justify-between"
          style={{ padding: '0 1.5rem', height: '3.25rem', maxWidth: '90rem', margin: '0 auto' }}
        >
          {/* Logo — display serif wordmark */}
          <a
            href="#hero"
            onClick={(e) => scrollTo("#hero", e)}
            className="font-display transition-colors"
            style={{ fontSize: '1.125rem', color: '#2a2a2a', textDecoration: 'none', fontWeight: 400 }}
            onMouseOver={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#efefef')}
            onMouseOut={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#2a2a2a')}
          >
            {profile.githubUsername}
          </a>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-0">
            {NAV_LINKS.map(link => {
              const id = link.href.replace("#", "");
              return (
                <a
                  key={link.href}
                  href={link.href}
                  ref={el => { navRefs.current[id] = el; }}
                  onClick={e => scrollTo(link.href, e)}
                  className="eyebrow transition-colors"
                  style={{
                    padding: '0.4rem 0.85rem', textDecoration: 'none', color: '',
                    borderRadius: '999px',
                  }}
                  onMouseOver={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#efefef')}
                  onMouseOut={e => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    if (id !== activeSect.current) el.style.color = '';
                  }}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Social icons */}
          <div className="hidden md:flex items-center gap-1">
            {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={label}
                className="flex items-center justify-center transition-colors"
                style={{ width: '2rem', height: '2rem', color: '#2a2a2a', borderRadius: '999px' }}
                onMouseOver={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#efefef')}
                onMouseOut={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#2a2a2a')}
              >
                <Icon size={14} />
              </a>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex items-center justify-center transition-colors"
            style={{ width: '2rem', height: '2rem', color: '#444', background: 'none', border: 'none', cursor: 'pointer' }}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0" style={{ height: '1px', background: 'transparent' }}>
          <div ref={progressRef} style={{ height: '100%', background: '#222', width: '0%', transition: 'none' }} />
        </div>
      </header>

      {/* Mobile drawer */}
      {menuOpen && (
        <div
          className="fixed md:hidden z-50"
          style={{ top: '3.25rem', left: 0, right: 0, background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid #111' }}
        >
          <div style={{ padding: '1.25rem 1.5rem', maxWidth: '90rem', margin: '0 auto' }}>
            <div className="flex flex-col gap-0.5 mb-4">
              {NAV_LINKS.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={e => scrollTo(link.href, e)}
                  className="eyebrow transition-colors"
                  style={{ padding: '0.7rem 0', display: 'block', textDecoration: 'none', borderBottom: '1px solid #0e0e0e' }}
                  onMouseOver={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#efefef')}
                  onMouseOut={e => ((e.currentTarget as HTMLAnchorElement).style.color = '')}
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="flex gap-4">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  style={{ color: '#333' }}
                  onMouseOver={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#efefef')}
                  onMouseOut={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#333')}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
