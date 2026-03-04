import { SeriesValue } from "@/constants/series";

export type PostMetaData = {
  title: string;
  tags: string[];
  date: string;
  image: string;
  series?: string;
  description?: string;
};

export type Post = {
  metadata: PostMetaData;
  category: string;
  href: string;
  htmlFilePath: string;
  excerpt: string;
};

export type CategoryItem = { name: string; count: number };

export type CategoryList = CategoryItem[];

export type SeriesGroup = {
  series: SeriesKey;
  seriesName: SeriesValue;
  lastUpdated: string;
  postIds: string[];
};
