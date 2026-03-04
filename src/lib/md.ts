import type { PostMetaData } from "@/types/posts.types";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { remark } from "remark";
import gfm from "remark-gfm";
import html from "remark-html";

type Data = {
  [key: string]: string;
};

/** 첫 번째 마크다운 이미지 → 썸네일 경로 추출 */
export const getMarkdownThumbnail = (markdown: string): string => {
  const imageRegex = /!\[.*?\]\((.*?)\)/;
  return markdown.match(imageRegex)?.[1] || "/img/thumbnail.png";
};

/** 마크다운 문법을 제거하고 순수 텍스트만 추출하는 유틸리티 */
export const getPlainTextExcerpt = (
  markdown: string,
  length: number = 200,
): string => {
  let text = markdown
    .replace(/```[\s\S]*?```/g, "") // 코드 블록 제거
    .replace(/<[^>]*>?/gm, "") // HTML 태그 제거
    .replace(/!\[.*?\]\(.*?\)/g, "") // 이미지 링크 제거
    .replace(/\[(.*?)\]\(.*?\)/g, "$1") // 일반 링크는 텍스트만 남김
    .replace(/([*_~`#>]+)/g, "") // 마크다운 특수 기호 제거
    .replace(/\s+/g, " ") // 줄바꿈 및 연속된 공백을 단일 공백으로 치환
    .trim();

  return text.slice(0, length);
};

export const convertMarkdownToHtml = async (md: string): Promise<string> => {
  const processed = await remark().use(gfm).use(html).process(md);
  return String(processed);
};

export const parseMarkdownFrontmatter = (filePath: string) => {
  const fileName = path.basename(filePath);
  const slug = fileName.replace(/\.md$/i, "");
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  return { slug, data, content };
};

export const buildPostMetadata = (
  data: Data,
  content: string,
): PostMetaData => ({
  title: data?.title || "Default Title",
  tags: Array.isArray(data?.tags) ? data.tags : [],
  date: data?.date || "Unknown",
  series: data?.series,
  image: data?.image || getMarkdownThumbnail(content),
  description: data?.description || undefined,
});

const buildPostData = async (category: string, filePath: string) => {
  const { slug, data, content } = parseMarkdownFrontmatter(filePath);
  const metadata = buildPostMetadata(data, content);

  const htmlFilePath = path.join(category, `${slug}.html`).replace(/\\/g, "/");
  const href = `/blog/${category}/${slug}`;

  const excerpt = getPlainTextExcerpt(content, 200);

  return {
    category,
    href,
    metadata,
    htmlFilePath,
    excerpt,
  };
};

export default buildPostData;
