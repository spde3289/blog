"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const ScrollToTopButton = () => {
  const [isScrollButtonVisible, setIsScrollButtonVisible] = useState(false);
  const pathName = usePathname();

  // 스크롤 위치 감지
  useEffect(() => {
    const handleScroll = () => {
      setIsScrollButtonVisible(window.scrollY > 300); // 300px 이상 스크롤 시 버튼 표시
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 p-3 rounded-full shadow-lg transition-all duration-300 ${
        isScrollButtonVisible
          ? "opacity-100 translate-y-0 visible"
          : "opacity-0 translate-y-5 invisible"
      } ${
        pathName === "/"
          ? "bg-white text-[#313131]"
          : "dark:text-[#313131] dark:bg-white text-white bg-[#313131]"
      }`}
    >
      ↑
    </button>
  );
};

export default ScrollToTopButton;
