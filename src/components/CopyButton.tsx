"use client";

import { cn } from "@/utils/cn";
import { Copy, CopyCheck } from "lucide-react";
import { useState } from "react";

interface CopyButtonProps {
  textToCopy: string;
  className?: string;
}

const CopyButton = ({ textToCopy, className }: CopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    if (isCopied) return;

    navigator.clipboard.writeText(textToCopy).then(() => {
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    });
  };

  return (
    <button
      onClick={handleCopy}
      className={cn(
        // ✅ absolute top-2 right-2 제거, flex 유지
        `flex cursor-pointer items-center justify-center rounded-md p-1.5
        transition-all duration-200`,
        !isCopied &&
          "bg-transparent text-gray-500 hover:bg-gray-200 hover:text-gray-700 " +
            `dark:text-gray-400 dark:hover:bg-gray-700/60
            dark:hover:text-gray-200`,
        isCopied && "bg-blue-500 text-white " + " dark:bg-blue-600",
        className
      )}
      aria-label="Copy code"
    >
      {isCopied ? (
        <CopyCheck className="h-4 w-4" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
    </button>
  );
};

export default CopyButton;
