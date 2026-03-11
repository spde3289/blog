const THUMBNAIL_BASE_PATH = "/img/thumbnail";

// 파일명만 받아서 전체 경로를 반환해 주는 헬퍼 함수
const getThumbnailPath = <T extends string>(filename: T) =>
  `${THUMBNAIL_BASE_PATH}/${filename}` as const;

export const BLOG_CONFIG = {
  THUMBNAIL: {
    DEFAULT: getThumbnailPath("default-thumbnail.png"),
    CHIM_PLANET: getThumbnailPath("chim-planet-thumbnail.png"),
    BLOG: getThumbnailPath("blog-thumbnail.png"),
    DISCORD_BOT: getThumbnailPath("discord-bot-thumbnail.png"),
    FANDOM_K: getThumbnailPath("fandom-k-thumbnail.png"),
    GLOBAL_NOMAD: getThumbnailPath("global-nomad-thumbnail.png"),
    MAPLE_HELPER: getThumbnailPath("maple-helper-thumbnail.png"),
    SPRINT_BOOTCAMP: getThumbnailPath("sprint-bootcamp-thumbnail.png"),
    THE_JULGE: getThumbnailPath("the-julge-thumbnail.png"),
  },

  EXCERPT_LENGTH: 200, // 요약본(excerpt) 기본 글자 수
} as const;
