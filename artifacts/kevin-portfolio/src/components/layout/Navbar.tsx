import { useState, useEffect, useRef, useCallback } from "react";
import { Github, Linkedin, Mail, Instagram, Menu, X, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";
import { profile, socialLinks } from "@/data/profile";
import gsap from "gsap";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Stack", href: "#stack" },
  { label: "Projects", href: "#projects" },
  { label: "GitHub", href: "#github-activity" },
  { label: "Contact", href: "#contact" },
];

const SOCIAL_LINKS = [
  { icon: Github, href: socialLinks.github, label: "GitHub" },
  { icon: Linkedin, href: socialLinks.linkedin, label: "LinkedIn" },
  { icon: Mail, href: socialLinks.email, label: "Email" },
  { icon: Instagram, href: socialLinks.instagram, label: "Instagram" },
] as const;

const SECTION_IDS = ["hero", "about", "experience", "stack", "projects", "github-activity", "contact"];

export default function Navbar() {
  // Only mobile menu uses React state — it's user-triggered, not scroll-driven
  const [menuOpen, setMenuOpen] = useState(false);

  // DOM refs for scroll-driven updates (no re-renders)
  const headerRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const navLinkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const activeSectionRef = useRef("hero");

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    // Progress bar — direct DOM, no state
    if (progressRef.current) {
      const pct = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      progressRef.current.style.width = `${pct}%`;
    }

    // Backdrop — toggle classes directly on the element
    if (headerRef.current) {
      if (scrollY > 10) {
        headerRef.current.classList.add("bg-black/90", "backdrop-blur-xl", "border-b", "border-[#161616]");
        headerRef.current.classList.remove("bg-transparent");
      } else {
        headerRef.current.classList.remove("bg-black/90", "backdrop-blur-xl", "border-b", "border-[#161616]");
        headerRef.current.classList.add("bg-transparent");
      }
    }

    // Active section — if at (or very near) page bottom, snap to last section
    const atBottom =
      docHeight > 0 && scrollY >= docHeight - 8;

    let next = "hero";
    if (atBottom) {
      next = SECTION_IDS[SECTION_IDS.length - 1];
    } else {
      for (const id of [...SECTION_IDS].reverse()) {
        const el = document.getElementById(id);
        if (el && scrollY >= el.offsetTop - 120) {
          next = id;
          break;
        }
      }
    }

    if (next !== activeSectionRef.current) {
      // Deactivate old link
      const old = navLinkRefs.current[activeSectionRef.current];
      if (old) {
        old.classList.remove("text-indigo-400", "bg-indigo-500/10");
        old.classList.add("text-neutral-500");
      }
      // Activate new link
      const cur = navLinkRefs.current[next];
      if (cur) {
        cur.classList.add("text-indigo-400", "bg-indigo-500/10");
        cur.classList.remove("text-neutral-500");
      }
      activeSectionRef.current = next;
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // sync on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Entrance animation — runs once, doesn't conflict with scroll
  useEffect(() => {
    if (!headerRef.current) return;
    gsap.fromTo(
      headerRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
    );
  }, []);

  const scrollTo = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 bg-transparent transition-colors duration-300"
      >
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between gap-6">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => scrollTo("#hero", e)}
            className="flex items-center gap-2 group flex-shrink-0"
          >
            <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center group-hover:bg-indigo-500 transition-colors">
              <Terminal size={12} className="text-black" />
            </div>
            <span className="font-mono text-sm text-neutral-100 group-hover:text-indigo-400 transition-colors">
              {profile.githubUsername}
              <span className="text-neutral-600">.dev</span>
            </span>
          </a>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-0.5 flex-1 justify-center">
            {NAV_LINKS.map((link) => {
              const id = link.href.replace("#", "");
              const isInitialActive = id === "hero";
              return (
                <a
                  key={link.href}
                  href={link.href}
                  ref={(el) => { navLinkRefs.current[id] = el; }}
                  onClick={(e) => scrollTo(link.href, e)}
                  className={cn(
                    "px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-150",
                    isInitialActive
                      ? "text-indigo-400 bg-indigo-500/10"
                      : "text-neutral-500 hover:text-neutral-200 hover:bg-[#111]"
                  )}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Social icons */}
          <div className="hidden md:flex items-center gap-1 flex-shrink-0">
            {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="w-8 h-8 flex items-center justify-center rounded-md text-neutral-500 hover:text-indigo-400 hover:bg-indigo-500/10 transition-all duration-150"
                aria-label={label}
              >
                <Icon size={15} />
              </a>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-8 h-8 flex items-center justify-center text-neutral-400"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Progress bar — updated directly via ref, no React state */}
        <div className="absolute bottom-0 left-0 h-px w-full bg-[#161616]">
          <div
            ref={progressRef}
            className="h-full bg-indigo-500/70"
            style={{ width: "0%" }}
          />
        </div>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed top-14 left-0 right-0 z-40 bg-black/95 backdrop-blur-xl border-b border-[#1e1e1e] md:hidden">
          <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollTo(link.href, e)}
                className="px-3 py-2.5 text-sm text-neutral-400 hover:text-indigo-400 rounded-md hover:bg-indigo-500/10 transition-all"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 mt-2 border-t border-[#1e1e1e] flex items-center gap-3">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-neutral-500 hover:text-indigo-400 transition-colors"
                  aria-label={label}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
