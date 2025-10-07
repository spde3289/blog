"use client";

import ThemeToggleButton from "@/components/common/ThemeToggleButton";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Header = ({
  triggerId = "header-trigger",
  showWhenVisible = true,
  rootMargin = "0px 0px 0px 0px",
  threshold = 0.1,
}) => {
  const pathName = usePathname();

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById(triggerId);
    if (!target) return; // 페이지에 트리거가 없는 경우 안전하게 무시

    const io = new IntersectionObserver(
      (entries) => {
        console.log(entries);
        const entry = entries[0];
        // 트리거가 보일 때 표시: showWhenVisible=true
        // 트리거가 보일 때 숨김:  showWhenVisible=false
        setVisible(
          showWhenVisible ? entry.isIntersecting : !entry.isIntersecting
        );
      },
      { root: null, rootMargin, threshold }
    );

    io.observe(target);
    return () => io.disconnect();
  }, [triggerId, showWhenVisible, rootMargin, threshold]);

  console.log(pathName);

  if (pathName === "/") {
    // return;
  }

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50",
        "backdrop-blur-md bg-black/60",
        "border-b border-white/10",
        "transition-opacity duration-500",
        visible ? "opacity-100" : "opacity-0 pointer-events-none",
      ].join(" ")}
      aria-hidden={!visible}
    >
      {/* <header className="h-12 fixed top-0 left-0 w-full z-50 backdrop-blur-custom "> */}
      <div className="px-4 lg:px-6 w-full h-full flex items-center">
        <nav className="flex w-full gap-2 md:gap-4 items-center">
          <Link
            className="text-xl lg:text-2xl font-bold text-black dark:text-white "
            href="/"
          >
            spde3289.dev
          </Link>
          <div className="w-px bg-neutral-300 dark:bg-neutral-700 h-3.5 shrink-0"></div>
          <Link className="text-sm font-bold dark:text-white " href="/blog">
            Blog
          </Link>
        </nav>
        <ThemeToggleButton />
      </div>
    </header>
  );
};
export default Header;
