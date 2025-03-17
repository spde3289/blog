import Project from "@/components/Project";
import ProjectArr from "@/data/project";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";

const Home = () => {
  return (
    <div className="flex flex-col pb-60 fade-in">
      <section className="py-52">
        <div className="md:max-w-[634px]">
          <h2 className="text-3xl md:text-4xl text-black font-bold mb-4">
            여러 개발 관련 주제를 다룹니다.
          </h2>
          <p className="text-lg md:text-xl  ">
            JavaScript를 기반으로 TypeScript를 활용하여 <br />
            React와 Next.js로 프로젝트를 개발하고 운영하는 1인 개발자입니다.{" "}
            <br />
            개발뿐만 서비스의 기획과 디자인까지 깊이 고민하며, <br />
            사용자 중심의 완성도 높은 서비스를 만드는 데 집중합니다.
          </p>
          <Link
            className="mt-4 w-fit flex items-center gap-1 text-sm hover:text-cyan-800"
            href="/posts"
          >
            블로그 글 보러가기 <BsArrowRight className="mt-[1px]" />{" "}
          </Link>
        </div>
      </section>
      <section className="grid grid-cols-4 gap-4 ani mb-40">
        {ProjectArr.map((project) => (
          <Project key={project.title} project={project} />
        ))}
      </section>
      <section className="">
        <h2 className="text-3xl md:text-4xl text-black font-bold mb-4">
          Interview
        </h2>
        <div className="w-full text-base mb-5 bg-box p-5 rounded-2xl">
          JavaScript를 기반으로 TypeScript를 활용하여 <br />
          React와 Next.js로 프로젝트를 개발하고 운영하는 1인 개발자입니다.{" "}
          <br />
          개발뿐만 서비스의 기획과 디자인까지 깊이 고민하며, <br />
          사용자 중심의 완성도 높은 서비스를 만드는 데 집중합니다.
        </div>
      </section>
    </div>
  );
};

export default Home;
