'use client'

import { Award, ExternalLink } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'
import SectionHeader from '@/components/ui/SectionHeader'
import Badge from '@/components/ui/Badge'
import { certifications } from '@/data/certifications'
import { cn } from '@/lib/utils'

const CAT_COLORS: Record<string, string> = {
  Backend: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
  Infrastructure: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  'Full Stack': 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
  Database: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  Security: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
}

export default function Certifications() {
  return (
    <section id="certifications" className="relative py-20 border-b border-[#161616]">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal><SectionHeader index="08" title="Certifications" comment="credentials" /></ScrollReveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {certifications.map((cert, index) => {
            const colorCls = CAT_COLORS[cert.category] ?? CAT_COLORS['Full Stack']
            return (
              <ScrollReveal key={cert.id} delay={index * 0.06}>
                <div className="bg-[#0d0d0d] border border-[#1e1e1e] rounded-xl p-5 hover:border-[#2a2a2a] transition-all duration-200 flex flex-col gap-3 h-full">
                  <div className="flex items-start justify-between">
                    <div className={cn('w-8 h-8 rounded-lg border flex items-center justify-center', colorCls)}><Award size={15} /></div>
                    <Badge variant="outline" size="sm">{cert.category}</Badge>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-neutral-100 leading-tight">{cert.name}</h3>
                    <p className="text-xs text-neutral-600 mt-1">{cert.issuer}</p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-[#161616]">
                    <span className="font-mono text-[10px] text-neutral-700">{cert.date}</span>
                    {cert.link && (
                      <a href={cert.link} target="_blank" rel="noopener noreferrer" className="text-neutral-600 hover:text-neutral-300 transition-colors"><ExternalLink size={11} /></a>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
