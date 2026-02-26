import { INTERVIEWS } from "@/constants/interviews";
import SectionTitle from "../common/SectionTitle";
import InterviewItem from "./InterviewItem";

const InterviewSection = () => {
  return (
    <section
      style={{
        animationDelay: "2.8s",
      }}
      id="interview"
      className="fade-in-project ani-delay-1200 max-w-4xl mx-auto"
    >
      <SectionTitle title="인터뷰" subtitle="Interview" />

      <div className="space-y-4">
        {INTERVIEWS.map((item, index) => (
          <InterviewItem key={index} item={item} />
        ))}
      </div>
    </section>
  );
};

export default InterviewSection;
