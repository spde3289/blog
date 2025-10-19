import ModalTriggerButton from "@/components/ModalTriggerButton";
import { getAllcategorysType } from "@/lib/markdown";
import ArrowHeadSVG from "@/svg/ArrowHeadSVG";
import SearchSVG from "@/svg/SearchSVG";
import SortSVG from "@/svg/SortSVG";
import { memo } from "react";

interface CategoryModalButtonProps {
  currentCategories: string[];
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  categorys: getAllcategorysType;
}

const CategoryModalButton = memo(
  ({ categorys, onChange, currentCategories }: CategoryModalButtonProps) => {
    return (
      <ModalTriggerButton
        title="카테고리"
        icon={<ArrowHeadSVG className="size-5" />}
        containerProps={{ onChange }}
        modalRootId="tags-modal"
      >
        {categorys.map((el) => (
          <div
            key={el.name}
            className="whitespace-nowrap p-1 text-sm text-neutral-600 dark:text-neutral-400 flex items-center"
          >
            <input
              id={el.name}
              type="checkbox"
              defaultChecked={currentCategories.includes(el.name)}
              className="size-4 mr-2 appearance-none rounded fill-neutral-300 dark:fill-neutral-700 text-neutral-900 dark:text-neutral-100 bg-transparent border-neutral-300 dark:border-neutral-700 disabled:!bg-neutral-300 dark:disabled:!bg-neutral-700 disabled:cursor-not-allowed focus:ring-transparent focus:ring-offset-transparent focus:outline-neutral-700 dark:focus:outline-neutral-300 cursor-pointer"
            />{" "}
            <label className=" cursor-pointer w-20" htmlFor={el.name}>
              {el.name}
            </label>
          </div>
        ))}
      </ModalTriggerButton>
    );
  }
);

interface SortModalButtonProps {
  onClick: React.MouseEventHandler<HTMLDivElement>;
  sort: string;
}

const SortModalButton = memo(({ onClick, sort }: SortModalButtonProps) => {
  return (
    <ModalTriggerButton
      containerProps={{ onClick }}
      title="정렬"
      icon={<SortSVG className="size-4" />}
      closeOnSelfClick={true}
      modalRootId="sort-modal"
    >
      <button
        type="button"
        className="flex grow items-center px-2 py-1.5 pr-10 w-full text-left rounded select-none outline-none hover:bg-neutral-100 dark:hover:bg-neutral-800/70 focus:bg-neutral-100 dark:focus:bg-neutral-800/70"
        role="menuitem"
        // tabindex="-1"
        data-orientation="vertical"
        data-radix-collection-item=""
      >
        <span
          className={` text-sm whitespace-nowrap flex grow items-center gap-x-2 ${
            sort === "최신순"
              ? "text-neutral-900 dark:text-[#eafe7c] font-semibold"
              : "text-neutral-600 dark:text-neutral-400"
          }`}
        >
          최신순
        </span>
      </button>
      <button
        type="button"
        className="flex grow items-center px-2 py-1.5 pr-10 w-full text-left rounded select-none outline-none hover:bg-neutral-100 dark:hover:bg-neutral-800/70 focus:bg-neutral-100 dark:focus:bg-neutral-800/70"
        role="menuitem"
        // tabindex="-1"
        data-orientation="vertical"
        data-radix-collection-item=""
      >
        <span
          className={` text-sm whitespace-nowrap flex grow items-center gap-x-2 ${
            sort === "시간순"
              ? "text-neutral-900 dark:text-[#eafe7c] font-semibold"
              : "text-neutral-600 dark:text-neutral-400"
          }`}
        >
          시간순
        </span>
      </button>
    </ModalTriggerButton>
  );
});

interface PostSectionHeaderProps {
  currentCategories: string[];
  onChange: {
    handleSetCategorys: React.ChangeEventHandler<HTMLInputElement>;
    handleSearchText: React.ChangeEventHandler<HTMLInputElement>;
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
