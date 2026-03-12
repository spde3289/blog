"use client";

import { Theme, useTheme } from "@/contexts/ThemeContext";
import MoonSvg from "@/svg/MoonSvg";
import SunSvg from "@/svg/SunSvg";
import SystemSvg from "@/svg/SystemSvg";

import { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface ThemeItemProps {
  onClickEvent: (theme: Theme) => void;
  currentTarget: boolean;
  children: ReactNode;
  theme: Theme;
}

const ThemeItem = ({
  onClickEvent,
  currentTarget,
  children,
  theme,
}: ThemeItemProps) => {
  return (
    <button
      data-state={currentTarget}
      onClick={() => onClickEvent(theme)}
      // 1. 모서리 둥글기, 패딩, 호버 및 포커스 배경색 통일 (다른 모달 메뉴와 동일하게 px-3 py-2)
      className="flex w-full items-center gap-3 whitespace-nowrap rounded-lg px-3 py-2 text-left outline-none transition-colors hover:bg-neutral-100 focus:bg-neutral-100 dark:hover:bg-neutral-800/50 dark:focus:bg-neutral-800/50"
    >
      <span
        data-state={currentTarget}
        // 2. 타이포그래피 및 포인트 컬러 적용 (형광색 -> 파란색, Bold/Medium 클래스 사용)
        className="flex grow items-center gap-3 data-[state=true]:typo-14-b data-[state=false]:typo-14-m text-neutral-600 data-[state=true]:text-blue-600 dark:text-neutral-400 dark:data-[state=true]:text-blue-400"
      >
        {children}
      </span>
    </button>
  );
};

const ThemeToggleButton = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setModalRoot(document.getElementById("theme-modal-root"));
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(e.target as Node) &&
        !buttonRef.current?.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const onClickEventHendler = (theme: Theme) => {
    setTheme(theme);
    setIsOpen(false);
  };

  const icon =
    resolvedTheme === "dark" ? <MoonSvg size={16} /> : <SunSvg size={16} />;

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen((prev) => !prev)}
        // 3. 트리거 버튼 스타일 (크기 및 아이콘 중앙 정렬 최적화, hover/focus 링 색상 변경)
        className="flex size-8 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-600 transition-colors hover:bg-neutral-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800/70 dark:focus-visible:outline-blue-400"
        aria-label="Toggle theme options"
      >
        {icon}
      </button>

      <div id="theme-modal-root" />
      {isOpen &&
        modalRoot &&
        createPortal(
          <div
            ref={modalRef}
            // 4. 모달 팝업 컨테이너 (위치, 여백, 모서리 둥글기 통일)
            className="absolute right-5 top-14 z-1000 flex w-36 flex-col gap-1 rounded-lg border border-neutral-200 bg-white p-2 shadow-lg dark:border-neutral-700 dark:bg-neutral-900"
          >
            <ThemeItem
              theme="light"
              onClickEvent={onClickEventHendler}
              currentTarget={theme === "light"}
            >
              <SunSvg size={16} />
              Light
            </ThemeItem>

            <ThemeItem
              theme="dark"
              onClickEvent={onClickEventHendler}
              currentTarget={theme === "dark"}
            >
              <MoonSvg size={16} />
              Dark
            </ThemeItem>

            <ThemeItem
              theme="system"
              onClickEvent={onClickEventHendler}
              currentTarget={theme === "system"}
            >
              <SystemSvg size={16} />
              System
            </ThemeItem>
          </div>,
          modalRoot,
        )}
    </div>
  );
};

export default ThemeToggleButton;
