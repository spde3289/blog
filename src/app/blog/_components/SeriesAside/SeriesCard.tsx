import { ROUTES } from "@/constants/routes";
import { SeriesKey } from "@/constants/series";
import ArrowHeadSVG from "@/svg/ArrowHeadSVG";
import Link from "next/link";

interface SeriesCardProps {
  id: SeriesKey;
  title: string;
  postCount: number;
  lastUpdated: string;
}

const SeriesCard = ({ id, title, postCount, lastUpdated }: SeriesCardProps) => {
  return (
    <Link
      href={ROUTES.BLOG.SERIES(id)}
      className="group flex h-full flex-col gap-2 rounded-xl border border-neutral-200 bg-white p-4 sm:p-5 lg:p-4 hover:bg-zinc-50 dark:border-neutral-700 dark:bg-neutral-800/40 dark:hover:bg-zinc-900"
    >
      <div className="flex items-center justify-between gap-4">
        <h2 className="truncate typo-16-b text-neutral-900 group-hover:text-blue-600 dark:text-neutral-100 dark:group-hover:text-blue-400">
          {title}
        </h2>
        <ArrowHeadSVG className="size-5 shrink-0 -rotate-90 text-neutral-400 transition-transform group-hover:translate-x-0.5 dark:text-neutral-500" />
      </div>
      <div className="flex items-center gap-2 typo-13-m text-neutral-500 dark:text-neutral-400">
        <span className="shrink-0">{postCount} posts</span>
        <span className="size-1 shrink-0 rounded-full bg-neutral-300 dark:bg-neutral-600"></span>
        <span className="truncate">{lastUpdated} 업데이트</span>
      </div>
    </Link>
  );
};

export default SeriesCard;
