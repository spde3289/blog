export interface Stack {
  category: "프론트엔드" | "라이브러리" | "도구" | "환경 및 배포";
  img: {
    src: string;
    alt: string;
    options?: {
      [key: string]: string | boolean;
    };
  };
}

const stackItems: Stack[] = [
  {
    category: "프론트엔드",
    img: {
      src: "/img/thumbnail.png",
      alt: "JavaScript",
    },
  },
  {
    category: "프론트엔드",
    img: {
      src: "/img/thumbnail.png",
      alt: "TypeScript",
    },
  },
  {
    category: "프론트엔드",
    img: {
      src: "/img/thumbnail.png",
      alt: "React",
    },
  },
  {
    category: "프론트엔드",
    img: {
      src: "/img/thumbnail.png",
      alt: "Next.js",
    },
  },
  {
    category: "라이브러리",
    img: {
      src: "/img/thumbnail.png",
      alt: "TailWind CSS",
    },
  },
  {
    category: "라이브러리",
    img: {
      src: "/img/thumbnail.png",
      alt: "Styled-component",
    },
  },
  {
    category: "도구",
    img: {
      src: "/img/thumbnail.png",
      alt: "figma",
    },
  },
  {
    category: "도구",
    img: {
      src: "/img/thumbnail.png",
      alt: "Notion",
    },
  },
];

export default stackItems;
