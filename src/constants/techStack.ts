export const TECH_STACK = {
  skills: {
    language: ["JavaScript", "TypeScript", "HTML5"],
    frontend: ["React", "Next.js"],
    styling: ["CSS3", "Tailwind CSS", "Emotion", "Styled-components"],
    state: ["Zustand", "Recoil", "TanStack Query"],
    devTools: ["Husky", "ESLint", "Prettier"],
    infrastructure: ["Vercel", "AWS"],
  },
  tools: ["Figma", "Notion", "Slack", "Discord"],
} as const;

export const SKILL_LABELS = {
  language: "언어",
  frontend: "프론트엔드",
  styling: "스타일링",
  state: "상태관리",
  devTools: "개발 도구",
  infrastructure: "인프라 및 배포",
} as const;
