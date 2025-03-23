import HomeSection from "@/components/home/HomeSection";
import InterViewCard from "@/components/home/InterViewCard";
import Project from "@/components/home/Project";
import TypingText from "@/components/home/TypingText";
import ProjectArr from "@/data/project";

const Home = () => {
  return (
    <div className="flex flex-col items-center">
      <section className="w-[1400px] pt-[112px] pb-10 px-32 mb-20">
        <div className="md:max-w-fit">
          <TypingText text="여러 개발 관련 주제를 다룹니다." />
          <p className="text-lg md:text-2xl fade-in ">
            JavaScript를 기반으로 TypeScript를 활용하여 <br />
            React와 Next.js로 프로젝트를 개발하고 운영하는 1인 개발자입니다.{" "}
            <br />
            개발뿐만 서비스의 기획과 디자인까지 깊이 고민하며, <br />
            사용자 중심의 완성도 높은 서비스를 만드는 데 집중합니다.
          </p>
          {/* <a
            className=" fade-in mt-4 w-fit flex items-center gap-1 text-sm hover:text-cyan-800"
            href="#section1"
          >
            제가 궁금하신가요? <BsArrowRight className="mt-[1px]" />{" "}
          </a> */}
        </div>
      </section>
      <section
        className="w-[1024px] mb-40 fade-in-project select-none"
        title="Project"
      >
        <h2 className="text-4xl font-black text-black pb-[2rem]">Project</h2>
        <div className=" scroll-mt-20 grid grid-cols-4 gap-4 ">
          {ProjectArr.map((project) => (
            <Project key={project.title} project={project} />
          ))}
        </div>
      </section>
      <HomeSection className="w-[1024px] " title="Interview">
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
        className="w-full h-screen flex flex-col items-center justify-center snap-center"
        title="봐주셔서 감사합니다."
      >
        <div className="flex gap-10 ">
          <a
            target="_blank"
            href="https://github.com/spde3289"
            className="hover:text-gray-500 font-medium flex items-center cursor-pointer transition-colors "
          >
            깃허브
          </a>
          <a
            target="_blank"
            href="mailto:myer100756@gmail.com"
            className=" hover:text-gray-500 font-medium flex items-center cursor-pointer transition-colors "
          >
            이메일
          </a>
        </div>
      </HomeSection>
    </div>
  );
};

export default Home;
