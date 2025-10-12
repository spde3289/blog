import Link from "next/link";

const RandingContent = () => {
  return (
    <section className="h-screen w-full relative flex justify-center items-center flex-col">
      <div className="blur-ball blur-ball--1 fade-sequence"></div>
      <div className="blur-ball blur-ball--2 fade-sequence"></div>
      <div className="blur-ball blur-ball--3 fade-sequence"></div>
      <div className="z-9 flex justify-center items-center flex-col mb-16">
        <h2
          style={{
            animationDelay: "1.3s", // ← 여기!
          }}
          className="fade-in-project text-5xl font-normal mb-8 relative z-10 w-full text-center max-sm:text-2xl max-lg:text-3xl text-white"
        >
          개발자 <strong>김지훈</strong>입니다.
        </h2>
        <p
          style={{
            animationDelay: "1.6s", // ← 여기!
          }}
          className="fade-in-project ani-delay-1200 font-normal text-xl text-center max-md:text-sm max-lg:text-base "
        >
          1인 개발자로서 다양한 서비스를 개발하고 있습니다.
        </p>
        <p
          style={{
            animationDelay: "1.8s", // ← 여기!
          }}
          className="fade-in-project mb-2 ani-delay-1200 font-normal text-xl text-center max-md:text-sm max-lg:text-base"
        >
          직접 기획부터 운영까지 경험을 쌓아왔습니다.
        </p>
        <span
          style={{
            animationDelay: "2s", // ← 여기!
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
          animationDelay: "2.2s", // ← 여기!
        }}
        className="fade-in-project text-white/70 flex gap-4 transition-transform duration-300 fade-in-project"
      >
        <Link
          href="/blog"
          className="transition-transform duration-300 hover:scale-110 hover:text-white hover:font-semibold"
        >
          blog
        </Link>
        <Link
          href="https://github.com/spde3289"
          className="transition-transform duration-300 hover:scale-110 hover:text-white hover:font-semibold"
        >
          github
        </Link>
      </div>
      <div id="header-trigger"></div>
    </section>
  );
};

export default RandingContent;
