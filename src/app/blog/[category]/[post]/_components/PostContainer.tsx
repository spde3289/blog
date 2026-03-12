"use client";

import HighlightCode from "@/components/HighlightCode";
import type { PostMetaData } from "@/types/posts.types";
import { useEffect, useState } from "react";
import TableOfContents, { type TocItem } from "./TableOfContents";

interface HighlightedCodeProps {
  contentHtml: string;
  metadata: PostMetaData;
}

// HTML을 수정하지 않고, 단순히 목차 데이터만 뽑아내는 용도로 단순화
const extractToc = (htmlString: string): TocItem[] => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  const headings = Array.from(doc.querySelectorAll("h2, h3"));

  return headings.map((el) => ({
    id: el.id, // 서버(rehype-slug)가 이미 달아준 id를 그대로 가져옴
    text: el.textContent || "",
    level: el.tagName === "H2" ? 2 : 3,
  }));
};

const PostContainer = ({ metadata, contentHtml }: HighlightedCodeProps) => {
  // // 이제 html 상태를 따로 관리할 필요가 없습니다!
  const [toc, setToc] = useState<TocItem[]>([]);
  const [html, setHtml] = useState(contentHtml);
  useEffect(() => {
    // 렌더링 후 목차 배열만 추출해서 상태에 저장
    setHtml(contentHtml);
    setToc(extractToc(contentHtml));
  }, [contentHtml]);

  return (
    <div className="flex relative">
      {/* 원본 HTML을 그대로 꽂아주기만 하면 끝 */}
      <HighlightCode metadata={metadata} contentHtml={html} />
      {/* Scroll Spy가 적용된 목차 컴포넌트 */}
      <TableOfContents toc={toc} />
    </div>
  );
};

export default PostContainer;
