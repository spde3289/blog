import ChevronDownSvg from "@/svg/ChevronDownSvg";
import { Interview } from "@/types/portfolio";

interface InterviewItemProps {
  item: Interview;
}

const InterviewItem = ({ item }: InterviewItemProps) => {
  return (
    <div className="bg-[#1E1E1E] rounded-xl border border-neutral-800 overflow-hidden transition-all duration-300 hover:border-neutral-700">
      <details className="group">
        <summary className="flex justify-between items-center cursor-pointer p-5 md:p-6 list-none group-open:bg-neutral-800/30 transition-colors">
          <h3 className="typo-16-b md:typo-18-b text-neutral-200 pr-4 break-keep">
            {item.question}
          </h3>
          <span className="text-neutral-500 group-open:rotate-180 transition-transform duration-300 shrink-0">
            <ChevronDownSvg />
          </span>
        </summary>
        <div className="p-5 md:p-6 pt-2 md:pt-2 text-neutral-300 border-t border-neutral-800/50 typo-14-body-m md:typo-16-body-m  break-keep whitespace-pre-wrap">
          {item.answer}
        </div>
      </details>
    </div>
  );
};

export default InterviewItem;
