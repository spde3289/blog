import type { Category } from "@/types/posts.types";
import { POSTSECTION_TEXT, Sort } from "..";
import CategoryModalButton from "./CategoryModalButton";
import SortModalButton from "./SortModalButton";

interface PostSectionHeaderProps {
  currentCategories: string[];
  onChange: {
    handleSetCategorys: React.ChangeEventHandler<HTMLDivElement>;
    handleSearchText: React.ChangeEventHandler<HTMLDivElement>;
  };
  onClick: (sort: Sort) => void;
  currentSort: string;
  categorys: Category[];
}

const PostSectionHeader = ({
  currentCategories,
  currentSort,
  onChange,
  onClick,
  categorys,
}: PostSectionHeaderProps) => {
  return (
    <div className="flex flex-col gap-2 sm:flex-row">
      <div className="relative flex-1">
        {POSTSECTION_TEXT.header.search.svg}
        <input
          onChange={onChange.handleSearchText}
          className="block h-8 w-full rounded border-0 bg-white px-3 py-1.5 pl-9
            text-sm text-neutral-700 ring-1 ring-neutral-300 ring-inset
            placeholder:text-neutral-400 focus:ring-2 focus:ring-neutral-700
            focus:outline-transparent focus:outline-none focus:ring-inset
            disabled:cursor-not-allowed disabled:bg-neutral-200
            disabled:text-neutral-300 dark:bg-neutral-950 dark:text-neutral-300
            dark:ring-neutral-700 dark:placeholder:text-neutral-600
            dark:focus:ring-neutral-300 dark:disabled:bg-neutral-800
            dark:disabled:text-neutral-700"
          name="postSearch"
          placeholder={POSTSECTION_TEXT.header.search.placeholder}
        />
      </div>
      <div className="flex justify-end gap-2 sm:justify-normal">
        <CategoryModalButton
          categorys={categorys}
          onChange={onChange.handleSetCategorys}
          currentCategories={currentCategories}
        />
        <SortModalButton onClick={onClick} currentSort={currentSort} />
      </div>
    </div>
  );
};

export default PostSectionHeader;
