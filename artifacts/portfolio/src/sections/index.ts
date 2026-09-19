import type { ComponentType } from "react";
import Hero from "./Hero";
import About from "./About";
import Experience from "./Experience";
import TechStack from "./TechStack";
import Projects from "./Projects";
import Contact from "./Contact";
import SystemsMigration from "./SystemsMigration";

/**
 * Single ordered registry of the portfolio's full-screen panels.
 *
 * App.tsx (panel rendering + scroll math) and layout/Navbar.tsx (nav links +
 * active-section tracking) both derive from this list — to add, remove or
 * reorder a section, edit ONLY this file.
 */
export interface PanelSection {
  /** Stable id: drives nav hrefs (#id), anchor ids and scroll position math. */
  id: string;
  /** Short label shown in the navbar. */
  label: string;
  /** Cover-slide direction: 'right' slides in horizontally, 'up' slides vertically. */
  direction: "right" | "up";
  /** The section component. */
  Component: ComponentType;
}

export const sections: PanelSection[] = [
  { id: "hero",       label: "Cover",      direction: "up",    Component: Hero },
  { id: "about",      label: "About",      direction: "right", Component: About },
  { id: "experience", label: "Experience", direction: "right", Component: Experience },
  { id: "systems",    label: "Systems",    direction: "right", Component: SystemsMigration },
  { id: "stack",      label: "Stack",      direction: "right", Component: TechStack },
  { id: "projects",   label: "Projects",   direction: "up",    Component: Projects },
  { id: "contact",    label: "Contact",    direction: "up",    Component: Contact },
];
