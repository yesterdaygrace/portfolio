import type { SkillCategory } from '@/types'

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    name: 'Frontend',
    icon: 'Monitor',
    description: 'UI engineering & modern web tooling',
    color: 'indigo',
    skills: [
      { name: 'Vue.js 3' }, { name: 'TypeScript' }, { name: 'JavaScript ES2022+' },
      { name: 'Tailwind CSS' }, { name: 'Alpine.js' }, { name: 'HTML5 / CSS3' },
      { name: 'Vite' }, { name: 'Next.js' }, { name: 'Responsive Design' },
    ],
  },
  {
    id: 'backend',
    name: 'Backend',
    icon: 'Server',
    description: 'APIs, data modeling & server-side systems',
    color: 'violet',
    skills: [
      { name: 'Laravel' }, { name: 'PHP 8+' }, { name: 'MySQL / MariaDB' },
      { name: 'RESTful API Design' }, { name: 'Eloquent ORM' }, { name: 'Query Optimization' },
      { name: 'Auth & Authorization' }, { name: 'Queues & Jobs' }, { name: 'Schema Design' },
    ],
  },
  {
    id: 'infrastructure',
    name: 'Infrastructure',
    icon: 'Globe',
    description: 'Linux environments & production deployments',
    color: 'purple',
    skills: [
      { name: 'Linux (Debian / Ubuntu)' }, { name: 'Nginx' }, { name: 'Bash Scripting' },
      { name: 'Git & GitHub' }, { name: 'SSH Management' }, { name: 'SSL/TLS' },
      { name: 'Cron Automation' }, { name: 'Env Configuration' },
    ],
  },
  {
    id: 'practices',
    name: 'Engineering Practices',
    icon: 'Code2',
    description: 'Architecture & quality principles',
    color: 'blue',
    skills: [
      { name: 'Clean Architecture' }, { name: 'SOLID Principles' }, { name: 'Domain-Driven Design' },
      { name: 'System Design' }, { name: 'Code Review' }, { name: 'Technical Documentation' },
      { name: 'Debugging & RCA' }, { name: 'Performance Optimization' }, { name: 'Security' },
    ],
  },
  {
    id: 'financial',
    name: 'Financial Systems',
    icon: 'BarChart2',
    description: 'Accounting logic & fintech patterns',
    color: 'emerald',
    skills: [
      { name: 'Double-Entry Bookkeeping' }, { name: 'General Ledger' }, { name: 'Journal Processing' },
      { name: 'Bank Reconciliation' }, { name: 'Financial Reporting' }, { name: 'Audit Trails' },
      { name: 'RBAC for Finance' }, { name: 'Data Integrity' },
    ],
  },
]
