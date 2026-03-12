"use client";

import ThemeToggleButton from "@/components/ThemeToggleButton";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Header = ({
  triggerId = "header-trigger",
  showWhenVisible = false,
  rootMargin = "0px 0px 0px 0px",
  threshold = 0.1,
}) => {
  const pathName = usePathname();

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById(triggerId);

    if (target === null) setVisible(true);
    if (!target) return; // 페이지에 트리거가 없는 경우 안전하게 무시
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        // 트리거가 보일 때 표시: showWhenVisible=true
        // 트리거가 보일 때 숨김: showWhenVisible=false
        setVisible(
          showWhenVisible ? entry.isIntersecting : !entry.isIntersecting
        );
      },
      { root: null, rootMargin, threshold }
    );

    io.observe(target);
    return () => io.disconnect();
  }, [triggerId, showWhenVisible, rootMargin, threshold, pathName]);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-999999 m-0 mx-auto h-12 max-w-375 -translate-y-12",
        "bg-inherit/60 backdrop-blur",
        "transition duration-500",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-12 opacity-0",
      ].join(" ")}
    >
      <div className="flex h-full w-full items-center px-4 lg:px-6">
        <nav
          className={[
            "flex w-full items-center gap-2 md:gap-4",
            pathName === "/" ? "text-white" : "text-gray-dark dark:text-white",
          ].join(" ")}
        >
          <Link className="text-xl font-bold lg:text-2xl" href="/">
            spde3289.dev
          </Link>
          <div
            className={`${
              pathName === "/"
                ? "bg-neutral-300/50"
                : "bg-neutral-300/50 dark:bg-neutral-700"
              } h-3.5 w-px shrink-0`}
          ></div>
          <Link className="text-sm font-bold" href="/blog">
            Blog
          </Link>
        </nav>
        {pathName !== "/" && <ThemeToggleButton />}
      </div>
    </header>
  );
};
export default Header;
