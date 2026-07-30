export interface ExperienceMetric {
  value: string
  label: string
}

export interface Experience {
  id: string
  role: string
  company: string
  companyUrl?: string
  period: string
  location: string
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship'
  description: string[]
  tech: string[]
  current?: boolean
  metrics?: ExperienceMetric[]
  highlights?: string[]
}

export interface SkillItem {
  name: string
}

export interface SkillCategory {
  id: string
  name: string
  icon: string
  description: string
  color: 'indigo' | 'violet' | 'purple' | 'blue' | 'cyan' | 'emerald'
  skills: SkillItem[]
}


