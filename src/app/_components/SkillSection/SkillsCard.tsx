import { SKILL_LABELS, TECH_STACK } from "@/constants/techStack";
import StackBadge from "./StackBadge";

type SkillCategory = keyof typeof TECH_STACK.skills;

const SkillsCard = () => {
  const skillEntries = Object.entries(TECH_STACK.skills) as [
    SkillCategory,
    readonly string[],
  ][];

  return (
    <div className="rounded-xl border border-neutral-800 bg-[#1E1E1E] px-6 py-7 md:px-8 md:py-8">
      <h3 className="pb-4 text-2xl font-bold text-neutral-100 border-b border-neutral-800">
        기술스택
      </h3>
      <div className="mt-5 space-y-5">
        {skillEntries.map(([category, items]) => (
          <div
            key={category}
            className="grid gap-3 border-b items-center border-neutral-800 pb-5 last:border-b-0 last:pb-0 md:grid-cols-[120px_1fr]"
          >
            <p className="text-base font-semibold text-neutral-400">
              {SKILL_LABELS[category]}
            </p>
            <div className="flex flex-wrap gap-2 items-center">
              {items.map((item) => (
                <StackBadge key={item} label={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsCard;
