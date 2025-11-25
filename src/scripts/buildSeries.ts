import buildPostData, { parseMarkdownFrontmatter } from "@/lib/md";
import { CONTENT_DIR, SERIES_JSON_PATH } from "@/lib/paths";
import type { SeriesGroup } from "@/types/posts.types";
import fs from "fs";
import path from "path";

const buildSeriesJson = async () => {
  const groups = new Map<string, SeriesGroup>();

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

      const { data } = parseMarkdownFrontmatter(filePath);

      const series =
        typeof data.series === "string" && data.series.trim().length > 0
          ? data.series.trim()
          : null;

      if (!series) continue;

      const post = await buildPostData(category, filePath);

      const key = series.toLowerCase();
      if (!groups.has(key)) {
        groups.set(key, { series, posts: [] });
      }
      groups.get(key)!.posts.push(post);
    }
  }

  groups.forEach((g) => {
    g.posts.sort((a, b) => b.metadata.date.localeCompare(a.metadata.date));
  });

  const output = Array.from(groups.values()).sort((a, b) =>
    a.series.localeCompare(b.series, "ko")
  );

  const outDir = path.dirname(SERIES_JSON_PATH);
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  fs.writeFileSync(SERIES_JSON_PATH, JSON.stringify(output, null, 2), "utf8");

  console.log(`📦 ${SERIES_JSON_PATH} 생성 완료`);
};

buildSeriesJson();
