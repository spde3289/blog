"use client";
import { CoreModulesType } from "@/data/project";
import { useEffect, useState } from "react";

interface positionType {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

interface CenterPositionType {
  x: number;
  y: number;
}

interface CustomSVGProps {
  centerPosition: CenterPositionType;
  strokeColor?: string;
  gradientStart?: string;
  gradientEnd?: string;
  position: positionType;
  module: CoreModulesType;
}

const CustomSVG: React.FC<CustomSVGProps> = ({
  centerPosition,
  position,
  module,
  strokeColor = "gray",
  gradientStart = "#ffaa40",
  gradientEnd = "#e4fe71",
}) => {
  const [durations, setDurations] = useState<string>();

  useEffect(() => {
    setDurations((Math.random() * 2.5 + 1.5).toFixed(2));
  }, [module]);

  const controlX = (position.startX + centerPosition.x) / 2;
  const controlY = position.startY - 50;

  const pathD = `M ${position.startX},${position.startY} Q ${controlX},${controlY} ${position.endX},${position.endY}`;

  const isLeft = module.position === "왼쪽";
  const id = module.contents.replaceAll(" ", "");

  return (
    <svg
      className={`pointer-events-none absolute left-0 top-0 z-[99] transform-gpu stroke-2`}
      fill="none"
      width="100%"
      height={centerPosition.y * 2}
      viewBox={`0 0 ${centerPosition.x * 2} ${centerPosition.y * 2}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        {/* 기본 회색 선 */}
        <path
          d={pathD}
          stroke={strokeColor}
          strokeLinecap="round"
          strokeOpacity="0.2"
          strokeWidth="2"
        />
        {/* 그라디언트 선 */}
        <path
          d={pathD}
          stroke={`url(#gradient-${id})`}
          strokeLinecap="round"
          strokeOpacity="1"
          strokeWidth="2"
        />

        {/* 애니메이션 적용된 Gradient */}
        <defs>
          <linearGradient
            id={`gradient-${id}`}
            x1={isLeft ? "0%" : "100%"}
            x2={isLeft ? "0%" : "100%"}
            y1="0%"
            y2="0%"
          >
            <stop
              stopColor={isLeft ? gradientStart : gradientEnd}
              stopOpacity="0"
            />
            <stop stopColor={isLeft ? gradientStart : gradientEnd} />
            <stop
              offset={isLeft ? "32.5%" : "100%"}
              stopColor={isLeft ? gradientEnd : gradientStart}
            />
            <stop
              offset={isLeft ? "100%" : "32.5%"}
              stopColor={isLeft ? gradientEnd : gradientStart}
              stopOpacity="0"
            />

            {/* x1 애니메이션 */}
            <animate
              attributeName="x1"
              values={
                isLeft
                  ? "10%; 20%; 30%; 40%; 50%; 60%; 70%; 80%; 90%; 100%; 100%; 100%"
                  : "100%; 100%; 90%; 80%; 70%; 60%; 50%; 40%; 30%; 20%; 10%; 0%"
              }
              dur={`${durations}s`}
              repeatCount="indefinite"
            />

            {/* x2 애니메이션 */}
            <animate
              attributeName="x2"
              values={
                isLeft
                  ? "0%; 10%; 20%; 30%; 40%; 50%; 60%; 70%; 80%; 90%; 100%; 100%"
                  : "100%; 90%; 80%; 70%; 60%; 50%; 40%; 30%; 20%; 10%; 0%; 0%"
              }
              dur={`${durations}s`}
              repeatCount="indefinite"
            />
          </linearGradient>
        </defs>
      </g>
    </svg>
  );
};

export default CustomSVG;
