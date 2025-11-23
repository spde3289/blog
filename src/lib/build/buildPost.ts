import path from "path";
import { writeFileUtf8 } from "../fsUtils.js";
import { CONTENT_DIR, POSTS_OUT_ROOT } from "../paths.js";
import { forEachMdInCategories } from "../readers.js";
import { mdToHtml, parseFrontMatter } from "./md.js";

const buildAllPostsJson = async () => {
  await forEachMdInCategories(CONTENT_DIR, async ({ category, filePath }) => {
    const { content, slug } = parseFrontMatter(filePath);

    const html = await mdToHtml(content);
    writeFileUtf8(path.join(POSTS_OUT_ROOT, category, `${slug}.html`), html);

    console.log(`🎉${category} ${slug}.html 파일 생성 완료`);
  });
};

buildAllPostsJson().catch((e) => {
  console.error("❌ Build failed:", e);
  process.exit(1);
});
