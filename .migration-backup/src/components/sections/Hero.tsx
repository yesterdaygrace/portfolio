"use client";

import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  ArrowUpRight,
  ChevronDown,
  MapPin,
} from "lucide-react";
import AnimatedGrid from "@/components/ui/AnimatedGrid";
import { profile, socialLinks } from "@/data/profile";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export default function Hero() {
  const scrollDown = () =>
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center border-b border-[#161616] overflow-hidden"
    >
      <AnimatedGrid variant="lines" opacity={0.025} />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 30% 50%, rgba(99,102,241,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center"
        >
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 font-mono text-xs text-neutral-500 bg-[#0d0d0d] border border-[#1e1e1e] px-3 py-1.5 rounded-full">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
              {profile.availability}
            </span>
          </motion.div>

          <motion.div variants={item} className="mt-6">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-neutral-100">
              {profile.name}
            </h1>
          </motion.div>

          <motion.div variants={item} className="mt-6 space-y-3 max-w-3xl">
            <p className="text-neutral-300 leading-relaxed text-base">
              {profile.headline}
            </p>
            <p className="text-neutral-500 leading-relaxed text-sm">
              {profile.summary}
            </p>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-8 flex flex-wrap justify-center gap-3"
          >
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-neutral-100 text-neutral-900 rounded-lg text-sm font-medium hover:bg-white transition-colors"
            >
              <Github size={14} />
              GitHub
              <ArrowUpRight size={12} className="opacity-50" />
            </a>

            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-[#0d0d0d] border border-[#2a2a2a] text-neutral-300 rounded-lg text-sm font-medium hover:border-[#3a3a3a] hover:text-neutral-100 transition-all"
            >
              <Linkedin size={14} />
              LinkedIn
            </a>

            <a
              href={socialLinks.email}
              className="flex items-center gap-2 px-4 py-2 bg-[#0d0d0d] border border-[#2a2a2a] text-neutral-300 rounded-lg text-sm font-medium hover:border-[#3a3a3a] hover:text-neutral-100 transition-all"
            >
              <Mail size={14} />
              Email
            </a>
          </motion.div>

          <motion.div variants={item} className="mt-6">
            <div className="flex items-center gap-2 mt-2">
              <MapPin size={12} className="text-neutral-600" />
              <span className="text-xs text-neutral-600 font-mono">
                {profile.location} · Remote-friendly
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <button
        onClick={scrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-neutral-700 hover:text-neutral-400 transition-colors animate-bounce z-10"
        aria-label="Scroll down"
      >
        <ChevronDown size={20} />
      </button>
    </section>
  );
}
