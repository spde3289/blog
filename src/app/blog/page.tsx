import { getCategoryList, getPostList, getSeriesList } from "@/lib/postService";
import PostSection from "./_components/PostSection";
import SeriesAside from "./_components/SeriesAside";

const PostsPage = () => {
  const posts = getPostList();
  const categorys = getCategoryList();
  const series = getSeriesList();

  return (
    <>
      <h2 className="hidden lg:block text-pretty text-neutral-900 dark:text-neutral-100 text-xl font-semibold mb-4">
        블로그의 모든 것
      </h2>
      <div className="flex w-full flex-col-reverse gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 flex-1 w-full">
          <PostSection posts={posts} categorys={categorys} />
        </div>
        <div className="w-full shrink-0 lg:w-65">
          <SeriesAside series={series} />
        </div>
      </div>
    </>
  );
};

export default PostsPage;
