"use client";

import "@/styles/github.css";
import "@/styles/highlight.css";
import "@/styles/post.css";
import { useEffect } from "react";
import Highlight from "react-highlight";

interface HighlightedCodeProps {
  contentHtml: string;
  metadata: { [key: string]: any };
}

const CopySvg = `<svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true">
  <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
</svg>`;
const CheckSvg = `<svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" ">
  <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"></path>
</svg>`;

const HighlightCode = ({ metadata, contentHtml }: HighlightedCodeProps) => {
  useEffect(() => {
    const codeBlocks = document.querySelectorAll("pre");

    codeBlocks.forEach((block) => {
      if (block.querySelector(".copy-button")) return;

      const button = document.createElement("button");
      button.innerHTML = CopySvg;
      button.className = "copy-button"; // CSS 클래스 이름 추가

      // 복사 이벤트 핸들러
      button.addEventListener("click", () => {
        console.log(button);
        const code = block.querySelector("code")?.textContent || "";
        navigator.clipboard.writeText(code).then(() => {
          button.innerHTML = CheckSvg;
          button.classList.add("check-button"); // check-button 클래스 추가
          button.classList.remove("copy-button");

          // 2초 후에 check-button 클래스를 제거
          setTimeout(() => {
            button.innerHTML = CopySvg;
            button.classList.remove("check-button");
            button.classList.add("copy-button");
          }, 2000);
        });
      });

      block.style.position = "relative";
      block.appendChild(button);
    });
  }, [contentHtml]);

  return (
    <div className="markdown-body m-0 mx-auto">
      <div>
        <h1 style={{ marginBottom: "4px", fontSize: "2rem" }}>
          {metadata.title}
        </h1>
        <div className="flex justify-between mb-4">
          <div
            style={{ marginBottom: "0" }}
            className="flex text-sm gap-2 text-gray-500"
          >
            {metadata.tags.map((tag: string) => (
              <div key={tag}># {tag}</div>
            ))}
          </div>
          <p style={{ marginBottom: "0" }} className="text-gray-500 text-sm">
            작성일 : {metadata.date}
          </p>
        </div>
      </div>
      <Highlight innerHTML={true}>{contentHtml}</Highlight>
    </div>
  );
};

export default HighlightCode;
