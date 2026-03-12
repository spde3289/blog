"use client";

import { JSX, ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface ModalTriggerButtonProps {
  modalRootId: string;
  children: ReactNode;
  title: string;
  closeOnSelfClick?: boolean;
  icon: JSX.Element;
  containerProps?: React.HTMLAttributes<HTMLDivElement>;
}

const ModalTriggerButton = ({
  modalRootId,
  title,
  icon,
  closeOnSelfClick = false,
  children,
  containerProps,
}: ModalTriggerButtonProps) => {
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setModalRoot(document.getElementById(modalRootId));
  }, [modalRootId]);

  // 바깥 클릭 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        contentRef.current &&
        !contentRef.current.contains(target) &&
        !buttonRef.current?.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // “자기 자신 클릭 시 닫기” 옵션
  const handleSelfClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (closeOnSelfClick) setIsOpen(false);
    // 사용자가 containerProps?.onClick을 넘겼다면 같이 호출
    containerProps?.onClick?.(e);
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen((v) => !v)}
        className="dark:focus-visible:outline-brand inline-flex h-8 items-center
          justify-center gap-x-1 rounded-full border border-neutral-300 bg-white
          px-3 py-2 text-xs whitespace-nowrap text-neutral-900
          hover:bg-neutral-100 focus-visible:outline-2
          focus-visible:outline-offset-2 focus-visible:outline-neutral-700
          active:bg-neutral-200 sm:text-sm dark:border-neutral-700
          dark:bg-neutral-900 dark:text-neutral-100 dark:hover:bg-neutral-800/70
          dark:active:bg-neutral-700"
      >
        {title}
        {icon}
      </button>
      <div ref={contentRef} id={modalRootId} />
      {isOpen &&
        modalRoot &&
        createPortal(
          <div
            ref={contentRef}
            // 위임: 여기에 모든 이벤트를 붙임
            onClick={handleSelfClick} // 자체 클릭 닫기 + 사용자 onClick 병행
            onChange={containerProps?.onChange} // 체크박스/라디오/셀렉트 변경
            onInput={containerProps?.onInput} // 텍스트 입력 등
            onKeyDown={containerProps?.onKeyDown} // 키보드 처리
            onFocus={containerProps?.onFocus}
            onBlur={containerProps?.onBlur}
            // 기타 HTMLAttributes도 spread 가능 (data-*, role 등)
            {...Object.fromEntries(
              Object.entries(containerProps ?? {}).filter(
                ([k]) =>
                  ![
                    "onClick",
                    "onChange",
                    "onInput",
                    "onKeyDown",
                    "onFocus",
                    "onBlur",
                    "ref", // ref는 내부에서 관리
                    "className", // className은 아래에서 병합
                    "style", // style은 병합 가능하지만 여기선 단순화
                  ].includes(k)
              )
            )}
            className={
              `absolute top-10 right-0 z-1000 flex flex-col gap-1 rounded-lg
              border border-neutral-300 bg-white p-2 shadow-lg
              dark:border-neutral-700 dark:bg-neutral-900 ` +
              (containerProps?.className ?? "")
            }
          >
            {children}
          </div>,
          modalRoot
        )}
    </div>
  );
};

export default ModalTriggerButton;
