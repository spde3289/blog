import { writeFileUtf8 } from "../fsUtils.js";
import { CONTENT_DIR, SERIES_JSON_PATH } from "../paths.js";
import { forEachMdInCategories } from "../readers.js";
import type { SeriesGroup } from "../types.js";
import createPost, { parseFrontMatter } from "./md.js";

const buildSeriesJson = async () => {
  const groups = new Map<string, SeriesGroup>();

  await forEachMdInCategories(CONTENT_DIR, async ({ category, filePath }) => {
    const { data } = parseFrontMatter(filePath);

    const series =
      typeof data.series === "string" && data.series.trim().length > 0
        ? data.series.trim()
        : null;

    if (!series) return;

    const post = await createPost(category, filePath);

    const key = series.toLowerCase();
    if (!groups.has(key)) groups.set(key, { series, posts: [] });
    groups.get(key)!.posts.push(post);
  });

  // 각 시리즈 내부 최신순 정렬
  groups.forEach((g) => {
    g.posts.sort((a, b) => b.metadata.date.localeCompare(a.metadata.date));
  });

  // 시리즈명 정렬
  const output = Array.from(groups.values()).sort((a, b) =>
    a.series.localeCompare(b.series, "ko")
  );

  console.log(`📦 ${SERIES_JSON_PATH} 생성 완료`);
  writeFileUtf8(SERIES_JSON_PATH, JSON.stringify(output, null, 2));
};

buildSeriesJson().catch((e) => {
  console.error("❌ Series build failed:", e);
  process.exit(1);
});
