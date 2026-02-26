import { SVGAttributes } from "react";

interface BriefcaseBusinessSvgProps extends SVGAttributes<SVGSVGElement> {
  size?: number;
}

const BriefcaseBusinessSvg = ({
  size = 24,
  ...props
}: BriefcaseBusinessSvgProps) => {
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
      <path d="M12 12h.01"></path>
      <path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"></path>
      <path d="M22 13a18.15 18.15 0 0 1-20 0"></path>
      <rect width="20" height="14" x="2" y="6" rx="2"></rect>
    </svg>
  );
};

export default BriefcaseBusinessSvg;
