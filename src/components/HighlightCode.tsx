"use client";

import { useTheme } from "@/contexts/ThemeContext";
import type { PostMetaData } from "@/types/posts.types";
import { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import CopyButton from "./CopyButton";

interface HighlightedCodeProps {
  contentHtml: string;
  metadata: PostMetaData;
}

const HighlightCode = ({ metadata, contentHtml }: HighlightedCodeProps) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;

    const addButtons = () => {
      const codeBlocks = container.querySelectorAll("pre");

      codeBlocks.forEach((block) => {
        if (block.querySelector(".copy-btn-wrapper")) return;

        const codeText = block.querySelector("code")?.textContent || "";

        const wrapper = document.createElement("div");
        wrapper.className = "copy-btn-wrapper";

        // pre 태그 안에 컨테이너 추가
        block.style.position = "relative";
        block.appendChild(wrapper);

        const root = createRoot(wrapper);
        root.render(<CopyButton textToCopy={codeText} />);
      });
    };

    addButtons();

    const observer = new MutationObserver(() => {
      addButtons();
    });

    observer.observe(container, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [contentHtml]);

  return (
    <div
      className="prose prose-slate dark:prose-invert"
      data-color-mode={mounted && resolvedTheme === "dark" ? "dark" : "light"}
    >
      <div>
        <h1 style={{ marginBottom: "4px", fontSize: "2rem" }}>
          {metadata.title}
        </h1>
        <div className="mb-4 flex justify-between">
          <div
            style={{ marginBottom: "0" }}
            className="flex gap-2 text-sm text-gray-500"
          >
            {metadata.tags.map((tag: string) => (
              <div key={tag}># {tag}</div>
            ))}
          </div>
          <p style={{ marginBottom: "0" }} className="text-sm text-gray-500">
            작성일 : {metadata.date}
          </p>
        </div>
      </div>
      {/* ✅ ref 속성을 추가하여 React 생명주기 내에서 DOM을 추적하도록 합니다. */}
      <div
        ref={contentRef}
        className="post-content"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </div>
  );
};

export default HighlightCode;
