import ProjectContents from "@/components/home/Project/contents";
import ProjectOverview from "@/components/home/Project/ProjectOverview";
import { CoreModulesType, ProjectType } from "./index";

const mainProject: CoreModulesType = {
  y: 100,
  position: "중앙",
  contents: "메이플 헬퍼",
};

const Modules: CoreModulesType[] = [
  { y: 100, position: "왼쪽", contents: "프론트", sub: ["Next"] },
  { y: 200, position: "오른쪽", contents: "백엔드" },
  { y: 300, position: "왼쪽", contents: "배포" },
];

const coreModules = {
  mainProject: mainProject,
  modules: Modules,
};

const MapleHelperProject = () => {
  return (
    <ProjectContents
      tags={mapleHelperContents.tags}
      title="Maple Helper - 메이플 헬퍼"
    >
      <div className="">
        <p>
          메이플을 즐길 수 있게 주간보스 결정석, 해방 일정 계산등 여러 기능들을
          제공하는 서비스입니다.
        </p>
        <br />
        <p>
          현재 운영중인 서비스로 사용자의 의견을 반영해 기능을 추가하고
          있습니다. page 라우터에서 app 라우터 방식으로 변경해 서비스하고
          있습니다.
        </p>
        <div className="w-full max-w-md p-4 rounded-lg text-white">
          <div className="border border-green-600 rounded-md p-6">
            <p className="text-black font-bold text-lg">프론트</p>
          </div>

          <div className="border border-black/40 rounded-md p-3 text-black">
            <p className="font-bold">Next</p>
            <p className="text-sm mt-1">
              Dothome을 통해 회원 정보 관리와 게시글 작성 및 삭제를
              구현했습니다.
            </p>
          </div>

          <div className="border border-black/40 rounded-md p-3 text-black">
            <p className="font-bold">MySQL</p>
            <p className="text-sm mt-1">
              PHP로 작성한 데이터를 Dothome 호스팅을 통해 관리했습니다.
            </p>
          </div>
        </div>
        <h3 className="text-2xl font-bold mt-6">주요 기능</h3>
        <p>Nexon OpenAPI KEY 입력 시 캐릭터 자동 등록 기능 개발</p>
        <h3 className="text-2xl font-bold mt-6">서비스 아키택쳐</h3>
        <ProjectOverview height="500" coreModules={coreModules} />
        <div className="flex flex-col w-40 gap-2 relative z-[1] rounded-lg p-3 lg:p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
          프론트
          <div>Next</div>
          <div>TypeScript</div>
          <div>axios</div>
          <div>tailwind CSS</div>
        </div>
        <div className="flex flex-col w-40 gap-2 relative z-[1] rounded-lg p-3 lg:p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
          배포
          <div>vercel</div>
        </div>
        <div className="flex flex-col w-40 gap-2 relative z-[1] rounded-lg p-3 lg:p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
          백엔드
          <div>Nexon OpenAPI</div>
        </div>
      </div>
      <a target="_blank" href={mapleHelperContents.href} className="">
        <div className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold">
          배포 링크
        </div>
      </a>
    </ProjectContents>
  );
};

const mapleHelperContents: ProjectType = {
  title: "메이플 헬퍼",
  img: "/img/project/maplehelper.png",
  description: "메이플스토리에 대한 다양한 유틸리티를 제공하는 서비스",
  tags: ["개인 프로젝트", "반응형", "라이브 서비스"],
  href: "https://www.maple-helper.com/",
  contents: <MapleHelperProject />,
};

export default mapleHelperContents;
