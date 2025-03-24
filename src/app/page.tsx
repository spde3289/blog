import HomeSection from "@/components/home/HomeSection";
import InterViewCard from "@/components/home/InterViewCard";
import Project from "@/components/home/Project";
import TypingText from "@/components/home/TypingText";
import ProjectArr from "@/data/project";

const Home = () => {
  return (
    <div className="flex flex-col items-center gap-20">
      <section className="mx-auto w-full 2xl:max-w-[1152px] px-6 min-[1260px]:max-2xl:px-[168px] pb-10 pt-[46px] lg:pt-32 flex flex-col gap-12">
        <div className="md:max-w-fit">
          <TypingText text="여러 개발 관련 주제를 다룹니다." />
          <p className=" font-medium max-w-[600px] text-lg md:text-xl leading-tight fade-in break-keep">
            JavaScript를 기반으로 TypeScript를 활용하여 React와 Next.js로
            프로젝트를 개발하고 운영하는 1인 개발자입니다. <br />
          </p>
          <p className=" font-medium max-w-[455px] text-lg md:text-xl leading-tight fade-in break-keep">
            개발뿐만 서비스의 기획과 디자인까지 깊이 고민하며, 사용자 중심의
            완성도 높은 서비스를 만드는 데 집중합니다.
          </p>
        </div>
      </section>
      <section
        className="mx-auto w-full md:w-fit 2xl:max-w-[1152px] px-6 min-[1260px]:max-2xl:px-[168px] pb-10 fade-in-project select-none "
        title="Project"
      >
        <h2 className="text-4xl font-black pb-[2rem]">Project</h2>
        <div className="flex justify-center lg:justify-start gap-4 flex-wrap">
          {ProjectArr.map((project) => (
            <Project key={project.title} project={project} />
          ))}
        </div>
      </section>
      <HomeSection className=" " title="Interview">
        <InterViewCard questions="개발자를 시작하게 된 계기가 무엇인가요 ?">
          어쩌구 저쩌구 내용임
        </InterViewCard>
        <InterViewCard questions="혼자 개발하면서 힘들고 어려웠던게 있는지 ?">
          어쩌구 저쩌구 내용임
        </InterViewCard>
        <InterViewCard questions="지금 현재의 상태까지 쭉 걸어오면서 했던게 무엇인지 ?">
          어쩌구 저쩌구 내용임
        </InterViewCard>
      </HomeSection>
      <HomeSection
        title=""
        className="w-full h-screen flex flex-col items-center justify-center snap-center"
      >
        <div className="flex gap-10 ">
          <a
            target="_blank"
            href="https://github.com/spde3289"
            className="title-text hover:text-gray-500 font-medium flex items-center cursor-pointer transition-colors "
          >
            깃허브
          </a>
          <a
            target="_blank"
            href="mailto:myer100756@gmail.com"
            className="title-text hover:text-gray-500 font-medium flex items-center cursor-pointer transition-colors "
          >
            이메일
          </a>
        </div>
      </HomeSection>
    </div>
  );
};

export default Home;
