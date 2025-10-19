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
    <div className="reveal w-10/12 sm:pl-4 lg:h-72 lg:w-64 shadow-[0_4px_23px_0_rgba(12,12,12,0.15)] backdrop-blur-[15px]  bg-neutral-800/30 p-5 border-white/30 rounded-lg border">
      <h3 className="mb-1 text-2xl font-bold">{workExperience.title}</h3>
      <div className="mb-1 text-sm text-[#A6A6A6]">{workExperience.date} </div>
      <div className="mb-2 text-sm text-[#A6A6A6]">
        {workExperience.position}{" "}
      </div>
      <ul className="pl-5 list-disc text-[#cacaca]">
        {workExperience.discription.map((disc) => (
          <li key={disc}>{disc}</li>
        ))}
      </ul>
    </div>
  );
};

interface EducationCardProps {
  education: Education;
}

const EducationCard = ({ education }: EducationCardProps) => {
  const { ref, isVisible } = useElementOnScreen();
  return (
    <>
      <div
        ref={ref}
        className={`reveal w-10/12 sm:pl-4 lg:h-72 lg:w-64 shadow-[0_4px_23px_0_rgba(12,12,12,0.15)] backdrop-blur-[15px] bg-neutral-800/50 p-5 border-white/30 rounded-lg border ${
          isVisible ? "reveal" : "opacity-0 "
        }`}
      >
        <h3 className="text-2xl font-bold mb-1">{education.title}</h3>
        <div className="mb-2 text-sm text-[#A6A6A6]">{education.date}</div>
        <ul className="pl-5 list-disc text-[#cacaca]">
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
      <div className="section-item-wrapper flex-col gap-13 lg:flex-row justify-center">
        {educationItmes.map((education) => (
          <EducationCard key={education.title} education={education} />
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
