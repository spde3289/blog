import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { remark } from "remark";
import gfm from "remark-gfm";
import html from "remark-html";

/* =========================
 *  타입
 * ========================= */
type PostMetaData = {
  title: string;
  tags: string[];
  date: string;
  image: string;
  series?: string;
  description?: string;
};

type BuiltPost = {
  category: string;
  href: string; // /blog/<category>/<slug>
  post: string; // HTML 문자열
  metadata: PostMetaData;
  excerpt: string; // 미리보기 텍스트
};

/* =========================
 *  경로 설정 (필요시 외부에서 주입 가능)
 * ========================= */
const CONTENT_DIR = path.join(process.cwd(), "src/content/posts");
const OUT_ROOT = path.join(process.cwd(), "src/build/posts");

/* =========================
 *  유틸
 * ========================= */
const ensureDir = (dir: string) => {
  if (!fs.existsSync(dir)) return fs.mkdirSync(dir, { recursive: true });
};

const isDirectory = (p: string): boolean => {
  return fs.existsSync(p) && fs.statSync(p).isDirectory();
};

const isFile = (p: string): boolean => {
  return fs.existsSync(p) && fs.statSync(p).isFile();
};

/* =========================
 *  1) 입력 수집
 * ========================= */
const readCategories = (root: string): string[] => {
  return fs
    .readdirSync(root)
    .filter((name) => isDirectory(path.join(root, name)));
};

const readMdFilesInCategory = (categoryDir: string): string[] => {
  return fs
    .readdirSync(categoryDir)
    .filter((fname) => fname.toLowerCase().endsWith(".md"));
};

/* =========================
 *  2) 단일 파일 파싱 → 포스트 객체 빌드
 * ========================= */
const extractThumbnail = (markdown: string): string => {
  const imageRegex = /!\[.*?\]\((.*?)\)/;
  return markdown.match(imageRegex)?.[1] || "/img/thumbnail.png";
};

const buildMetadata = (data: any, content: any): PostMetaData => ({
  title: data?.title || "Default Title",
  tags: Array.isArray(data?.tags) ? data.tags : [],
  date: data?.date || "Unknown",
  image: extractThumbnail(content),
  series: data?.series,
  description: data?.description || "김지훈의 개발 블로그 입니다.",
});

const mdToHtml = async (md: string): Promise<string> => {
  const processed = await remark().use(gfm).use(html).process(md);
  return String(processed);
};

const buildPostFromFile = async (
  category: string,
  filePath: string
): Promise<BuiltPost> => {
  const fileName = path.basename(filePath);
  const slug = fileName.replace(/\.md$/i, "");
  const fileContents = fs.readFileSync(filePath, "utf8");

  const { data, content } = matter(fileContents);
  const metadata = buildMetadata(data, content);

  const contentHtml = await mdToHtml(content);

  return {
    category,
    href: `/blog/${category}/${slug}`,
    post: contentHtml,
    metadata,
    excerpt: content.slice(0, 200),
  };
};

/* =========================
 *  3) 출력 (JSON 저장)
 * ========================= */
const writePostJson = (outRoot: string, post: BuiltPost) => {
  const categoryOutDir = path.join(outRoot, post.category);
  ensureDir(categoryOutDir);

  const slug = post.href.split("/").pop()!; // 마지막 세그먼트
  const outFile = path.join(categoryOutDir, `${slug}.json`);

  fs.writeFileSync(outFile, JSON.stringify(post, null, 2), "utf8");
  console.log(`📦 ${outFile} 생성 완료`);
};

/* =========================
 *  4) 카테고리 처리
 * ========================= */
const processCategory = async (category: string) => {
  const categoryPath = path.join(CONTENT_DIR, category);
  const mdFiles = readMdFilesInCategory(categoryPath);

  for (const fname of mdFiles) {
    const filePath = path.join(categoryPath, fname);
    if (!isFile(filePath)) {
      const message = `❌ 빌드 중단: '${category}/${fname}'은(는) 파일이 아닙니다.`;
      console.error(message);
      throw new Error(message); // 🔥 여기서 즉시 중단
    }

    console.log(`✅ 생성 대상: ${category}/${fname}`);
    const built = await buildPostFromFile(category, filePath);
    writePostJson(OUT_ROOT, built);
  }
};

/* =========================
 *  5) 엔트리: 전체 실행
 * ========================= */
const buildAllPostsJson = async () => {
  const categories = readCategories(CONTENT_DIR);
  for (const category of categories) {
    await processCategory(category);
  }
  console.log("🎉 모든 포스트 JSON 파일 생성 완료");
};

if (require.main === module) {
  buildAllPostsJson().catch((e) => {
    console.error("❌ Build failed:", e);
    process.exit(1);
  });
}
