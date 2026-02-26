import { ElementType } from "react";

export type Languages = "JavaScript (ES6+)" | "TypeScript" | "HTML5/CSS3";

export type FrontendLibs = "React" | "Next.js";

export type StylingUtils = "Tailwind CSS" | "Emotion" | "Styled-components";

export type StateManagement =
  | "Zustand"
  | "Recoil"
  | "TanStack Query"
  | "React Query";

export type BackendTech =
  | "Node.js"
  | "Express"
  | "Socket.io"
  | "Discord.js"
  | "Nexon Open API";

export type Infra = "Vercel" | "AWS (EC2)";

export type Tools =
  | "Git & GitHub"
  | "VS Code"
  | "Figma"
  | "Notion"
  | "Husky"
  | "ESLint & Prettier";

export type Tech =
  | Languages
  | FrontendLibs
  | StylingUtils
  | StateManagement
  | BackendTech
  | Infra
  | Tools;

export interface ProjectLink {
  icon: ElementType;
  link: string;
  label?: string;
}

export interface Project {
  title: string;
  period: string;
  description: string;
  tech: Tech[];
  links: ProjectLink[];
  image: string;
}

export interface Interview {
  question: string;
  answer: string;
}

export interface Education {
  name: string;
  period: string;
  desc: string;
}

export interface Career {
  name: string;
  team: string;
  period: string;
  desc: string;
}
