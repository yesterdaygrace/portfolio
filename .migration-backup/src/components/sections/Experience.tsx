'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Calendar, ChevronDown } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'
import SectionHeader from '@/components/ui/SectionHeader'
import Badge from '@/components/ui/Badge'
import { experiences } from '@/data/experience'
import { cn } from '@/lib/utils'

export default function Experience() {
  const [expandedId, setExpandedId] = useState<string>(experiences[0]?.id ?? '')

  return (
    <section id="experience" className="relative py-20 border-b border-[#161616]">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal><SectionHeader index="02" title="Experience" comment="work history" /></ScrollReveal>
        <div className="relative">
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-[#1e1e1e] hidden sm:block" />
          <div className="space-y-2">
            {experiences.map((exp, index) => {
              const isExpanded = expandedId === exp.id
              return (
                <ScrollReveal key={exp.id} delay={index * 0.06}>
                  <div className="relative sm:pl-12">
                    <div className="hidden sm:flex absolute left-0 top-5 w-[38px] h-[38px] items-center justify-center">
                      <div className={cn('w-2.5 h-2.5 rounded-full border-2 transition-colors duration-200', exp.current ? 'border-indigo-500 bg-indigo-500/30' : 'border-[#2a2a2a] bg-[#0d0d0d]')} />
                    </div>
                    <button
                      onClick={() => setExpandedId(isExpanded ? '' : exp.id)}
                      className={cn('w-full text-left bg-[#0d0d0d] border rounded-xl p-5 transition-all duration-200', isExpanded ? 'border-[#2a2a2a]' : 'border-[#1e1e1e] hover:border-[#2a2a2a]')}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-sm font-semibold text-neutral-100">{exp.role}</h3>
                            {exp.current && <Badge variant="accent" size="sm">current</Badge>}
                          </div>
                          <p className="text-indigo-400 text-xs mt-0.5 font-medium">{exp.company}</p>
                          <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                            <span className="flex items-center gap-1 font-mono text-xs text-neutral-600"><Calendar size={10} />{exp.period}</span>
                            <span className="flex items-center gap-1 font-mono text-xs text-neutral-600"><MapPin size={10} />{exp.location}</span>
                            <Badge variant="outline" size="sm">{exp.type}</Badge>
                          </div>
                        </div>
                        <ChevronDown size={14} className={cn('text-neutral-600 mt-1 flex-shrink-0 transition-transform duration-200', isExpanded && 'rotate-180')} />
                      </div>
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }} className="overflow-hidden">
                            <div className="pt-4 mt-4 border-t border-[#1e1e1e]">
                              <ul className="space-y-2 mb-4">
                                {exp.description.map((d, i) => (
                                  <li key={i} className="flex gap-2.5 text-xs text-neutral-400 leading-relaxed">
                                    <span className="text-indigo-600 mt-1 flex-shrink-0 font-mono">›</span>
                                    <span>{d}</span>
                                  </li>
                                ))}
                              </ul>
                              <div className="flex flex-wrap gap-1.5">
                                {exp.tech.map((t) => <Badge key={t} variant="accent" size="sm">{t}</Badge>)}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
