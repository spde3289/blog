"use client";

import type { SeriesGroup } from "@/types/posts.types";
import SeriesCard from "./SeriesCard";

interface SeriesAsideProps {
  series: SeriesGroup[];
}

const SeriesAside = ({ series }: SeriesAsideProps) => {
  return (
    <aside className="w-full">
      <div className="mb-4 px-4 sm:px-6 lg:mb-6 lg:px-0">
        <h2 className="mb-1.5 sm:mb-2 typo-18-b sm:typo-20-b text-neutral-900 dark:text-neutral-100">
          시리즈 모아보기
        </h2>
        <div className="text-pretty typo-13-m sm:typo-14-body-m text-zinc-600 dark:text-zinc-400">
          진행한 프로젝트/경험 별로 모아둔 목록 입니다!
        </div>
      </div>
      <ul className="flex flex-row gap-3 sm:gap-4 overflow-x-auto px-4 pb-4 sm:px-6 sm:pb-6 lg:flex-col list-none lg:overflow-visible lg:px-0 lg:pb-0 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {series.map((seriesItem) => (
          <li
            key={seriesItem.series}
            className="w-[240px] shrink-0 snap-start sm:w-[280px] md:w-[300px] lg:w-full"
          >
            <SeriesCard
              key={seriesItem.series}
              id={seriesItem.series}
              title={seriesItem.seriesName}
              postCount={seriesItem.postIds.length}
              lastUpdated={seriesItem.lastUpdated}
            />
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default SeriesAside;
