import { ReactNode } from "react";

interface ProjectContentsProps {
  title: string;
  tags: string[];
  children: ReactNode;
}

const ProjectContents = ({ title, tags, children }: ProjectContentsProps) => {
  return (
    <>
      <div className="flex gap-2 justify-center mb-1">
        {tags.map((tag) => (
          <div
            className="flex items-center justify-center text-xs w-fit tag-bg px-1.5 py-0.5 rounded"
            key={tag}
          >
            {tag}
          </div>
        ))}
      </div>
      <h2 className="text-title-md font-bold text-center border-b pb-4 mb-6">
        {title}
      </h2>
      {children}
    </>
  );
};

export default ProjectContents;
