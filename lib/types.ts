export interface Link {
  label: string;
  href: string;
  download?: boolean;
}

export interface Site {
  title: string;
  shortTitle: string;
  description: string;
  url: string;
  locale: string;
  language: string;
  themeColor: string;
  keywords: string[];
  ogImage: string;
  skipLinkLabel: string;
  backToTopLabel: string;
}

export interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Personal {
  name: string;
  initials: string;
  role: string;
  location?: string;
  email?: string;
  avatar?: ImageAsset;
  cv?: { href: string; fileName: string };
}

export interface Hero {
  issue?: string;
  greeting?: string;
  headline: string;
  intro: string;
  speechBubble?: string;
  focusLabel?: string;
  focus: string[];
  stickers: string[];
  primaryCta?: Link;
  secondaryCta?: Link;
  scrollHint?: string;
}

export interface SectionMeta {
  id: string;
  kicker?: string;
  title: string;
  subtitle?: string;
  emptyState?: string;
  [key: string]: string | undefined;
}

export interface Sections {
  about: SectionMeta;
  skills: SectionMeta;
  projects: SectionMeta;
  research: SectionMeta;
  experience: SectionMeta;
  education: SectionMeta;
  certifications: SectionMeta;
  contact: SectionMeta;
}

export interface Stat {
  value: string;
  suffix?: string;
  label: string;
}

export interface About {
  speechBubble?: string;
  paragraphs: string[];
  interestsLabel?: string;
  interests: { label: string; icon?: string }[];
  stats: Stat[];
  languagesLabel?: string;
  languages: { name: string; level: string }[];
}

export interface SkillCategory {
  name: string;
  icon?: string;
  items: string[];
}

export interface Project {
  name: string;
  tagline?: string;
  category?: string;
  status?: string;
  featured?: boolean;
  icon?: string;
  description: string;
  highlights?: string[];
  technologies?: string[];
  image?: ImageAsset;
  links?: { github?: string; demo?: string };
}

export interface ResearchItem {
  title: string;
  type?: string;
  venue?: string;
  status?: string;
  year?: string;
  authors?: string[];
  area?: string;
  description?: string;
  reference?: string;
  url?: string;
  featured?: boolean;
}

export interface ExperienceItem {
  title: string;
  organization?: string;
  type?: string;
  date?: string;
  location?: string;
  description?: string;
  link?: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  department?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  period?: string;
  result?: string;
  description?: string;
  current?: boolean;
}

export interface Certification {
  title: string;
  issuer?: string;
  date?: string;
  url?: string;
  description?: string;
}

export interface Achievement {
  title: string;
  category?: string;
  date?: string;
  description?: string;
  url?: string;
  icon?: string;
}

export interface Contact {
  intro: string;
  speechBubble?: string;
  form: {
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitLabel: string;
    note?: string;
    subjectTemplate: string;
    successMessage: string;
    errorRequired: string;
    errorEmail: string;
  };
  directLabel?: string;
  locationLabel?: string;
}

export interface Social {
  label: string;
  handle?: string;
  url: string;
  icon?: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface Portfolio {
  site: Site;
  personal: Personal;
  hero: Hero;
  sections: Sections;
  about: About;
  skills: { categories: SkillCategory[] };
  projects: Project[];
  researchInterests: string[];
  research: ResearchItem[];
  experience: ExperienceItem[];
  education: EducationItem[];
  certifications: Certification[];
  achievements: Achievement[];
  contact: Contact;
  social: Social[];
  navigation: NavItem[];
  navigationExtras: {
    menuOpenLabel: string;
    menuCloseLabel: string;
    ctaLabel?: string;
    ctaHref?: string;
  };
  footer: { tagline: string; copyright: string; endMark?: string };
}
