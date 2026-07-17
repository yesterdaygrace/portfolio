import { skillCategories } from "@/data/skills";
import * as Icons from "lucide-react";
import { useState } from "react";

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

function IconTile({ name }: { name: string }) {
  const slug = ICON_MAP[name]!;
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="flex items-center justify-center cursor-default transition-colors"
        style={{
          width: '2.25rem', height: '2.25rem',
          borderRadius: '0.5rem',
          background: '#050505',
          border: '1px solid #141414',
        }}
        onMouseOver={e => (e.currentTarget.style.borderColor = '#252525')}
        onMouseOut={e => (e.currentTarget.style.borderColor = '#141414')}
      >
        <img
          src={`https://cdn.simpleicons.org/${slug}/505050`}
          alt={name} width={16} height={16}
          style={{ opacity: 0.7, transition: 'opacity .2s' }}
          onMouseOver={e => ((e.currentTarget as HTMLImageElement).style.opacity = '1')}
          onMouseOut={e => ((e.currentTarget as HTMLImageElement).style.opacity = '0.7')}
          onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
        />
      </div>
      {hovered && (
        <div
          className="absolute pointer-events-none font-sans"
          style={{
            top: '-1.75rem', left: '50%', transform: 'translateX(-50%)',
            background: '#111', border: '1px solid #222',
            color: '#888', fontSize: '0.625rem', letterSpacing: '0.05em',
            padding: '0.15rem 0.5rem', borderRadius: '0.25rem',
            whiteSpace: 'nowrap', zIndex: 20,
          }}
        >
          {name}
        </div>
      )}
    </div>
  );
}

function TextPill({ name }: { name: string }) {
  return (
    <span
      className="font-sans"
      style={{
        fontSize: '0.625rem', textTransform: 'uppercase', letterSpacing: '0.1em',
        color: '#2e2e2e', border: '1px solid #141414',
        padding: '0.2rem 0.6rem', borderRadius: '999px',
      }}
    >
      {name}
    </span>
  );
}

export default function TechStack() {
  return (
    <section
      id="stack"
      className="min-h-[100dvh] flex flex-col justify-center py-24 px-6 md:px-12 lg:px-20"
      style={{ maxWidth: '90rem', margin: '0 auto', width: '100%' }}
    >
      {/* Section label */}
      <div className="reveal-item mb-16">
        <span className="eyebrow">[ 03 ] — Stack</span>
      </div>

      {/* 2×2 bento grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {skillCategories.map((cat) => {
          // @ts-ignore
          const Icon = Icons[cat.icon] || Icons.Code;
          const withIcon = cat.skills.filter(s => !!ICON_MAP[s.name]);
          const withText  = cat.skills.filter(s => !ICON_MAP[s.name]);

          return (
            <div
              key={cat.id}
              className="reveal-item card-elev flex flex-col gap-6 p-7"
            >
              {/* Header */}
              <div>
                <h3
                  className="display-heading mb-1"
                  style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', color: '#efefef' }}
                >
                  {cat.name}
                </h3>
                <p className="eyebrow">{cat.description}</p>
              </div>

              {/* Icon row */}
              {withIcon.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {withIcon.map(s => <IconTile key={s.name} name={s.name} />)}
                </div>
              )}

              {/* Text pills */}
              {withText.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {withText.map(s => <TextPill key={s.name} name={s.name} />)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
