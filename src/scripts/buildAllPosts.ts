import { BLOG_CONFIG } from "@/constants/blogConfig";
import { ROUTES } from "@/constants/routes";
import {
  POSTS_HTML_DIR,
  POSTS_JSON_DIR,
  getPostHtmlFilePath,
  getPostJsonFilePath,
} from "@/lib/paths";
import {
  buildPostMetadata,
  convertMarkdownToHtml,
  getPlainTextExcerpt,
  parseMarkdownFrontmatter,
} from "@/lib/postParser";
import { getAllPostFiles, type PostFileInfo } from "@/lib/postUtils";
import type { Post } from "@/types/posts.types";
import fs from "fs";
import path from "path";

interface ParsedPost {
  fileInfo: PostFileInfo;
  data: { [key: string]: string };
  content: string;
}

const processSinglePost = async ({ fileInfo, data, content }: ParsedPost) => {
  const { category, slug } = fileInfo;

  const html = await convertMarkdownToHtml(content);
  const htmlOutPath = getPostHtmlFilePath(category, slug);
  fs.writeFileSync(htmlOutPath, html, "utf8");

  const metadata = buildPostMetadata(data);
  const excerpt = getPlainTextExcerpt(content, BLOG_CONFIG.EXCERPT_LENGTH);

  const postMetaData: Post = {
    category,
    href: ROUTES.BLOG.POST(category, slug),
    metadata,
    excerpt,
  };

  const jsonOutPath = getPostJsonFilePath(category, slug);
  fs.writeFileSync(jsonOutPath, JSON.stringify(postMetaData, null, 2), "utf8");
};

export const buildAllPosts = async () => {
  if (fs.existsSync(POSTS_HTML_DIR))
    fs.rmSync(POSTS_HTML_DIR, { recursive: true, force: true });
  if (fs.existsSync(POSTS_JSON_DIR))
    fs.rmSync(POSTS_JSON_DIR, { recursive: true, force: true });

  const postFiles = getAllPostFiles();

  const categories = [...new Set(postFiles.map((f) => f.category))];
  categories.forEach((category) => {
    fs.mkdirSync(path.join(POSTS_HTML_DIR, category), { recursive: true });
    fs.mkdirSync(path.join(POSTS_JSON_DIR, category), { recursive: true });
  });

  const parsedPosts: ParsedPost[] = postFiles.map((fileInfo) => {
    const fileContents = fs.readFileSync(fileInfo.filePath, "utf8");
    const { data, content } = parseMarkdownFrontmatter(fileContents);
    return { fileInfo, data, content };
  });

  const seriesMap: Record<string, ParsedPost[]> = {};
  parsedPosts.forEach((post) => {
    const series = post.data.series;
    if (series) {
      if (!seriesMap[series]) seriesMap[series] = [];
      seriesMap[series].push(post);
    }
  });

  Object.keys(seriesMap).forEach((series) => {
    seriesMap[series]
      .sort((a, b) => {
        const dateA = new Date(a.data.date || 0).getTime();
        const dateB = new Date(b.data.date || 0).getTime();
        return dateA - dateB;
      })
      .forEach((post, index) => {
        const originalTitle = post.data.title || "Default Title";
        post.data.title = `[${series} - ${index + 1}] ${originalTitle}`;
      });
  });

  const buildTasks = parsedPosts.map((post) => processSinglePost(post));

  await Promise.all(buildTasks);

  console.log(`✅ 총 ${buildTasks.length}개의 포스트 (HTML & JSON) 빌드 완료!`);
};
