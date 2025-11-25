import buildPostData from "@/lib/md";
import { CONTENT_DIR } from "@/lib/paths";
import fs from "fs";
import path from "path";

const META_DIR = path.join(process.cwd(), "src/content/build", "/meta");
const META_JSON_PATH = path.join(META_DIR, "/posts.json");

const buildPostMetaJson = async () => {
  const dirents = fs.readdirSync(CONTENT_DIR, { withFileTypes: true });
  const categories = dirents.filter((d) => d.isDirectory()).map((d) => d.name);

  const allPostMeta: any[] = [];

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

      allPostMeta.push({
        ...post,
      });

      console.log(`✅ ${category}/${slug} 메타데이터 수집 완료`);
    }
  }

  if (!fs.existsSync(META_DIR)) {
    fs.mkdirSync(META_DIR, { recursive: true });
  }

  fs.writeFileSync(
    META_JSON_PATH,
    JSON.stringify(allPostMeta, null, 2),
    "utf8"
  );
  console.log(`🎉 모든 게시글 메타데이터를 ${META_JSON_PATH}에 저장 완료`);
};

buildPostMetaJson();
