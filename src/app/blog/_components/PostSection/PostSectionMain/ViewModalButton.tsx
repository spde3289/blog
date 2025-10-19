import ModalTriggerButton from "@/components/ModalTriggerButton";
import ArticleSVG from "@/svg/ArticleSVG";
import ListSVG from "@/svg/ListSVG";
import { memo } from "react";

// 목록 / 본문 보기 버튼 컴포넌트
interface ViewModalButtonProps {
  currentView: "목록 보기" | "본문 보기";
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

const ViewModalButton = ({ onClick, currentView }: ViewModalButtonProps) => {
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
};

export default memo(ViewModalButton);
