"use client";
import { CoreModulesType } from "@/data/project";
import useElementSize from "@/hooks/useElementSize";
import CustomSVG from "./CustomSVG";

interface PositionType {
  x: number;
  y: number;
}

interface ProjectOverviewProps {
  module: CoreModulesType;
  centerPosition: PositionType;
}

const SubBox = ({ module, centerPosition }: ProjectOverviewProps) => {
  const { ref, size } = useElementSize<HTMLDivElement>();

  const position = {
    startX:
      module.position === "왼쪽"
        ? size.width * 2
        : centerPosition.x * 2 - size.width * 2,
    startY: module.y,
    endX: module.position === "왼쪽" ? centerPosition.x : centerPosition.x,
    endY: centerPosition.y,
  };

  return (
    <>
      <div
        ref={ref}
        className="absolute text-nowrap bg-white z-999 p-2 md:px-2.5 md:py-1.5 lg:px-3.5 lg:py-2 text-xs lg:text-sm font-medium text-neutral-700 border-neutral-200 dark:border-neutral-800 border hover:border-neutral-300 dark:hover:border-neutral-700 rounded-lg flex items-center justify-center"
        style={
          module.position === "왼쪽"
            ? {
                left: 0,
                top: `${module.y - size.height}px`,
              }
            : {
                right: 0,
                top: `${module.y - size.height}px`,
              }
        }
      >
        {module.contents}
      </div>
      <CustomSVG
        module={module}
        position={position}
        centerPosition={centerPosition}
      />
    </>
  );
};

export default SubBox;
