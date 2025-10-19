import ModalTriggerButton from "@/components/ModalTriggerButton";
import SortSVG from "@/svg/SortSVG";
import { memo } from "react";

interface SortModalButtonProps {
  onClick: React.MouseEventHandler<HTMLDivElement>;
  sort: string;
}

const SortModalButton = ({ onClick, sort }: SortModalButtonProps) => {
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
};

export default memo(SortModalButton);
