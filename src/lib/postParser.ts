import { BLOG_CONFIG } from "@/constants/blogConfig";
import type { PostMetaData } from "@/types/posts.types";
import matter from "gray-matter";
import { remark } from "remark";
import gfm from "remark-gfm";
import html from "remark-html";

type Data = { [key: string]: any };

export const getMarkdownThumbnail = (markdown: string): string => {
  const imageRegex = /!\[.*?\]\((.*?)\)/;
  return markdown.match(imageRegex)?.[1] || BLOG_CONFIG.DEFAULT_THUMBNAIL;
};

export const getPlainTextExcerpt = (
  markdown: string,
  length: number = BLOG_CONFIG.EXCERPT_LENGTH,
): string => {
  let text = markdown
    .replace(/```[\s\S]*?```/g, "")
    .replace(/<[^>]*>?/gm, "")
    .replace(/!\[.*?\]\(.*?\)/g, "")
    .replace(/\[(.*?)\]\(.*?\)/g, "$1")
    .replace(/([*_~`#>]+)/g, "")
    .replace(/\s+/g, " ")
    .trim();

  return text.slice(0, length);
};

export const convertMarkdownToHtml = async (md: string): Promise<string> => {
  const processed = await remark().use(gfm).use(html).process(md);
  return String(processed);
};

export const parseMarkdownFrontmatter = (fileContents: string) => {
  const { data, content } = matter(fileContents);
  return { data, content };
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
