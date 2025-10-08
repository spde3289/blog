import { mapleHelperInfo } from "@/data/project";
import ProjectDataInterface from "@/data/project/projectDataType";

interface ProjectPortfolioProps {
  info: ProjectDataInterface;
}

const ProjectPortfolioCard = ({ info }: ProjectPortfolioProps) => {
  return (
    <div className="flex gap-4 ">
      <div className="flex-1">
        <div className="mb-4">
          <h3 className="text-3xl font-bold mb-1">{info.title}</h3>
          <div className="text-sm mb-2">{info.date}</div>
          <div className="flex gap-6">
            <div>
              <div className="font-bold">타입</div>
              <div>
                {info.types.map((type) => (
                  <div key={type}>{type}</div>
                ))}
              </div>
            </div>
            <div className="flex-1">
              <div className="font-bold">스택</div>
              <div className="flex flex-wrap gap-x-2 gap-y-0.5">
                {info.stack.framework?.map((stack) => (
                  <div key={stack}>{stack}</div>
                ))}
                {info.stack.library?.map((stack) => (
                  <div key={stack}>{stack}</div>
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
      <div>
        <img
          className="h-[330px] w-auto"
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
    <section className="section-container">
      <h2 className="section-title ">프로젝트</h2>
      <div className="section-item-wrapper flex-col">
        <ProjectPortfolioCard info={mapleHelperInfo} />
        <ProjectPortfolioCard info={mapleHelperInfo} />
      </div>
    </section>
  );
};

export default ProjectPortfolioContainer;
