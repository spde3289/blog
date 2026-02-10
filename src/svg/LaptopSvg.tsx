import { SVGAttributes } from "react";

interface LaptopSvgProps extends SVGAttributes<SVGSVGElement> {
  size?: number;
}

const LaptopSvg = ({ size = 24, ...props }: LaptopSvgProps) => {
  return (
    <svg
      data-v-6433c584=""
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M18 5a2 2 0 0 1 2 2v8.526a2 2 0 0 0 .212.897l1.068 2.127a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45l1.068-2.127A2 2 0 0 0 4 15.526V7a2 2 0 0 1 2-2z"></path>
      <path d="M20.054 15.987H3.946"></path>
    </svg>
  );
};

export default LaptopSvg;
