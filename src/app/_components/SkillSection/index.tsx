import SectionTitle from "../common/SectionTitle";
import SkillsCard from "./SkillsCard";

import ToolsCard from "./ToolsCard";

const SkillSection = () => {
  return (
    <section
      id="skills"
      style={{ animationDelay: "1.3s" }}
      className="fade-in-project ani-delay-1200"
    >
      <SectionTitle title="기술 스택 및 도구" subtitle="Tech Stack" />
      <div className="mt-10 space-y-8">
        <SkillsCard />
        <ToolsCard />
      </div>
    </section>
  );
};

export default SkillSection;
