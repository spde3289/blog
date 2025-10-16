import { getAllcategorysType } from "@/lib/markdown";
import KeyboardArrowSVG from "@/svg/ArrowHeadSVG";

interface SeriesAsideProps {
  categorys: getAllcategorysType;
}

const SeriesAside = ({ categorys }: SeriesAsideProps) => {
  return (
    <aside className="lg:w-[302px] text-sm sm:text-base">
      <div className="mb-2 sm:mb-4 lg:mb-8">
        <h2 className="text-pretty text-neutral-900 dark:text-neutral-100 text-lg sm:text-xl font-semibold mb-1 sm:mb-2 lg:mb-4">
          시리즈 모아보기
        </h2>
        <div>진행한 프로젝트/경험 별로 모아둔 목록 입니다!</div>
      </div>
      <ul className="flex flex-col gap-2">
        {categorys.map((category) => (
          <li
            key={category.name}
            className="group relative flex items-center justify-between px-2 py-1.5 sm:px-4 sm:py-3 border border-neutral-200 dark:border-transparent rounded-lg transition-colors bg-neutral-50 dark:bg-neutral-800/40 hover:bg-neutral-100 dark:hover:bg-neutral-800/70"
          >
            {category.name}
            <KeyboardArrowSVG className="size-5" />
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default SeriesAside;
