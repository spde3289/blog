import path from "path";
import { listFilesByExt, writeFileUtf8 } from "../fsUtils.js";
import { CATEGORY_JSON_PATH, CONTENT_DIR } from "../paths.js";
import { readCategories } from "../readers.js";
import type { CategoryList } from "../types.js";

const buildCategoryJson = () => {
  const categories = readCategories(CONTENT_DIR);
  const result: CategoryList = categories.map((category) => {
    const categoryPath = path.join(CONTENT_DIR, category);
    const mdFiles = listFilesByExt(categoryPath, ".md");

    return { name: category, count: mdFiles.length };
  });
  console.log(`📦 ${CATEGORY_JSON_PATH} 생성 완료`);
  writeFileUtf8(CATEGORY_JSON_PATH, JSON.stringify(result, null, 2));
};

buildCategoryJson();
