import { SeriesKey } from "./series";

export const ROUTES = {
  HOME: "/",
  BLOG: {
    ROOT: "/blog",
    DETAIL: (category: string, post: string) => `/blog/${category}/${post}`,
    SERIES: (slug: SeriesKey) => `/blog/series?series=${slug}`,
  },
} as const;
