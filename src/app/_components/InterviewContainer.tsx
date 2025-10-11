"use client";

import interviewItems from "@/data/interview";
import useElementOnScreen from "@/hooks/useElementOnScreen";
import KeyboardArrowSVG from "@/svg/KeyboardArrowSVG";
import { useState } from "react";
import ContentsContainer from "./content/ContentsContainer";
import Title from "./content/Title";
interface InterviewCardProps {
  interview: {
    questions: string;
    answers: string;
  };
}

const InterviewCard = ({ interview }: InterviewCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { ref, isVisible } = useElementOnScreen();

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  return (
    <div
      ref={ref}
      className={`text-center transition-all delay-500 ${
        isVisible ? "reveal" : "opacity-0"
      }`}
    >
      <h3
        onClick={toggleDropdown}
        className="flex justify-center items-center text-2xl font-bold mb-3 transition-all delay-500 cursor-pointer"
      >
        Q. {interview.questions}
        <span
          className={`ml-2 transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          <KeyboardArrowSVG fill="#ffffff" />
        </span>
      </h3>

      {/* grid 트릭 적용 */}
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out overflow-hidden ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0">
          <p className="whitespace-pre-line text-lg leading-relaxed">
            A. {interview.answers}
          </p>
        </div>
      </div>
    </div>
  );
};

const InterviewContainer = () => {
  return (
    <ContentsContainer>
      <Title title="인터뷰" />
      <div className="section-item-wrapper flex-col gap-13">
        {interviewItems.map((interview) => (
          <InterviewCard key={interview.questions} interview={interview} />
        ))}
      </div>
    </ContentsContainer>
  );
};

export default InterviewContainer;
