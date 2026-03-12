import ChevronDownSvg from "@/svg/ChevronDownSvg";
import { Interview } from "@/types/portfolio";

interface InterviewItemProps {
  item: Interview;
}

const InterviewItem = ({ item }: InterviewItemProps) => {
  return (
    <div
      className="overflow-hidden rounded-xl border border-neutral-800
        bg-[#1E1E1E] transition-all duration-300 hover:border-neutral-700"
    >
      <details className="group">
        <summary
          className="flex cursor-pointer list-none items-center justify-between
            p-5 transition-colors group-open:bg-neutral-800/30 md:p-6"
        >
          <h3
            className="typo-16-b md:typo-18-b pr-4 break-keep text-neutral-200"
          >
            {item.question}
          </h3>
          <span
            className="shrink-0 text-neutral-500 transition-transform
              duration-300 group-open:rotate-180"
          >
            <ChevronDownSvg />
          </span>
        </summary>
        <div
          className="typo-14-body-m md:typo-16-body-m border-t
            border-neutral-800/50 p-5 pt-2 break-keep whitespace-pre-wrap
            text-neutral-300 md:p-6 md:pt-2"
        >
          {item.answer}
        </div>
      </details>
    </div>
  );
};

export default InterviewItem;
