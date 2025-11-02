"use client";

import { SeriesGroup } from "@/lib/types";
import KeyboardArrowSVG from "@/svg/ArrowHeadSVG";
import Link from "next/link";
import { useState } from "react";

interface SeriesCardProps {
  series: SeriesGroup;
}

const SeriesCard = ({ series }: SeriesCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  return (
    <li
      onClick={toggleDropdown}
      className={`group relative flex flex-col items-center justify-between px-2 py-1.5 sm:px-3 lg:px-4 sm:py-2 lg:py-3 border border-neutral-200 dark:border-neutral-800 rounded-lg transition-colors bg-neutral-50 dark:bg-neutral-800/40  ${
        isOpen ? "" : "hover:bg-neutral-100 dark:hover:bg-neutral-800/70"
      }
        `}
    >
      <div className="w-full flex items-center justify-between">
        {series.series}
        <KeyboardArrowSVG className="size-5" />
      </div>
      <div
        className={` grid transition-[grid-template-rows] duration-300 ease-in-out overflow-hidden w-full ${
          isOpen
            ? "grid-rows-[1fr] pt-2 mt-2 border-t border-neutral-200 dark:border-transparent"
            : "grid-rows-[0fr] py-0 "
        }`}
      >
        <div className="min-h-0 flex flex-col gap-2">
          {series.posts.map((el) => (
            <Link href={el.href} key={el.metadata.title}>
              <div className="py-2 px-3 border font-medium rounded-lg dark:border-neutral-800 bg-neutral-200/50 dark:bg-neutral-700/40 hover:bg-neutral-200/90 dark:hover:bg-neutral-800/70">
                {el.metadata.title}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </li>
  );
};

interface SeriesAsideProps {
  series: SeriesGroup[];
}

const SeriesAside = ({ series }: SeriesAsideProps) => {
  return (
    <aside className="lg:w-[302px] text-sm sm:text-base">
      <div className="mb-2 sm:mb-4 lg:mb-8">
        <h2 className="text-pretty text-neutral-900 dark:text-neutral-100 text-lg sm:text-xl font-semibold mb-1 sm:mb-2 lg:mb-4">
          시리즈 모아보기
        </h2>
        <div>진행한 프로젝트/경험 별로 모아둔 목록 입니다!</div>
      </div>
      <ul className="flex flex-col gap-2">
        {series.map((series) => (
          <SeriesCard key={series.series} series={series} />
        ))}
      </ul>
    </aside>
  );
};

export default SeriesAside;
