"use client";

import type { Series } from "@/types/posts.types";
import SeriesCard from "./SeriesCard";

interface SeriesAsideProps {
  series: Series[];
}

const SeriesAside = ({ series }: SeriesAsideProps) => {
  return (
    <aside className="w-full">
      <div className="mb-4 px-4 sm:px-6 lg:mb-6 lg:px-0">
        <h2
          className="typo-18-b sm:typo-20-b mb-1.5 text-neutral-900 sm:mb-2
            dark:text-neutral-100"
        >
          시리즈 모아보기
        </h2>
        <div
          className="typo-13-m sm:typo-14-body-m text-pretty text-zinc-600
            dark:text-zinc-400"
        >
          진행한 프로젝트/경험 별로 모아둔 목록 입니다!
        </div>
      </div>
      <ul
        className="flex snap-x snap-mandatory list-none flex-row gap-3
          overflow-x-auto px-4 pb-4 [-ms-overflow-style:none]
          [scrollbar-width:none] sm:gap-4 sm:px-6 sm:pb-6 lg:flex-col
          lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden"
      >
        {series.map((seriesItem) => (
          <li
            key={seriesItem.series}
            className="w-60 shrink-0 snap-start sm:w-70 md:w-75 lg:w-full"
          >
            <SeriesCard
              key={seriesItem.series}
              id={seriesItem.series}
              title={seriesItem.seriesName}
              postCount={seriesItem.postRefs.length}
              lastUpdated={seriesItem.lastUpdated}
            />
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default SeriesAside;
