import { experiences } from "@/data/experience";
import SectionHeader from "@/components/ui/SectionHeader";
import GSAPReveal from "@/components/ui/GSAPReveal";
import { Briefcase } from "lucide-react";

export default function Experience() {
  return (
    <section id="experience" className="py-24 border-b border-[#161616]">
      <div className="max-w-6xl mx-auto px-6">
        <GSAPReveal>
          <SectionHeader index="02" title="Runtime Execution" comment="Professional experience & roles" />
          
          <div className="space-y-8 relative before:absolute before:inset-y-0 before:left-[15px] before:w-px before:bg-[#1e1e1e]">
            {experiences.map((exp) => (
              <div key={exp.id} className="reveal-item relative pl-12">
                <div className="absolute left-0 top-1.5 w-8 h-8 rounded-full bg-black border border-[#2a2a2a] flex items-center justify-center z-10">
                  <Briefcase size={14} className="text-indigo-400" />
                </div>
                
                <div className="bg-black border border-[#1e1e1e] hover:border-[#2a2a2a] rounded-xl p-6 transition-colors group">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-100 group-hover:text-indigo-400 transition-colors">
                        {exp.role}
                      </h3>
                      <p className="text-neutral-500 text-sm mt-1">{exp.company} • {exp.type}</p>
                    </div>
                    <div className="text-left md:text-right">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono bg-[#111] text-neutral-400 border border-[#2a2a2a]">
                        {exp.period}
                      </span>
                    </div>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    {exp.description.map((desc, idx) => (
                      <li key={idx} className="text-sm text-neutral-400 flex items-start gap-3">
                        <span className="text-indigo-500/50 mt-1 block font-mono text-xs">▹</span>
                        <span className="leading-relaxed">{desc}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((tech) => (
                      <span key={tech} className="px-2 py-1 text-xs font-mono text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 rounded-md">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GSAPReveal>
      </div>
    </section>
  );
}
