'use client'

import { FileText, ExternalLink } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'
import SectionHeader from '@/components/ui/SectionHeader'
import Badge from '@/components/ui/Badge'
import { publications } from '@/data/publications'
import { cn } from '@/lib/utils'

const TYPE_STYLES: Record<string, string> = {
  paper: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400',
  article: 'bg-violet-500/10 border-violet-500/20 text-violet-400',
  blog: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
}
const TYPE_LABELS: Record<string, string> = { paper: 'Paper', article: 'Article', blog: 'Blog' }

export default function Publications() {
  return (
    <section id="publications" className="relative py-20 border-b border-[#161616]">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal><SectionHeader index="07" title="Publications" comment="research & writing" /></ScrollReveal>
        <div className="space-y-3">
          {publications.map((pub, index) => (
            <ScrollReveal key={pub.id} delay={index * 0.07}>
              <div className="bg-[#0d0d0d] border border-[#1e1e1e] rounded-xl p-5 hover:border-[#2a2a2a] transition-all duration-200">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#111] border border-[#2a2a2a] rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                      <FileText size={11} className="text-neutral-500" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-neutral-100 leading-tight">{pub.title}</h3>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <span className="text-xs text-neutral-500">{pub.authors}</span>
                        <span className="text-neutral-700">·</span>
                        <span className="font-mono text-xs text-neutral-600">{pub.venue}</span>
                        <span className="text-neutral-700">·</span>
                        <span className="font-mono text-xs text-neutral-600">{pub.year}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={cn('inline-flex items-center font-mono text-[10px] px-2 py-0.5 rounded-md border', TYPE_STYLES[pub.type])}>{TYPE_LABELS[pub.type]}</span>
                    {pub.link && (
                      <a href={pub.link} target="_blank" rel="noopener noreferrer" className="text-neutral-600 hover:text-neutral-300 transition-colors"><ExternalLink size={12} /></a>
                    )}
                  </div>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed ml-9 mb-3">{pub.abstract}</p>
                <div className="flex flex-wrap gap-1 ml-9">
                  {pub.tags.map((t) => <Badge key={t} variant="default" size="sm">{t}</Badge>)}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
