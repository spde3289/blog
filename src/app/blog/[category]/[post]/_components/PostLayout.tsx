"use client";

import PostArticle from "@/components/PostArticle";
import type { PostMetaData } from "@/types/posts.types";
import TableOfContents from "./TableOfContents";

interface HighlightedCodeProps {
  contentHtml: string;
  metadata: PostMetaData;
}

const PostLayout = ({ metadata, contentHtml }: HighlightedCodeProps) => {
  return (
    <div className="relative flex lg:mb-96">
      <PostArticle metadata={metadata} contentHtml={contentHtml} />
      {/* 💡 문자열만 툭 던져주면 TableOfContents가 알아서 파싱하고 그립니다. */}
      <TableOfContents contentHtml={contentHtml} />
    </div>
  );
};

export default PostLayout;
