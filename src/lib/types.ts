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
  href: string; // /blog/<category>/<slug>
  content: string; // HTML 문자열
  excerpt: string; // 미리보기 텍스트
};

export type CategoryItem = { name: string; count: number };
export type CategoryList = CategoryItem[];

export type SeriesGroup = {
  series: string;
  posts: Post[];
};
