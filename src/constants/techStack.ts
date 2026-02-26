export const TECH_STACK = {
  skills: {
    language: ["JavaScript", "TypeScript", "HTML5"],
    frontend: ["React", "Next.js"],
    style: ["CSS3", "Tailwind CSS", "Emotion", "Styled-components"],
    state: ["Zustand", "Recoil", "TanStack Query"],
    library: ["Husky", "ESLint", "Prettier"],
    deploy: ["Vercel", "AWS"],
  },
  tools: ["Figma", "Notion", "Slack", "Discord"],
} as const;

export const SKILL_LABELS = {
  language: "언어",
  frontend: "프론트엔드",
  style: "스타일",
  state: "상태관리",
  library: "라이브러리",
  deploy: "배포환경",
} as const;
