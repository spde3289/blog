import { useMemo } from "react";

/** 정규식 메타문자 이스케이프 */
const escapeRegExp = (str: string) => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

/** 검색어 변환 "react hooks" → /(react|hooks)/gi */
const createHighlightRegex = (query: string) => {
  const words = query
    .trim()
    .split(/\s+/)
    .filter((word) => word !== "")
    .map(escapeRegExp);
  if (words.length === 0) return null;
  return new RegExp(`(${words.join("|")})`, "gi");
};

interface HighlightProps {
  text: string;
  query: string;
  markClassName?: string;
}

/** 텍스트 내 검색어 하이라이트 */
const Highlight = ({
  text,
  query,
  markClassName = "bg-yellow-200 dark:bg-yellow-500/60 rounded-sm",
}: HighlightProps) => {
  const re = useMemo(() => createHighlightRegex(query), [query]);

  if (!re || !query.trim()) {
    return <>{text}</>;
  }

  const parts = text.split(re);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <mark key={i} className={markClassName}>
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
};

export default Highlight;
