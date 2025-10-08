import workExperienceItems, { WorkExperience } from "@/data/workExperience";

interface WorkExpreienceCardProps {
  workExperience: WorkExperience;
}

const WorkExperienceCard = ({ workExperience }: WorkExpreienceCardProps) => {
  return (
    <div>
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
    <section className="section-container">
      <h2 className="section-title ">경력</h2>
      <div className="section-item-wrapper flex-col">
        {workExperienceItems.map((work) => (
          <WorkExperienceCard key={work.title} workExperience={work} />
        ))}
      </div>
    </section>
  );
};

export default WorkExpreienceContainer;
