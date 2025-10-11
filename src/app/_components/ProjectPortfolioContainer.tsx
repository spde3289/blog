"use client";

import ImageCard from "@/components/ImageCard";
import { mapleHelperInfo } from "@/data/project";
import ProjectDataInterface from "@/data/project/projectDataType";
import items from "@/data/stack";
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
      className={`flex-col-reverse md:flex-row flex gap-4 transition ${
        isVisible ? "reveal translate-x-32" : "opacity-0 translate-x-0"
      }`}
    >
      <div className="flex-1">
        <div className="mb-4">
          <h3 className="text-3xl font-bold mb-1">{info.title}</h3>
          <div className="text-sm mb-2 text-white/70">{info.date}</div>
          <div className="flex gap-6">
            <div>
              <div className="font-bold">타입</div>
              <div>
                {info.types.map((type) => (
                  <div className="" key={type}>
                    {type}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1">
              <div className="font-bold">스택</div>
              <div className="flex flex-wrap gap-2 max-w-80 w-fit">
                {items.stackItems.map((item) => (
                  <ImageCard key={item.title} img={item.img} size="size-7" />
                ))}
                {items.toolItmes.map((item) => (
                  <ImageCard key={item.title} img={item.img} size="size-7" />
                ))}
              </div>
            </div>
          </div>
        </div>
        <ul className="pl-4 list-disc">
          {info.discription.map((text) => (
            <li key={text}>{text}</li>
          ))}
        </ul>
      </div>
      <div className="">
        <img
          className="h-40 sm:h-[330px] w-auto"
          src={info.img.src}
          alt={info.img.alt}
          {...info.img.options}
        ></img>
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
        <ProjectPortfolioCard info={mapleHelperInfo} />
      </div>
    </ContentsContainer>
  );
};

export default ProjectPortfolioContainer;
