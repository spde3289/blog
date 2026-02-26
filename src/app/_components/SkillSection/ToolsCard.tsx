import { TECH_STACK } from "@/constants/techStack";
import StackBadge from "./StackBadge";

const ToolsCard = () => {
  return (
    <div className="rounded-xl border border-neutral-800 bg-[#1E1E1E] px-6 py-7 md:px-8 md:py-8">
      <h3 className="pb-4 text-2xl font-bold text-neutral-100 border-b border-neutral-800">
        도구
      </h3>
      <div className="mt-5 flex flex-wrap gap-2">
        {TECH_STACK.tools.map((tool) => (
          <StackBadge key={tool} label={tool} />
        ))}
      </div>
    </div>
  );
};

export default ToolsCard;
