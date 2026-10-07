import brief from "@/portfolio-brief.json";

// Single source of truth is portfolio-brief.json; this file types it and adds
// the few variant-level details the components need.

export type Stat = { value: string; label: string };

export type Project = {
  id: string;
  title: string;
  type: string;
  featured: boolean;
  summary: string;
  highlights: string[];
  stack: string[];
  links: { github?: string | string[] | null; live?: string | null; paper?: string | null };
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

export type SkillGroups = Record<string, string[]>;

export type VariantKey = "fullstack" | "data_science";

export type SectionKey =
  | "hero"
  | "about"
  | "software_development"
  | "data_science"
  | "experience"
  | "other"
  | "education"
  | "contact";

export type Variant = {
  key: VariantKey;
  route: string;
  label: string;
  resumePdf: string;
  meta: { title: string; description: string };
  hero: { eyebrow: string; headline: string; tagline: string; accentWord: string };
  heroBadge?: string;
  about: string;
  sectionOrder: SectionKey[];
  skillsOrder: string[];
  skillsHighlight: string[];
  stats: Stat[];
  experienceTitle: string;
  dataScienceMode: "condensed" | "full";
};

const c = brief.content;

export const identity = c.identity;
export const contact = c.contact;
export const skills = c.skills as { software_development: SkillGroups; data_science: SkillGroups };
export const experience = c.experience as Role[];
export const other = c.other;
export const education = c.education;

// Data science work is academic or personal, never professional.
const projectLabels: Record<string, string> = {
  "uav-battery-prediction": "MSc thesis",
  "pill-defect-detection": "Personal project",
  "chest-xray-anomaly": "Personal project",
  "semiconductor-fault-detection": "Coursework",
  "sarcasm-detection": "Coursework",
  "pharmacy-bi-dashboard": "Personal project",
  "tweet-sentiment-nb": "Personal project",
  "pca-sensor-analyses": "Coursework",
};

const withLabel = (p: Project): Project => ({ ...p, type: projectLabels[p.id] ?? p.type });

export const projects = {
  software_development: c.projects.software_development as Project[],
  data_science: (c.projects.data_science as Project[]).map(withLabel),
};

const v = brief.variants;

export const variants: Record<VariantKey, Variant> = {
  fullstack: {
    key: "fullstack",
    route: v.fullstack.route,
    label: "Full stack",
    resumePdf: v.fullstack.resume_pdf,
    meta: v.fullstack.meta,
    hero: { ...v.fullstack.hero, accentWord: "builds." },
    heroBadge: v.fullstack.hero_badge,
    about: v.fullstack.about,
    sectionOrder: v.fullstack.section_order as SectionKey[],
    skillsOrder: v.fullstack.skills_order,
    skillsHighlight: v.fullstack.skills_highlight,
    stats: c.hero.stats,
    experienceTitle: "Experience",
    dataScienceMode: "condensed",
  },
  data_science: {
    key: "data_science",
    route: v.data_science.route,
    label: "Data science",
    resumePdf: v.data_science.resume_pdf,
    meta: v.data_science.meta,
    hero: { ...v.data_science.hero, accentWord: "analyses." },
    heroBadge: "First Class Honours · MTU 2026",
    about: v.data_science.about,
    sectionOrder: v.data_science.section_order as SectionKey[],
    skillsOrder: v.data_science.skills_order,
    skillsHighlight: ["Python", "scikit-learn", "XGBoost", "LSTM / Bi-LSTM", "Autoencoders", "PCA"],
    stats: v.data_science.stats_override,
    experienceTitle: "Software engineering experience",
    dataScienceMode: "full",
  },
};

export const sectionMeta: Record<Exclude<SectionKey, "hero">, { id: string; nav: string; title: string }> = {
  about: { id: "about", nav: "About", title: "About" },
  software_development: { id: "software", nav: "Software", title: "Software development" },
  data_science: { id: "data-science", nav: "Data science", title: "Data science" },
  experience: { id: "experience", nav: "Experience", title: "Experience" },
  other: { id: "other", nav: "Other", title: "Other" },
  education: { id: "education", nav: "Education", title: "Education" },
  contact: { id: "contact", nav: "Contact", title: "Contact" },
};

export const navSections: Exclude<SectionKey, "hero">[] = [
  "software_development",
  "data_science",
  "experience",
  "other",
  "contact",
];

export const marquee = [
  "Angular", "React", "TypeScript", "C#", "ASP.NET Core", "Entity Framework Core",
  "SQL Server", "PostgreSQL", "RxJS", "Docker", "Azure DevOps", "GitHub Actions",
  "Node.js", "FastAPI", "Python", "scikit-learn", "PyTorch",
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Fixed month names: Intl output differs between Node and browsers ("Sept" vs "Sep") and breaks hydration.
export function formatMonth(ym: string) {
  const [y, m] = ym.split("-").map(Number);
  return `${MONTHS[m - 1]} ${y}`;
}
