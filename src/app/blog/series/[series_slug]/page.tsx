import { getPostMeta, getSeriesList } from "@/lib/postService";
import ArrowHeadSVG from "@/svg/ArrowHeadSVG";
import Link from "next/link";
import { getSeriesBySlug } from "../../../../lib/postService";
import PostSection from "../../_components/PostSection";
import SeriesNotFound from "./_component/SeriesNotFound";

export const generateStaticParams = () => {
  const seriesGroups = getSeriesList();

  return seriesGroups.map((group) => ({
    series_slug: group.series,
  }));
};

interface SeriesPageProps {
  params: Promise<{ series_slug: string }>;
}

const SeriesPage = async ({ params }: SeriesPageProps) => {
  const { series_slug } = await params;
  const currentSeriesInfo = getSeriesBySlug(series_slug);

  if (!currentSeriesInfo) {
    return <SeriesNotFound />;
  }

  const categorys = currentSeriesInfo.categories;
  const posts = (currentSeriesInfo?.postRefs || []).map((ref) => {
    return getPostMeta(ref.category, ref.slug);
  });

  return (
    <div className="mx-auto flex w-full max-w-[886px] flex-col gap-8 py-8 sm:py-12">
      <header className="px-4 sm:px-0">
        <Link
          href="/blog"
          className="mb-5 inline-flex items-center gap-1.5 typo-14-m text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
        >
          <ArrowHeadSVG className="size-5 shrink-0 rotate-90" />
          블로그 홈
        </Link>
        <h1 className="mb-2 typo-24-b text-neutral-900 dark:text-neutral-100 sm:typo-32-b">
          {currentSeriesInfo?.seriesName}
        </h1>
      </header>
      <section className="px-4 sm:px-0">
        <div className="flex w-full flex-col-reverse gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 flex-1 w-full">
            <PostSection posts={posts} categorys={categorys} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default SeriesPage;
