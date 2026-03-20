import type { Category, Post, Series } from "@/types/posts.types";
import fs from "fs";
import path from "path";
import {
  CATEGORIES_JSON_PATH,
  POSTS_JSON_DIR,
  SERIES_JSON_DIR,
  getPostHtmlFilePath,
  getPostJsonFilePath,
  getSeriesFilePath,
} from "./paths";

export const getPostMeta = (category: string, post: string): Post => {
  const filePath = getPostJsonFilePath(category, post);
  const fileContents = fs.readFileSync(filePath, "utf8");

  return JSON.parse(fileContents);
};

export const getPostContent = (category: string, post: string): string => {
  const filePath = getPostHtmlFilePath(category, post);
  const fileContents = fs.readFileSync(filePath, "utf8");

  return fileContents;
};

export const getPostDetail = (category: string, post: string) => {
  const meta = getPostMeta(category, post);
  const contentHtml = getPostContent(category, post);

  return {
    post: meta,
    contentHtml,
  };
};

export const getPostList = (): Post[] => {
  if (!fs.existsSync(POSTS_JSON_DIR)) return [];

  const categories = fs.readdirSync(POSTS_JSON_DIR);
  const allPosts: Post[] = [];

  categories.forEach((category) => {
    const categoryPath = path.join(POSTS_JSON_DIR, category);

    if (fs.statSync(categoryPath).isDirectory()) {
      const fileNames = fs.readdirSync(categoryPath);

      fileNames.forEach((fileName) => {
        const filePath = path.join(categoryPath, fileName);
        if (fs.statSync(filePath).isFile() && fileName.endsWith(".json")) {
          const fileContents = fs.readFileSync(filePath, "utf8");
          const data = JSON.parse(fileContents);
          allPosts.push(data);
        }
      });
    }
  });

  return allPosts.sort((a, b) => {
    return b.metadata.date.localeCompare(a.metadata.date);
  });
};

export const getCategoryList = (): Category[] => {
  if (!fs.existsSync(CATEGORIES_JSON_PATH)) return [];

  const fileContents = fs.readFileSync(CATEGORIES_JSON_PATH, "utf8");
  return JSON.parse(fileContents);
};

export const getSeriesList = (): Series[] => {
  if (!fs.existsSync(SERIES_JSON_DIR)) return [];

  const fileNames = fs.readdirSync(SERIES_JSON_DIR);

  const allSeries = fileNames
    .filter((fileName) => fileName.endsWith(".json"))
    .map((fileName) => {
      const filePath = path.join(SERIES_JSON_DIR, fileName);
      const fileContents = fs.readFileSync(filePath, "utf8");
      return JSON.parse(fileContents) as Series;
    });

  return allSeries.sort((a, b) => b.lastUpdated.localeCompare(a.lastUpdated));
};

export const getSeriesBySlug = (seriesSlug: string): Series | null => {
  const filePath = getSeriesFilePath(seriesSlug);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  return JSON.parse(fileContents) as Series;
};
