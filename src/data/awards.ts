import type { Award } from '@/types'

export const awards: Award[] = [
  {
    id: 'legacy-migration',
    title: 'Legacy System Migration — VDOS to Web',
    issuer: 'DAPENSE Project',
    date: '2023',
    description: 'Successfully migrated a legacy DOS-based pension fund system to a modern web platform, achieving 100% feature parity while enabling multi-user concurrent access and modern security controls.',
    type: 'Project Achievement',
  },
  {
    id: 'efficiency-gain',
    title: '30–40% Operational Efficiency Improvement',
    issuer: 'DAPENSE Implementation',
    date: '2023',
    description: 'Measurable operational efficiency gains delivered through workflow automation, structured validation layers, and elimination of manual single-entry processes across all financial modules.',
    type: 'Performance Metric',
  },
  {
    id: 'error-reduction',
    title: '25–30% Reduction in Manual Input Errors',
    issuer: 'DAPENSE Financial System',
    date: '2023',
    description: 'Achieved through multi-layer form validation, business rule enforcement at the service layer, and structured audit logging that caught discrepancies before they propagated.',
    type: 'Quality Metric',
  },
  {
    id: 'ta-coordinator',
    title: 'Teaching Assistant Coordinator',
    issuer: 'Academic Institution',
    date: '2022',
    description: 'Promoted from TA to coordinator role, managing a team of teaching assistants across multiple course sections and establishing standardized grading and review processes.',
    type: 'Academic Leadership',
  },
]
