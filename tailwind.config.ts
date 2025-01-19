import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/content/**/*.md",
  ],
  theme: {
    extend: {
      maxWidth: {
        1400: "1400px",
        1024: "1024px",
        102: "1024px",
      },
      backdropBlur: {
        custom: "5px", // 사용자 정의 블러 값
      },
      backgroundSize: {
        "auto-0.5rem": "auto 0.5rem",
        "auto-0rem": "auto 0rem",
      },
      backdropSaturate: {
        custom: "180%", // 사용자 정의 채도 값
      },
      boxShadow: {
        "custom-inset": "inset 0 -1px 0 0 var(--eaeaea)", // 사용자 정의 box-shadow
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    require("tailwindcss-filters"), // 필터 플러그인 추가
  ],
} satisfies Config;
