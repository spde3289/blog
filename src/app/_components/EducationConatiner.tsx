import educationItmes, { Education } from "@/data/education";
import ContentsContainer from "./content/ContentsContainer";
import Title from "./content/Title";

interface EducationCardProps {
  education: Education;
}

const EducationCard = ({ education }: EducationCardProps) => {
  return (
    <div className="reveal">
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
