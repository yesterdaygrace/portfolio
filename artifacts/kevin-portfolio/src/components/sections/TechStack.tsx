import { skillCategories } from "@/data/skills";
import * as Icons from "lucide-react";

/* ── simpleicons lookup ───────────────────────────────────────────────────── */

const ICON_MAP: Record<string, string> = {
  "Vue.js 3":              "vuedotjs",
  "TypeScript":            "typescript",
  "JavaScript ES2022+":    "javascript",
  "Tailwind CSS":          "tailwindcss",
  "Alpine.js":             "alpinedotjs",
  "Vite":                  "vite",
  "Next.js":               "nextdotjs",
  "HTML5 / CSS3":          "html5",
  "Laravel":               "laravel",
  "PHP 8+":                "php",
  "Node.js":               "nodedotjs",
  "MySQL / MariaDB":       "mysql",
  "PostgreSQL":            "postgresql",
  "Eloquent ORM":          "laravel",
  "Linux (Debian / Ubuntu)":"linux",
  "Nginx":                 "nginx",
  "Git & GitHub":          "github",
  "Docker":                "docker",
  "Bash Scripting":        "gnubash",
  "SSL/TLS":               "letsencrypt",
  "Redis":                 "redis",
};

/* ── Monochrome icon tile ─────────────────────────────────────────────────── */

function IconTile({ name }: { name: string }) {
  const slug = ICON_MAP[name];
  if (!slug) return null;

  return (
    <div
      className="flex items-center justify-center flex-shrink-0 transition-all duration-200"
      style={{
        width: "2.5rem",
        height: "2.5rem",
        borderRadius: "10px",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.16)";
        e.currentTarget.style.background = "rgba(255,255,255,0.06)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
        e.currentTarget.style.background = "rgba(255,255,255,0.03)";
      }}
    >
      <img
        src={`https://cdn.simpleicons.org/${slug}/888888`}
        alt={name}
        width={20}
        height={20}
        loading="lazy"
        style={{ filter: "brightness(1)", transition: "opacity 0.2s" }}
        onMouseOver={(e) => {
          (e.currentTarget as HTMLImageElement).style.opacity = "1";
        }}
        onMouseOut={(e) => {
          (e.currentTarget as HTMLImageElement).style.opacity = "0.7";
        }}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = "none";
        }}
      />
    </div>
  );
}

/* ── Tech tag pill ────────────────────────────────────────────────────────── */

function TagPill({ name }: { name: string }) {
  return (
    <span
      className="font-sans text-[10px] uppercase tracking-[0.08em] font-medium transition-all duration-200"
      style={{
        color: "#9B9B9B",
        border: "1px solid rgba(255,255,255,0.08)",
        padding: "0.25rem 0.7rem",
        borderRadius: "999px",
        lineHeight: 1.4,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
        e.currentTarget.style.color = "#d4d4d4";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
        e.currentTarget.style.color = "#9B9B9B";
      }}
    >
      {name}
    </span>
  );
}

/* ── Main Section ─────────────────────────────────────────────────────────── */

export default function TechStack() {
  return (
    <section
      id="stack"
      className="py-24 px-6 md:px-12 lg:px-20"
      style={{ maxWidth: "90rem", margin: "0 auto", width: "100%" }}
    >
      {/* ── Section header ─────────────────────────────────────────────── */}
      <div className="reveal-item mb-14">
        <span
          className="font-sans text-[11px] uppercase tracking-[0.16em] block mb-4"
          style={{ color: "#606060" }}
        >
          [03] — Stack
        </span>
         <div className="w-full" style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />
      </div>

      {/* ── 2×2 grid ──────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {skillCategories.map((cat, i) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const Icon = (Icons as any)[cat.icon] ?? Icons.Code;
          const withIcon = cat.skills.filter((s) => !!ICON_MAP[s.name]);
          const withText = cat.skills.filter((s) => !ICON_MAP[s.name]);

          return (
            <div
              key={cat.id}
              className="reveal-item flex flex-col gap-5 p-7 transition-all duration-200 ease-out"
              style={{
                background: "#101010",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "16px",
                transition:
                  "transform 200ms ease-out, border-color 200ms ease-out, box-shadow 200ms ease-out",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.borderColor =
                  "rgba(255,255,255,0.14)";
                e.currentTarget.style.boxShadow =
                  "0 12px 32px rgba(0,0,0,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor =
                  "rgba(255,255,255,0.06)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Header */}
              <div className="flex items-center gap-3">
                <div
                  className="flex items-center justify-center flex-shrink-0"
                  style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    borderRadius: "10px",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <Icon size={18} className="text-[#888]" />
                </div>
                <div>
                  <h3
                    className="font-display leading-tight tracking-tight"
                    style={{
                      fontSize: "clamp(1.3rem, 2vw, 1.6rem)",
                      color: "#F2F2F2",
                    }}
                  >
                    {cat.name}
                  </h3>
                  <p
                    className="font-sans text-[11px] uppercase tracking-[0.1em] mt-0.5"
                    style={{ color: "#707070" }}
                  >
                    {cat.description}
                  </p>
                </div>
              </div>

              {/* Icon tiles */}
              {withIcon.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {withIcon.map((s) => (
                    <IconTile key={s.name} name={s.name} />
                  ))}
                </div>
              )}

              {/* Text tags */}
              {withText.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {withText.map((s) => (
                    <TagPill key={s.name} name={s.name} />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
