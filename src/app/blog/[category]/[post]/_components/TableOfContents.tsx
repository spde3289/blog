"use client";

import { useEffect, useState } from "react";

export type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

interface TableOfContentsProps {
  contentHtml: string;
}

const extractTocSync = (htmlString: string): TocItem[] => {
  const regex = /<(h[23])\s+id="([^"]+)"[^>]*>(.*?)<\/\1>/gi;
  const headings: TocItem[] = [];
  let match;

  while ((match = regex.exec(htmlString)) !== null) {
    const textContent = match[3].replace(/<[^>]+>/g, "").trim();
    headings.push({
      level: match[1].toLowerCase() === "h2" ? 2 : 3,
      id: match[2],
      text: textContent,
    });
  }
  return headings;
};

const TableOfContents = ({ contentHtml }: TableOfContentsProps) => {
  const toc = extractTocSync(contentHtml);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (toc.length === 0) return;

    const elements = document.querySelectorAll("h2, h3");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -80% 0px", threshold: 0.1 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [toc]);

  if (toc.length === 0) return null;

  return (
    <div className="sticky top-15 mt-40 hidden self-start xl:block">
      <ul
        className="toc max-h-[calc(100vh-120px)] list-none overflow-auto
          overflow-y-auto border-l-2 border-neutral-300 px-3 py-1 text-sm
          dark:border-neutral-700"
      >
        {toc.map((i) => (
          <li
            key={i.id + i.text}
            className={`pr-2 text-nowrap transition-all duration-200 ${
              i.level === 3 ? "mt-0.5 ml-4" : "mt-1.5"
            }`}
          >
            <a
              href={`#${i.id}`}
              className={`block transition-colors ${
                activeId === i.id
                  ? "font-semibold text-blue-500 dark:text-blue-400"
                  : `text-[#868E96] hover:text-[#212529]
                    dark:hover:text-neutral-300`
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
