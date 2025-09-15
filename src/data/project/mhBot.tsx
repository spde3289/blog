import ProjectContents from "@/components/home/Project/contents";
import ProjectOverview from "@/components/home/Project/ProjectOverview";
import { CoreModulesType, ProjectType } from "./index";

const mainProject: CoreModulesType = {
  y: 100,
  position: "중앙",
  contents: "몬스터헌터 디스코드 봇",
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

const MhBotProject = () => {
  return (
    <ProjectContents tags={mhBotContents.tags} title="몬스터헌터 디스코드 봇">
      <div className=" px-10 ">
        <p>메이플스토리에 대한 다양한 유틸리티를 제공하는 서비스</p>
        <p>응 모달 내용임</p>
        <ProjectOverview height="500" coreModules={coreModules} />
      </div>
    </ProjectContents>
  );
};

const mhBotContents: ProjectType = {
  title: "몬스터헌터 디스코드 봇",
  description: "몬스터와 재료 정보를 검색할 수 있는 디스코드 봇",
  tags: ["개인 프로젝트", "디스코드 봇"],
  href: "https://discord.com/oauth2/authorize?client_id=1202787148999163965&permissions=8&integration_type=0&scope=bot",
  contents: <MhBotProject />,
};

export default mhBotContents;
