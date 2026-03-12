import { ProjectLink } from "@/types/portfolio";
import Link from "next/link";

interface ProjectLinksProps {
  links: ProjectLink[];
}

const ProjectLinks = ({ links }: ProjectLinksProps) => {
  return (
    <div
      className="flex min-w-[160px] flex-col items-center justify-center
        gap-2.5"
    >
      {links.map((item, index) => {
        const Icon = item.icon;
        return (
          <Link
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex w-full items-center justify-center gap-2
              rounded-lg border border-neutral-700 bg-neutral-800/80 px-4 py-2.5
              text-neutral-300 shadow-sm transition-all duration-300
              hover:border-neutral-500 hover:bg-neutral-700 hover:text-white"
          >
            <Icon
              width={18}
              height={18}
              className="transition-transform duration-300
                group-hover:scale-110"
            />
            {item.label && <span className="typo-14-m">{item.label}</span>}
          </Link>
        );
      })}
    </div>
  );
};

export default ProjectLinks;
