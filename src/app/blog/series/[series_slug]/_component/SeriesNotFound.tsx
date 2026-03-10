import Link from "next/link";

const SeriesNotFound = () => {
  return (
    <div className="mx-auto flex w-full max-w-[886px] flex-col items-center justify-center gap-5 py-24 text-center">
      <h2 className="typo-24-b text-neutral-900 dark:text-neutral-100">
        시리즈를 찾을 수 없습니다 😢
      </h2>
      <p className="text-pretty typo-16-body-m text-neutral-500 dark:text-neutral-400">
        요청하신 시리즈가 존재하지 않거나 삭제되었습니다. <br />
        주소가 올바른지 다시 한번 확인해 주세요.
      </p>
      <Link
        href="/blog"
        className="mt-4 rounded-lg bg-neutral-900 px-5 py-2.5 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
      >
        블로그 홈으로 돌아가기
      </Link>
    </div>
  );
};

export default SeriesNotFound;
