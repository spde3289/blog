import GithubSvg from "@/svg/GithubSvg";
import LaptopSvg from "@/svg/LaptopSvg";
import Link from "next/link";

const LendingSection = () => {
  return (
    <section
      className="relative flex h-screen w-full flex-col items-center
        justify-center px-4"
    >
      <div
        className="z-9 mb-10 flex flex-col items-center justify-center md:mb-14
          lg:mb-16"
      >
        <h2
          style={{
            animationDelay: "1.3s",
          }}
          className="fade-in-project mb-4 text-center text-4xl font-bold
            tracking-tight md:mb-6 md:text-5xl lg:text-6xl"
        >
          안녕하세요, <br className="md:hidden" />
          <span
            className="bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text
              text-transparent"
          >
            개발자 김지훈
          </span>
          입니다.
        </h2>
        <p
          style={{
            animationDelay: "1.6s",
          }}
          className="fade-in-project ani-delay-1200 typo-14-body-m
            md:typo-16-body-m mx-auto max-w-2xl text-center break-keep
            text-neutral-200"
        >
          1인 개발자로서 다양한 서비스를 개발하고 있습니다.
        </p>
        <p
          style={{
            animationDelay: "1.8s",
          }}
          className="fade-in-project ani-delay-1200 typo-14-body-m
            md:typo-16-body-m mx-auto mb-4 max-w-2xl text-center break-keep
            text-neutral-200"
        >
          직접 기획부터 운영까지 경험을 쌓아왔습니다.
        </p>
        <span
          style={{
            animationDelay: "2s",
          }}
          className="fade-in-project typo-16-b md:typo-18-b lg:typo-20-b mt-2
            flex items-center justify-center gap-2 text-center text-white"
        >
          <img
            className="size-7 md:size-8 lg:size-9"
            src="/img/common/ic_spde3289.png"
            alt="지훈 아이콘"
          />
          spde3289
        </span>
      </div>
      <div
        style={{
          animationDelay: "2.2s",
        }}
        className="fade-in-project flex justify-center gap-3 md:gap-4"
      >
        <Link
          href="https://github.com/spde3289"
          target="_blank"
          className="typo-14-m md:typo-16-m flex items-center gap-2 rounded-full
            bg-neutral-800 px-4 py-2 transition hover:bg-neutral-700 md:px-5
            md:py-2.5"
        >
          <GithubSvg size={20} className="h-4 w-4 md:h-5 md:w-5" /> GitHub
        </Link>
        <Link
          href="/blog"
          className="typo-14-m md:typo-16-m flex items-center gap-2 rounded-full
            bg-neutral-800 px-4 py-2 transition hover:bg-neutral-700 md:px-5
            md:py-2.5"
        >
          <LaptopSvg size={20} className="h-4 w-4 md:h-5 md:w-5" /> Blog
        </Link>
      </div>
      <div id="header-trigger"></div>
    </section>
  );
};

export default LendingSection;
