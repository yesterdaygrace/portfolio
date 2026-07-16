import { projects } from "@/data/projects";
import SectionHeader from "@/components/ui/SectionHeader";
import GSAPReveal from "@/components/ui/GSAPReveal";
import { FolderGit2, ExternalLink, Github } from "lucide-react";

export default function Projects() {
  return (
    <section id="projects" className="py-24 border-b border-[#161616]">
      <div className="max-w-6xl mx-auto px-6">
        <GSAPReveal stagger={0.15}>
          <SectionHeader index="04" title="Repositories" comment="Featured technical implementations" />
          
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="reveal-item flex flex-col bg-black border border-[#1e1e1e] hover:border-indigo-500/30 rounded-xl p-6 transition-colors group">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                    <FolderGit2 size={18} className="text-indigo-400" />
                  </div>
                  <div className="flex gap-3 text-neutral-500">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition-colors">
                        <Github size={18} />
                      </a>
                    )}
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition-colors">
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-neutral-100 mb-2 group-hover:text-indigo-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed mb-6 flex-grow">
                  {project.longDescription || project.description}
                </p>
                
                <div className="mt-auto">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span key={t} className="text-xs font-mono text-neutral-500 bg-[#111] px-2 py-1 rounded-md border border-[#1e1e1e]">
                        {t}
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
