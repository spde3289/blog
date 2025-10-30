import HighlightCode from "@/components/HighlightCode";
import HighlightText from "@/components/HighlightText";
import { metadataType } from "@/lib/markdown";
import ArrowHeadSVG from "@/svg/ArrowHeadSVG";
import { useState } from "react";
import { remark } from "remark";
import gfm from "remark-gfm";
import html from "remark-html";

interface ArticleViewPostProps {
  post: {
    category: string;
    post: string;
    metadata: metadataType;
    content: string;
    excerpt: string;
    href: string;
    img: string;
  };
  searchText: string;
}

const ArticleViewPost = ({ post, searchText }: ArticleViewPostProps) => {
  const [isArticleOpen, setIsArticleOpen] = useState(false);
  const [htmlContents, setHtmlContents] = useState<string>("");

  const handleChageHtml = async () => {
    if (htmlContents === "") {
      const processed = await remark().use(gfm).use(html).process(post.content);

      setHtmlContents(processed.toString());
      // setHtmlContents(post.content);
    }
  };

  if (isArticleOpen) {
    return (
      <li className="border group flex flex-col items-center gap-2 rounded-lg bg-white text-neutral-90 dark:bg-neutral-800/40 border-neutral-200 dark:border-neutral-700">
        <article className="mx-auto max-w-[886px] p-4 markdown-body">
          <HighlightCode metadata={post.metadata} contentHtml={htmlContents} />
        </article>
        <div
          onClick={() => setIsArticleOpen((pre) => !pre)}
          className="w-full flex justify-center items-center hover:text-yellow-400 py-1 hover:bg-neutral-100 dark:hover:bg-neutral-700/50"
        >
          <ArrowHeadSVG className="size-6 rotate-180" />
        </div>
      </li>
    );
  }

  return (
    <li className="border group flex flex-col items-center gap-2 rounded-lg bg-white text-neutral-90 dark:bg-neutral-800/40 border-neutral-200 dark:border-neutral-700">
      <div className="flex px-4 pt-2 md:px-8 md:pt-3 items-center gap-6 ">
        <div className="overflow-hidden hidden sm:block flex-none w-[150px] rounded">
          <img
            className="group-hover:scale-105 transition-all duration-500 aspect-[15/8] h-20 object-cover"
            src="/img/thumbnail.png"
            alt=""
          />
        </div>
        <div>
          <h2 className="mb-1 text-base sm:text-lg break-words text-neutral-900 dark:text-neutral-100 font-medium line-clamp-2">
            <HighlightText text={post.metadata.title} query={searchText} />
          </h2>
          <div className="mb-2 sm:mb-2 text-neutral-600 dark:text-neutral-400 text-sm sm:text-base overflow-hidden text-ellipsis break-all line-clamp-2 leading-normal">
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
      </div>
      <div
        onClick={() => {
          handleChageHtml();
          setIsArticleOpen((pre) => !pre);
        }}
        className="w-full flex justify-center items-center hover:text-yellow-400 py-1 hover:bg-neutral-100 dark:hover:bg-neutral-700/50"
      >
        <ArrowHeadSVG className="size-6 " />
      </div>
    </li>
  );
};

export default ArticleViewPost;
