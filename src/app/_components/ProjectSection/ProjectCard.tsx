import CalendarDaysSvgProps from "@/svg/CalendarDays";
import { Project } from "@/types/portfolio";
import Image from "next/image";
import ProjectLinks from "./ProjectLinks";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <article className="group flex flex-col h-full bg-[#1E1E1E] rounded-xl overflow-hidden border border-neutral-800 hover:border-neutral-600 transition-all duration-300 hover:-translate-y-1">
      <div className="relative bg-neutral-800 aspect-video flex items-center justify-center text-neutral-600 overflow-hidden shrink-0">
        <Image
          fill
          quality={100}
          className="object-cover group-hover:scale-110 transition-all duration-300"
          src={project.image}
          alt={project.title}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-black/60 backdrop-blur-md p-2 rounded-lg border border-white/10 shadow-xl">
            <ProjectLinks links={project.links} />
          </div>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex-1">
          <h3 className="typo-18-b md:typo-20-b text-neutral-100 truncate mb-2">
            {project.title}
          </h3>
          <p className="typo-13-m text-neutral-500 mb-4 flex items-center gap-1.5">
            <CalendarDaysSvgProps size={14} />
            {project.period}
          </p>
          <p className="typo-14-body-m md:typo-16-body-m text-neutral-300 break-keep whitespace-pre-wrap">
            {project.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 pt-4 ">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="typo-11-m md:typo-12-m px-2.5 py-1 bg-neutral-800 text-neutral-400 rounded border border-neutral-700/50"
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
