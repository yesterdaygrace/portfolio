import type { Experience } from "@/types";

export const experiences: Experience[] = [
  {
    id: "fullstack-dev",
    role: "Fullstack Web Developer",
    company: "Dana Pensiun Sekolah Kristen",
    period: "Aug 2024 – Dec 2025",
    location: "Remote",
    type: "Contract",
    current: false,
    metrics: [
      { value: "30–40%", label: "Operational Efficiency" },
      { value: "25–30%", label: "Reduced Errors" },
      { value: "0",      label: "Production Downtime" },
    ],
    highlights: [
      "Designed and built a production pension fund information system from scratch, replacing a legacy DOS-based VDOS platform with a modern browser-accessible web application.",
      "Architected multi-module financial system: general ledger, journal processing, cash/bank management, and financial reporting with full role-based access control.",
    ],
    description: [
      "Configured production **Nginx** deployment on **Linux** — **SSL**, reverse proxy, environment management, zero-downtime strategy.",
      "Designed normalized relational schemas optimized for financial audit trails, period-end reconciliation, and complex reporting aggregations.",
      "Implemented workflow automation and multi-layer data validation to reduce manual input errors.",
    ],
    tech: [
      "Laravel",
      "PHP",
      "MySQL",
      "JavaScript",
      "Nginx",
      "Linux",
      "Bootstrap",
    ],
  },
  {
    id: "teaching-assistant",
    role: "Teaching Assistant - Web Developer",
    company: "Satya Wacana Christians University",
    period: "Aug 2024 – Dec 2024",
    location: "On-site",
    type: "Part-time",
    highlights: [
      "Delivered programming fundamentals and computer science labs to undergraduate students.",
      "Conducted one-on-one debugging sessions — applying root cause analysis to identify conceptual gaps vs. implementation errors.",
    ],
    description: [
      "Provided structured written feedback on algorithm correctness, code quality, and architectural decisions.",
    ],
    tech: ["Bootstrap", "Javascript", "SQL", "Algorithms", "Data Structures"],
  },
];
