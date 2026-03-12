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
      className={`fixed right-6 bottom-6 rounded-full p-3 shadow-lg
        transition-all duration-300 ${
          isScrollButtonVisible
            ? "visible translate-y-0 opacity-100"
            : "invisible translate-y-5 opacity-0"
        } ${
          pathName === "/"
            ? "bg-white text-[#313131]"
            : "bg-[#313131] text-white dark:bg-white dark:text-[#313131]"
        }`}
    >
      ↑
    </button>
  );
};

export default ScrollToTopButton;
