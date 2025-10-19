import ModalTriggerButton from "@/components/ModalTriggerButton";
import { getAllPostsType } from "@/lib/markdown";
import ArrowHeadSVG from "@/svg/ArrowHeadSVG";
import ArticleSVG from "@/svg/ArticleSVG";
import ListSVG from "@/svg/ListSVG";
import Link from "next/link";
import { memo, Suspense, useCallback, useState } from "react";
import Highlight from "./Highlight";

interface ViewModalButtonProps {
  currentView: "목록 보기" | "본문 보기";
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const ViewModalButton = memo(
  ({ onClick, currentView }: ViewModalButtonProps) => {
    return (
      <ModalTriggerButton
        containerProps={{ onClick }}
        title={currentView}
        icon={
          currentView === "목록 보기" ? (
            <ListSVG className="size-4" />
          ) : (
            <ArticleSVG className="size-4" />
          )
        }
        closeOnSelfClick={true}
        modalRootId="view-modal"
      >
        <button
          type="button"
          className={`flex grow whitespace-nowrap text-sm items-center px-2 py-1.5 pr-10 w-full text-left rounded select-none outline-none hover:bg-neutral-100 dark:hover:bg-neutral-800/70 focus:bg-neutral-100 dark:focus:bg-neutral-800/70  ${
            currentView === "목록 보기"
              ? "text-neutral-900 dark:text-[#eafe7c] font-semibold"
              : "text-neutral-600 dark:text-neutral-400"
          }`}
          role="menuitem"
          // tabindex="-1"
          data-orientation="vertical"
          data-radix-collection-item=""
        >
          <ListSVG className="size-4 mr-2" />
          <span className="text-sm whitespace-nowrap dark:text-brand flex grow items-center gap-x-2">
            목록 보기
          </span>
        </button>
        <button
          type="button"
          className={`flex grow whitespace-nowrap text-sm items-center px-2 py-1.5 pr-10 w-full text-left rounded select-none outline-none hover:bg-neutral-100 dark:hover:bg-neutral-800/70 focus:bg-neutral-100 dark:focus:bg-neutral-800/70  ${
            currentView === "본문 보기"
              ? "text-neutral-900 dark:text-[#eafe7c] font-semibold"
              : "text-neutral-600 dark:text-neutral-400"
          }`}
          role="menuitem"
          // tabindex="-1"
          data-orientation="vertical"
          data-radix-collection-item=""
        >
          <ArticleSVG className="size-4 mr-2" />
          <span className="text-sm whitespace-nowrap dark:text-brand flex grow items-center gap-x-2">
            본문 보기
          </span>
        </button>
      </ModalTriggerButton>
    );
  }
);

interface PostSectionMainProps {
  posts: getAllPostsType;
  searchText: string;
}

const PostSectionMain = ({ posts, searchText }: PostSectionMainProps) => {
  const [currentView, setCurrentView] = useState<"목록 보기" | "본문 보기">(
    "목록 보기"
  );

  const handleCurrentView = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const target = e.target as HTMLElement;
      if (
        target.textContent === "목록 보기" ||
        target.textContent === "본문 보기"
      ) {
        setCurrentView(target.textContent);
      }
    },
    []
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm sm:text-base">{posts.length} articles</div>
        <ViewModalButton
          currentView={currentView}
          onClick={handleCurrentView}
        />
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
                  <Highlight text={post.metadata.title} query={searchText} />
                </h2>
                <div className="mb-2 sm:mb-4 text-neutral-600 dark:text-neutral-400 text-sm sm:text-base overflow-hidden text-ellipsis break-all line-clamp-2 leading-normal">
                  <Highlight text={post.content} query={searchText} />
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
          ))}
        </Suspense>
      </div>
    </div>
  );
};

export default memo(PostSectionMain);
