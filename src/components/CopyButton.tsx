"use client";

import { cn } from "@/utils/cn";
import { Copy, CopyCheck } from "lucide-react";
import { useState } from "react";

interface CopyButtonProps {
  textToCopy: string;
}

const CopyButton = ({ textToCopy }: CopyButtonProps) => {
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
        "fix top-2 right-2 p-1.5 rounded-md transition-all duration-200 flex items-center justify-center cursor-pointer",
        !isCopied &&
          "text-gray-500 bg-transparent hover:bg-gray-200 hover:text-gray-700 " +
            "dark:text-gray-400 dark:hover:bg-gray-700/60 dark:hover:text-gray-200",
        isCopied &&
          "text-white bg-blue-500 border border-blue-600 " +
            "dark:bg-blue-600 dark:border-blue-500",
      )}
      aria-label="Copy code"
    >
      {isCopied ? (
        <CopyCheck className="w-4 h-4" />
      ) : (
        <Copy className="w-4 h-4" />
      )}
    </button>
  );
};

export default CopyButton;
