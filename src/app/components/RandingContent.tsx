"use client";
import { useEffect, useState } from "react";

const RandingContent = () => {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScroll(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 스크롤 정도에 따라 좌우 이동 (최대 ±100px)
  const move = Math.min(scroll * 0.3, 1000);
  return (
    <section className="h-screen w-full  relative flex justify-center items-center flex-col">
      <div className="blur-ball blur-ball--1"></div>
      <div className="blur-ball blur-ball--2"></div>
      <div className="blur-ball blur-ball--3"></div>
      <div className="z-9 flex justify-center items-center flex-col mb-16">
        <h2 className="font-bold text-7xl text-white mb-4">
          개발자 김지훈입니다.
        </h2>
        <p className="text-center font-medium text-4xl mb-4">
          1인 개발자로서 다양한 서비스를 개발하고 있습니다. <br />
          사용자들이 불편함을 느끼는 문제를 빠르게 해결하는 것을 즐기며 <br />
          직접 기획부터 운영까지 경험을 쌓아왔습니다.
        </p>
        <span className="text-white font-black text-4xl flex gap-2">
          <img
            className="size-12 z-99"
            src="/img/common/ic_spde3289.png"
            alt="지훈 아이콘"
          />
          spde3289
        </span>
      </div>
      <div className="flex gap-4 transition-transform duration-300">
        <a
          href="https://www.spde3289.dev/blog"
          className="transition-transform duration-300"
        >
          blog
        </a>
        <a
          href="https://github.com/spde3289"
          className="transition-transform duration-300"
        >
          github
        </a>
      </div>
      <div id="header-trigger"></div>
    </section>
  );
};

export default RandingContent;
