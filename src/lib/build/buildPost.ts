import path from "path";
import { writeFileUtf8 } from "../fsUtils.js";
import { CONTENT_DIR, POSTS_OUT_ROOT } from "../paths.js";
import { forEachMdInCategories } from "../readers.js";
import createPost from "./md.js";

const buildAllPostsJson = async () => {
  await forEachMdInCategories(CONTENT_DIR, async ({ category, filePath }) => {
    const post = await createPost(category, filePath);

    const categoryOutDir = path.join(POSTS_OUT_ROOT, post.category);
    const slug = post.href.split("/").pop()!;
    const outFile = path.join(categoryOutDir, `${slug}.json`);

    writeFileUtf8(outFile, JSON.stringify(post, null, 2));
    console.log(`📦 ${outFile} 생성 완료`);
  });
  console.log("🎉 모든 포스트 JSON 파일 생성 완료");
};

buildAllPostsJson().catch((e) => {
  console.error("❌ Build failed:", e);
  process.exit(1);
});
