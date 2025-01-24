"use client";

import "highlight.js/styles/github.css"; // GitHub 스타일
import Highlight from "react-highlight";
interface CodeBlockProps {
  code: string;
  className?: string;
}

const CodeBlock = ({ code, className }: CodeBlockProps) => {
  return (
    <div className={`${className} bg-[#f6f8fa] rounded-xl min-w-72 h-min`}>
      <div className="h-8 border-b border-[#61616130] flex items-center px-2">
        <div className="w-2 h-2 rounded-full ml-2 bg-[#f75f59]" />
        <div className="w-2 h-2 rounded-full ml-2 bg-[#fbbe2f]" />
        <div className="w-2 h-2 rounded-full ml-2 bg-[#3acb41]" />
      </div>
      <Highlight className="language-javascript CodeBlock p-8 px-2 py-1 rounded-xl">
        {code}
      </Highlight>
    </div>
  );
};
export default CodeBlock;
