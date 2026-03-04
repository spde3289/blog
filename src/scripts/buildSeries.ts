import { SERIES_CONFIG, SeriesKey } from "@/constants/series";
import buildPostData, { parseMarkdownFrontmatter } from "@/lib/md";
import { CONTENT_DIR, SERIES_JSON_PATH } from "@/lib/paths";
import fs from "fs";
import path from "path";

const buildSeriesJson = async () => {
  const groups = new Map<
    string,
    { series: string; seriesName: string; posts: any[] }
  >();

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

      const rawSeries =
        typeof data.series === "string" && data.series.trim().length > 0
          ? data.series.trim()
          : null;

      if (!rawSeries) continue;

      if (!(rawSeries in SERIES_CONFIG)) {
        console.warn(
          `⚠️ 경고: '${rawSeries}'는 등록되지 않은 시리즈입니다. 오타를 확인하세요. (${filePath})`,
        );
        continue;
      }

      const seriesSlug = rawSeries as SeriesKey;
      const seriesName = SERIES_CONFIG[seriesSlug] || SERIES_CONFIG[seriesSlug];

      const post = await buildPostData(category, filePath);

      if (!groups.has(seriesSlug)) {
        groups.set(seriesSlug, {
          series: seriesSlug,
          seriesName: seriesName,
          posts: [],
        });
      }
      groups.get(seriesSlug)!.posts.push(post);
    }
  }

  const output = Array.from(groups.values())
    .map((g) => {
      g.posts.sort((a, b) => b.metadata.date.localeCompare(a.metadata.date));

      const lastUpdated = g.posts.length > 0 ? g.posts[0].metadata.date : "";

      return {
        series: g.series,
        seriesName: g.seriesName,
        lastUpdated: lastUpdated,
        postIds: g.posts.map((post) => post.href),
      };
    })
    .sort((a, b) => b.lastUpdated.localeCompare(a.lastUpdated));

  const outDir = path.dirname(SERIES_JSON_PATH);
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  fs.writeFileSync(SERIES_JSON_PATH, JSON.stringify(output, null, 2), "utf8");

  console.log(`📦 ${SERIES_JSON_PATH} 생성 완료`);
};

buildSeriesJson();
