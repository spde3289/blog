import { ROUTES } from "@/constants/routes";
import ArrowHeadSVG from "@/svg/ArrowHeadSVG";
import { SeriesGroup } from "@/types/posts.types";
import Link from "next/link";

interface SeriesCardProps {
  series: SeriesGroup;
}

const SeriesCard = ({ series }: SeriesCardProps) => {
  return (
    <Link
      href={ROUTES.BLOG.SERIES(series.series)}
      className="group flex flex-col gap-2 rounded-xl border border-zinc-200 bg-white p-4 hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700 dark:hover:bg-zinc-900"
    >
      <div className="flex items-center justify-between gap-4">
        <h2 className="truncate typo-16-b text-neutral-900 group-hover:text-blue-600 dark:text-neutral-100 dark:group-hover:text-blue-400">
          {series.seriesName}
        </h2>
        <ArrowHeadSVG className="size-5 shrink-0 -rotate-90 text-zinc-400 transition-transform group-hover:translate-x-0.5 dark:text-zinc-500" />
      </div>
      <div className="flex items-center gap-2 typo-13-m text-zinc-500 dark:text-zinc-400">
        <span>{series.postIds.length} posts</span>
        <span className="size-1 rounded-full bg-zinc-300 dark:bg-zinc-600"></span>
        <span>{series.lastUpdated} 업데이트</span>
      </div>
    </Link>
  );
};

export default SeriesCard;
