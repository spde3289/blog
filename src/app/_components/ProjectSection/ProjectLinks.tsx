import { ProjectLink } from "@/types/portfolio";
import Link from "next/link";

interface ProjectLinksProps {
  links: ProjectLink[];
}

const ProjectLinks = ({ links }: ProjectLinksProps) => {
  return (
    <div className="flex items-center gap-3">
      {links.map((item, index) => {
        const Icon = item.icon;

        return (
          <Link
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="relative group/link flex items-center text-neutral-400 hover:text-neutral-100 transition-colors"
          >
            <Icon width={20} height={20} />
            {item.label && (
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-neutral-800 text-neutral-200 text-xs font-medium rounded border border-neutral-700 opacity-0 invisible translate-y-1 group-hover/link:translate-y-0 group-hover/link:opacity-100 group-hover/link:visible transition-all duration-200 z-10 whitespace-nowrap shadow-lg pointer-events-none">
                {item.label}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-neutral-800" />
              </div>
            )}
          </Link>
        );
      })}
    </div>
  );
};

export default ProjectLinks;
