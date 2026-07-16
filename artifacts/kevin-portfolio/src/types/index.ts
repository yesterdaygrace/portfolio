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
}

export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  tech: string[]
  status: 'production' | 'development' | 'archived'
  github?: string
  demo?: string
  featured: boolean
  type: string
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

export interface Award {
  id: string
  title: string
  issuer: string
  date: string
  description: string
  type: string
}

export interface Publication {
  id: string
  title: string
  authors: string
  venue: string
  year: string
  abstract: string
  link?: string
  type: 'paper' | 'article' | 'blog'
  tags: string[]
}

export interface Certification {
  id: string
  name: string
  issuer: string
  date: string
  credentialId?: string
  link?: string
  category: string
}

export interface StatItem {
  label: string
  value: string
  sub?: string
}
