"use client";

import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const homeStyles = "bg-[#0a0a0a] text-neutral-600 border-neutral-900";
  const defaultStyles =
    "bg-white text-gray-500 border-gray-200 dark:bg-[#0a0a0a] dark:text-neutral-600 dark:border-neutral-900";

  return (
    <footer
      className={`py-10 text-center text-sm border-t transition-colors duration-300 ${
        isHome ? homeStyles : defaultStyles
      }`}
    >
      © {new Date().getFullYear()} Developer Kim Ji-hoon. All rights reserved.
    </footer>
  );
};

export default Footer;
