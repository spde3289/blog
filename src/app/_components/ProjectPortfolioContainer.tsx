"use client";

import ImageCard from "@/components/ImageCard";
import { mapleHelperInfo } from "@/data/project";
import ProjectDataInterface from "@/data/project/projectDataType";
import useElementOnScreen from "@/hooks/useElementOnScreen";
import ContentsContainer from "./content/ContentsContainer";
import Title from "./content/Title";

interface ProjectPortfolioProps {
  info: ProjectDataInterface;
}

const ProjectPortfolioCard = ({ info }: ProjectPortfolioProps) => {
  const { ref, isVisible } = useElementOnScreen();

  return (
    <div
      ref={ref}
      className={`flex-col-reverse lg:flex-row flex gap-8 transition bg-neutral-800 p-5 border-white/30 rounded-lg border ${
        isVisible ? "reveal translate-x-32" : " opacity-0 translate-x-0"
      }`}
    >
      <div className="flex-1">
        <div className="mb-2">
          <h3 className="text-2xl font-bold mb-1">{info.title}</h3>
          <div className="text-sm mb-2 text-[#A6A6A6]">{info.date}</div>
          <div className="flex gap-6">
            <div>
              <div className="font-medium mb-0.5">타입</div>
              <div>
                {info.types.map((type) => (
                  <div className="text-[#A6A6A6] text-sm" key={type}>
                    {type}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1">
              <div className="font-medium mb-0.5">스택</div>
              <div className="flex flex-wrap gap-2 max-w-80 w-fit ">
                {info.stack.map((item) => (
                  <ImageCard key={item.alt} img={item} size="size-6" />
                ))}
              </div>
            </div>
          </div>
        </div>
        <ul className="pl-5 list-disc text-base text-[#cacaca]">
          {info.discription.map((text) => (
            <li key={text}>{text}</li>
          ))}
        </ul>
      </div>
      <div className="flex justify-center">
        <img
          className="h-40 sm:h-[330px] w-auto"
          src={info.img.src}
          alt={info.img.alt}
          {...info.img.options}
        />
      </div>
    </div>
  );
};

const ProjectPortfolioContainer = () => {
  return (
    <ContentsContainer>
      <Title title="프로젝트" />
      <div className="section-item-wrapper flex-col gap-13">
        <ProjectPortfolioCard info={mapleHelperInfo} />
        {/* <ProjectPortfolioCard info={mapleHelperInfo} /> */}
      </div>
    </ContentsContainer>
  );
};

export default ProjectPortfolioContainer;
