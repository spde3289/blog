"use client";

import interviewItems from "@/data/interview";
import useElementOnScreen from "@/hooks/useElementOnScreen";
import KeyboardArrowSVG from "@/svg/ArrowHeadSVG";
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
      className={`text-center transition-all w-full p-2 sm:p-3 lg:p-4 border text-[#EFEFF1] rounded-lg ${
        isVisible ? "reveal delay-500 pt-2 sm:pt-3 lg:pt-4 " : "opacity-0"
      } ${
        isOpen
          ? "bg-neutral-800 border-white/50 delay-0"
          : "bg-neutral-800/50 border-white/30"
      }`}
    >
      <h3
        onClick={toggleDropdown}
        className="flex justify-center break-words whitespace-normal items-center text-lg md:text-2xl font-bold transition-all delay-500 cursor-pointer"
      >
        Q . {interview.questions}
        <span
          className={`ml-2 transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          <KeyboardArrowSVG className="size-6 md:size-9 lg:size-12" />
        </span>
      </h3>
      <div
        className={` grid transition-[grid-template-rows] duration-300 ease-in-out overflow-hidden ${
          isOpen
            ? "grid-rows-[1fr]  mt-2 sm:mt-3 lg:mt-4 py-2 lg:py-4 border-t border-white/30"
            : "grid-rows-[0fr]  py-0 "
        }`}
      >
        <div className="min-h-0">
          <p className="break-words whitespace-normal text-lg leading-relaxed">
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
      <div className="section-item-wrapper flex-col gap-8">
        {interviewItems.map((interview) => (
          <InterviewCard key={interview.questions} interview={interview} />
        ))}
      </div>
    </ContentsContainer>
  );
};

export default InterviewContainer;
