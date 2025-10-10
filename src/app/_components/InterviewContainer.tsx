"use client";

import interviewItems from "@/data/interview";
import useElementOnScreen from "@/hooks/useElementOnScreen";
import ContentsContainer from "./content/ContentsContainer";
import Title from "./content/Title";
interface InterviewCardProps {
  interview: {
    questions: string;
    answers: string;
  };
}

const InterviewCard = ({ interview }: InterviewCardProps) => {
  const { ref, isVisible } = useElementOnScreen();
  return (
    <div
      ref={ref}
      className={`text-center transition-all ${
        isVisible ? "reveal" : "opacity-0 "
      }`}
    >
      <h3 className="text-2xl font-bold mb-3 w">Q. {interview.questions}</h3>
      <p className="whitespace-pre-line">A. {interview.answers}</p>
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
