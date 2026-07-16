'use client'

import { Trophy, TrendingUp, Award, Star } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'
import SectionHeader from '@/components/ui/SectionHeader'
import Badge from '@/components/ui/Badge'
import { awards } from '@/data/awards'
import { cn } from '@/lib/utils'

const TYPE_ICONS: Record<string, React.ElementType> = {
  'Project Achievement': Trophy,
  'Performance Metric': TrendingUp,
  'Quality Metric': Star,
  'Academic Leadership': Award,
}
const TYPE_COLORS: Record<string, string> = {
  'Project Achievement': 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
  'Performance Metric': 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  'Quality Metric': 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  'Academic Leadership': 'text-violet-400 bg-violet-500/10 border-violet-500/20',
}

export default function Awards() {
  return (
    <section id="awards" className="relative py-20 border-b border-[#161616]">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal><SectionHeader index="06" title="Awards & Achievements" comment="impact metrics" /></ScrollReveal>
        <div className="grid sm:grid-cols-2 gap-3">
          {awards.map((award, index) => {
            const Icon = TYPE_ICONS[award.type] ?? Trophy
            const colorCls = TYPE_COLORS[award.type] ?? TYPE_COLORS['Project Achievement']
            return (
              <ScrollReveal key={award.id} delay={index * 0.06}>
                <div className="bg-[#0d0d0d] border border-[#1e1e1e] rounded-xl p-5 hover:border-[#2a2a2a] transition-all duration-200 h-full">
                  <div className="flex items-start gap-3 mb-3">
                    <div className={cn('w-8 h-8 rounded-lg border flex items-center justify-center flex-shrink-0', colorCls)}>
                      <Icon size={15} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-neutral-100 leading-tight">{award.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-mono text-[10px] text-neutral-600">{award.issuer}</span>
                        <span className="font-mono text-[10px] text-neutral-700">·</span>
                        <span className="font-mono text-[10px] text-neutral-600">{award.date}</span>
                      </div>
                    </div>
                    <Badge variant="outline" size="sm">{award.type}</Badge>
                  </div>
                  <p className="text-xs text-neutral-500 leading-relaxed">{award.description}</p>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
