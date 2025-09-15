import ProjectContents from "@/components/home/Project/contents";
import ProjectOverview from "@/components/home/Project/ProjectOverview";
import { CoreModulesType, ProjectType } from "./index";

const mainProject: CoreModulesType = {
  y: 100,
  position: "중앙",
  contents: "클론코딩",
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

const CloneCodingProject = () => {
  return (
    <ProjectContents tags={cloneCodingContents.tags} title="클론코딩">
      <div className=" px-10 ">
        <p>메이플스토리를 즐기며 여러 유틸리티 서비스를 제공하는</p>
        <p>응 모달 내용임</p>
        <ProjectOverview height="500" coreModules={coreModules} />
      </div>
    </ProjectContents>
  );
};

const cloneCodingContents: ProjectType = {
  title: "클론코딩",
  description: "HTML, CSS, JavaScript와 React를 이용한 클론코딩",
  tags: ["개인 프로젝트"],
  contents: <CloneCodingProject />,
};

export default cloneCodingContents;
