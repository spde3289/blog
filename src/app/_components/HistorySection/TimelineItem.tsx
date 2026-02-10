interface TimelineItemProps {
  period: string;
  title: string;
  subtitle?: string;
  description: string;
  highlightColor: "blue" | "purple";
}

const TimelineItem = ({
  period,
  title,
  subtitle,
  description,
  highlightColor,
}: TimelineItemProps) => {
  const dateColorClass =
    highlightColor === "blue" ? "text-blue-400" : "text-purple-400";

  return (
    <div className="bg-[#1E1E1E] p-6 rounded-lg border border-neutral-800 w-full">
      <div className={`${dateColorClass} text-sm mb-2 font-medium`}>
        {period}
      </div>
      <h4 className="text-lg font-bold mb-1">{title}</h4>
      {subtitle && <p className="text-neutral-200 text-sm mb-2">{subtitle}</p>}
      <p className="text-neutral-400 text-sm">{description}</p>
    </div>
  );
};

export default TimelineItem;
