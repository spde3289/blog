"use client";

import type { PostMetaData } from "@/types/posts.types";
import { getLanguageName } from "@/utils/getLanguageName";
import { getTextContent } from "@/utils/getTextContent";
import parse, {
  DOMNode,
  Element,
  HTMLReactParserOptions,
  attributesToProps,
  domToReact,
} from "html-react-parser";
import { Calendar } from "lucide-react";
import CopyButton from "./CopyButton";

interface PostArticleProps {
  contentHtml: string;
  metadata: PostMetaData;
}

const PostArticle = ({ metadata, contentHtml }: PostArticleProps) => {
  const parseOptions: HTMLReactParserOptions = {
    replace: (domNode: DOMNode) => {
      if (domNode instanceof Element && domNode.name === "pre") {
        const rawLang = domNode.attribs["data-language"];
        const langName = getLanguageName(rawLang);
        const codeText = getTextContent(domNode);

        const props = attributesToProps(domNode.attribs);

        const mergedStyle = {
          ...((props.style as React.CSSProperties) || {}),
          margin: 0,
        };

        return (
          <div
            className="code-block-wrapper my-6 overflow-hidden rounded-xl border
              border-gray-200 bg-slate-50 dark:border-gray-800
              dark:bg-[#1a1b26]"
          >
            <div
              className="flex items-center justify-between border-b
                border-gray-200 bg-slate-100 px-4 py-2 text-sm text-gray-600
                dark:border-gray-800 dark:bg-gray-800/50 dark:text-gray-400"
            >
              <span className="font-mono text-xs font-semibold tracking-wide">
                {langName}
              </span>
              <CopyButton textToCopy={codeText} />
            </div>
            <pre {...props} style={mergedStyle}>
              {domToReact(domNode.children as DOMNode[], parseOptions)}
            </pre>
          </div>
        );
      }
    },
  };
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <header
        className="mb-10 border-b border-gray-200 pb-8 dark:border-gray-800"
      >
        <h1
          className="mb-6 text-3xl font-bold tracking-tight text-gray-900
            sm:text-4xl dark:text-gray-100"
        >
          {metadata.title}
        </h1>
        <div
          className="flex flex-col gap-4 sm:flex-row sm:items-center
            sm:justify-between"
        >
          <div className="flex flex-wrap items-center gap-2">
            {metadata.tags.map((tag) => (
              <span
                key={tag}
                className="typo-14-m inline-flex items-center rounded-full
                  bg-gray-100 px-3 py-1 text-gray-600 dark:bg-gray-800
                  dark:text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
          <div
            className="flex items-center text-sm text-gray-500
              dark:text-gray-400"
          >
            <Calendar className="mr-1.5 h-4 w-4 shrink-0" />
            <time dateTime={metadata.date}>{metadata.date}</time>
          </div>
        </div>
      </header>
      <div className="prose md:prose-lg dark:prose-invert max-w-none">
        {parse(contentHtml, parseOptions)}
      </div>
    </article>
  );
};

export default PostArticle;
