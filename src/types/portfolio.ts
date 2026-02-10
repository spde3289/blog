import { FC, SVGProps } from "react";

export interface ProjectLink {
  icon: FC<SVGProps<SVGSVGElement>>;
  link: string;
}

export interface Project {
  title: string;
  period: string;
  description: string;
  tech: string[];
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
