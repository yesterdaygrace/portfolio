import { profile } from "@/data/profile";
import SectionHeader from "@/components/ui/SectionHeader";
import GSAPReveal from "@/components/ui/GSAPReveal";

export default function About() {
  return (
    <section id="about" className="py-24 border-b border-[#161616]">
      <div className="max-w-6xl mx-auto px-6">
        <GSAPReveal>
          <SectionHeader index="01" title="System.out.About" comment="Initialize profile background" />
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <p className="reveal-item text-neutral-400 leading-relaxed text-base">
                I am a Software Engineer based in {profile.location}. My work centers around architecting and building practical software systems that solve real-world problems.
              </p>
              <p className="reveal-item text-neutral-400 leading-relaxed text-base">
                I specialize in both frontend UI engineering and backend infrastructure, constructing full-stack applications with a focus on maintainability, performance, and clean code principles. From conceptualizing normalized relational databases to polishing the final DOM interactions, I oversee the complete lifecycle of a web application.
              </p>
            </div>
            
            <div className="reveal-item">
              <div className="p-6 bg-black border border-[#1e1e1e] rounded-lg shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="font-mono text-sm space-y-4 relative z-10">
                  <div className="flex gap-2">
                    <span className="text-indigo-500">&gt;</span>
                    <span className="text-neutral-300">Kevin.getCurrentFocus()</span>
                  </div>
                  <div className="text-neutral-500 pl-4">
                    "Building robust full-stack architectures and expanding my open-source footprint."
                  </div>
                  <div className="flex gap-2 mt-4">
                    <span className="text-indigo-500">&gt;</span>
                    <span className="text-neutral-300">Kevin.getCoreValues()</span>
                  </div>
                  <div className="text-neutral-500 pl-4">
                    ["Clean Architecture", "User-Centric Design", "Continuous Iteration"]
                  </div>
                </div>
              </div>
            </div>
          </div>
        </GSAPReveal>
      </div>
    </section>
  );
}
