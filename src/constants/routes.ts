import { SeriesKey } from "./series";

export const ROUTES = {
  HOME: "/",
  BLOG: {
    ROOT: "/blog",
    POST: (category: string, post: string) => `/blog/${category}/${post}`,
    SERIES: (seriesTitle: SeriesKey) => `/blog/series/${seriesTitle}`,
  },
} as const;
