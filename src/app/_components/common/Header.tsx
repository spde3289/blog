import GithubSvg from "@/svg/GithubSvg";
import LaptopSvg from "@/svg/LaptopSvg";
import Link from "next/link";

const Header = () => {
  return (
    <section className="h-screen w-full relative flex justify-center items-center flex-col">
      <div className="z-9 flex justify-center items-center flex-col mb-16">
        <h2
          style={{
            animationDelay: "1.3s", // ← 여기!
          }}
          className="fade-in-project text-4xl md:text-6xl font-bold mb-6 tracking-tight"
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
          className="fade-in-project ani-delay-1200 text-neutral-200 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed "
        >
          1인 개발자로서 다양한 서비스를 개발하고 있습니다.
        </p>
        <p
          style={{
            animationDelay: "1.8s",
          }}
          className="fade-in-project mb-2 ani-delay-1200 text-neutral-200 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
        >
          직접 기획부터 운영까지 경험을 쌓아왔습니다.
        </p>
        <span
          style={{
            animationDelay: "2s",
          }}
          className="fade-in-project text-white font-semibold text-xl text-center max-md:text-sm max-lg:text-base flex items-center gap-2"
        >
          <img
            className="size-9 lg:size-9"
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
        className="fade-in-project mt-8 flex justify-center gap-4"
      >
        <Link
          href="https://github.com/spde3289"
          target="_blank"
          className="flex items-center gap-2 px-5 py-2 bg-neutral-800 rounded-full hover:bg-neutral-700 transition"
        >
          <GithubSvg size={20} /> GitHub
        </Link>
        <Link
          href="/blog"
          className="flex items-center gap-2 px-5 py-2 bg-neutral-800 rounded-full hover:bg-neutral-700 transition"
        >
          <LaptopSvg size={20} /> Blog
        </Link>
      </div>
      <div id="header-trigger"></div>
    </section>
  );
};

export default Header;
