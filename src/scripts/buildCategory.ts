import { listDirs, listFilesByExt, writeFileUtf8 } from "@/lib/fsUtils";
import { CATEGORY_JSON_PATH, CONTENT_DIR } from "@/lib/paths";
import type { CategoryList } from "@/types/posts.types";
import path from "path";

const buildCategoryJson = () => {
  const categories = listDirs(CONTENT_DIR);
  const result: CategoryList = categories.map((category) => {
    const categoryPath = path.join(CONTENT_DIR, category);
    const mdFiles = listFilesByExt(categoryPath, ".md");

    return { name: category, count: mdFiles.length };
  });
  console.log(`📦 ${CATEGORY_JSON_PATH} 생성 완료`);
  writeFileUtf8(CATEGORY_JSON_PATH, JSON.stringify(result, null, 2));
};

buildCategoryJson();
