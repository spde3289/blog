"use client";

import educationItmes, { Education } from "@/data/education";
import workExperienceItems, { WorkExperience } from "@/data/workExperience";
import useElementOnScreen from "@/hooks/useElementOnScreen";
import ContentsContainer from "./content/ContentsContainer";
import Title from "./content/Title";

interface WorkExpreienceCardProps {
  workExperience: WorkExperience;
}

const WorkExperienceCard = ({ workExperience }: WorkExpreienceCardProps) => {
  return (
    <div className="reveal">
      <h3 className="mb-1 text-2xl font-bold">{workExperience.title}</h3>
      <div className="mb-1 text-sm text-white/70">{workExperience.date} </div>
      <div className="mb-2 text-sm">{workExperience.position} </div>
      <ul className="pl-4 list-disc ">
        {workExperience.discription.map((disc) => (
          <li key={disc}>{disc}</li>
        ))}
      </ul>
    </div>
  );
};

interface EducationCardProps {
  education: Education;
  isLastChild: boolean;
}

const EducationCard = ({ education, isLastChild }: EducationCardProps) => {
  const { ref, isVisible } = useElementOnScreen();
  return (
    <>
      <div
        ref={ref}
        className={`reveal p-6 ${isVisible ? "reveal" : "opacity-0 "}`}
      >
        <h3 className="mb-1 text-2xl font-bold">{education.title}</h3>
        <div className="mb-2 text-sm text-white/70">{education.date}</div>
        <ul className="pl-4 list-disc">
          {education.discription.map((disc) => (
            <li key={disc}>{disc}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

const EducationContainer = () => {
  return (
    <ContentsContainer>
      <Title title="교육 및 경력" />
      <div className="flex gap-4 items-center md:max-w-[768px] mx-auto mt-12 mb-8">
        <div className="w-full h-[1px] bg-gradient-to-l from-[#555]"></div>
        <p className="flex-shrink-0 text-xs md:text-sm text-[#d4d4d4]">교육</p>
        <div className="w-full h-[1px] bg-gradient-to-r from-[#555]"></div>
      </div>
      <div className="section-item-wrapper flex-col gap-13 sm:flex-row justify-center">
        {educationItmes.map((education, index) => (
          <EducationCard
            key={education.title}
            education={education}
            isLastChild={educationItmes.length - 1 === index}
          />
        ))}
      </div>
      <div className="flex gap-4 items-center md:max-w-[768px] mx-auto mt-12 mb-8">
        <div className="w-full h-[1px] bg-gradient-to-l from-[#555]"></div>
        <p className="flex-shrink-0 text-xs md:text-sm text-[#d4d4d4]">경력</p>
        <div className="w-full h-[1px] bg-gradient-to-r from-[#555]"></div>
      </div>
      <div className="section-item-wrapper justify-center flex-col sm:flex-row gap-13">
        {workExperienceItems.map((work) => (
          <WorkExperienceCard key={work.title} workExperience={work} />
        ))}
      </div>
    </ContentsContainer>
  );
};

export default EducationContainer;
