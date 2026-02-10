import { SVGAttributes } from "react";

interface ChevronDownSvgProps extends SVGAttributes<SVGSVGElement> {
  size?: number;
}

const ChevronDownSvg = ({ size = 24, ...props }: ChevronDownSvgProps) => {
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
      <path d="m6 9 6 6 6-6"></path>
    </svg>
  );
};

export default ChevronDownSvg;
