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
  "HTML5 / CSS3": "html5",
  "Vite": "vite",
  "Next.js": "nextdotjs",
  "Laravel": "laravel",
  "PHP 8+": "php",
  "MySQL / MariaDB": "mysql",
  "Eloquent ORM": "laravel",
  "Linux (Debian / Ubuntu)": "linux",
  "Nginx": "nginx",
  "Bash Scripting": "gnubash",
  "Git & GitHub": "github",
  "SSL/TLS": "letsencrypt",
  "React": "react",
  "Node.js": "nodedotjs",
  "PostgreSQL": "postgresql",
  "Docker": "docker",
  "Redis": "redis",
  "GraphQL": "graphql",
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
      <div className="w-8 h-8 rounded-md bg-[#0a0a0a] border border-[#1e1e1e] hover:border-indigo-500/40 flex items-center justify-center transition-colors cursor-default">
        <img
          src={`https://cdn.simpleicons.org/${slug}/818cf8`}
          alt={name}
          width={16}
          height={16}
          className="opacity-75 hover:opacity-100 transition-opacity"
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
    <span className="px-2 py-0.5 text-[11px] text-neutral-500 bg-[#0a0a0a] border border-[#1a1a1a] rounded font-mono leading-none">
      {name}
    </span>
  );
}

export default function TechStack() {
  return (
    <section id="stack" className="py-24 border-b border-[#161616]">
      <div className="max-w-6xl mx-auto px-6">
        <GSAPReveal stagger={0.1}>
          <SectionHeader index="03" title="Dependencies" comment="Core technologies & methodologies" />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {skillCategories.map((category) => {
              // @ts-ignore
              const Icon = Icons[category.icon] || Icons.Code;

              const withIcon = category.skills.filter((s) => !!ICON_MAP[s.name]);
              const withText  = category.skills.filter((s) => !ICON_MAP[s.name]);

              return (
                <div
                  key={category.id}
                  className="reveal-item flex flex-col bg-[#030303] border border-[#1a1a1a] hover:border-[#252525] rounded-xl p-5 gap-4 transition-colors group"
                >
                  {/* Category header */}
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#0d0d0d] border border-[#222] flex items-center justify-center group-hover:border-indigo-500/30 transition-colors shrink-0">
                      <Icon size={14} className="text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-neutral-100 leading-none">{category.name}</h3>
                      <p className="text-[10px] text-neutral-600 font-mono mt-1">{category.description}</p>
                    </div>
                  </div>

                  {/* Icon grid — only when logo skills exist */}
                  {withIcon.length > 0 && (
                    <div>
                      <p className="text-[9px] font-mono text-neutral-700 uppercase tracking-widest mb-2">icons</p>
                      <div className="flex flex-wrap gap-1.5">
                        {withIcon.map((s) => <IconTile key={s.name} name={s.name} />)}
                      </div>
                    </div>
                  )}

                  {/* Text pills — only when no-logo skills exist */}
                  {withText.length > 0 && (
                    <div>
                      <p className="text-[9px] font-mono text-neutral-700 uppercase tracking-widest mb-2">technical</p>
                      <div className="flex flex-wrap gap-1.5">
                        {withText.map((s) => <TextPill key={s.name} name={s.name} />)}
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
