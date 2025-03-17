"use client";
import { CoreModulesGroupType } from "@/data/project";
import useElementSize from "@/hooks/useElementSize";
import { useMemo } from "react";
import SubBox from "./SubBox";

interface ProjectCoreModulesProps {
  height?: string;
  coreModules: CoreModulesGroupType;
}

const ProjectCoreModules = ({
  coreModules,
  height = "456",
}: ProjectCoreModulesProps) => {
  const { mainProject, modules } = coreModules;
  const { ref, size } = useElementSize<HTMLDivElement>();

  const centerPosition = useMemo(
    () => ({
      x: size.width / 2,
      y: size.height / 2,
    }),
    [size]
  );

  return (
    <div
      ref={ref}
      style={{ height: `${height}px` }}
      className="relative w-full my-10"
    >
      <div
        className="absolute text-nowrap p-2 md:px-2.5 md:py-1.5 lg:px-3.5 bg-white z-999 lg:py-3 text-xl font-medium text-neutral-700 border-neutral-200 dark:border-neutral-800 border hover:border-neutral-300 dark:hover:border-neutral-700 rounded-lg flex items-center justify-center"
        style={{
          left: `${centerPosition.x}px`,
          top: `${centerPosition.y}px`,
          transform: "translate(-50%, -50%)",
        }}
      >
        {mainProject.contents}
      </div>
      {modules.map((module) => (
        <SubBox
          key={module.contents}
          centerPosition={centerPosition}
          module={module}
        />
      ))}
    </div>
  );
};

export default ProjectCoreModules;
