import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { remark } from "remark";
import gfm from "remark-gfm"; // GitHub Flavored Markdown 플러그인
import html from "remark-html";

export type PostMetaData = {
  title: string;
  series?: string;
  tags: string[];
  date: string;
  description?: string;
  image?: string;
};

export type Post = {
  category: string;
  post: string;
  metadata: PostMetaData;
  content: string;
  excerpt: string;
  href: string;
  img: string;
};

const contentDir = path.join(process.cwd(), "src/content"); // 'src/content' 경로 수정

export const getPost = async (category: string, post: string) => {
  const filePath = path.join(contentDir, category, `${post}.md`); // 카테고리 폴더에서 파일 찾기
  const fileContents = fs.readFileSync(filePath, "utf8");

  // gray-matter로 메타데이터와 콘텐츠 분리
  const { data, content } = matter(fileContents);

  // remark로 Markdown을 HTML로 변환
  const processedContent = await remark().use(gfm).use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    post,
    metadata: data as PostMetaData,
    contentHtml,
  };
};

export const getAllPosts = (): Post[] => {
  const categories = fs.readdirSync(contentDir); // content 폴더 내의 모든 카테고리 이름
  const allPosts: Post[] = [];

  // 각 카테고리를 순회하며 파일을 읽어옵니다.
  categories.forEach((category) => {
    const categoryPath = path.join(contentDir, category);

    if (fs.statSync(categoryPath).isDirectory()) {
      const fileNames = fs.readdirSync(categoryPath); // 각 카테고리 내의 파일들

      fileNames.forEach((fileName) => {
        const filePath = path.join(categoryPath, fileName);
        if (fs.statSync(filePath).isFile()) {
          // 파일 내용 읽기
          const fileContents = fs.readFileSync(filePath, "utf8");

          // gray-matter로 메타데이터와 콘텐츠 분리
          const { data, content } = matter(fileContents);

          // 이미지 URL 추출 정규식
          const imageRegex = /!\[.*?\]\((.*?)\)/;

          // 첫 번째 이미지 URL 찾기
          const img = content.match(imageRegex)?.[1] || "/img/thumbnail.png"; // "/img/thumbnail.png";

          const excerpt = content.split("\n")[0];

          const metadata: PostMetaData = {
            title: data.title || "Default Title", // title이 없으면 기본값 설정
            series: data.series,
            tags: Array.isArray(data.tags) ? data.tags : [], // tags가 배열이 아니면 빈 배열
            date: data.date || "Unknown", // date가 없으면 기본값 설정
          };

          // 메타데이터와 파일 이름을 결합하여 결과 배열에 추가
          allPosts.push({
            category: category,
            href: `/blog/${category}/${fileName.replace(/\.md$/, "")}`,
            post: fileName.replace(/\.md$/, ""),
            metadata,
            content,
            excerpt,
            img,
          });
        }
      });
    }
  });

  return allPosts.sort((a, b) => {
    return b.metadata.date.localeCompare(a.metadata.date);
  });
};

export type Categorys = { name: string; count: number }[];

export const getAllcategorys = (): Categorys => {
  const directoryNames = fs.readdirSync(contentDir); // content 폴더 내의 모든 카테고리 이름

  const categories = directoryNames
    .filter((category) => {
      const categoryPath = path.join(contentDir, category);
      return fs.statSync(categoryPath).isDirectory();
    })
    .map((category) => {
      const categoryPath = path.join(contentDir, category);
      const fileNames = fs.readdirSync(categoryPath);
      return { name: category, count: fileNames.length };
    });
  return categories;
};

type SeriesPost = {
  href: string;
  metadata: PostMetaData;
  content: string;
};

export type SeriesGroup = {
  series: string; // 시리즈명(원문)
  posts: SeriesPost[]; // 이 시리즈에 속한 글들
};

export const getSeriesGroups = (): SeriesGroup[] => {
  const groups = new Map<string, SeriesGroup>();
  const categories = fs.readdirSync(contentDir); // content 폴더 내의 모든 카테고리 이름

  // 각 카테고리를 순회
  categories.forEach((category) => {
    const categoryPath = path.join(contentDir, category);

    // 해당 카테고리 안의 .md 파일 목록
    const fileNames = fs.readdirSync(categoryPath); // 각 카테고리 내의 파일들

    // 각 파일 순회
    fileNames.forEach((fileName) => {
      const filePath = path.join(categoryPath, fileName);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);

      // series 필드 유효성 검사
      const series =
        typeof data.series === "string" && data.series.trim().length > 0
          ? data.series.trim()
          : null;
      if (!series) return; // 시리즈 없는 글은 스킵

      const slug = fileName.replace(/\.md$/, "");
      const metadata: PostMetaData = {
        title: data.title ?? "Default Title",
        series,
        tags: Array.isArray(data.tags) ? data.tags : [],
        date: data.date ?? "Unknown",
      };

      const post: SeriesPost = {
        href: `/blog/${category}/${slug}`,
        metadata,
        content,
      };

      // 시리즈 키(소문자)로 그룹핑
      const key = series.toLowerCase();
      if (!groups.has(key)) {
        groups.set(key, { series, posts: [] });
      }
      groups.get(key)!.posts.push(post);
    });
  });

  // 각 시리즈 그룹 내부의 글 정렬 (최신순)
  groups.forEach((group) => {
    group.posts.sort((a, b) => b.metadata.date.localeCompare(a.metadata.date));
  });

  // 시리즈명으로 정렬
  return Array.from(groups.values()).sort((a, b) =>
    a.series.localeCompare(b.series, "ko")
  );
};
