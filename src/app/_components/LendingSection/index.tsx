import GithubSvg from "@/svg/GithubSvg";
import LaptopSvg from "@/svg/LaptopSvg";
import Link from "next/link";

const LendingSection = () => {
  return (
    <section className="h-screen w-full relative flex justify-center items-center flex-col px-4">
      <div className="z-9 flex justify-center items-center flex-col mb-10 md:mb-14 lg:mb-16">
        <h2
          style={{
            animationDelay: "1.3s",
          }}
          className="fade-in-project text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 tracking-tight text-center"
        >
          안녕하세요, <br className="md:hidden" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            개발자 김지훈
          </span>
          입니다.
        </h2>
        <p
          style={{
            animationDelay: "1.6s",
          }}
          className="fade-in-project ani-delay-1200 typo-14-body-m md:typo-16-body-m text-neutral-200 max-w-2xl mx-auto text-center break-keep"
        >
          1인 개발자로서 다양한 서비스를 개발하고 있습니다.
        </p>
        <p
          style={{
            animationDelay: "1.8s",
          }}
          className="fade-in-project mb-4 ani-delay-1200 typo-14-body-m md:typo-16-body-m text-neutral-200 max-w-2xl mx-auto text-center break-keep"
        >
          직접 기획부터 운영까지 경험을 쌓아왔습니다.
        </p>
        <span
          style={{
            animationDelay: "2s",
          }}
          className="fade-in-project typo-16-b md:typo-18-b lg:typo-20-b text-white text-center flex items-center justify-center gap-2 mt-2"
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
          className="flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 typo-14-m md:typo-16-m bg-neutral-800 rounded-full hover:bg-neutral-700 transition"
        >
          <GithubSvg size={20} className="w-4 h-4 md:w-5 md:h-5" /> GitHub
        </Link>
        <Link
          href="/blog"
          className="flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 typo-14-m md:typo-16-m bg-neutral-800 rounded-full hover:bg-neutral-700 transition"
        >
          <LaptopSvg size={20} className="w-4 h-4 md:w-5 md:h-5" /> Blog
        </Link>
      </div>
      <div id="header-trigger"></div>
    </section>
  );
};

export default LendingSection;
