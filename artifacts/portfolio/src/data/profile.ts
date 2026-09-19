// Update this file to customize the portfolio for your own GitHub profile.
export const profile = {
  name: "Kevin Van Diesel Chansa",
  role: "Software Engineer",
  focus: "Full-Stack & Backend Systems",
  headline: "Building practical software that replaces legacy workarounds, scales business workflows, and ships reliably to production.",
  summary:
    "Focusing on backend architecture, database integrity, legacy modernization, and production web applications.",
  githubUsername: "yesterdaygrace",
  instagramUsername: "kevinnchanssa",
  email: "kevinvandieselchansa@gmail.com",
  linkedinUrl: "https://www.linkedin.com/in/kevin-van-diesel-chansa/",
  location: "Salatiga, Central Java, Indonesia",
  availability: "Open to collaborations and opportunities",
} as const;

export const socialLinks = {
  github: `https://github.com/${profile.githubUsername}`,
  linkedin: profile.linkedinUrl,
  email: `mailto:${profile.email}`,
  instagram: `https://www.instagram.com/${profile.instagramUsername}`,
} as const;

export const projectSettings = {
  reposToShow: 8,
  featuredCount: 2,
} as const;
