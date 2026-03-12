import { CATEGORIES_JSON_PATH } from "@/lib/paths";
import { getAllPostFiles } from "@/lib/postUtils";
import type { Category } from "@/types/posts.types";
import fs from "fs";
import path from "path";

export const buildCategoriesJson = () => {
  const postFiles = getAllPostFiles();

  const categoryCounts = postFiles.reduce(
    (acc, file) => {
      acc[file.category] = (acc[file.category] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const result: Category[] = Object.entries(categoryCounts).map(
    ([name, count]) => ({ name, count })
  );

  const outDir = path.dirname(CATEGORIES_JSON_PATH);
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  fs.writeFileSync(
    CATEGORIES_JSON_PATH,
    JSON.stringify(result, null, 2),
    "utf8"
  );

  console.log(
    `📦 ${CATEGORIES_JSON_PATH} 생성 완료 (${result.length}개 카테고리)`
  );
};
