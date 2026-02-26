import { TECH_STACK } from "@/constants/techStack";
import SectionTitle from "../common/SectionTitle";
import SkillCard from "./SkillCard";

const SkillSection = () => {
  return (
    <section
      id="skills"
      style={{
        animationDelay: "1.3s",
      }}
      className="fade-in-project ani-delay-1200"
    >
      <SectionTitle title="기술 스택 및 도구" subtitle="Tech Stack" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <SkillCard category="Frontend" items={TECH_STACK.frontend} />
        <SkillCard category="Libraries" items={TECH_STACK.library} />
        <SkillCard category="Tools" items={TECH_STACK.tools} />
        <SkillCard category="Environment" items={TECH_STACK.env} />
      </div>
    </section>
  );
};

export default SkillSection;
