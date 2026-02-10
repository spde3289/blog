import { CAREER } from "@/constants/career";
import { EDUCATION } from "@/constants/education";
import BriefcaseBusinessSvg from "@/svg/BriefcaseBusinessSvg";
import GraduationCapSvg from "@/svg/GraduationCapSvg";
import SectionTitle from "../common/SectionTitle";
import TimelineItem from "./TimelineItem";

const HistorySection = () => {
  return (
    <section
      style={{
        animationDelay: "2.8s",
      }}
      className="fade-in-project ani-delay-1200"
      id="education"
    >
      <SectionTitle title="교육 및 경력" subtitle="History" />
      <div className="relative border-l-2 border-neutral-800 ml-4 md:ml-6 space-y-12">
        <div className="relative pl-8 md:pl-12">
          <span className="absolute -left-[9px] top-0 p-1 bg-[#121212] border-2 border-blue-500 rounded-full text-blue-500">
            <GraduationCapSvg size={20} />
          </span>
          <h3 className="text-2xl font-bold mb-6 text-white">Education</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {EDUCATION.map((edu, idx) => (
              <TimelineItem
                key={idx}
                period={edu.period}
                title={edu.name}
                description={edu.desc}
                highlightColor="blue"
              />
            ))}
          </div>
        </div>
        <div className="relative pl-8 md:pl-12">
          <span className="absolute -left-[9px] top-0 p-1 bg-[#121212] border-2 border-purple-500 rounded-full text-purple-500">
            <BriefcaseBusinessSvg size={20} />
          </span>
          <h3 className="text-2xl font-bold mb-6 text-white">Career</h3>
          <div className="grid grid-cols-1 gap-6 max-w-md">
            {CAREER.map((job, idx) => (
              <TimelineItem
                key={idx}
                period={job.period}
                title={job.name}
                subtitle={job.team}
                description={job.desc}
                highlightColor="purple"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HistorySection;
