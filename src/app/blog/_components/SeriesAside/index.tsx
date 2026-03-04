"use client";

import type { SeriesGroup } from "@/types/posts.types";
import SeriesCard from "./SeriesCard";

interface SeriesAsideProps {
  series: SeriesGroup[];
}

const SeriesAside = ({ series }: SeriesAsideProps) => {
  return (
    <aside className="lg:w-[302px]">
      <div className="mb-4 lg:mb-6">
        <h2 className="mb-2 typo-20-b text-neutral-900 dark:text-neutral-100">
          시리즈 모아보기
        </h2>
        <div className="text-pretty typo-14-body-m text-zinc-600 dark:text-zinc-400">
          진행한 프로젝트/경험 별로 모아둔 목록 입니다!
        </div>
      </div>
      <ul className="flex flex-col gap-3">
        {series.map((seriesGroup) => (
          <SeriesCard key={seriesGroup.series} series={seriesGroup} />
        ))}
      </ul>
    </aside>
  );
};

export default SeriesAside;
