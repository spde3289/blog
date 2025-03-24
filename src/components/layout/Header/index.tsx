"use client";

import ThemeToggleButton from "@/components/common/ThemeToggleButton";
import Link from "next/link";

const Header = () => {
  return (
    <header className="h-12 fixed top-0 left-0 w-full z-50 backdrop-blur-custom ">
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
