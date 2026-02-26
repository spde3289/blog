export const BLOG_SERIES = {
  MAPLE_HELPER: "maple-helper",
  BOOTCAMP: "sprint-bootcamp", // 스프린트 부트캠프
  MAPLE_BOT: "maple-discord-bot", // 메이플 디스코드 봇
  MONHUN_BOT: "monhun-discord-bot", // 몬스터헌터 디스코드 봇
  CHIM_PLANET: "chim-planet", // 침 플래닛
  FANDOM_K: "fandom-k", // 팬덤케이
  GIVE_MORE: "give-more", // 더 줄게
  GLOBAL_NOMAD: "global-nomad", // 글로벌 노마드
} as const;

export type BlogSeriesType = (typeof BLOG_SERIES)[keyof typeof BLOG_SERIES];

export const ROUTES = {
  HOME: "/",
  BLOG: {
    ROOT: "/blog",
    DETAIL: (category: string, post: string) => `/blog/${category}/${post}`,
    SERIES: (slug: BlogSeriesType | string) => `/blog/series/${slug}`,
  },
} as const;
