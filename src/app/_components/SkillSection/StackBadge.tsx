interface StackBadgeProps {
  label: string;
}

const StackBadge = ({ label }: StackBadgeProps) => {
  return (
    <span className="rounded-full border border-neutral-700 h-fit bg-neutral-800 px-3 py-1.5 text-sm text-neutral-200">
      {label}
    </span>
  );
};

export default StackBadge;
