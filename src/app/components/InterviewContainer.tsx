import interviewItems from "@/data/interview";

interface InterviewCardProps {
  interview: {
    questions: string;
    answers: string;
  };
}

const InterviewCard = ({ interview }: InterviewCardProps) => {
  return (
    <div className="text-center">
      <h3 className="text-2xl font-bold mb-3 w">Q. {interview.questions}</h3>
      <p className="whitespace-pre-line">A. {interview.answers}</p>
    </div>
  );
};

const InterviewContainer = () => {
  return (
    <section className="section-container">
      <h2 className="section-title ">인터뷰</h2>
      <div className="section-item-wrapper flex-col">
        {interviewItems.map((interview) => (
          <InterviewCard key={interview.questions} interview={interview} />
        ))}
      </div>
    </section>
  );
};

export default InterviewContainer;
