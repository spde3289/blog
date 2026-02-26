import GithubSvg from "@/svg/GithubSvg";
import LinkSvg from "@/svg/LinkSvg";
import RssSvg from "@/svg/RssSvg";
import { Project } from "@/types/portfolio";
import { BLOG_SERIES, ROUTES } from "./routes";

export const PROJECTS: Project[] = [
  {
    title: "메이플 헬퍼",
    period: "2024.10 - 진행중",
    description:
      "메이플스토리 유저들의 불편함을 타겟팅한 종합 유틸리티 서비스입니다. 게임 플레이의 질을 높여주는 필수 편의 기능들을 제공합니다",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Nexon Open API"],
    links: [
      {
        icon: GithubSvg,
        link: "https://github.com/spde3289/MapleStory-Helper",
        label: "FE",
      },
      {
        icon: LinkSvg,
        link: "https://www.maple-helper.com",
        label: "배포 사이트",
      },
      {
        icon: RssSvg,
        link: ROUTES.BLOG.SERIES(BLOG_SERIES.MAPLE_HELPER),
        label: "회고",
      },
    ],
    image: "/img/project/maplehelper.png",
  },
  {
    title: "팀 프로젝트: 글로벌 노마드",
    period: "2025.01 - 2024.02",
    description:
      "체험 상품의 탐색부터 예약, 관리까지 지원하는 통합 플랫폼입니다. 지도 및 캘린더 SDK를 적극 활용하여 직관적이고 편리한 사용자 경험(UX)을 구현하는 데 집중했습니다.",
    tech: ["Next.js", "TanStack Query", "Zustand", "Tailwind CSS"],
    links: [
      {
        icon: GithubSvg,
        link: "https://github.com/GlobalNomad-20/GlobalNomad",
        label: "FE",
      },
      {
        icon: LinkSvg,
        link: "https://global-nomad-woad.vercel.app",
        label: "배포 사이트",
      },
      {
        icon: RssSvg,
        link: ROUTES.BLOG.SERIES(BLOG_SERIES.GLOBAL_NOMAD),
        label: "회고",
      },
    ],
    image: "/img/project/project-nomad.png",
  },
  {
    title: "팀 프로젝트: 더 줄게",
    period: "2025.12 - 2026.01",
    description:
      "일반 회원과 사장님 계정별로 구분된 서비스를 제공하는 플랫폼입니다. 복잡한 다중 사용자 비즈니스 로직을 효과적으로 분리하고 처리하는 아키텍처 설계에 집중했습니다.",
    tech: ["Next.js", "TanStack Query", "Zustand"],
    links: [
      {
        icon: GithubSvg,
        link: "https://github.com/albaform-team/albaform",
        label: "FE",
      },
      {
        icon: LinkSvg,
        link: "https://albaform-rust.vercel.app",
        label: "배포 사이트",
      },
      {
        icon: RssSvg,
        link: ROUTES.BLOG.SERIES(BLOG_SERIES.GIVE_MORE),
        label: "회고",
      },
    ],
    image: "/img/project/albaform.png",
  },
  {
    title: "팀 프로젝트: 팬텀케이",
    period: "2025.11 - 2025.11",
    description:
      "편리하고 즐거운 팬덤 활동을 위한 종합 플랫폼입니다. 실시간 차트 확인부터 투표, 후원까지 팬들의 니즈를 충족시키는 핵심 서비스들을 구축했습니다.",
    tech: ["React", "Recoil", "Styled-components"],
    links: [
      {
        icon: GithubSvg,
        link: "https://github.com/Sprint-Team2/FandomK",
        label: "FE",
      },
      {
        icon: LinkSvg,
        link: "https://fandom-k-blue.vercel.app",
        label: "배포 사이트",
      },
      {
        icon: RssSvg,
        link: ROUTES.BLOG.SERIES(BLOG_SERIES.FANDOM_K),
        label: "회고",
      },
    ],
    image: "/img/project/fandomK.png",
  },
  {
    title: "실시간 채팅 서비스",
    period: "2024.04 - 2024.05",
    description:
      "원활한 사용자 문의 응대를 목적으로 개발된 실시간 채팅 플랫폼입니다. 실시간 양방향 소통 기능을 구현하여 서비스 이용자의 불편사항을 즉각적으로 해소할 수 있는 환경을 구축했습니다.",
    tech: ["Socket.io", "Express", "React"],
    links: [
      {
        icon: GithubSvg,
        link: "https://github.com/spde3289/live-chat",
        label: "FE",
      },
      {
        icon: GithubSvg,
        link: "https://github.com/spde3289/live-chat-sever",
        label: "BE",
      },
    ],
    image: "/img/project/livechat.png",
  },
  {
    title: "디스코드 봇 (몬스터헌터)",
    period: "2024.02 - 2024.02",
    description:
      "게임 중 브라우저를 켜야 하는 유저의 불편함을 타겟팅했습니다. 구글링이 필수적인 정보들을 디스코드 명령어 하나로 통합해 유저 편의성을 획기적으로 높였습니다",
    tech: ["Node.js", "Discord.js", "AWS (EC2)"],
    links: [
      {
        icon: GithubSvg,
        link: "https://github.com/spde3289/monsterHunterBot",
        label: "BE",
      },
      {
        icon: RssSvg,
        link: ROUTES.BLOG.SERIES(BLOG_SERIES.MONHUN_BOT),
        label: "회고",
      },
    ],
    image: "/img/project/monsterHunterBot.png",
  },
  {
    title: "디스코드 봇 (메이플스토리)",
    period: "2023.09 - 2023.10",
    description:
      "유저 요청 즉시 웹 데이터를 실시간 크롤링하여 정보를 제공합니다. 동적 렌더링 환경의 이미지 누락 이슈를 예외 처리하여 서비스 안정성을 높였습니다.",
    tech: ["Node.js", "Discord.js", "AWS (EC2)"],
    links: [
      {
        icon: GithubSvg,
        link: "https://github.com/spde3289/mapleUnion",
        label: "BE",
      },
      {
        icon: RssSvg,
        link: ROUTES.BLOG.SERIES(BLOG_SERIES.MAPLE_BOT),
        label: "회고",
      },
    ],
    image: "/img/project/mapleBot.png",
  },
  {
    title: "팀 프로젝트: 침플래닛",
    period: "2023.02 - 2023.08",
    description:
      "170만 유튜버의 팬카페 구인구직 정보 통합 플랫폼입니다. 반응형 UI를 적용한 사용자 서비스부터 비개발자용 백오피스를 구축해 서비스 완성도를 높였습니다.",
    tech: ["React", "Styled-components", "React Query", "Recoil"],
    links: [
      {
        icon: GithubSvg,
        link: "https://github.com/ChimPlanet/ChimPlanet-front",
        label: "FE",
      },
      {
        icon: RssSvg,
        link: ROUTES.BLOG.SERIES(BLOG_SERIES.CHIM_PLANET),
        label: "회고",
      },
    ],
    image: "/img/project/chimplanet.png",
  },
];
