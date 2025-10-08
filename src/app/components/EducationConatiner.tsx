import educationItmes, { Education } from "@/data/education";

interface EducationCardProps {
  education: Education;
}

const EducationCard = ({ education }: EducationCardProps) => {
  return (
    <div>
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
    <section className="section-container">
      <h2 className="section-title ">교육</h2>
      <div className="section-item-wrapper flex-row justify-center">
        {educationItmes.map((education) => (
          <EducationCard key={education.title} education={education} />
        ))}
      </div>
    </section>
  );
};

export default EducationContainer;
