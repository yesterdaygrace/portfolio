'use client'

import { motion } from 'framer-motion'
import { Monitor, Server, Globe, Code2, BarChart2 } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'
import SectionHeader from '@/components/ui/SectionHeader'
import { skillCategories } from '@/data/skills'
import { cn } from '@/lib/utils'
import type { SkillCategory } from '@/types'

const ICONS: Record<string, React.ElementType> = { Monitor, Server, Globe, Code2, BarChart2 }

const COLOR_MAP: Record<string, { icon: string; chip: string; border: string }> = {
  indigo: { icon: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20', chip: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-300', border: 'hover:border-indigo-500/30' },
  violet: { icon: 'text-violet-400 bg-violet-500/10 border-violet-500/20', chip: 'bg-violet-500/10 border-violet-500/20 text-violet-300', border: 'hover:border-violet-500/30' },
  purple: { icon: 'text-purple-400 bg-purple-500/10 border-purple-500/20', chip: 'bg-purple-500/10 border-purple-500/20 text-purple-300', border: 'hover:border-purple-500/30' },
  blue: { icon: 'text-blue-400 bg-blue-500/10 border-blue-500/20', chip: 'bg-blue-500/10 border-blue-500/20 text-blue-300', border: 'hover:border-blue-500/30' },
  emerald: { icon: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', chip: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300', border: 'hover:border-emerald-500/30' },
  cyan: { icon: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20', chip: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-300', border: 'hover:border-cyan-500/30' },
}

function SkillCard({ category, index }: { category: SkillCategory; index: number }) {
  const Icon = ICONS[category.icon] ?? Code2
  const c = COLOR_MAP[category.color] ?? COLOR_MAP.indigo
  return (
    <ScrollReveal delay={index * 0.06}>
      <motion.div className={cn('bg-[#0d0d0d] border border-[#1e1e1e] rounded-xl p-5 h-full transition-colors duration-200', c.border)} whileHover={{ y: -2 }} transition={{ duration: 0.15 }}>
        <div className="flex items-start gap-3 mb-4">
          <div className={cn('w-8 h-8 rounded-lg border flex items-center justify-center flex-shrink-0', c.icon)}><Icon size={15} /></div>
          <div>
            <h3 className="text-sm font-semibold text-neutral-100">{category.name}</h3>
            <p className="text-xs text-neutral-600 mt-0.5">{category.description}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {category.skills.map((s) => (
            <span key={s.name} className={cn('inline-flex items-center font-mono text-[10px] px-2 py-0.5 rounded-md border font-medium', c.chip)}>{s.name}</span>
          ))}
        </div>
      </motion.div>
    </ScrollReveal>
  )
}

export default function TechStack() {
  return (
    <section id="stack" className="relative py-20 border-b border-[#161616]">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal><SectionHeader index="04" title="Tech Stack" comment="tools & practices" /></ScrollReveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {skillCategories.map((cat, i) => <SkillCard key={cat.id} category={cat} index={i} />)}
        </div>
      </div>
    </section>
  )
}
