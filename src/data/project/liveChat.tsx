import ProjectContents from "@/components/home/Project/contents";
import ProjectOverview from "@/components/home/Project/ProjectOverview";
import { CoreModulesType, ProjectType } from "./index";

const mainProject: CoreModulesType = {
  y: 100,
  position: "중앙",
  contents: "라이브 챗",
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

const LiveChatProject = () => {
  return (
    <ProjectContents tags={liveChatContents.tags} title="라이브 챗">
      <div className=" px-10 ">
        <p>메이플스토리에 대한 다양한 유틸리티를 제공하는 서비스</p>
        <p>응 모달 내용임</p>
        <ProjectOverview height="500" coreModules={coreModules} />
      </div>
    </ProjectContents>
  );
};

const liveChatContents: ProjectType = {
  title: "라이브 챗",
  img: "/img/project/livechat.png",
  description: "사용자 의견 수렴을 위한 실시간 채팅 서비스",
  tags: ["개인 프로젝트", "어드민", "반응형"],
  href: "https://www.live-support.shop/",
  contents: <LiveChatProject />,
};

export default liveChatContents;
