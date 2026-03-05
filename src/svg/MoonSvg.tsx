import { SVGAttributes } from "react";

interface MoonSvgProps extends SVGAttributes<SVGSVGElement> {
  size?: number;
}

const MoonSvg = ({ size = 24, ...props }: MoonSvgProps) => {
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
      <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"></path>
    </svg>
  );
};

export default MoonSvg;
