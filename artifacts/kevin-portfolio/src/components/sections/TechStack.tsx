import { skillCategories } from "@/data/skills";
import SectionHeader from "@/components/ui/SectionHeader";
import GSAPReveal from "@/components/ui/GSAPReveal";
import * as Icons from "lucide-react";
import { useState } from "react";

// Maps skill name → Simple Icons slug (https://simpleicons.org)
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

function SkillIcon({ name }: { name: string }) {
  const slug = ICON_MAP[name];
  const [tooltip, setTooltip] = useState(false);

  if (slug) {
    return (
      <div
        className="relative flex items-center justify-center"
        onMouseEnter={() => setTooltip(true)}
        onMouseLeave={() => setTooltip(false)}
      >
        <div className="w-9 h-9 rounded-lg bg-[#0d0d0d] border border-[#1e1e1e] hover:border-indigo-500/50 flex items-center justify-center transition-colors cursor-default">
          <img
            src={`https://cdn.simpleicons.org/${slug}/a5b4fc`}
            alt={name}
            width={18}
            height={18}
            className="opacity-80 hover:opacity-100 transition-opacity"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
          />
        </div>
        {tooltip && (
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#1a1a1a] border border-[#2a2a2a] text-neutral-200 text-[10px] font-mono px-2 py-1 rounded whitespace-nowrap z-10 pointer-events-none">
            {name}
          </div>
        )}
      </div>
    );
  }

  // Fallback: text badge for skills without a logo
  return (
    <span className="px-2.5 py-1 text-[11px] text-neutral-400 bg-[#0d0d0d] border border-[#1e1e1e] rounded-md font-mono leading-none">
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {skillCategories.map((category) => {
              // @ts-ignore
              const Icon = Icons[category.icon] || Icons.Code;
              return (
                <div
                  key={category.id}
                  className="reveal-item bg-black border border-[#1e1e1e] hover:border-[#2a2a2a] p-6 rounded-xl transition-all group"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-9 h-9 rounded-lg bg-[#111] border border-[#2a2a2a] flex items-center justify-center group-hover:border-indigo-500/50 transition-colors">
                      <Icon size={16} className="text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-neutral-100 tracking-tight">{category.name}</h3>
                      <p className="text-[11px] text-neutral-500 font-mono mt-0.5">{category.description}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <SkillIcon key={skill.name} name={skill.name} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </GSAPReveal>
      </div>
    </section>
  );
}
