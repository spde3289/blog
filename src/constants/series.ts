export const SERIES_CONFIG = {
  "global-nomad": "글로벌 노마드",
  "the-julge": "더 줄게",
  "discord-bot": "디스코드 봇 만들기",
  "maple-helper": "메이플 헬퍼",
  blog: "블로그",
  "sprint-bootcamp": "스프린트 부트캠프",
  "fandom-k": "팬덤케이",
} as const;

export type SeriesKey = keyof typeof SERIES_CONFIG;

export type SeriesValue = (typeof SERIES_CONFIG)[SeriesKey];
