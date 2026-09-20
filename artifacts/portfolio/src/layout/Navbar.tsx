import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
function GithubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function MailIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function InstagramIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function MenuIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function XIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
import { profile, socialLinks } from "@/data/profile";
import { sections } from "@/sections";

const NAV_LINKS = sections
  .filter((s) => s.id !== "hero")
  .map((s) => ({ label: s.label, href: `#${s.id}`, id: s.id }));

const SECTION_IDS = sections.map((s) => s.id);

const SOCIAL_LINKS = [
  { icon: GithubIcon, href: socialLinks.github, label: "GitHub" },
  { icon: LinkedinIcon, href: socialLinks.linkedin, label: "LinkedIn" },
  { icon: MailIcon, href: socialLinks.email, label: "Email" },
  { icon: InstagramIcon, href: socialLinks.instagram, label: "Instagram" },
] as const;

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const activeSect = useRef("hero");
  const [activeId, setActiveId] = useState("hero");

  const ticking = useRef(false);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    let current = "hero";
    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 140) {
          current = id;
        }
      }
    }

    if (progressRef.current) {
      progressRef.current.style.width =
        docHeight > 0 ? `${(scrollY / docHeight) * 100}%` : "0%";
    }

    if (headerRef.current) {
      const past = scrollY > 30;
      headerRef.current.style.backgroundColor = past
        ? "rgba(42, 56, 112, 0.95)"
        : "rgba(42, 56, 112, 0.85)";
      headerRef.current.style.borderBottomColor = past
        ? "rgba(232, 216, 92, 0.20)"
        : "rgba(232, 216, 92, 0.12)";
    }

    if (current !== activeSect.current) {
      activeSect.current = current;
      setActiveId(current);
    }
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(() => {
          handleScroll();
          ticking.current = false;
        });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [handleScroll]);
  // Close mobile drawer on Escape or outside click
  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (headerRef.current?.contains(target)) return;
      const drawer = document.querySelector("[data-mobile-drawer]");
      if (drawer?.contains(target)) return;
      setMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [menuOpen]);

  const scrollTo = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const headerHeight = 64;
      const top = el.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-200 backdrop-blur-md border-b"
        style={{
          backgroundColor: "rgba(42, 56, 112, 0.88)",
          borderColor: "rgba(232, 216, 92, 0.12)",
        }}
      >
        <div
          className="flex items-center justify-between"
          style={{
            padding: "0 var(--pad-x)",
            height: "3.5rem",
            maxWidth: "86rem",
            margin: "0 auto",
          }}
        >
          {/* Logo / Brand signature */}
          <a
            href="#hero"
            onClick={(e) => scrollTo("hero", e)}
            className="font-display italic text-lg sm:text-xl tracking-tight transition-colors"
            style={{ color: "var(--c-fg)", textDecoration: "none" }}
          >
            {profile.name}
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 font-mono text-xs tracking-wider">
            {NAV_LINKS.map((link) => {
              const isActive = activeId === link.id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => scrollTo(link.id, e)}
                  className="px-3 py-1.5 transition-colors border border-transparent"
                  style={{
                    color: isActive ? "var(--c-emphasis)" : "var(--c-fg-2)",
                    borderColor: isActive ? "var(--c-border)" : "transparent",
                    backgroundColor: isActive
                      ? "rgba(232, 216, 92, 0.06)"
                      : "transparent",
                  }}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right utility links */}
          <div className="hidden sm:flex items-center gap-2">
            <a
              href={`${import.meta.env.BASE_URL}cv-kevin-chansa.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs px-2.5 py-1 border border-[var(--c-border)] hover:border-[var(--c-fg)] text-[var(--c-fg-2)] hover:text-[var(--c-emphasis)] transition-colors"
            >
              CV (PDF) ↗
            </a>

            <div className="flex items-center gap-1 pl-2 border-l border-[var(--c-border)]">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="flex items-center justify-center p-1.5 text-[var(--c-accent)] hover:text-[var(--c-fg)] transition-colors"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex items-center justify-center p-2 text-[var(--c-fg)]"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-drawer"
          >
            {menuOpen ? <XIcon size={18} /> : <MenuIcon size={18} />}
          </button>
        </div>

        {/* Thin Vellum accent progress bar */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{ height: "1px", background: "transparent" }}
        >
          <div
            ref={progressRef}
            style={{
              height: "100%",
              backgroundColor: "var(--c-accent)",
              width: "0%",
              transition: "none",
            }}
          />
        </div>
      </header>

      {/* Mobile drawer and backdrop scrim */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="fixed inset-0 bg-[#0c1228]/70 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              id="mobile-drawer"
              data-mobile-drawer
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="fixed md:hidden z-50 border-b shadow-2xl"
              style={{
                top: "3.5rem",
                left: 0,
                right: 0,
                backgroundColor: "var(--c-bg-deep)",
                borderColor: "var(--c-border)",
              }}
            >
          <div className="p-6 font-mono text-xs">
            <div className="flex flex-col gap-2 mb-6">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => scrollTo(link.id, e)}
                  className="py-2.5 px-3 border-b border-[rgba(232,216,92,0.12)] flex items-center justify-between"
                  style={{
                    color:
                      activeId === link.id
                        ? "var(--c-emphasis)"
                        : "var(--c-fg)",
                  }}
                >
                  <span>{link.label}</span>
                  <span className="text-[var(--c-accent)]">→</span>
                </a>
              ))}
              <a
                href={`${import.meta.env.BASE_URL}cv-kevin-chansa.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 border-b border-[rgba(232,216,92,0.12)] flex items-center justify-between font-semibold"
                style={{ color: "var(--c-emphasis)" }}
              >
                <span>Download CV (PDF)</span>
                <span>↗</span>
              </a>
            </div>

            <div className="flex items-center gap-4 pt-2 text-[var(--c-accent)]">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="p-1.5 hover:text-[var(--c-fg)] transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
  </>
  );
}
