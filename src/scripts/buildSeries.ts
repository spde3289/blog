import { SERIES_CONFIG, SeriesKey, SeriesValue } from "@/constants/series";
import { SERIES_JSON_DIR, getSeriesFilePath } from "@/lib/paths";
import { parseMarkdownFrontmatter } from "@/lib/postParser";
import { getAllPostFiles } from "@/lib/postUtils";
import type { Category, Series } from "@/types/posts.types";
import fs from "fs";
import path from "path";

interface SeriesBuilder {
  series: SeriesKey;
  seriesName: SeriesValue;
  posts: { category: string; slug: string; date: string }[];
}

export const buildSeriesJson = async () => {
  const groups = new Map<SeriesKey, SeriesBuilder>();

  const postFiles = getAllPostFiles();

  for (const fileInfo of postFiles) {
    const { category, slug, filePath } = fileInfo;

    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = parseMarkdownFrontmatter(fileContents);

    const rawSeries =
      typeof data.series === "string" ? data.series.trim() : null;
    if (!rawSeries) continue;

    if (!(rawSeries in SERIES_CONFIG)) {
      console.warn(
        `⚠️ 경고: '${rawSeries}'는 등록되지 않은 시리즈입니다. (${filePath})`,
      );
      continue;
    }

    const seriesSlug = rawSeries as SeriesKey;
    const seriesName = SERIES_CONFIG[seriesSlug];

    const miniPost = {
      category,
      slug,
      date: data?.date || "Unknown",
    };

    if (!groups.has(seriesSlug)) {
      groups.set(seriesSlug, { series: seriesSlug, seriesName, posts: [] });
    }
    groups.get(seriesSlug)!.posts.push(miniPost);
  }

  const output: Series[] = Array.from(groups.values())
    .map((g): Series => {
      g.posts.sort((a, b) => b.date.localeCompare(a.date));
      const lastUpdated = g.posts.length > 0 ? g.posts[0].date : "";

      const categoryMap = new Map<string, number>();
      for (const post of g.posts) {
        const currentCount = categoryMap.get(post.category) || 0;
        categoryMap.set(post.category, currentCount + 1);
      }

      const categories: Category[] = Array.from(categoryMap.entries())
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));

      return {
        series: g.series,
        seriesName: g.seriesName,
        lastUpdated,
        categories,
        postRefs: g.posts.map((post) => ({
          category: post.category,
          slug: post.slug,
        })),
      };
    })
    .sort((a, b) => b.lastUpdated.localeCompare(a.lastUpdated));

  if (!fs.existsSync(SERIES_JSON_DIR)) {
    fs.mkdirSync(SERIES_JSON_DIR, { recursive: true });
  } else {
    const oldFiles = fs.readdirSync(SERIES_JSON_DIR);
    for (const file of oldFiles) {
      fs.unlinkSync(path.join(SERIES_JSON_DIR, file));
    }
  }

  for (const seriesData of output) {
    const outPath = getSeriesFilePath(seriesData.series);
    fs.writeFileSync(outPath, JSON.stringify(seriesData, null, 2), "utf8");
  }

  console.log(
    `📦 ${SERIES_JSON_DIR} 에 ${output.length}개의 시리즈 파일 생성 완료!`,
  );
};
