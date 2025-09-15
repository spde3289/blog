import ProjectOverview from "@/components/home/Project/ProjectOverview";
import { CoreModulesType, ProjectType } from "./index";
import ProjectContents from "@/components/home/Project/contents";

const mainProject: CoreModulesType = {
  y: 100,
  position: "중앙",
  contents: "침플래닛",
};

const Modules: CoreModulesType[] = [
  { y: 100, position: "왼쪽", contents: "Next.js" },
  { y: 200, position: "왼쪽", contents: "React" },
  { y: 300, position: "왼쪽", contents: "TypeScript" },
  { y: 400, position: "왼쪽", contents: "JavaScript" },
  { y: 100, position: "오른쪽", contents: "Axios" },
  { y: 200, position: "오른쪽", contents: "Tailwind CSS" },
];

const coreModules = {
  mainProject: mainProject,
  modules: Modules,
};

const ChimplanetProject = () => {
  return (
    <ProjectContents tags={chimplanetContents.tags} title="침플래닛">
      <div className=" px-10 ">
        <p>메이플스토리에 대한 다양한 유틸리티를 제공하는 서비스</p>
        <p>응 모달 내용임</p>
        <ProjectOverview height="500" coreModules={coreModules} />
      </div>
    </ProjectContents>
  );
};

const chimplanetContents: ProjectType = {
  title: "침플래닛",
  img: "/img/project/chimplanet.png",
  description: "왁물원의 구인구직 게시글을 한번에 모아 볼 수 있는 서비스",
  tags: ["팀 프로젝트", "반응형"],
  contents: <ChimplanetProject />,
};

export default chimplanetContents;
