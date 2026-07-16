import { skillCategories } from "@/data/skills";
import SectionHeader from "@/components/ui/SectionHeader";
import GSAPReveal from "@/components/ui/GSAPReveal";
import * as Icons from "lucide-react";

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
                <div key={category.id} className="reveal-item bg-black border border-[#1e1e1e] hover:border-[#2a2a2a] p-6 rounded-xl transition-all group">
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
                      <span key={skill.name} className="px-2 py-1 text-xs text-neutral-400 bg-[#111] border border-[#1e1e1e] rounded-md">
                        {skill.name}
                      </span>
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
