"use client";

import HighlightedCode from "@/components/HighlightedCode";
import "@/styles/github.css";
import "@/styles/highlight.css";
import "@/styles/post.css";
import { useEffect, useState } from "react";

interface HighlightedCodeProps {
  contentHtml: string;
  metadata: { [key: string]: any };
}

const CopySvg = `<svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-copy js-clipboard-copy-icon">
  <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
</svg>`;
const CheckSvg = `<svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-check js-clipboard-check-icon color-fg-success d-none">
  <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"></path>
</svg>`;

const useBuildHtmlAndToc = (contentHtml: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(contentHtml, "text/html");
  const headings = Array.from(doc.querySelectorAll("h2, h3"));

  doc.querySelectorAll("h2, h3").forEach((el) => (el.id = el.innerHTML));

  const toc: TocItem[] = headings.map((el, index) => {
    const id =
      el.textContent?.trim().replace(/\s+/g, "-") || `section-${index}`;
    el.id = id;
    return {
      id,
      text: el.textContent || "",
      level: el.tagName === "H2" ? 2 : 3,
    };
  });
  return { html: doc.body, toc };
};

type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

const PostContainer = ({ metadata, contentHtml }: HighlightedCodeProps) => {
  const [html, setHtml] = useState<string>("");
  const [sub, setSub] = useState<TocItem[]>([]);

  useEffect(() => {
    const htmlTest = useBuildHtmlAndToc(contentHtml);

    setHtml(htmlTest.html.innerHTML);
    setSub(htmlTest.toc);
  }, [contentHtml]);

  return (
    <div className="flex relative">
      <HighlightedCode metadata={metadata} contentHtml={html} />
      {/* 목차 영역 */}
      <div className="hidden xl:block sticky top-15 mt-40 self-start">
        <ul className="border-l-2 overflow-y-auto toc border-neutral-300 dark:border-neutral-700 py-1 px-3 text-sm max-h-[calc(100vh-120px)] overflow-auto list-none">
          {sub?.map((i) => (
            <li
              key={i.id}
              className={`text-nowrap pr-2 ${i.level === 3 ? "ml-4" : ""}`}
            >
              <a
                href={`#${i.id}`}
                className="text-[#868E96] hover:text-[#212529] dark:hover:text-neutral-300"
              >
                {i.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PostContainer;
