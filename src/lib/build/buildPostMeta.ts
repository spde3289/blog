import path from "path";
import { writeFileUtf8 } from "../fsUtils.js";
import { CONTENT_DIR, POSTS_JSON_PATH } from "../paths.js";
import { forEachMdInCategories } from "../readers.js";
import createPost from "./md.js";

const buildPostMetaJson = async () => {
  await forEachMdInCategories(
    CONTENT_DIR,
    async ({ category, filePath, fileName }) => {
      const post = await createPost(category, filePath);
      const slug = fileName.replace(/\.md$/i, "");

      writeFileUtf8(
        path.join(POSTS_JSON_PATH, category, `${slug}.json`),
        JSON.stringify(post, null, 2)
      );

      console.log(`🎉${category} ${slug}.json 파일 생성 완료`);
    }
  );
};

buildPostMetaJson().catch((e) => {
  console.error("❌ Build failed:", e);
  process.exit(1);
});
