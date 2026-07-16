import type { Project } from "@/types";
import { socialLinks } from "@/data/profile";

export const projects: Project[] = [
  {
    id: "github-sync-setup",
    title: "GitHub portfolio sync",
    description:
      "Fallback project card used when GitHub API data is unavailable.",
    longDescription:
      "This portfolio loads repositories from the GitHub API at runtime. If API requests fail (for example due to rate limits or network issues), this fallback card keeps the section usable. Update src/data/profile.ts to point to your GitHub username.",
    tech: ["Next.js", "TypeScript", "GitHub REST API"],
    status: "development",
    github: socialLinks.github,
    featured: true,
    type: "GitHub Repository",
  },
];
