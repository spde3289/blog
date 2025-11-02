import path from "path";
import { isFile, listDirs, listFilesByExt } from "./fsUtils.js";

/** 콘텐츠 루트에서 카테고리(디렉터리) 목록 */
export const readCategories = (root: string): string[] => listDirs(root);

/** 카테고리/파일 단위 순회 헬퍼 */
export const forEachMdInCategories = async (
  root: string,
  handler: (ctx: {
    category: string;
    filePath: string;
    fileName: string;
  }) => Promise<void> | void
) => {
  const categories = readCategories(root);

  for (const category of categories) {
    const categoryPath = path.join(root, category);
    const mdFiles = listFilesByExt(categoryPath, ".md");
    for (const fname of mdFiles) {
      const filePath = path.join(categoryPath, fname);
      if (!isFile(filePath)) {
        const msg = `❌ 빌드 중단: '${category}/${fname}'은(는) 파일이 아닙니다.`;
        console.error(msg);
        throw new Error(msg);
      }
      await handler({ category, filePath, fileName: fname });
    }
  }
};
