import GithubSvg from "@/svg/GithubSvg";
import LinkSvg from "@/svg/LinkSvg";
import { Project } from "@/types/portfolio";

export const PROJECTS: Project[] = [
  {
    title: "메이플 헬퍼",
    period: "2024.01 - 2024.03",
    description:
      "메이플스토리 유저를 위한 종합 정보 제공 서비스입니다. 캐릭터 검색, 통계, 시뮬레이터 기능을 제공합니다.",
    tech: ["Next.js", "TypeScript", "Tailwind", "MapleStory API"],
    links: [
      {
        icon: GithubSvg,
        link: "https://github.com/spde3289/MapleStory-Helper",
      },
      { icon: LinkSvg, link: "https://www.maple-helper.com/" },
    ],
    image: "/img/project/maplehelper.png",
  },
  {
    title: "팀 프로젝트: 글로벌 노마드",
    period: "2024.06 - 2024.07",
    description:
      "글로벌 디지털 노마드를 위한 커뮤니티 및 정보 공유 플랫폼입니다.",
    tech: ["Next.js", "Supabase", "Tailwind CSS"],
    links: [
      { icon: GithubSvg, link: "#" },
      { icon: LinkSvg, link: "#" },
    ],
    image: "/images/project-nomad.jpg",
  },
  {
    title: "팀 프로젝트: 더 줄게",
    period: "2024.05 - 2024.06",
    description: "사용자 맞춤형 선물 추천 및 펀딩 서비스입니다.",
    tech: ["Next.js", "TanStack Query", "Zustand"],
    links: [
      { icon: GithubSvg, link: "https://github.com/albaform-team" },
      {
        icon: LinkSvg,
        link: "https://albaform-rust.vercel.app/store",
      },
    ],
    image: "/images/project-more.jpg",
  },
  {
    title: "팀 프로젝트: 팬텀케이",
    period: "2024.04 - 2024.05",
    description: "스프린트 부트캠프 팀 프로젝트로 진행한 서비스입니다.",
    tech: ["React", "Recoil", "Styled-components"],
    links: [
      { icon: GithubSvg, link: "https://github.com/Sprint-Team2" },
      { icon: LinkSvg, link: "https://fandom-k-blue.vercel.app/" },
    ],
    image: "/img/project/project-phantom.jpg",
  },
  {
    title: "실시간 채팅 서비스",
    period: "2024.08 - 2024.08",
    description:
      "WebSocket을 이용한 실시간 채팅 및 Express 기반의 CRUD 백엔드를 직접 구현했습니다.",
    tech: ["Socket.io", "Express", "MongoDB", "React"],
    links: [
      { icon: GithubSvg, link: "#" },
      { icon: LinkSvg, link: "#" },
    ],
    image: "/images/project-chat.jpg",
  },
  {
    title: "디스코드 봇 (몬스터헌터)",
    period: "2024.09 - 진행중",
    description:
      "게임 유저 편의를 위해 개발한 디스코드 봇입니다. 서버 내 전적 검색 및 파티 모집 기능을 수행합니다.",
    tech: ["Node.js", "Discord.js", "AWS EC2"],
    links: [
      { icon: GithubSvg, link: "https://github.com/spde3289/monsterHunterBot" },
    ],
    image: "/images/project-bot.jpg",
  },
  {
    title: "디스코드 봇 (메이플)",
    period: "2024.09 - 진행중",
    description:
      "게임 유저 편의를 위해 개발한 디스코드 봇입니다. 서버 내 전적 검색 및 파티 모집 기능을 수행합니다.",
    tech: ["Node.js", "Discord.js", "AWS EC2"],
    links: [
      { icon: GithubSvg, link: "https://github.com/spde3289/mapleUnion" },
    ],
    image: "/images/project-bot.jpg",
  },
];
