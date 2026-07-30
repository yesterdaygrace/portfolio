import { profile, socialLinks } from "@/data/profile";
import {
  ArrowUpRight,
  Code2,
  GitBranch,
  FolderGit2,
  Users,
} from "lucide-react";

/* ── Stats data ────────────────────────────────────────────────────────────── */

const STATS = [
  { icon: FolderGit2,      value: "4",  label: "Projects Delivered" },
  { icon: GitBranch,  value: "2+",   label: "Years Coding" },
] as const;

/* ── Keyframes ─────────────────────────────────────────────────────────────── */

const heroKeyframes = `
@keyframes scrollCueBounce {
  0%, 100% { transform: translateY(0); opacity: 0.6; }
  50%      { transform: translateY(6px); opacity: 1; }
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes glowPulse {
  0%, 100% { opacity: 0.35; transform: scale(1); }
  50%      { opacity: 0.55; transform: scale(1.05); }
}

.hero-fade {
  animation: fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  opacity: 0;
}
`;

/* ── Portrait ─────────────────────────────────────────────────────────────── */

function PortraitImage() {
  return (
    <img
      src="/profil.jpeg"
      alt="Kevin Van Diesel Chansa"
      className="w-full h-full object-cover"
      style={{ borderRadius: "50%" }}
    />
  );
}

/* ── Component ─────────────────────────────────────────────────────────────── */

