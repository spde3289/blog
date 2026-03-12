import ModalTriggerButton from "@/components/ModalTriggerButton";
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
      <div className="flex flex-col gap-1">
        {POSTSECTION_TEXT.header.sortButton.sort.map((text) => {
          const isSelected = text === currentSort;
          return (
            <button
              onClick={() => onClick(text)}
              type="button"
              key={text}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2
              text-left whitespace-nowrap transition-colors outline-none
              hover:bg-neutral-100 focus:bg-neutral-100
              dark:hover:bg-neutral-800/50 dark:focus:bg-neutral-800/50 ${
                isSelected
                  ? "typo-14-b text-blue-600 dark:text-blue-400"
                  : "typo-14-m text-neutral-600 dark:text-neutral-400"
              }`}
            >
              <span className="flex grow items-center">{text}</span>
            </button>
          );
        })}
      </div>
    </ModalTriggerButton>
  );
};

export default SortModalButton;
