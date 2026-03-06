import { getPostMeta, getSeriesList } from "@/lib/postService";
import Link from "next/link";
import ListViewPost from "../../_components/PostSection/PostSectionMain/ListViewPost";

export const generateStaticParams = () => {
  const seriesGroups = getSeriesList();

  return seriesGroups.map((group) => ({
    series_slug: group.series,
  }));
};

interface SeriesPageProps {
  params: {
    series_slug: string;
  };
}

const SeriesPage = ({ params }: SeriesPageProps) => {
  const seriesGroups = getSeriesList();

  const currentSeriesSlug = params.series_slug;

  const currentSeriesInfo = seriesGroups.find(
    (s) => s.series === currentSeriesSlug,
  );

  const posts = (currentSeriesInfo?.postRefs || []).map((ref) => {
    return getPostMeta(ref.category, ref.slug);
  });

  return (
    <div className="mx-auto flex w-full max-w-[886px] flex-col gap-8 py-8 sm:py-12">
      <header className="px-4 sm:px-0">
        <h1 className="mb-2 typo-24-b text-neutral-900 dark:text-neutral-100 sm:typo-32-b">
          시리즈 모아보기
        </h1>
        <p className="text-pretty typo-14-body-m text-neutral-600 dark:text-neutral-400 sm:typo-16-body-m">
          진행했던 프로젝트와 경험들을 주제별로 묶어두었습니다.
        </p>
      </header>

      <nav className="flex flex-row gap-2 overflow-x-auto px-4 pb-2 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] sm:flex-wrap sm:px-0 sm:pb-0">
        {seriesGroups.map((series) => {
          const isSelected = series.series === currentSeriesSlug;
          return (
            <Link
              key={series.series}
              href={`/blog/series/${series.series}`}
              className={`shrink-0 snap-start rounded-full border px-4 py-2 transition-all typo-14-m sm:typo-16-m ${
                isSelected
                  ? "border-transparent bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
                  : "border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800/40 dark:text-neutral-400 dark:hover:bg-neutral-800"
              }`}
            >
              {series.seriesName}
              <span
                className={`ml-2 text-[11px] sm:text-xs ${
                  isSelected
                    ? "text-neutral-300 dark:text-neutral-500"
                    : "text-neutral-400 dark:text-neutral-500"
                }`}
              >
                {series.postRefs.length}
              </span>
            </Link>
          );
        })}
      </nav>

      <section className="px-4 sm:px-0">
        <ul className="flex list-none flex-col gap-4">
          {posts.length > 0 ? (
            posts.map((post) => (
              <ListViewPost key={post.href} post={post} searchText="" />
            ))
          ) : (
            <div className="flex h-32 items-center justify-center rounded-xl border border-neutral-200 bg-white typo-14-m text-neutral-500 dark:border-neutral-700 dark:bg-neutral-800/40 dark:text-neutral-400">
              이 시리즈에 아직 작성된 게시글이 없습니다.
            </div>
          )}
        </ul>
      </section>
    </div>
  );
};

export default SeriesPage;
