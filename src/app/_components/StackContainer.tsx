"use client";

import items, { Stack } from "@/data/stack";
import useElementOnScreen from "@/hooks/useElementOnScreen";
import { useEffect, useRef, useState } from "react";
import ContentsContainer from "./content/ContentsContainer";
import Title from "./content/Title";

interface StackCardProps {
  stack: Stack;
  size?: string;
}

const StackCard = ({ stack, size = "size-10" }: StackCardProps) => {
  return (
    <div className="flex flex-col items-center group relative">
      <div className={`${size} z-1 overflow-hidden rounded`}>
        <img
          className="w-full h-full object-cover"
          src={stack.img.src}
          alt={stack.img.alt}
          {...stack.img.options}
        />
      </div>
      <div className="translate-y-full left-1/2 -translate-x-1/2 px-1.5 py-0.5 bg-[#313131] text-white rounded text-center font-normal whitespace-nowrap z-99 absolute -bottom-1 opacity-0 group-hover:opacity-100">
        {stack.title}
      </div>
    </div>
  );
};

const StackConatiner = () => {
  const { ref, isVisible } = useElementOnScreen();
  const [active, setActive] = useState<null | number>(null);
  const [indicator, setIndicator] = useState({ width: 0, x: 0 });
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const tabs = ["프론트엔드", "라이브러리", "도구", "환경 및 배포"];

  const updateIndicator = (idx: number | null) => {
    if (idx === null) {
      setIndicator({ width: 0, x: 0 });
      return;
    }

    const btn = btnRefs.current[idx];
    const wrap = wrapRef.current;
    if (!btn || !wrap) return;

    const b = btn.getBoundingClientRect();
    const w = wrap.getBoundingClientRect();

    // 컨테이너의 왼쪽을 기준으로 버튼의 X 좌표 계산
    const x = b.left - w.left + wrap.scrollLeft;
    setIndicator({ width: b.width, x });
  };

  useEffect(() => {
    updateIndicator(active);
  }, [active]);

  // 리사이즈/폰트 변경 등으로 버튼 크기 변할 때 위치 재계산
  useEffect(() => {
    if (active !== null) {
      const ro = new ResizeObserver(() => updateIndicator(active));
      btnRefs.current.forEach((el) => el && ro.observe(el));
      if (wrapRef.current) ro.observe(wrapRef.current);
      return () => ro.disconnect();
    }
  }, [active]);

  const handleClick = (i: number) => {
    // 같은 버튼을 다시 클릭하면 0으로 리셋
    setActive((prev) => (prev === i ? null : i));
  };

  return (
    <ContentsContainer>
      <Title title="기술 스택 및 도구" />
      <div
        ref={ref}
        className={`mb-12 flex flex-col items-center ${
          isVisible ? "reveal" : "opacity-0 "
        }`}
      >
        <div
          ref={wrapRef}
          className="mb-8 relative flex justify-center gap-4 w-fit bg-neutral-800/50 border rounded-full border-white/50 p-1.5"
        >
          {tabs.map((label, i) => (
            <button
              key={label}
              ref={(el) => {
                btnRefs.current[i] = el;
              }}
              onClick={() => handleClick(i)}
              className={`relative z-[1] text-sm sm:text-base font-semibold px-2 sm:px-3 py-1 rounded-full transition-colors ${
                i === active ? "text-white" : "text-white/70"
              }`}
              aria-pressed={i === active}
            >
              {label}
            </button>
          ))}
          {/* 이동/크기 변경되는 하이라이트 */}
          <div
            className="absolute top-1.5 bottom-1.5 left-0 bg-neutral-800 rounded-full z-0 transition-all duration-300 ease-out will-change-transform"
            style={{
              width: indicator.width,
              transform: `translateX(${indicator.x}px)`,
            }}
          />
        </div>
        <div className="section-item-wrapper w-64 sm:w-80 m-0 mx-auto flex-wrap gap-2 md:gap-3 justify-center">
          {items.stackItems.map((stack) => (
            <StackCard key={stack.title} stack={stack} />
          ))}
          {items.toolItmes.map((stack) => (
            <StackCard key={stack.title} stack={stack} />
          ))}
        </div>
      </div>
    </ContentsContainer>
  );
};

export default StackConatiner;
