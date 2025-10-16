import ArrowHeadSVG from "@/svg/ArrowHeadSVG";
import SearchSVG from "@/svg/SearchSVG";
import SortSVG from "@/svg/SortSVG";

const PostSectionHeader = () => {
  return (
    <div className="flex gap-2 flex-col sm:flex-row ">
      <div className="relative flex-1">
        <SearchSVG className="size-8 absolute pointer-events-none top-0 left-0 pl-2 text-neutral-400 dark:text-neutral-600" />
        <input
          className="block w-full bg-white dark:bg-neutral-950 disabled:bg-neutral-200 dark:disabled:bg-neutral-800 disabled:text-neutral-300 dark:disabled:text-neutral-700 disabled:cursor-not-allowed rounded border-0 focus:outline-none focus:outline-transparent ring-1 ring-inset focus:ring-2 focus:ring-inset text-sm py-1.5 px-3 pl-9 h-8 text-neutral-700 dark:text-neutral-300 ring-neutral-300 dark:ring-neutral-700 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:ring-neutral-700 dark:focus:ring-neutral-300"
          name="postSearch"
          placeholder="Search"
        />
      </div>
      <div className="flex justify-end sm:justify-normal gap-2">
        <button className="inline-flex items-center justify-center h-8 px-3 py-2 gap-x-1 text-xs sm:text-sm whitespace-nowrap border rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800/70 active:bg-neutral-200 dark:active:bg-neutral-700 focus-visible:outline-neutral-700 dark:focus-visible:outline-brand">
          <div>Tags</div>
          <ArrowHeadSVG className="size-6 mt-1" />
        </button>
        <button className="inline-flex items-center justify-center h-8 px-3 py-2 gap-x-1 text-xs sm:text-sm whitespace-nowrap border rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800/70 active:bg-neutral-200 dark:active:bg-neutral-700 focus-visible:outline-neutral-700 dark:focus-visible:outline-brand">
          <div className="">Sort by</div>
          <SortSVG className="size-5" />
        </button>
      </div>
    </div>
  );
};

export default PostSectionHeader;
