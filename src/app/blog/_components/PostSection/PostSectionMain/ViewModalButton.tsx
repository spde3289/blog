import ModalTriggerButton from "@/components/ModalTriggerButton";
import { CurrentView } from ".";
import { POSTSECTION_TEXT } from "..";

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
      <div className="flex flex-col gap-1">
        {viewButtonItems.map((item) => {
          const isSelected = currentView.text === item.text;

          return (
            <button
              key={item.text}
              onClick={() =>
                onClick({
                  text: item.text,
                  svg: item.svg,
                })
              }
              type="button"
              role="menuitem"
              className={`flex w-full items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-left outline-none transition-colors hover:bg-neutral-100 focus:bg-neutral-100 dark:hover:bg-neutral-800/50 dark:focus:bg-neutral-800/50 ${
                isSelected
                  ? // 선택된 상태: 14px Bold, 브랜드 포인트 컬러(블루 계열)
                    "typo-14-b text-blue-600 dark:text-blue-400"
                  : // 기본 상태: 14px Medium, 중립적인 텍스트 컬러
                    "typo-14-m text-neutral-600 dark:text-neutral-400"
              }`}
            >
              <span
                className={`flex shrink-0 items-center justify-center ${
                  isSelected
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-neutral-500"
                }`}
              >
                {item.svg}
              </span>
              <span className="flex grow items-center">{item.text}</span>
            </button>
          );
        })}
      </div>
    </ModalTriggerButton>
  );
};

export default ViewModalButton;
