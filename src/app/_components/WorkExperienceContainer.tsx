import workExperienceItems, { WorkExperience } from "@/data/workExperience";
import ContentsContainer from "./content/ContentsContainer";
import Title from "./content/Title";

interface WorkExpreienceCardProps {
  workExperience: WorkExperience;
}

const WorkExperienceCard = ({ workExperience }: WorkExpreienceCardProps) => {
  return (
    <div className="reveal">
      <h3 className="mb-1 text-2xl font-bold">{workExperience.title}</h3>
      <div className="mb-1 text-sm">{workExperience.date} </div>
      <div className="mb-2 text-sm">{workExperience.position} </div>
      <ul className="pl-4 list-disc">
        {workExperience.discription.map((disc) => (
          <li key={disc}>{disc}</li>
        ))}
      </ul>
    </div>
  );
};

const WorkExpreienceContainer = () => {
  return (
    <ContentsContainer>
      <Title title="경력" />
      <div className="section-item-wrapper justify-center flex-col sm:flex-row gap-13">
        {workExperienceItems.map((work) => (
          <WorkExperienceCard key={work.title} workExperience={work} />
        ))}
      </div>
    </ContentsContainer>
  );
};

export default WorkExpreienceContainer;