export default function Hero() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: heroKeyframes }} />

      <section
        id="hero"
        className="relative min-h-[100dvh] flex flex-col justify-center py-24 px-6 md:px-12 lg:px-20"
        style={{ maxWidth: "90rem", margin: "0 auto", width: "100%" }}
      >
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 lg:gap-20 items-center">
          {/* ══════════ Portrait — first on mobile, right on desktop ════════ */}
          <div className="flex items-center justify-center order-1 md:order-2 mb-8 md:mb-0">
            <div
              className="hero-fade relative"
              style={{
                animationDelay: "0.2s",
                width: "clamp(200px, 50vw, 400px)",
              }}
            >
              {/* Radial glow behind portrait */}
              <div
                className="absolute pointer-events-none"
                style={{
                  width: "120%",
                  height: "120%",
                  top: "-10%",
                  left: "-10%",
                  background:
                    "radial-gradient(circle at center, rgba(167,139,250,0.08) 0%, transparent 70%)",
                  animation: "glowPulse 4s ease-in-out infinite",
                }}
              />

              {/* Portrait frame */}
              <div
                className="relative overflow-hidden"
                style={{
                  width: "100%",
                  aspectRatio: "1 / 1",
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "#080808",
                }}
              >
                <PortraitImage />
              </div>
            </div>
          </div>

          {/* ══════════ Left column — content ═══════════════════════════════ */}
          <div className="flex flex-col order-2 md:order-1">
            {/* Location + labels */}
            <div
              className="hero-fade font-sans text-[11px] uppercase tracking-[0.16em] mb-6"
              style={{ color: "#8E8E8E", animationDelay: "0s" }}
            >
              {profile.location}
              <span aria-hidden className="mx-2" style={{ color: "#2A2A2A" }}>
                ·
              </span>
            </div>

            {/* Name — editorial serif, two lines */}
            <h1
              className="hero-fade font-display leading-none tracking-tight mb-5"
              style={{
                fontSize: "clamp(3.2rem, 7vw, 5.5rem)",
                animationDelay: "0.12s",
              }}
            >
              <span className="block" style={{ color: "#FFFFFF" }}>
                Kevin Van Diesel
              </span>
              <span className="block" style={{ color: "#FFFFFF" }}>
                Chansa
              </span>
            </h1>

            {/* Role — uppercase, accent */}
            <div
              className="hero-fade font-sans text-xs font-semibold uppercase tracking-[0.18em] mb-5"
              style={{ color: "#a78bfa", animationDelay: "0.24s" }}
            >
              Full-Stack Software Engineer
            </div>

            {/* Value proposition */}
            <p
              className="hero-fade leading-relaxed mb-8"
              style={{
                color: "#C8C8C8",
                fontSize: "0.9375rem",
                lineHeight: "1.8",
                maxWidth: "520px",
                animationDelay: "0.36s",
              }}
            >
              {profile.headline}. {profile.summary}
            </p>

            {/* CTA Buttons */}
            <div
              className="hero-fade flex flex-wrap gap-3 mb-12"
              style={{ animationDelay: "0.48s" }}
            >
              {/* Primary */}
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({
                    top: window.innerHeight * 4,
                    behavior: "smooth",
                  });
                }}
                className="inline-flex items-center gap-1.5 font-sans text-sm font-medium transition-all duration-200"
                style={{
                  background: "#FFFFFF",
                  color: "#000000",
                  padding: "0.65rem 1.5rem",
                  borderRadius: "10px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 24px rgba(255,255,255,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                View Projects
              </a>

              {/* Secondary — purple outline */}
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-1.5 font-sans text-sm font-medium transition-all duration-200"
                style={{
                  color: "#a78bfa",
                  border: "1px solid rgba(167,139,250,0.3)",
                  padding: "0.65rem 1.5rem",
                  borderRadius: "10px",
                  background: "transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.borderColor = "rgba(167,139,250,0.6)";
                  e.currentTarget.style.background =
                    "rgba(167,139,250,0.06)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor =
                    "rgba(167,139,250,0.3)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                Get In Touch
              </a>

              {/* Tertiary — dark outline */}
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-sans text-sm font-medium transition-all duration-200"
                style={{
                  color: "#8E8E8E",
                  border: "1px solid rgba(255,255,255,0.08)",
                  padding: "0.65rem 1.5rem",
                  borderRadius: "10px",
                  background: "transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.borderColor =
                    "rgba(255,255,255,0.2)";
                  e.currentTarget.style.color = "#d4d4d4";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor =
                    "rgba(255,255,255,0.08)";
                  e.currentTarget.style.color = "#8E8E8E";
                }}
              >
                GitHub
                <ArrowUpRight
                  size={13}
                  className="transition-transform duration-200"
                  style={{ color: "inherit" }}
                />
              </a>
            </div>

            {/* Statistics row */}
            <div
              className="hero-fade grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12"
              style={{ animationDelay: "0.6s" }}
            >
              {STATS.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label}>
                    <div
                      className="flex items-center gap-2.5 mb-1"
                      style={{ color: "#555" }}
                    >
                      <Icon size={14} />
                    </div>
                    <div
                      className="font-display leading-none tracking-tight mb-0.5"
                      style={{
                        fontSize: "1.6rem",
                        color: "#FFFFFF",
                      }}
                    >
                      {stat.value || "—"}
                    </div>
                    <div
                      className="font-sans text-[11px] uppercase tracking-[0.06em]"
                      style={{ color: "#8E8E8E" }}
                    >
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>

        {/* Scroll indicator — vertical, right edge */}
        <div
          className="hero-fade absolute hidden md:flex items-center"
          style={{
            right: "0rem",
            top: "40%",
            transform: "translateY(-50%)",
            animationDelay: "0.72s",
            zIndex: 20,
          }}
        >
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({
                top: window.innerHeight,
                behavior: "smooth",
              });
            }}
            className="flex flex-col items-center gap-3 transition-colors duration-200"
            style={{ color: "#555" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#999";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#555";
            }}
          >
            <span
              className="font-sans text-[10px] uppercase tracking-[0.2em] whitespace-nowrap"
              style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
            >
              Explore my work
            </span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden="true"
              style={{
                animation: "scrollCueBounce 2s ease-in-out infinite",
              }}
            >
              <path
                d="M4 2.5L7.5 6L4 9.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </section>
    </>
  );
}
