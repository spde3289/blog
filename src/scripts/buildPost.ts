import { writeFileUtf8 } from "@/lib/fsUtils";
import { mdToHtml, parseMarkdownFile } from "@/lib/md";
import { CONTENT_DIR, POSTS_OUT_ROOT } from "@/lib/paths";
import { forEachMdInCategories } from "@/lib/readers";
import path from "path";

const buildAllPostsJson = async () => {
  await forEachMdInCategories(CONTENT_DIR, async ({ category, filePath }) => {
    const { content, slug } = parseMarkdownFile(filePath);

    const html = await mdToHtml(content);
    writeFileUtf8(path.join(POSTS_OUT_ROOT, category, `${slug}.html`), html);

    console.log(`🎉${category} ${slug}.html 파일 생성 완료`);
  });
};

buildAllPostsJson().catch((e) => {
  console.error("❌ Build failed:", e);
  process.exit(1);
});
