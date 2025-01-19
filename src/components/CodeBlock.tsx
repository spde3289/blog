"use client";

import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css"; // GitHub 다크 모드 CSS 임포트
import { useEffect } from "react";

interface CodeBlockProps {
  code: string;
  className?: string;
}

const CodeBlock = ({ code, className }: CodeBlockProps) => {
  useEffect(() => {
    hljs.highlightAll();
  }, []);
  return (
    <div className={`${className} bg-[#1e1e1e] rounded-xl min-w-72 h-min`}>
      <div className="h-8 border-b border-[#ffffff30] flex items-center px-2">
        <div className="w-2 h-2 rounded-full ml-2 bg-[#f75f59]" />
        <div className="w-2 h-2 rounded-full ml-2 bg-[#fbbe2f]" />
        <div className="w-2 h-2 rounded-full ml-2 bg-[#3acb41]" />
      </div>
      <pre className="px-2 py-1 text-white text-base">
        <code
          style={{ backgroundColor: "#1e1e1e", padding: "8px" }}
          className="language-javascript"
        >
          {code}
        </code>
      </pre>
    </div>
  );
};
export default CodeBlock;
