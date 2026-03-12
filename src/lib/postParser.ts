import { BLOG_CONFIG } from "@/constants/blogConfig";
import type { PostMetaData } from "@/types/posts.types";
import matter from "gray-matter";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

type Data = { [key: string]: string };

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
  const text = markdown
    .replace(/```[\s\S]*?```/g, "")
    .replace(/<[^>]*>?/gm, "")
    .replace(/!\[.*?\]\(.*?\)/g, "")
    .replace(/\[(.*?)\]\(.*?\)/g, "$1")
    .replace(/([*_~`#>]+)/g, "")
    .replace(/\s+/g, " ")
    .trim();

  return text.slice(0, length);
};

// 기존의 convertMarkdownToHtml 함수를 대체합니다.
export const convertMarkdownToHtml = async (markdown: string) => {
  const result = await unified()
    .use(remarkParse) // 1. 마크다운을 AST(추상 구문 트리)로 파싱
    .use(remarkGfm)
    .use(remarkRehype) // 2. 마크다운 트리를 HTML 트리로 변환
    .use(rehypeSlug)
    .use(rehypePrettyCode, {
      // 3. rehype-pretty-code 적용 (원하는 Shiki 테마 설정)
      theme: {
        light: "github-light",
        dark: "github-dark",
      },
      keepBackground: true, // 테마의 기본 배경색 유지
    })
    .use(rehypeStringify) // 4. HTML 트리를 최종 문자열로 변환
    .process(markdown);

  return result.toString();
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
