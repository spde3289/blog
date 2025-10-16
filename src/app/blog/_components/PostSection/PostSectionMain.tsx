import { getAllPostsType } from "@/lib/markdown";
import ArrowHeadSVG from "@/svg/ArrowHeadSVG";
import ListSVG from "@/svg/ListSVG";
import Link from "next/link";
import { Suspense } from "react";

interface PostSectionMainProps {
  posts: getAllPostsType;
  // categorys: getAllcategorysType;
}

const PostSectionMain = ({ posts }: PostSectionMainProps) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm sm:text-base">{posts.length} articles</div>
        <button className="inline-flex items-center justify-center h-8 px-3 py-2 gap-x-1 text-xs sm:text-sm whitespace-nowrap border rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800/70 active:bg-neutral-200 dark:active:bg-neutral-700 focus-visible:outline-neutral-700 dark:focus-visible:outline-brand">
          <div>List view</div>
          <ListSVG className="size-5" />
        </button>
      </div>
      <div className="flex flex-col gap-4">
        <Suspense fallback={<div>Loading...</div>}>
          {posts.map((post) => (
            <Link
              href={post.href}
              key={post.metadata.title}
              className="group px-4 py-2 md:px-8 md:py-5 border flex items-center gap-6 rounded-lg bg-white text-neutral-90 dark:bg-neutral-800/40 border-neutral-200 dark:border-neutral-700"
            >
              <div className="overflow-hidden hidden sm:block flex-none w-[150px] rounded">
                <img
                  className="group-hover:scale-105 transition-all duration-500 aspect-[15/8] h-20 object-cover"
                  src="/img/thumbnail.png"
                />
              </div>
              <div>
                <h2 className="mb-1 sm:mb-2 group-hover:underline text-base sm:text-lg break-words text-neutral-900 dark:text-neutral-100 font-medium line-clamp-2">
                  {post.metadata.title}
                </h2>
                <div className="mb-2 sm:mb-4 text-neutral-600 dark:text-neutral-400 text-sm sm:text-base overflow-hidden text-ellipsis break-all line-clamp-2 leading-normal">
                  {post.content}
                </div>
                <div className="relative z-[1] flex w-full items-center gap-x-6 gap-y-2">
                  <div className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                    {post.metadata.date}
                  </div>
                  <div className="flex flex-row gap-3 text-neutral-600 dark:text-neutral-400">
                    {post.metadata.tags.map((tag) => (
                      <span key={tag} className="text-sm line-clamp-1">
                        # {tag} # {tag}# {tag}# {tag}# {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="group-hover:text-yellow-400 hidden sm:block">
                <ArrowHeadSVG className="size-6 -rotate-90" />
              </div>
            </Link>
          ))}
        </Suspense>
      </div>
    </div>
  );
};

export default PostSectionMain;
