interface StackBadgeProps {
  label: string;
}

const StackBadge = ({ label }: StackBadgeProps) => {
  return (
    <span
      className="h-fit rounded-full border border-neutral-700 bg-neutral-800
        px-3 py-1.5 text-sm text-neutral-200"
    >
      {label}
    </span>
  );
};

export default StackBadge;
