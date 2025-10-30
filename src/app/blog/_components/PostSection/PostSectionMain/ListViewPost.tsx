import HighlightText from "@/components/HighlightText";
import { PostMetaData } from "@/lib/markdown";
import ArrowHeadSVG from "@/svg/ArrowHeadSVG";
import Link from "next/link";
import { memo } from "react";

// 본문 보기 컴포넌트
interface ListViewPostPorps {
  post: {
    category: string;
    post: string;
    metadata: PostMetaData;
    content: string;
    excerpt: string;
    href: string;
    img: string;
  };
  searchText: string;
}

const ListViewPost = ({ post, searchText }: ListViewPostPorps) => {
  return (
    <li>
      <Link
        href={post.href}
        className="group px-4 py-2 md:px-8 md:py-5 border flex items-center gap-6 rounded-lg bg-white text-neutral-90 dark:bg-neutral-800/40 border-neutral-200 dark:border-neutral-700"
      >
        <div className="overflow-hidden hidden sm:block flex-none w-[150px] rounded">
          <img
            className="group-hover:scale-105 transition-all duration-500 aspect-[15/8] h-20 object-cover"
            src="/img/thumbnail.png"
            alt=""
          />
        </div>
        <div>
          <h2 className="mb-1 sm:mb-2 group-hover:underline text-base sm:text-lg break-words text-neutral-900 dark:text-neutral-100 font-medium line-clamp-2">
            <HighlightText text={post.metadata.title} query={searchText} />
          </h2>
          <div className="mb-2 sm:mb-4 text-neutral-600 dark:text-neutral-400 text-sm sm:text-base overflow-hidden text-ellipsis break-all line-clamp-2 leading-normal">
            <HighlightText text={post.content} query={searchText} />
          </div>
          <div className="relative z-[1] flex w-full items-center gap-x-6 gap-y-2">
            <div className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
              {post.metadata.date}
            </div>
            <div className="flex flex-row gap-3 text-neutral-600 dark:text-neutral-400">
              {post.metadata.tags.map((tag) => (
                <span key={tag} className="text-sm line-clamp-1">
                  # {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="group-hover:text-yellow-400 hidden sm:block">
          <ArrowHeadSVG className="size-6 -rotate-90" />
        </div>
      </Link>
    </li>
  );
};

export default memo(ListViewPost);
