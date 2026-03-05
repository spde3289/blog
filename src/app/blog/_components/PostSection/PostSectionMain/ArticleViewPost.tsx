import HighlightCode from "@/components/HighlightCode";
import HighlightText from "@/components/HighlightText";
import ArrowHeadSVG from "@/svg/ArrowHeadSVG";
import type { Post } from "@/types/posts.types";
import { useState } from "react";

interface ArticleViewPostProps {
  post: Post;
  searchText: string;
}

const ArticleViewPost = ({ post, searchText }: ArticleViewPostProps) => {
  const [isArticleOpen, setIsArticleOpen] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleArticleOpen = () => {
    setIsArticleOpen((pre) => !pre);
  };

  const handleGetPostContent = async () => {
    setLoading(true);
    const encoded = encodeURIComponent(post.htmlFilePath);
    const res = await fetch(`/api/posts?pathroot=${encoded}`, {
      cache: "force-cache",
    });

    const data = await res.text();

    setPostContent(data);
    setLoading(false);
  };

  if (isArticleOpen) {
    return (
      <li className="flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-800/40">
        <article className="markdown-body mx-auto w-full max-w-[886px] p-5 sm:p-8">
          {loading ? (
            <div className="flex h-32 items-center justify-center typo-14-m text-neutral-500">
              게시글을 불러오는 중...
            </div>
          ) : (
            <HighlightCode metadata={post.metadata} contentHtml={postContent} />
          )}
        </article>
        <button
          onClick={handleArticleOpen}
          className="group flex w-full cursor-pointer items-center justify-center border-t border-neutral-200 bg-white py-3 hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800/40 dark:hover:bg-neutral-700/50"
        >
          <ArrowHeadSVG className="size-5 shrink-0 rotate-180 text-neutral-400 transition-transform group-hover:-translate-y-1 dark:text-neutral-500" />
        </button>
      </li>
    );
  }

  return (
    <li
      onClick={() => {
        handleArticleOpen();
        if (!postContent) handleGetPostContent();
      }}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white hover:bg-zinc-50 dark:border-neutral-700 dark:bg-neutral-800/40 dark:hover:bg-zinc-900"
    >
      <div className="flex items-center gap-5 p-4 sm:gap-6 sm:p-5">
        <div className="hidden w-[140px] shrink-0 overflow-hidden rounded-lg border border-neutral-100 sm:block dark:border-neutral-700">
          <img
            className="aspect-[16/9] h-full w-full object-cover"
            src={post.metadata.image}
            alt={post.metadata.title}
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col justify-center">
          <h2 className="mb-1.5 line-clamp-2 text-pretty typo-18-b text-neutral-900 group-hover:text-blue-600 dark:text-neutral-100 dark:group-hover:text-blue-400">
            <HighlightText text={post.metadata.title} query={searchText} />
          </h2>

          <div className="mb-3 line-clamp-2 text-pretty typo-14-body-m text-neutral-600 dark:text-neutral-400">
            <HighlightText text={post.excerpt} query={searchText} />
          </div>

          <div className="flex items-center gap-2 typo-13-m text-neutral-500 dark:text-neutral-400">
            <span className="shrink-0">{post.metadata.date}</span>
            {post.metadata.tags.length > 0 && (
              <span className="size-1 shrink-0 rounded-full bg-neutral-300 dark:bg-neutral-600"></span>
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
      <div className="flex w-full items-center justify-center border-t border-neutral-100 py-2 dark:border-neutral-700/50">
        <ArrowHeadSVG className="size-5 shrink-0 text-neutral-400 transition-transform group-hover:translate-y-1 dark:text-neutral-500" />
      </div>
    </li>
  );
};

export default ArticleViewPost;
