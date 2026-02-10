import { PROJECTS } from "@/constants/projects";
import SectionTitle from "../common/SectionTitle";
import ProjectCard from "./ProjectCard";

const ProjectSection = () => {
  return (
    <section
      style={{
        animationDelay: "1.3s",
      }}
      className="fade-in-project ani-delay-1200"
      id="projects"
    >
      <SectionTitle title="프로젝트" subtitle="Projects" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PROJECTS.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </section>
  );
};

export default ProjectSection;
