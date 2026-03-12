"use client";

import { useEffect, useState } from "react";

export type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

interface TableOfContentsProps {
  toc: TocItem[];
}

const TableOfContents = ({ toc }: TableOfContentsProps) => {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // 렌더링된 h2, h3 태그들을 모두 찾습니다.
    const elements = document.querySelectorAll("h2, h3");

    // Intersection Observer 설정
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -80% 0px", threshold: 0.1 },
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [toc]);

  if (toc.length === 0) return null;

  return (
    <div className="hidden xl:block sticky top-15 mt-40 self-start">
      <ul className="border-l-2 overflow-y-auto toc border-neutral-300 dark:border-neutral-700 py-1 px-3 text-sm max-h-[calc(100vh-120px)] overflow-auto list-none">
        {toc.map((i) => (
          <li
            key={i.id}
            className={`text-nowrap pr-2 transition-all duration-200 ${
              i.level === 3 ? "ml-4 mt-0.5" : "mt-1.5"
            }`}
          >
            <a
              href={`#${i.id}`}
              className={`block transition-colors ${
                activeId === i.id
                  ? "text-blue-500 font-semibold dark:text-blue-400" // 활성화 되었을 때의 색상
                  : "text-[#868E96] hover:text-[#212529] dark:hover:text-neutral-300" // 기본 색상
              }`}
            >
              {i.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableOfContents;
