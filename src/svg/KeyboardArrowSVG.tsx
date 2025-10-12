interface KeyboardArrowSVG {
  fill?: string;
  width?: string;
  height?: string;
}

const KeyboardArrowSVG = ({
  fill = "#1f1f1f",
  width = "48px",
  height = "48px",
}: KeyboardArrowSVG) => {
  return (
    <svg
      className="size-6 md:size-9 lg:size-12 "
      xmlns="http://www.w3.org/2000/svg"
      // height={height}
      viewBox="0 -960 960 960"
      // width={width}
      fill={fill}
    >
      <path d="M480-344 240-584l43-43 197 197 197-197 43 43-240 240Z" />
    </svg>
  );
};

export default KeyboardArrowSVG;
