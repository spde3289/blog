import ChevronDownSvg from "@/svg/ChevronDownSvg";
import { Interview } from "@/types/portfolio";

interface InterviewItemProps {
  item: Interview;
}

const InterviewItem = ({ item }: InterviewItemProps) => {
  return (
    <div className="bg-[#1E1E1E] rounded-xl border border-neutral-800 overflow-hidden">
      <details className="group">
        <summary className="flex justify-between items-center cursor-pointer p-6 list-none group-open:bg-neutral-800/50 transition-colors">
          <h3 className="text-lg md:text-xl font-semibold text-neutral-200">
            {item.question}
          </h3>
          <span className="text-neutral-500 group-open:rotate-180 transition-transform duration-300">
            <ChevronDownSvg />
          </span>
        </summary>
        <div className="p-6 pt-2 text-neutral-300 leading-relaxed border-t border-neutral-800 whitespace-pre-wrap">
          {item.answer}
        </div>
      </details>
    </div>
  );
};

export default InterviewItem;
