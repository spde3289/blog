import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { remark } from "remark";
import gfm from "remark-gfm"; // GitHub Flavored Markdown 플러그인
import html from "remark-html";

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
    metadata: data,
    contentHtml,
  };
};

export type metadataType = {
  title: string;
  tags: string[];
  data: string;
};

export type getAllPostsType = Array<{
  category: string;
  post: string;
  metadata: metadataType;
  content: string;
  excerpt: string;
  href: string;
  img: string;
}>;

export const getAllPosts = (): getAllPostsType => {
  const categories = fs.readdirSync(contentDir); // content 폴더 내의 모든 카테고리 이름
  const allPosts: getAllPostsType = [];

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

          const metadata: metadataType = {
            title: data.title || "Default Title", // title이 없으면 기본값 설정
            tags: Array.isArray(data.tags) ? data.tags : [], // tags가 배열이 아니면 빈 배열
            data: data.date || "Unknown", // date가 없으면 기본값 설정
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
    return b.metadata.data.localeCompare(a.metadata.data);
  });
};

export type getAllcategorysType = { name: string; count: number }[];

export const getAllcategorys = (): getAllcategorysType => {
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
