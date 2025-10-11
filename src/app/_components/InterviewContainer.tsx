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
      className={`text-center transition-all w-full p-2 border  border-white/50 rounded-lg ${
        isVisible ? "reveal delay-500" : "opacity-0"
      } ${isOpen ? "bg-neutral-800 delay-0" : "bg-neutral-800/50"}`}
    >
      <h3
        onClick={toggleDropdown}
        className="flex justify-center items-center text-xl font-medium text-white transition-all delay-500 cursor-pointer"
      >
        Q . {interview.questions}
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
        className={` grid transition-[grid-template-rows] duration-300 ease-in-out overflow-hidden ${
          isOpen
            ? "grid-rows-[1fr] mt-2 border-t pt-1 border-white/30"
            : "grid-rows-[0fr] "
        }`}
      >
        <div className="min-h-0">
          <p className="whitespace-pre-line text-lg leading-relaxed text-white/80">
            {interview.answers}
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
