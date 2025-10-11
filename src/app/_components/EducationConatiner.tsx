"use client"

import educationItmes, { Education } from "@/data/education";
import ContentsContainer from "./content/ContentsContainer";
import Title from "./content/Title";
import useElementOnScreen from "@/hooks/useElementOnScreen";
interface EducationCardProps {
  education: Education;
}

const EducationCard = ({ education }: EducationCardProps) => {
  const { ref, isVisible } = useElementOnScreen();
  return (
    <div ref={ref} className={`reveal ${isVisible ? "reveal" : "opacity-0 "}`}>
      <h3 className="mb-1 text-2xl font-bold">{education.title}</h3>
      <div className="mb-2 text-sm">{education.date}</div>
      <ul className="pl-4 list-disc">
        {education.discription.map((disc) => (
          <li key={disc}>{disc}</li>
        ))}
      </ul>
    </div>
  );
};

const EducationContainer = () => {
  return (
    <ContentsContainer>
      <Title title="교육" />
      <div className="section-item-wrapper flex-col gap-13 sm:flex-row justify-center">
        {educationItmes.map((education) => (
          <EducationCard key={education.title} education={education} />
        ))}
      </div>
    </ContentsContainer>
  );
};

export default EducationContainer;
