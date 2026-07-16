import { useState, useEffect, useCallback } from "react";
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

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    setScrolled(scrollY > 10);
    setScrollProgress(docHeight > 0 ? (scrollY / docHeight) * 100 : 0);

    const sections = ["hero", "about", "experience", "stack", "projects", "github-activity", "contact"];
    for (const id of [...sections].reverse()) {
      const el = document.getElementById(id);
      if (el && scrollY >= el.offsetTop - 100) {
        setActiveSection(id);
        break;
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Entrance animation for Navbar
  useEffect(() => {
    gsap.fromTo(
      ".navbar-anim",
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.1 }
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
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 navbar-anim",
          scrolled ? "bg-black/90 backdrop-blur-xl border-b border-[#161616]" : "bg-transparent"
        )}
      >
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between gap-6">
          <a
            href="#hero"
            onClick={(e) => scrollTo("#hero", e)}
            className="flex items-center gap-2 group flex-shrink-0 navbar-anim"
          >
            <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center group-hover:bg-indigo-500 transition-colors">
              <Terminal size={12} className="text-black" />
            </div>
            <span className="font-mono text-sm text-neutral-100 group-hover:text-indigo-400 transition-colors">
              {profile.githubUsername}
              <span className="text-neutral-600">.dev</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-0.5 flex-1 justify-center navbar-anim">
            {NAV_LINKS.map((link) => {
              const id = link.href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => scrollTo(link.href, e)}
                  className={cn(
                    "px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-150",
                    isActive
                      ? "text-indigo-400 bg-indigo-500/10"
                      : "text-neutral-500 hover:text-neutral-200 hover:bg-[#111]"
                  )}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-1 flex-shrink-0 navbar-anim">
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

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-8 h-8 flex items-center justify-center text-neutral-400 navbar-anim"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <div className="absolute bottom-0 left-0 h-px w-full bg-[#161616]">
          <div
            className="h-full bg-indigo-600/60 transition-all duration-75"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </header>

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
