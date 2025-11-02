import fs from "fs";
import path from "path";

const contentDir = path.join(process.cwd(), "src/content/posts");
const outputPath = path.join(process.cwd(), "src/build/meta", "category.json");

export type Categorys = { name: string; count: number }[];

const getAllcategorys = (): Categorys => {
  const directoryNames = fs.readdirSync(contentDir);

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

// JSON 파일 생성
const buildCategoryJson = () => {
  const categories = getAllcategorys();

  // JSON 문자열 변환 (가독성을 위해 들여쓰기 2칸)
  const jsonContent = JSON.stringify(categories, null, 2);

  // 출력 디렉토리 존재 여부 확인 및 생성
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // 파일 쓰기
  fs.writeFileSync(outputPath, jsonContent, "utf8");
  console.log(`✅ 카테고리 JSON 파일 생성 완료: ${outputPath}`);
};

// 실행 시 JSON 파일 생성
buildCategoryJson();
