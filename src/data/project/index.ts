import { ReactNode } from "react";
import chimplanetContents from "./chimplanet";
import cloneCodingContents from "./cloneCoding";
import liveChatContents from "./liveChat";
import mapleBotContents from "./mapleBot";
import mapleHelperContents from "./mapleHelper";
import mhBotContents from "./mhBot";

export interface CoreModulesType {
  y: number;
  contents: string;
  position: "중앙" | "왼쪽" | "오른쪽";
}

export interface CoreModulesGroupType {
  mainProject: CoreModulesType;
  modules: CoreModulesType[];
}

export interface ProjectType {
  title: string;
  description: string;
  tags: string[];
  img?: string;
  href?: string;
  contents?: ReactNode;
}

const ProjectArr: ProjectType[] = [
  mapleHelperContents,
  liveChatContents,
  mhBotContents,
  mapleBotContents,
  chimplanetContents,
  cloneCodingContents,
];

export default ProjectArr;
