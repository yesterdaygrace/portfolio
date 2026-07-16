import { profile, socialLinks } from "@/data/profile";
import { ArrowRight, Terminal } from "lucide-react";
import GSAPReveal from "@/components/ui/GSAPReveal";

export default function Hero() {
  return (
    <section id="hero" className="min-h-[100dvh] flex items-center pt-14 border-b border-[#161616]">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <GSAPReveal stagger={0.15}>
          <div className="flex flex-col max-w-3xl">
            <div className="reveal-item mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-indigo-400 text-xs font-mono w-fit">
              <Terminal size={14} />
              <span>System initialized</span>
            </div>

            <h1 className="reveal-item text-5xl md:text-7xl font-bold text-neutral-100 tracking-tight leading-[1.1] mb-6">
              Engineering <br />
              <span className="text-gradient-indigo">precise solutions.</span>
            </h1>

            <p className="reveal-item text-lg md:text-xl text-neutral-400 mb-10 max-w-2xl leading-relaxed">
              {profile.headline}. {profile.summary}
            </p>

            <div className="reveal-item flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md text-sm font-medium transition-colors"
              >
                View Architecture
                <ArrowRight size={16} />
              </a>
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#111] hover:bg-[#1a1a1a] border border-[#2a2a2a] text-neutral-300 rounded-md text-sm font-medium transition-colors"
              >
                GitHub Profile
              </a>
            </div>

            <div className="reveal-item mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-[#161616]">
              <div>
                <p className="text-xs text-neutral-600 font-mono mb-1">Status</p>
                <p className="text-sm text-neutral-300">{profile.availability}</p>
              </div>
              <div>
                <p className="text-xs text-neutral-600 font-mono mb-1">Location</p>
                <p className="text-sm text-neutral-300">{profile.location}</p>
              </div>
              <div>
                <p className="text-xs text-neutral-600 font-mono mb-1">Role</p>
                <p className="text-sm text-neutral-300">{profile.role}</p>
              </div>
            </div>
          </div>
        </GSAPReveal>
      </div>
    </section>
  );
}
