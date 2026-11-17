import brief from "@/portfolio-brief.json";

// Single source of truth is portfolio-brief.json; this file types it for the components.
// Positioning (who the site is for, what to lead with) lives in docs/portfolio-brief.md.

export type Stat = { value: string; label: string };

export type Project = {
  id: string;
  title: string;
  type: string;
  featured: boolean;
  summary: string;
  what: string;
  highlights: string[];
  stack: string[];
  image?: { src: string; alt: string };
  figure?: { value: string; label: string };
  links: { github?: string; live?: string };
};

export type MiniProject = {
  id: string;
  title: string;
  type: string;
  summary: string;
  detail: string;
  stack: string[];
  links: { github: string; more?: string[] };
};

export type Role = {
  role: string;
  company: string;
  location: string;
  start: string;
  end: string;
  domain: string;
  highlights: string[];
  stack: string[];
};

export type SkillGroup = { group: string; items: string[] };

export type SectionKey = "projects" | "experience" | "skills" | "about" | "feed" | "education" | "contact";

const c = brief.content;

export const identity = c.identity;
export const meta = c.meta;
export const hero = c.hero as typeof c.hero & { stats: Stat[] };
export const about = c.about;
export const contact = c.contact;
export const interest = c.interest;
export const projects = c.projects as Project[];
export const moreProjects = c.more_projects as { group: string; items: MiniProject[] }[];
export const experience = c.experience as Role[];
export const skills = c.skills as SkillGroup[];
export const education = c.education;
export const certifications = c.certifications;
export const marquee = c.marquee;
export const feed = c.feed;

export const sectionOrder = brief.build.section_order.filter((s): s is SectionKey => s !== "hero");

export const sectionMeta: Record<SectionKey, { id: string; nav: string; title: string }> = {
  projects: { id: "projects", nav: "Projects", title: "Projects" },
  experience: { id: "experience", nav: "Experience", title: "Experience" },
  skills: { id: "skills", nav: "Skills", title: "Skills" },
  about: { id: "about", nav: "About", title: "About" },
  feed: { id: "feed", nav: "Photos", title: "Photos" },
  education: { id: "education", nav: "Education", title: "Education" },
  contact: { id: "contact", nav: "Contact", title: "Contact" },
};

export const navSections: SectionKey[] = ["projects", "experience", "skills", "about", "contact"];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Fixed month names: Intl output differs between Node and browsers ("Sept" vs "Sep") and breaks hydration.
export function formatMonth(ym: string) {
  const [y, m] = ym.split("-").map(Number);
  return `${MONTHS[m - 1]} ${y}`;
}
