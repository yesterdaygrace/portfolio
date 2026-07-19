import type { Publication } from '@/types'

export const publications: Publication[] = [
  {
    id: 'pension-system-design',
    title: 'Architecting a Web-Based Pension Fund Information System: Migration from Legacy VDOS',
    authors: 'Kevin C.',
    venue: 'Undergraduate Thesis / Capstone Project',
    year: '2023',
    abstract:
      'This paper documents the end-to-end design and implementation of DAPENSE, a web-based pension fund information system that replaces a single-user DOS-based legacy platform. We present the architectural decisions, database normalization strategy, multi-module design, and measured outcomes including 30–40% operational efficiency gains and 25–30% reduction in manual data entry errors.',
    type: 'paper',
    tags: ['Web Architecture', 'Financial Systems', 'Legacy Migration', 'Laravel', 'PHP'],
  },
  {
    id: 'rbac-financial',
    title: 'Role-Based Access Control Patterns in Multi-Module Financial Web Applications',
    authors: 'Kevin C.',
    venue: 'Technical Documentation / Internal Report',
    year: '2023',
    abstract:
      'A practical examination of RBAC implementation strategies in financial web applications where data sensitivity and audit compliance require granular permission controls. Covers permission inheritance models, dynamic role assignment, and audit logging patterns using Laravel and Spatie Permissions.',
    type: 'article',
    tags: ['RBAC', 'Security', 'Laravel', 'Financial Systems'],
  },
]
