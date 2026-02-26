import { ProjectLink } from "@/types/portfolio";
import Link from "next/link";

interface ProjectLinksProps {
  links: ProjectLink[];
}

const ProjectLinks = ({ links }: ProjectLinksProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2.5 min-w-[160px]">
      {links.map((item, index) => {
        const Icon = item.icon;
        return (
          <Link
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 hover:text-white rounded-lg border border-neutral-700 hover:border-neutral-500 transition-all duration-300 shadow-sm"
          >
            <Icon
              width={18}
              height={18}
              className="group-hover:scale-110 transition-transform duration-300"
            />
            {item.label && <span className="typo-14-m">{item.label}</span>}
          </Link>
        );
      })}
    </div>
  );
};

export default ProjectLinks;
