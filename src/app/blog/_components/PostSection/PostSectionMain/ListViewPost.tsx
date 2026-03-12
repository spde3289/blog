import HighlightText from "@/components/HighlightText";
import ArrowHeadSVG from "@/svg/ArrowHeadSVG";
import type { Post } from "@/types/posts.types";
import Link from "next/link";
import { memo } from "react";

interface ListViewPostProps {
  post: Post;
  searchText: string;
}

const ListViewPost = ({ post, searchText }: ListViewPostProps) => {
  return (
    <li>
      <Link
        href={post.href}
        className="group flex flex-row items-center justify-between gap-5
          overflow-hidden rounded-xl border border-neutral-200 bg-white p-4
          hover:bg-zinc-50 sm:gap-6 sm:p-5 dark:border-neutral-700
          dark:bg-neutral-800/40 dark:hover:bg-zinc-900"
      >
        <div className="flex min-w-0 flex-1 items-center gap-5 sm:gap-6">
          <div
            className="hidden w-35 shrink-0 overflow-hidden rounded-lg border
              border-neutral-100 sm:block dark:border-neutral-700"
          >
            <img
              className="aspect-video h-full w-full object-cover
                transition-transform duration-500 group-hover:scale-105"
              src={post.metadata.image ?? "/img/thumbnail.png"}
              alt={post.metadata.title}
            />
          </div>
          <div className="flex min-w-0 flex-1 flex-col justify-center">
            <h2
              className="typo-18-b mb-1.5 line-clamp-2 text-pretty
                text-neutral-900 group-hover:text-blue-600 dark:text-neutral-100
                dark:group-hover:text-blue-400"
            >
              <HighlightText text={post.metadata.title} query={searchText} />
            </h2>
            <div
              className="typo-14-body-m mb-3 line-clamp-2 text-pretty
                text-neutral-600 dark:text-neutral-400"
            >
              <HighlightText text={post.excerpt} query={searchText} />
            </div>
            <div
              className="typo-13-m flex items-center gap-2 text-neutral-500
                dark:text-neutral-400"
            >
              <span className="shrink-0">{post.metadata.date}</span>
              {post.metadata.tags.length > 0 && (
                <span
                  className="size-1 shrink-0 rounded-full bg-neutral-300
                    dark:bg-neutral-600"
                ></span>
              )}
              <div className="flex gap-2 truncate">
                {post.metadata.tags.map((tag) => (
                  <span key={tag} className="truncate">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="hidden shrink-0 sm:block">
          <ArrowHeadSVG
            className="size-6 -rotate-90 text-neutral-400 transition-transform
              group-hover:translate-x-1 dark:text-neutral-500"
          />
        </div>
      </Link>
    </li>
  );
};

export default memo(ListViewPost);
