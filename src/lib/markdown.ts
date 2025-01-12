import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { remark } from "remark";
import html from "remark-html";

const contentDir = path.join(process.cwd(), "src/content"); // 'src/content' 경로 수정

export async function getPost(category: string, slug: string) {
  const filePath = path.join(contentDir, category, `${slug}.md`); // 카테고리 폴더에서 파일 찾기
  const fileContents = fs.readFileSync(filePath, "utf8");

  // gray-matter로 메타데이터와 콘텐츠 분리
  const { data, content } = matter(fileContents);

  // remark로 Markdown을 HTML로 변환
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    metadata: data,
    contentHtml,
  };
}

// src/content 디렉토리 경로
const contentPostsDir = path.join(process.cwd(), "src", "content");

type metadataType = { title: string; tags: string[]; data: string };

export function getAllPosts() {
  const categories = fs.readdirSync(contentPostsDir); // content 폴더 내의 모든 카테고리 이름
  const allPosts: Array<{ slug: string; metadata: metadataType }> = [];

  // 각 카테고리를 순회하며 파일을 읽어옵니다.
  categories.forEach((category) => {
    const categoryPath = path.join(contentPostsDir, category);
    if (fs.statSync(categoryPath).isDirectory()) {
      const fileNames = fs.readdirSync(categoryPath); // 각 카테고리 내의 파일들

      fileNames.forEach((fileName) => {
        const filePath = path.join(categoryPath, fileName);
        if (fs.statSync(filePath).isFile()) {
          // 파일 내용 읽기
          const fileContents = fs.readFileSync(filePath, "utf8");

          // gray-matter로 메타데이터와 콘텐츠 분리
          const { data } = matter(fileContents);

          // gray-matter에서 반환된 data가 metadataType에 맞지 않으면 기본값을 설정
          const metadata: metadataType = {
            title: data.title || "Default Title", // title이 없으면 기본값 설정
            tags: Array.isArray(data.tags) ? data.tags : [], // tags가 배열이 아니면 빈 배열
            data: data.date || "Unknown", // date가 없으면 기본값 설정
          };

          // 메타데이터와 파일 이름을 결합하여 결과 배열에 추가
          allPosts.push({
            slug: path.join(category, fileName.replace(/\.md$/, "")), // category와 slug 결합
            metadata,
          });
        }
      });
    }
  });

  return allPosts;
}
