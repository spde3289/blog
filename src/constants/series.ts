export const SERIES_CONFIG = {
  "global-nomad": "팀 프로젝트: 글로벌 노마드",
  "the-julge": "팀 프로젝트: 더 줄게",
  "discord-bot": "디스코드 봇 개발",
  "maple-helper": "메이플 헬퍼 서비스 구축기",
  blog: "기술 블로그 개발기",
  "chim-planet": "팬 커뮤니티, 침플래닛 개발",
  "sprint-bootcamp": "스프린트 부트캠프 회고",
  "fandom-k": "팀 프로젝트: 팬덤케이",
} as const;

export type SeriesKey = keyof typeof SERIES_CONFIG;

export type SeriesValue = (typeof SERIES_CONFIG)[SeriesKey];
