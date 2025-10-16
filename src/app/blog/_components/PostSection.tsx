import { getAllPostsType, getAllcategorysType } from "@/lib/markdown";
import KeyboardArrowSVG from "@/svg/ArrowHeadSVG";
import ListSVG from "@/svg/ListSVG";
import SortSVG from "@/svg/SortSVG";
import { Suspense } from "react";

interface PostSectionProps {
  posts: getAllPostsType;
  categorys: getAllcategorysType;
}

const PostSection = ({ posts, categorys }: PostSectionProps) => {
  return (
    <section className="flex-1 flex gap-8 flex-col">
      <div className="flex relative gap-2">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="size-4 text-neutral-400 dark:text-neutral-600"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path>
          </svg>
        </div>
        <input
          className="block w-full bg-white dark:bg-neutral-950 disabled:bg-neutral-200 dark:disabled:bg-neutral-800 disabled:text-neutral-300 dark:disabled:text-neutral-700 disabled:cursor-not-allowed rounded border-0 focus:outline-none focus:outline-transparent ring-1 ring-inset focus:ring-2 focus:ring-inset text-sm py-1.5 px-3 pl-9 h-8 text-neutral-700 dark:text-neutral-300 ring-neutral-300 dark:ring-neutral-700 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:ring-neutral-700 dark:focus:ring-neutral-300"
          name="postSearch"
          placeholder="Search"
        />
        <button className="lh inline-flex items-center justify-center h-8 px-3 py-2 gap-x-1 text-sm whitespace-nowrap border rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800/70 active:bg-neutral-200 dark:active:bg-neutral-700 focus-visible:outline-neutral-700 dark:focus-visible:outline-brand">
          <div>Tags</div>
          <KeyboardArrowSVG className="size-6 mt-1" />
        </button>
        <button className="inline-flex items-center justify-center h-8 px-3 py-2 gap-x-1 text-sm whitespace-nowrap border rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800/70 active:bg-neutral-200 dark:active:bg-neutral-700 focus-visible:outline-neutral-700 dark:focus-visible:outline-brand">
          <div className="">Sort by</div>
          <SortSVG className="size-5" />
        </button>
      </div>
      <div>
        <div className=" flex justify-between items-center mb-4">
          <div>{posts.length} articles</div>
          <button className="inline-flex items-center justify-center h-8 px-3 py-2 gap-x-1 text-sm whitespace-nowrap border rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800/70 active:bg-neutral-200 dark:active:bg-neutral-700 focus-visible:outline-neutral-700 dark:focus-visible:outline-brand">
            <div>List view</div>
            <ListSVG className="size-5" />
          </button>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <div className="group px-8 py-5 border flex items-center gap-6 rounded-lg bg-white dark:bg-neutral-800/40 glassbox border-neutral-200 dark:border-neutral-700">
            <img
              className=" hidden aspect-[15/8] h-20 rounded object-cover sm:block"
              src="/img/thumbnail.png"
            />
            <div>
              <h2 className="mb-1 text-lg transition-colors break-words text-neutral-900 dark:text-neutral-100 font-medium line-clamp-2">
                이건 제목임 제목임 제목임 제목임
              </h2>
              <div className="mb-4 text-neutral-600 dark:text-neutral-400 text-base overflow-hidden text-ellipsis break-all line-clamp-3 leading-normal">
                이건 내용임 내용임내용임내용임내용임내용임내용임내용임내용임
                내용임내용임내용임내용임내용임 내용임내용임내용임
                내용임ㅇㅁㄴㅇㅁㄴㅇ ㅇㄴㅁㅇ 이건 내용임
                내용임내용임내용임내용임내용임내용임내용임내용임
                내용임내용임내용임내용임내용임 내용임내용임내용임 이건 내용임
                내용임내용임내용임내용임내용임내용임내용임내용임
                내용임내용임내용임내용임내용임 내용임내용임내용임
              </div>
              <div className="relative z-[1] flex w-full flex-wrap items-center gap-x-6 gap-y-2">
                <div className="text-sm text-neutral-600 dark:text-neutral-400">
                  2025 . 12 . 12
                </div>
                <div className="flex gap-3">
                  <span className="text-sm"># react</span>
                  <span className="text-sm"># 스프린트</span>
                </div>
              </div>
            </div>
          </div>
        </Suspense>
      </div>
    </section>
  );
};

export default PostSection;
