import ModalTriggerButton from "@/components/ModalTriggerButton";
import { memo } from "react";
import { CurrentView } from ".";
import { POSTSECTION_TEXT } from "..";

// 목록 / 본문 보기 버튼 컴포넌트
interface ViewModalButtonProps {
  currentView: CurrentView;
  onClick: (view: CurrentView) => void;
}

const ViewModalButton = ({ onClick, currentView }: ViewModalButtonProps) => {
  const viewButtonItems = POSTSECTION_TEXT.main.viewButtonItems;

  return (
    <ModalTriggerButton
      title={currentView.text}
      icon={currentView.svg}
      closeOnSelfClick={true}
      modalRootId="view-modal"
    >
      {viewButtonItems.map((item, index) => (
        <button
          key={item.text}
          onClick={() =>
            onClick({
              text: item.text,
              svg: item.svg,
            })
          }
          type="button"
          className={`flex gap-2 grow whitespace-nowrap text-sm items-center px-2 py-1.5 pr-10 w-full text-left rounded select-none outline-none hover:bg-neutral-100 dark:hover:bg-neutral-800/70 focus:bg-neutral-100 dark:focus:bg-neutral-800/70  ${
            currentView.text === item.text
              ? "text-neutral-900 dark:text-[#eafe7c] font-semibold"
              : "text-neutral-600 dark:text-neutral-400"
          }`}
          role="menuitem"
          data-orientation="vertical"
          data-radix-collection-item=""
        >
          {item.svg}
          <span className="text-sm whitespace-nowrap dark:text-brand flex grow items-center gap-x-2">
            {item.text}
          </span>
        </button>
      ))}
    </ModalTriggerButton>
  );
};

export default memo(ViewModalButton);
