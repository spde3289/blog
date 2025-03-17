"use client";

import { useSidebar } from "@/contexts/SidebarContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

interface NavBarItemProps {
  isActive: boolean;
  toggleMobileSidebar: () => void;
  name: string;
  path: string;
}

const NavBarItem = ({
  isActive,
  toggleMobileSidebar,
  name,
  path,
}: NavBarItemProps) => {
  return (
    <Link href={path} onClick={() => toggleMobileSidebar()}>
      <li
        className={`pl-3 py-2  ${
          isActive ? "menu-item-active" : "menu-item-inactive"
        }`}
      >
        <h2>{name}</h2>
      </li>
    </Link>
  );
};

const navItems = [
  {
    path: "/posts",
    name: "Posts",
  },
  {
    path: "/Archives",
    name: "archives",
  },
  {
    path: "/About",
    name: "about",
  },
];

const NavBar = () => {
  const {
    isExpanded,
    isMobileOpen,
    isHovered,
    setIsHovered,
    toggleMobileSidebar,
  } = useSidebar();
  const pathname = usePathname();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  let navWidth;

  if (isExpanded || isMobileOpen) {
    navWidth = "w-[290px]";
  } else if (isHovered) {
    navWidth = "w-[290px]";
  } else {
    navWidth = "w-[90px]";
  }

  return (
    <nav
      className={`flex flex-col h-[calc(100vh-65px)] fixed top-16 px-5 right-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${navWidth}
        ${isMobileOpen ? "translate-x-0" : "translate-x-full"}
        `}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="mt-5">
        <ul className="flex gap-1 flex-col w-full ml-3 mr-3 font-bold">
          {navItems.map((item) => (
            <NavBarItem
              path={item.path}
              name={item.name}
              key={item.name}
              toggleMobileSidebar={toggleMobileSidebar}
              isActive={item.path === pathname}
            />
          ))}
        </ul>
      </div>
    </nav>
  );
};
export default NavBar;
