export const getLanguageName = (lang: string | null | undefined) => {
  if (!lang) return "Code";
  const normalizedLang = lang.toLowerCase();
  const langMap: Record<string, string> = {
    js: "JavaScript",
    javascript: "JavaScript",
    ts: "TypeScript",
    typescript: "TypeScript",
    jsx: "React (JSX)",
    tsx: "React (TSX)",
    html: "HTML",
    css: "CSS",
    python: "Python",
    bash: "Terminal",
    sh: "Terminal",
    json: "JSON",
  };
  return langMap[normalizedLang] || normalizedLang.toUpperCase();
};
