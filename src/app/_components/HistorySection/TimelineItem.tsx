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
    <div
      className="w-full rounded-lg border border-neutral-800 bg-[#1E1E1E] p-6"
    >
      <div className={`${dateColorClass} mb-2 text-sm font-medium`}>
        {period}
      </div>
      <h4 className="mb-1 text-lg font-bold">{title}</h4>
      {subtitle && <p className="mb-2 text-sm text-neutral-200">{subtitle}</p>}
      <p className="text-sm text-neutral-400">{description}</p>
    </div>
  );
};

export default TimelineItem;
