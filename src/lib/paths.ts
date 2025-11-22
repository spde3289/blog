import path from "path";

// 게시글 경로
export const CONTENT_DIR = path.join(process.cwd(), "src/content/posts");
export const POSTS_OUT_ROOT = path.join(
  process.cwd(),
  "src/content/build/posts"
);

// 메타 파일 경로
export const META_OUT_DIR = path.join(process.cwd(), "src/content/build/meta");
export const CATEGORY_JSON_PATH = path.join(META_OUT_DIR, "category.json");
export const SERIES_JSON_PATH = path.join(META_OUT_DIR, "series.json");
export const POSTS_JSON_PATH = path.join(META_OUT_DIR, "posts.json");
