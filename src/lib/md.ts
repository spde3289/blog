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
export const extractThumbnail = (markdown: string): string => {
  const imageRegex = /!\[.*?\]\((.*?)\)/;
  return markdown.match(imageRegex)?.[1] || "/img/thumbnail.png";
};

export const mdToHtml = async (md: string): Promise<string> => {
  const processed = await remark().use(gfm).use(html).process(md);
  return String(processed);
};

export const parseMarkdownFile = (filePath: string) => {
  const fileName = path.basename(filePath);
  const slug = fileName.replace(/\.md$/i, "");
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  return { slug, data, content };
};

export const createMetadata = (data: Data, content: string): PostMetaData => ({
  title: data?.title || "Default Title",
  tags: Array.isArray(data?.tags) ? data.tags : [],
  date: data?.date || "Unknown",
  image: extractThumbnail(content),
  series: data?.series,
  description: data?.description || "김지훈의 개발 블로그 입니다.",
});

const createPost = async (category: string, filePath: string) => {
  const { slug, data, content } = parseMarkdownFile(filePath);
  const metadata = createMetadata(data, content);

  const categoryOutDir = path.join(category, `${slug}.html`);
  const href = `/blog/${category}/${slug}`;
  const excerpt = content.slice(0, 200);

  return {
    category,
    href,
    metadata,
    content: categoryOutDir,
    excerpt,
  };
};

export default createPost;
