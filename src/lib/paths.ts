import path from "path";

// 📂 대분류 및 상세 폴더 상수
export const CONTENT_DIR = path.join(process.cwd(), "src", "content", "posts");
export const BUILD_DIR = path.join(process.cwd(), "src", "content", "build");

export const HTML_OUT_DIR = path.join(BUILD_DIR, "html");
export const JSON_OUT_DIR = path.join(BUILD_DIR, "json");

export const POSTS_HTML_DIR = path.join(HTML_OUT_DIR, "posts");
export const POSTS_JSON_DIR = path.join(JSON_OUT_DIR, "posts");
export const SERIES_JSON_DIR = path.join(JSON_OUT_DIR, "series");
export const CATEGORIES_JSON_PATH = path.join(JSON_OUT_DIR, "categories.json");

// 동적 파일 경로 생성 유틸리티 중앙화
export const getSeriesFilePath = (slug: string) =>
  path.join(SERIES_JSON_DIR, `${slug}.json`);

export const getPostJsonFilePath = (category: string, slug: string) =>
  path.join(POSTS_JSON_DIR, category, `${slug}.json`);

export const getPostHtmlFilePath = (category: string, slug: string) =>
  path.join(POSTS_HTML_DIR, category, `${slug}.html`);
