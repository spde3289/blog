interface SectionTitleProps {
  title: string;
  subtitle: string;
}

const SectionTitle = ({ title, subtitle }: SectionTitleProps) => {
  return (
    <div className="mb-16 text-center">
      <span
        className="text-sm font-medium tracking-wider text-blue-500 uppercase"
      >
        {subtitle}
      </span>
      <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">
        {title}
      </h2>
      <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-blue-500" />
    </div>
  );
};

export default SectionTitle;
