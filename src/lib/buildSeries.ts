import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "src/content/posts");
const outputPath = path.join(process.cwd(), "src/build/meta", "series.json");

type PostMetaData = {
  title: string;
  series: string;
  tags: string[];
  date: string;
};

type SeriesPost = {
  href: string;
  metadata: PostMetaData;
  content: string;
};

type SeriesGroup = {
  series: string;
  posts: SeriesPost[];
};

// 시리즈 그룹 생성 함수
const getSeriesGroups = (): SeriesGroup[] => {
  const groups = new Map<string, SeriesGroup>();
  const categories = fs.readdirSync(contentDir);

  categories.forEach((category) => {
    const categoryPath = path.join(contentDir, category);

    // 디렉터리만 처리
    if (!fs.statSync(categoryPath).isDirectory()) return;

    const fileNames = fs.readdirSync(categoryPath);

    fileNames.forEach((fileName) => {
      const filePath = path.join(categoryPath, fileName);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);

      const series =
        typeof data.series === "string" && data.series.trim().length > 0
          ? data.series.trim()
          : null;
      if (!series) return;

      const slug = fileName.replace(/\.md$/, "");
      const metadata: PostMetaData = {
        title: data.title ?? "Untitled",
        series,
        tags: Array.isArray(data.tags) ? data.tags : [],
        date: data.date ?? "Unknown",
      };

      const post: SeriesPost = {
        href: `/blog/${category}/${slug}`,
        metadata,
        content,
      };

      const key = series.toLowerCase();
      if (!groups.has(key)) groups.set(key, { series, posts: [] });
      groups.get(key)!.posts.push(post);
    });
  });

  // 각 시리즈 내 글 정렬 (최신순)
  groups.forEach((group) => {
    group.posts.sort((a, b) => b.metadata.date.localeCompare(a.metadata.date));
  });

  // 시리즈명 정렬
  return Array.from(groups.values()).sort((a, b) =>
    a.series.localeCompare(b.series, "ko")
  );
};

// JSON 파일 생성 함수
const buildSeriesJson = () => {
  const seriesGroups = getSeriesGroups();

  const jsonContent = JSON.stringify(seriesGroups, null, 2);

  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, jsonContent, "utf8");
  console.log(`✅ 시리즈 JSON 파일 생성 완료: ${outputPath}`);
};

// 실행 시 JSON 생성
buildSeriesJson();
