import { getAllPosts, getAllcategorys, getSeriesGroups } from "@/lib/markdown";
import PostSection from "./_components/PostSection";
import SeriesAside from "./_components/SeriesAside";

export default async function PostsPage() {
  const posts = getAllPosts();
  const categorys = getAllcategorys();
  const series = getSeriesGroups();

  return (
    <>
      <h2 className="hidden lg:block text-pretty text-neutral-900 dark:text-neutral-100 text-xl font-semibold mb-4">
        블로그의 모든 것
      </h2>
      <div className="flex gap-6 flex-col-reverse lg:flex-row">
        <PostSection posts={posts} categorys={categorys} />
        <SeriesAside series={series} />
      </div>
    </>
  );
}
