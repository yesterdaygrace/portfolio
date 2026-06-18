// Update this file to customize the portfolio for your own GitHub profile.
export const profile = {
  name: "Kevin Van Diesel Chansa",
  role: "Software Engineer",
  headline: "Building practical software and sharing projects on GitHub",
  summary:
    "This portfolio highlights real repositories, engineering decisions, and open-source work from my GitHub profile.",
  githubUsername: "yesterdaygrace",
  email: "kevinvandieselchansa@gmail.com",
  linkedinUrl: "https://www.linkedin.com/in/kevin-van-diesel-chansa/",
  location: "Salatiga, Central Java, Indonesia",
  availability: "Open to collaborations and opportunities",
} as const;

export const socialLinks = {
  github: `https://github.com/${profile.githubUsername}`,
  linkedin: profile.linkedinUrl,
  email: `mailto:${profile.email}`,
} as const;

export const projectSettings = {
  reposToShow: 8,
  featuredCount: 2,
} as const;
