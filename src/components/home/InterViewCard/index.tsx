import { ReactNode } from "react";

interface InterViewCardProps {
  questions: string;
  children: string | ReactNode;
}

const InterViewCard = ({ questions, children }: InterViewCardProps) => {
  return (
    <div className="w-full text-base mb-5 bg-box p-5 rounded-2xl">
      <h3 className="text-2xl font-bold pb-4">Q. {questions}</h3>
      <blockquote className="text-lg">{children}</blockquote>
    </div>
  );
};

export default InterViewCard;
