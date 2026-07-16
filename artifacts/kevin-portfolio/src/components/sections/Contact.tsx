import { profile, socialLinks } from "@/data/profile";
import SectionHeader from "@/components/ui/SectionHeader";
import GSAPReveal from "@/components/ui/GSAPReveal";
import { Mail, ArrowRight } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-32">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <GSAPReveal stagger={0.15}>
          <div className="reveal-item inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#1e1e1e] bg-[#050505] text-neutral-400 text-xs font-mono mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Connection Open
          </div>
          
          <h2 className="reveal-item text-4xl md:text-5xl font-bold text-neutral-100 mb-6 tracking-tight">
            Initiate Handshake.
          </h2>
          
          <p className="reveal-item text-neutral-400 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            I am currently {profile.availability.toLowerCase()}. Whether you have a question, a project proposal, or just want to say hi, I'll try my best to get back to you!
          </p>
          
          <div className="reveal-item">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black hover:bg-neutral-200 rounded-md font-medium transition-colors"
            >
              <Mail size={18} />
              Say Hello
              <ArrowRight size={18} className="ml-2" />
            </a>
          </div>

          <div className="reveal-item mt-32 pt-8 border-t border-[#1e1e1e] flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-neutral-500 text-sm font-mono">
              Designed & Built by {profile.name}
            </p>
            <div className="flex items-center gap-4">
              {Object.entries(socialLinks).map(([name, url]) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-mono text-neutral-500 hover:text-indigo-400 capitalize transition-colors"
                >
                  {name}
                </a>
              ))}
            </div>
          </div>
        </GSAPReveal>
      </div>
    </section>
  );
}
