import buildPostData from "@/lib/md";
import { CONTENT_DIR, POSTS_JSON_PATH } from "@/lib/paths";
import fs from "fs";
import path from "path";

const buildPostMetaJson = async () => {
  const dirents = fs.readdirSync(CONTENT_DIR, { withFileTypes: true });
  const categories = dirents.filter((d) => d.isDirectory()).map((d) => d.name);

  for (const category of categories) {
    const categoryPath = path.join(CONTENT_DIR, category);

    const files = fs.readdirSync(categoryPath, { withFileTypes: true });
    const mdFiles = files
      .filter((f) => f.isFile() && f.name.toLowerCase().endsWith(".md"))
      .map((f) => f.name);

    for (const fileName of mdFiles) {
      const filePath = path.join(categoryPath, fileName);
      const slug = fileName.replace(/\.md$/i, "");

      const post = await buildPostData(category, filePath);

      const outPath = path.join(POSTS_JSON_PATH, category, `${slug}.json`);
      const outDir = path.dirname(outPath);

      if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir, { recursive: true });
      }

      fs.writeFileSync(outPath, JSON.stringify(post, null, 2), "utf8");

      console.log(`🎉 ${category}/${slug}.json 생성 완료`);
    }
  }
};

buildPostMetaJson();
