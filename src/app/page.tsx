import "@/styles/home.css";

const Home = () => {
  return (
    <main className="flex flex-col items-center bg-[#232323] bg-gradient-to-b from-[#232323] to-[#555555] noise-before text-[#fcfcfc]">
      <section className="h-screen w-full relative flex justify-center items-center flex-col">
        <div className="blur-ball blur-ball--1"></div>
        <div className="blur-ball blur-ball--2"></div>
        <div className="blur-ball blur-ball--3"></div>
        <div className="z-9 flex justify-center items-center flex-col">
          <h2 className="font-bold text-7xl text-white mb-4">
            개발자 김지훈입니다.
          </h2>
          <p className="text-center font-medium text-4xl mb-4">
            1인 개발자로서 다양한 서비스를 개발하고 있습니다. <br />
            사용자들이 불편함을 느끼는 문제를 빠르게 해결하는 것을 즐기며 <br />
            직접 기획부터 운영까지 경험을 쌓아왔습니다.
          </p>
          <span className="text-white font-black text-4xl flex gap-2">
            <img
              className="size-12 z-99"
              src="/img/common/ic_spde3289.png"
              alt="지훈 아이콘"
            />
            spde3289
          </span>
        </div>
      </section>
      <section className="h-screen w-[1160px]">
        <h2 className="font-bold text-5xl text-white mb-10">프로젝트</h2>
        <div>
          <h3 className="text-3xl mb-1  ">메이플 헬퍼</h3>
          <span>2024.09.21 ~ 진행중</span>
          <p></p>
        </div>
        어쩌구 저쩌구
      </section>
      <div
        id="header-trigger"
        className="h-64 grid place-items-center bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white"
      >
        <p className="text-lg font-medium">헤더 트리거 구간</p>
      </div>
    </main>
  );
};

export default Home;
