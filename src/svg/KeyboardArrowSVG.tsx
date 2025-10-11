interface KeyboardArrowSVG {
  fill?: string;
}

const KeyboardArrowSVG = ({ fill = "#1f1f1f" }: KeyboardArrowSVG) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="48px"
      viewBox="0 -960 960 960"
      width="48px"
      fill={fill}
    >
      <path d="M480-344 240-584l43-43 197 197 197-197 43 43-240 240Z" />
    </svg>
  );
};

export default KeyboardArrowSVG;
