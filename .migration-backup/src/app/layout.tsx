import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { profile, socialLinks } from "@/data/profile";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const title = `${profile.name} — GitHub Portfolio`;
const description = `${profile.role} portfolio featuring live repositories, open-source work, and project breakdowns from GitHub.`;

export const viewport: Viewport = {
  themeColor: "#000000",
};

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "GitHub Portfolio",
    "Software Engineer",
    "Open Source",
    "Next.js",
    "TypeScript",
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    type: "website",
    title,
    description,
    siteName: `${profile.name} Portfolio`,
    url: socialLinks.github,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${inter.variable} font-sans bg-black text-neutral-100 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
