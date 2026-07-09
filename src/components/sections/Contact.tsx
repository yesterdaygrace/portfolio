"use client";

import { Github, Instagram, Linkedin, Mail, MapPin, ArrowUpRight } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeader from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";
import { profile, socialLinks } from "@/data/profile";

type ContactLink = {
  platform: string;
  handle: string;
  description: string;
  href: string;
  icon: React.ElementType;
  color: string;
};

const LINKS: ContactLink[] = [
  {
    platform: "GitHub",
    handle: `@${profile.githubUsername}`,
    description: "Repositories and open-source work",
    href: socialLinks.github,
    icon: Github,
    color: "hover:border-neutral-500/40",
  },
  {
    platform: "LinkedIn",
    handle: profile.name,
    description: "Professional network",
    href: socialLinks.linkedin,
    icon: Linkedin,
    color: "hover:border-blue-500/30",
  },
  {
    platform: "Email",
    handle: profile.email,
    description: "Direct contact",
    href: socialLinks.email,
    icon: Mail,
    color: "hover:border-indigo-500/30",
  },
  {
    platform: "Instagram",
    handle: `@${profile.instagramUsername}`,
    description: "Direct contact",
    href: socialLinks.instagram,
    icon: Instagram,
    color: "hover:border-indigo-500/30",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="relative py-20">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <SectionHeader index="06" title="Contact" comment="get in touch" />
        </ScrollReveal>

        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <ScrollReveal delay={0.05}>
              <h3 className="text-lg font-semibold text-neutral-100 tracking-tight">
                Let&apos;s build something useful
              </h3>
              <p className="text-sm text-neutral-500 leading-relaxed mt-2">
                {profile.availability}. I&apos;m always interested in meaningful
                software projects, product ideas, and collaborations.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="flex items-center gap-2 mt-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-xs text-emerald-400 font-medium">
                  {profile.availability}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <MapPin size={12} className="text-neutral-600" />
                <span className="font-mono text-xs text-neutral-600">
                  {profile.location}
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="bg-[#0d0d0d] border border-[#1e1e1e] rounded-xl p-4 mt-4 font-mono text-xs space-y-1">
                <p className="text-neutral-600"># reach out</p>
                <p>
                  <span className="text-indigo-400">open</span>{" "}
                  <span className="text-emerald-400">{socialLinks.github}</span>
                </p>
                <p>
                  <span className="text-indigo-400">mail</span>{" "}
                  <span className="text-emerald-400">{profile.email}</span>
                </p>
                <p className="text-neutral-600 pt-1">
                  <span className="text-emerald-500">✓</span> response within
                  24h
                </p>
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-3 grid sm:grid-cols-2 gap-3">
            {LINKS.map((link, index) => {
              const Icon = link.icon;
              return (
                <ScrollReveal key={link.platform} delay={0.05 + index * 0.06}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      link.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className={cn(
                      "flex items-center gap-4 bg-[#0d0d0d] border border-[#1e1e1e] rounded-xl p-5 transition-all duration-200 group",
                      link.color,
                    )}
                  >
                    <div className="w-10 h-10 bg-[#111] border border-[#2a2a2a] rounded-lg flex items-center justify-center flex-shrink-0 group-hover:border-[#3a3a3a] transition-colors">
                      <Icon
                        size={18}
                        className="text-neutral-400 group-hover:text-neutral-100 transition-colors"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-neutral-200">
                        {link.platform}
                      </p>
                      <p className="font-mono text-xs text-neutral-600 truncate mt-0.5">
                        {link.handle}
                      </p>
                      <p className="text-xs text-neutral-700 mt-0.5">
                        {link.description}
                      </p>
                    </div>
                    <ArrowUpRight
                      size={14}
                      className="text-neutral-700 group-hover:text-neutral-400 flex-shrink-0 transition-colors"
                    />
                  </a>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

        <ScrollReveal delay={0.3}>
          <div className="mt-16 pt-8 border-t border-[#161616] flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-mono text-xs text-neutral-700">
              Built with <span className="text-indigo-400">Next.js</span> ·{" "}
              <span className="text-indigo-400">Tailwind CSS</span> ·{" "}
              <span className="text-indigo-400">Framer Motion</span>
            </p>
            <p className="font-mono text-xs text-neutral-700">
              © {new Date().getFullYear()} {profile.name}. All rights reserved.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
