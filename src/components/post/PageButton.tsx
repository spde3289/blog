import { ReactNode } from "react";

interface PageButtonProps {
  children?: ReactNode;
  abled: boolean;
  handelButton: (button: string) => void;
  arrow: string;
}

const PageButton = ({
  children,
  abled,
  handelButton,
  arrow,
}: PageButtonProps) => {
  return (
    <button
      className={`${
        abled ? "text-gray-400" : ""
      } w-8 text-lg h-8 flex justify-center items-center`}
      disabled={abled}
      onClick={() => handelButton(arrow)}
    >
      {children}
    </button>
  );
};

export default PageButton;
