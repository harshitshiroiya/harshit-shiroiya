export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  profileImage?: string;
  socialLinks?: SocialLink[];
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  location?: string;
  current?: boolean;
  description: string;
  achievements?: string[];
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
  image?: string;
  highlights?: string[];
}

export interface Education {
  school: string;
  degree: string;
  field: string;
  graduationDate: string;
  gpa?: string;
  coursework?: string[];
}

export interface Resume {
  personalInfo: PersonalInfo;
  professional_summary: string;
  skills: Skill[];
  experience: Experience[];
  projects: Project[];
  education: Education[];
}
