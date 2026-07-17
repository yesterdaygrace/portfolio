import { skillCategories } from "@/data/skills";
import SectionHeader from "@/components/ui/SectionHeader";
import GSAPReveal from "@/components/ui/GSAPReveal";
import * as Icons from "lucide-react";

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
  "SSH Management": "openssh",
  "SSL/TLS": "letsencrypt",
  "React": "react",
  "Node.js": "nodedotjs",
  "PostgreSQL": "postgresql",
  "Docker": "docker",
  "Redis": "redis",
  "GraphQL": "graphql",
};

function SkillBadge({ name }: { name: string }) {
  const slug = ICON_MAP[name];
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs text-neutral-300 bg-[#0d0d0d] border border-[#1e1e1e] rounded-md hover:border-indigo-500/40 transition-colors">
      {slug && (
        <img
          src={`https://cdn.simpleicons.org/${slug}/a5b4fc`}
          alt=""
          width={12}
          height={12}
          className="shrink-0 opacity-90"
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
        />
      )}
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
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[#111] border border-[#2a2a2a] flex items-center justify-center group-hover:border-indigo-500/50 transition-colors">
                      <Icon size={18} className="text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="text-base font-medium text-neutral-100">{category.name}</h3>
                      <p className="text-xs text-neutral-500">{category.description}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {category.skills.map((skill) => (
                      <SkillBadge key={skill.name} name={skill.name} />
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
