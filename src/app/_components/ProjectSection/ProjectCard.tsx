import CalendarDaysSvgProps from "@/svg/CalendarDays";
import { Project } from "@/types/portfolio";
import Image from "next/image";
import ProjectLinks from "./ProjectLinks";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <article className="group bg-[#1E1E1E] rounded-xl overflow-hidden border border-neutral-800 hover:border-neutral-600 transition-all duration-300 hover:-translate-y-1">
      <div className="relative bg-neutral-800 aspect-video flex items-center justify-center text-neutral-600 overflow-hidden">
        <Image
          fill
          quality={100}
          className="object-cover group-hover:scale-110 transition-all duration-300"
          src={project.image}
          alt={project.title}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-neutral-100">
            {project.title}
          </h3>
          <ProjectLinks links={project.links} />
        </div>
        <p className="text-sm text-neutral-500 mb-4 flex items-center gap-1">
          <CalendarDaysSvgProps size={14} /> {project.period}
        </p>
        <p className="text-neutral-300 text-sm mb-4 line-clamp-2 h-10">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="text-xs px-2 py-1 bg-neutral-800 text-neutral-300 rounded border border-neutral-700"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
