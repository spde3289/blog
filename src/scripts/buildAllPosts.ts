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

const processSinglePost = async (fileInfo: PostFileInfo) => {
  const { category, slug, filePath } = fileInfo;

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = parseMarkdownFrontmatter(fileContents);

  const html = await convertMarkdownToHtml(content);
  const htmlOutPath = getPostHtmlFilePath(category, slug);
  fs.writeFileSync(htmlOutPath, html, "utf8");

  const metadata = buildPostMetadata(data, content);
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

  const buildTasks = postFiles.map((fileInfo) => processSinglePost(fileInfo));

  await Promise.all(buildTasks);

  console.log(`✅ 총 ${buildTasks.length}개의 포스트 (HTML & JSON) 빌드 완료!`);
};
