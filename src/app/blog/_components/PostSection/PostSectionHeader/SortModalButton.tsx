import ModalTriggerButton from "@/components/ModalTriggerButton";
import { memo } from "react";
import { POSTSECTION_TEXT, Sort } from "..";

interface SortModalButtonProps {
  onClick: (sort: Sort) => void;
  currentSort: string;
}

const SortModalButton = ({ onClick, currentSort }: SortModalButtonProps) => {
  return (
    <ModalTriggerButton
      title={POSTSECTION_TEXT.header.sortButton.text}
      icon={POSTSECTION_TEXT.header.sortButton.svg}
      closeOnSelfClick={true}
      modalRootId="sort-modal"
    >
      {POSTSECTION_TEXT.header.sortButton.sort.map((text) => (
        <button
          onClick={() => onClick(text)}
          type="button"
          className="flex grow items-center px-2 py-1.5 pr-10 w-full text-left rounded select-none outline-none hover:bg-neutral-100 dark:hover:bg-neutral-800/70 focus:bg-neutral-100 dark:focus:bg-neutral-800/70"
          key={text}
        >
          <span
            className={` text-sm whitespace-nowrap flex grow items-center gap-x-2 ${
              text === currentSort
                ? "text-neutral-900 dark:text-[#eafe7c] font-semibold"
                : "text-neutral-600 dark:text-neutral-400"
            }`}
          >
            {text}
          </span>
        </button>
      ))}
    </ModalTriggerButton>
  );
};

export default memo(SortModalButton);
