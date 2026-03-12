"use client";

import HighlightCode from "@/components/HighlightCode";
import type { PostMetaData } from "@/types/posts.types";
import { useEffect, useState } from "react";

interface HighlightedCodeProps {
  contentHtml: string;
  metadata: PostMetaData;
}

const buildHtmlAndToc = (contentHtml: string) => {
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
    const htmlTest = buildHtmlAndToc(contentHtml);
    setHtml(htmlTest.html.innerHTML);
    setSub(htmlTest.toc);
  }, [contentHtml]);

  return (
    <div className="relative flex">
      <HighlightCode metadata={metadata} contentHtml={html} />
      {/* 목차 영역 */}
      <div className="sticky top-15 mt-40 hidden self-start xl:block">
        <ul
          className="toc max-h-[calc(100vh-120px)] list-none overflow-auto
            overflow-y-auto border-l-2 border-neutral-300 px-3 py-1 text-sm
            dark:border-neutral-700"
        >
          {sub?.map((i) => (
            <li
              key={i.id}
              className={`pr-2 text-nowrap ${
                i.level === 3 ? "mt-0.5 ml-4" : "mt-1.5"
              }`}
            >
              <a
                href={`#${i.id}`}
                className="text-[#868E96] hover:text-[#212529]
                  dark:hover:text-neutral-300"
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
