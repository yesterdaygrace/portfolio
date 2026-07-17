import { skillCategories } from "@/data/skills";
import SectionHeader from "@/components/ui/SectionHeader";
import GSAPReveal from "@/components/ui/GSAPReveal";
import * as Icons from "lucide-react";
import { useState } from "react";

const ICON_MAP: Record<string, string> = {
  "Vue.js 3": "vuedotjs",
  "TypeScript": "typescript",
  "JavaScript ES2022+": "javascript",
  "Tailwind CSS": "tailwindcss",
  "Alpine.js": "alpinedotjs",
  "Vite": "vite",
  "Next.js": "nextdotjs",
  "HTML5 / CSS3": "html5",
  "Laravel": "laravel",
  "PHP 8+": "php",
  "Node.js": "nodedotjs",
  "MySQL / MariaDB": "mysql",
  "PostgreSQL": "postgresql",
  "Eloquent ORM": "laravel",
  "Linux (Debian / Ubuntu)": "linux",
  "Nginx": "nginx",
  "Git & GitHub": "github",
  "Docker": "docker",
  "Bash Scripting": "gnubash",
  "SSL/TLS": "letsencrypt",
  "Redis": "redis",
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
      <div className="w-9 h-9 rounded-lg bg-[#0a0a0a] border border-[#1e1e1e] hover:border-indigo-500/40 flex items-center justify-center transition-colors cursor-default group">
        <img
          src={`https://cdn.simpleicons.org/${slug}/818cf8`}
          alt={name}
          width={18}
          height={18}
          className="opacity-70 group-hover:opacity-100 transition-opacity"
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
        />
      </div>
      {hovered && (
        <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#111] border border-[#2a2a2a] text-neutral-300 text-[10px] font-mono px-2 py-0.5 rounded whitespace-nowrap z-20 pointer-events-none">
          {name}
        </div>
      )}
    </div>
  );
}

function TextPill({ name }: { name: string }) {
  return (
    <span className="px-2 py-1 text-[11px] text-neutral-500 bg-[#0a0a0a] border border-[#1a1a1a] rounded font-mono leading-none">
      {name}
    </span>
  );
}

export default function TechStack() {
  return (
    <section id="stack" className="py-24 border-b border-[#161616]">
      <div className="max-w-6xl mx-auto px-6">
        <GSAPReveal stagger={0.12}>
          <SectionHeader index="03" title="Dependencies" comment="Core technologies & methodologies" />

          {/* 2×2 bento grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {skillCategories.map((category) => {
              // @ts-ignore
              const Icon = Icons[category.icon] || Icons.Code;

              const withIcon = category.skills.filter((s) => !!ICON_MAP[s.name]);
              const withText  = category.skills.filter((s) => !ICON_MAP[s.name]);

              return (
                <div
                  key={category.id}
                  className="reveal-item flex flex-col bg-[#020202] border border-[#181818] hover:border-[#252525] rounded-2xl p-6 gap-5 transition-colors group"
                >
                  {/* Header */}
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#0d0d0d] border border-[#222] flex items-center justify-center shrink-0 group-hover:border-indigo-500/30 transition-colors">
                      <Icon size={14} className="text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-neutral-100 leading-none tracking-tight">
                        {category.name}
                      </h3>
                      <p className="text-[10px] text-neutral-600 font-mono mt-1">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  {/* Icon row */}
                  {withIcon.length > 0 && (
                    <div className="flex flex-col gap-2">
                      <span className="text-[9px] font-mono text-neutral-700 uppercase tracking-widest">
                        icons
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {withIcon.map((s) => (
                          <IconTile key={s.name} name={s.name} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Text row */}
                  {withText.length > 0 && (
                    <div className="flex flex-col gap-2">
                      <span className="text-[9px] font-mono text-neutral-700 uppercase tracking-widest">
                        technical
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {withText.map((s) => (
                          <TextPill key={s.name} name={s.name} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </GSAPReveal>
      </div>
    </section>
  );
}
