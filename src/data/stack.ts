export interface Stack {
  title: string;
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
    title: "JavaScript",
    img: {
      src: "/img/thumbnail.png",
      alt: "자바스크립트 로고",
    },
  },
  {
    title: "TypeScript",
    img: {
      src: "/img/thumbnail.png",
      alt: "자바스크립트 로고",
    },
  },
  {
    title: "React",
    img: {
      src: "/img/thumbnail.png",
      alt: "자바스크립트 로고",
    },
  },
  {
    title: "Next.js",
    img: {
      src: "/img/thumbnail.png",
      alt: "자바스크립트 로고",
    },
  },
  {
    title: "TailWindCSS",
    img: {
      src: "/img/thumbnail.png",
      alt: "자바스크립트 로고",
    },
  },
  {
    title: "Styled-Component",
    img: {
      src: "/img/thumbnail.png",
      alt: "자바스크립트 로고",
    },
  },
];

const toolItmes: Stack[] = [
  {
    title: "Figma",
    img: {
      src: "/img/thumbnail.png",
      alt: "피그마 로고",
    },
  },
  {
    title: "Notion",
    img: {
      src: "/img/thumbnail.png",
      alt: "노션 로고",
    },
  },
];

export default { stackItems, toolItmes };
