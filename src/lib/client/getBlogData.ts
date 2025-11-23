import type { CategoryList, Post, SeriesGroup } from "@/types/posts.types";
import fs from "fs";
import path from "path";
import {
  CATEGORY_JSON_PATH,
  POSTS_JSON_PATH,
  POSTS_OUT_ROOT,
  SERIES_JSON_PATH,
} from "../paths";

export const getPostMeta = (category: string, post: string): Post => {
  const filePath = path.join(POSTS_JSON_PATH, category, `${post}.json`); // 카테고리 폴더에서 파일 찾기
  const fileContents = fs.readFileSync(filePath, "utf8");

  const jsonData = JSON.parse(fileContents);

  return jsonData;
};

export const getPostContent = (pathroot: string): string => {
  const filePath = path.join(POSTS_OUT_ROOT, pathroot);
  const fileContents = fs.readFileSync(filePath, "utf8");

  return fileContents;
};

export const getPostList = (): Post[] => {
  const categories = fs.readdirSync(POSTS_JSON_PATH); // content 폴더 내의 모든 카테고리 이름
  const allPosts: Post[] = [];

  // 각 카테고리를 순회하며 파일을 읽어옵니다.
  categories.forEach((category) => {
    const categoryPath = path.join(POSTS_JSON_PATH, category);

    if (fs.statSync(categoryPath).isDirectory()) {
      const fileNames = fs.readdirSync(categoryPath); // 각 카테고리 내의 파일들

      fileNames.forEach((fileName) => {
        const filePath = path.join(categoryPath, fileName);
        if (fs.statSync(filePath).isFile()) {
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

export const getCategoryList = (): CategoryList => {
  const fileContents = fs.readFileSync(CATEGORY_JSON_PATH, "utf8");
  const data = JSON.parse(fileContents);

  return data;
};

export const getSeriesGroups = (): SeriesGroup[] => {
  const fileContents = fs.readFileSync(SERIES_JSON_PATH, "utf8");
  const data = JSON.parse(fileContents);

  return data;
};
