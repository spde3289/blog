import ProjectOverview from "@/components/Project/ProjectOverview";
import { CoreModulesType, ProjectType } from "./index";

const mainProject: CoreModulesType = {
  y: 100,
  position: "중앙",
  contents: "메이플 헬퍼",
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

const MapleHelperProject = () => {
  return (
    <>
      <div className="flex gap-2">
        {mapleHelperContents.tags.map((tag) => (
          <div
            className="flex items-center justify-center text-xs w-fit bg-slate-200 px-1 py-0.5 rounded"
            key={tag}
          >
            {tag}
          </div>
        ))}
      </div>
      <h2 className="text-2xl font-bold text-center border-b pb-6">
        Maple Helper - 메이플 헬퍼
      </h2>
      <div className=" px-10 ">
        <p>메이플스토리에 대한 다양한 유틸리티를 제공하는 서비스</p>
        <p>응 모달 내용임</p>
        <ProjectOverview height="500" coreModules={coreModules} />
      </div>
    </>
  );
};

const mapleHelperContents: ProjectType = {
  title: "메이플 헬퍼",
  img: "/img/project/maplehelper.png",
  description: "메이플스토리에 대한 다양한 유틸리티를 제공하는 서비스",
  tags: ["개인 프로젝트", "반응형"],
  href: "https://www.maple-helper.com/",
  contents: <MapleHelperProject />,
};

export default mapleHelperContents;
