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
      <div
        className="relative ml-4 space-y-12 border-l-2 border-neutral-800
          md:ml-6"
      >
        <div className="relative pl-8 md:pl-12">
          <span
            className="absolute top-0 -left-[9px] rounded-full border-2
              border-blue-500 bg-[#121212] p-1 text-blue-500"
          >
            <GraduationCapSvg size={20} />
          </span>
          <h3 className="mb-6 text-2xl font-bold text-white">Education</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
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
          <span
            className="absolute top-0 -left-[9px] rounded-full border-2
              border-purple-500 bg-[#121212] p-1 text-purple-500"
          >
            <BriefcaseBusinessSvg size={20} />
          </span>
          <h3 className="mb-6 text-2xl font-bold text-white">Career</h3>
          <div className="grid max-w-md grid-cols-1 gap-6">
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
