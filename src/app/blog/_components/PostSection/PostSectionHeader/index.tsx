import { getAllcategorysType } from "@/lib/markdown";
import SearchSVG from "@/svg/SearchSVG";
import CategoryModalButton from "./CategoryModalButton";
import SortModalButton from "./SortModalButton";

interface PostSectionHeaderProps {
  currentCategories: string[];
  onChange: {
    handleSetCategorys: React.ChangeEventHandler<HTMLDivElement>;
    handleSearchText: React.ChangeEventHandler<HTMLDivElement>;
  };
  onClick: React.MouseEventHandler<HTMLDivElement>;
  sort: string;
  categorys: getAllcategorysType;
}

const PostSectionHeader = ({
  currentCategories,
  sort,
  onChange,
  onClick,
  categorys,
}: PostSectionHeaderProps) => {
  return (
    <div className="flex gap-2 flex-col sm:flex-row ">
      <div className="relative flex-1">
        <SearchSVG className="size-8 absolute pointer-events-none top-0 left-0 pl-2 text-neutral-400 dark:text-neutral-600" />
        <input
          onChange={onChange.handleSearchText}
          className="block w-full bg-white dark:bg-neutral-950 disabled:bg-neutral-200 dark:disabled:bg-neutral-800 disabled:text-neutral-300 dark:disabled:text-neutral-700 disabled:cursor-not-allowed rounded border-0 focus:outline-none focus:outline-transparent ring-1 ring-inset focus:ring-2 focus:ring-inset text-sm py-1.5 px-3 pl-9 h-8 text-neutral-700 dark:text-neutral-300 ring-neutral-300 dark:ring-neutral-700 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:ring-neutral-700 dark:focus:ring-neutral-300"
          name="postSearch"
          placeholder="Search"
        />
      </div>
      <div className="flex justify-end sm:justify-normal gap-2">
        <CategoryModalButton
          categorys={categorys}
          onChange={onChange.handleSetCategorys}
          currentCategories={currentCategories}
        />
        <SortModalButton onClick={onClick} sort={sort} />
      </div>
    </div>
  );
};

export default PostSectionHeader;
