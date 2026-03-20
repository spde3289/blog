import CalendarDaysSvgProps from "@/svg/CalendarDays";
import { Project } from "@/types/portfolio";
import Image from "next/image";
import ProjectLinks from "./ProjectLinks";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <article
      className="group relative flex h-full flex-col overflow-hidden rounded-xl
        border border-neutral-800 bg-[#1E1E1E] transition-all duration-300
        hover:-translate-y-1 hover:border-neutral-600"
    >
      <div
        className="absolute inset-0 z-10 flex items-center justify-center
          bg-black/50 opacity-0 backdrop-blur-sm transition-all duration-300
          group-hover:opacity-100"
      >
        <div
          className="scale-95 transform rounded-xl border border-white/10
            bg-neutral-900/80 p-3 shadow-2xl transition-transform duration-300
            group-hover:scale-100"
        >
          <ProjectLinks links={project.links} />
        </div>
      </div>
      <div
        className="relative flex aspect-video shrink-0 items-center
          justify-center overflow-hidden bg-neutral-800 text-neutral-600"
      >
        <Image
          fill
          quality={100}
          className="object-cover transition-all duration-500"
          src={project.image}
          alt={project.title}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex-1">
          <h3 className="typo-18-b md:typo-20-b mb-2 truncate text-neutral-100">
            {project.title}
          </h3>
          <p
            className="typo-13-m mb-4 flex items-center gap-1.5
              text-neutral-500"
          >
            <CalendarDaysSvgProps size={14} />
            {project.period}
          </p>
          <p
            className="typo-14-body-m md:typo-16-body-m break-keep
              whitespace-pre-wrap text-neutral-300"
          >
            {project.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 pt-4">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="typo-11-m md:typo-12-m rounded border
                border-neutral-700/50 bg-neutral-800 px-2.5 py-1
                text-neutral-400"
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
