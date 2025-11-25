import { CATEGORY_JSON_PATH, CONTENT_DIR } from "@/lib/paths";
import type { CategoryList } from "@/types/posts.types";
import fs from "fs";
import path from "path";

const buildCategoryJson = () => {
  const dirents = fs.readdirSync(CONTENT_DIR, { withFileTypes: true });
  const categories = dirents
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  const result: CategoryList = categories.map((category) => {
    const categoryPath = path.join(CONTENT_DIR, category);
    const files = fs.readdirSync(categoryPath);
    const mdFiles = files.filter((file) => file.toLowerCase().endsWith(".md"));

    return { name: category, count: mdFiles.length };
  });

  const outDir = path.dirname(CATEGORY_JSON_PATH);
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  fs.writeFileSync(CATEGORY_JSON_PATH, JSON.stringify(result, null, 2), "utf8");

  console.log(`📦 ${CATEGORY_JSON_PATH} 생성 완료`);
};

buildCategoryJson();
