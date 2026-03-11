import { BLOG_CONFIG } from "@/constants/blogConfig";
import type { PostMetaData } from "@/types/posts.types";
import matter from "gray-matter";
import { remark } from "remark";
import gfm from "remark-gfm";
import html from "remark-html";

type Data = { [key: string]: any };

export const getSeriesThumbnail = (series?: string): string => {
  if (!series) return BLOG_CONFIG.THUMBNAIL.DEFAULT;

  const formattedKey = series
    .toUpperCase()
    .replace(/-/g, "_") as keyof typeof BLOG_CONFIG.THUMBNAIL;

  return BLOG_CONFIG.THUMBNAIL[formattedKey] || BLOG_CONFIG.THUMBNAIL.DEFAULT;
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

export const buildPostMetadata = (data: Data): PostMetaData => ({
  title: data?.title || "Default Title",
  tags: Array.isArray(data?.tags) ? data.tags : [],
  date: data?.date || "Unknown",
  series: data?.series,
  image: getSeriesThumbnail(data?.series),
  description: data?.description || undefined,
});
