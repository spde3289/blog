interface SkillCardProps {
  category: string;
  items: string[];
}

const SkillCard = ({ category, items }: SkillCardProps) => {
  return (
    <div className="bg-[#1E1E1E] p-6 rounded-xl border border-neutral-800">
      <h3 className="text-lg font-bold text-neutral-200 mb-4 border-b border-neutral-800 pb-2">
        {category}
      </h3>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg text-sm transition-colors cursor-default"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SkillCard;
