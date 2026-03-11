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
  excerpt: string;
};

export type Category = { name: string; count: number };

export interface Series {
  series: SeriesKey;
  seriesName: SeriesValue;
  lastUpdated: string;
  categories: Category[];
  postRefs: { category: string; slug: string }[];
}
