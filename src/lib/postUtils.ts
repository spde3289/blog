import { CONTENT_DIR } from "@/lib/paths";
import fs from "fs";
import path from "path";

export interface PostFileInfo {
  category: string;
  fileName: string;
  filePath: string;
  slug: string;
}

/** 모든 마크다운 파일의 경로와 메타 정보를 배열로 추출하는 유틸리티 */
export const getAllPostFiles = (): PostFileInfo[] => {
  const dirents = fs.readdirSync(CONTENT_DIR, { withFileTypes: true });
  const categories = dirents.filter((d) => d.isDirectory()).map((d) => d.name);

  const postFiles: PostFileInfo[] = [];

  for (const category of categories) {
    const categoryPath = path.join(CONTENT_DIR, category);
    const files = fs.readdirSync(categoryPath, { withFileTypes: true });

    const mdFiles = files
      .filter((f) => f.isFile() && f.name.toLowerCase().endsWith(".md"))
      .map((f) => f.name);

    for (const fileName of mdFiles) {
      postFiles.push({
        category,
        fileName,
        filePath: path.join(categoryPath, fileName),
        slug: fileName.replace(/\.md$/i, ""),
      });
    }
  }

  return postFiles;
};
