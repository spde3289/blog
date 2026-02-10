import { Project } from "@/types/portfolio";
import Link from "next/link";

interface ProjectLinksProps {
  links: Project["links"];
}

const ProjectLinks = ({ links }: ProjectLinksProps) => {
  return (
    <div className="flex gap-2">
      {links.map((item, index) => {
        const Icon = item.icon;
        return (
          <Link
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-white transition"
          >
            <Icon />
          </Link>
        );
      })}
    </div>
  );
};

export default ProjectLinks;
