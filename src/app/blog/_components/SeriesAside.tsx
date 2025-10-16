import KeyboardArrowSVG from "@/svg/ArrowHeadSVG";

const SeriesAside = () => {
  return (
    <aside className="w-[302px]">
      <div className="mb-8">
        <h2 className="text-pretty text-neutral-900 dark:text-neutral-100 text-xl font-semibold mb-4">
          시리즈 모아보기
        </h2>
        <div>진행한 프로젝트/경험 별로 모아둔 목록 입니다!</div>
      </div>
      <ul className="flex flex-col gap-2">
        <li className="group relative flex items-center justify-between gap-3 px-4 py-3 border border-neutral-200 dark:border-transparent rounded-lg transition-colors bg-neutral-50 dark:bg-neutral-800/40 hover:bg-neutral-100 dark:hover:bg-neutral-800/70">
          리스트
          <KeyboardArrowSVG className="size-5" />
        </li>
        <li className="group relative flex items-center justify-between gap-3 px-4 py-3 border border-neutral-200 dark:border-transparent rounded-lg transition-colors bg-neutral-50 dark:bg-neutral-800/40 hover:bg-neutral-100 dark:hover:bg-neutral-800/70">
          리스트
          <KeyboardArrowSVG className="size-5" />
        </li>
        <li className="group relative flex items-center justify-between gap-3 px-4 py-3 border border-neutral-200 dark:border-transparent rounded-lg transition-colors bg-neutral-50 dark:bg-neutral-800/40 hover:bg-neutral-100 dark:hover:bg-neutral-800/70">
          리스트
          <KeyboardArrowSVG className="size-5" />
        </li>
        <li className="group relative flex items-center justify-between gap-3 px-4 py-3 border border-neutral-200 dark:border-transparent rounded-lg transition-colors bg-neutral-50 dark:bg-neutral-800/40 hover:bg-neutral-100 dark:hover:bg-neutral-800/70">
          리스트
          <KeyboardArrowSVG className="size-5" />
        </li>
        <li className="group relative flex items-center justify-between gap-3 px-4 py-3 border border-neutral-200 dark:border-transparent rounded-lg transition-colors bg-neutral-50 dark:bg-neutral-800/40 hover:bg-neutral-100 dark:hover:bg-neutral-800/70">
          리스트
          <KeyboardArrowSVG className="size-5" />
        </li>
      </ul>
    </aside>
  );
};

export default SeriesAside;
