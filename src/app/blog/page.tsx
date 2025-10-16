import { getAllPosts, getAllcategorys } from "@/lib/markdown";
import PostSection from "./_components/PostSection";
import SeriesAside from "./_components/SeriesAside";

export default async function PostsPage() {
  const posts = getAllPosts();
  const categorys = getAllcategorys();
  return (
    <>
      <h2 className="text-pretty text-neutral-900 dark:text-neutral-100 text-xl font-semibold mb-4">
        블로그의 모든 것
      </h2>
      <div className="flex gap-6">
        <PostSection posts={posts} categorys={categorys} />
        <SeriesAside />
      </div>
    </>
  );
}
