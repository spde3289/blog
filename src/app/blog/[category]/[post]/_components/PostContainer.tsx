"use client";

import HighlightCode from "@/components/HighlightCode";
import "@/styles/github.css";
import "@/styles/highlight.css";
import "@/styles/post.css";
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
    <div className="flex relative">
      <HighlightCode metadata={metadata} contentHtml={html} />
      {/* 목차 영역 */}
      <div className="hidden xl:block sticky top-15 mt-40 self-start">
        <ul className="border-l-2 overflow-y-auto toc border-neutral-300 dark:border-neutral-700 py-1 px-3 text-sm max-h-[calc(100vh-120px)] overflow-auto list-none">
          {sub?.map((i) => (
            <li
              key={i.id}
              className={`text-nowrap pr-2 ${
                i.level === 3 ? "ml-4 mt-0.5" : "mt-1.5 "
              }`}
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
