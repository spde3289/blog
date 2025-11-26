import { convertMarkdownToHtml, parseMarkdownFrontmatter } from "@/lib/md";
import { CONTENT_DIR, POSTS_OUT_ROOT } from "@/lib/paths";
import fs from "fs";
import path from "path";

const buildAllPostsJson = async () => {
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

      const { content, slug } = parseMarkdownFrontmatter(filePath);

      const html = await convertMarkdownToHtml(content);

      const outPath = path.join(POSTS_OUT_ROOT, category, `${slug}.html`);
      const outDir = path.dirname(outPath);

      if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir, { recursive: true });
      }

      fs.writeFileSync(outPath, html, "utf8");

      console.log(`🎉 ${category}/${slug}.html 생성 완료`);
    }
  }
};

buildAllPostsJson();
