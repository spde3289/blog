interface SectionTitleProps {
  title: string;
  subtitle: string;
}

const SectionTitle = ({ title, subtitle }: SectionTitleProps) => {
  return (
    <div className="text-center mb-16">
      <span className="text-blue-500 font-medium tracking-wider uppercase text-sm">
        {subtitle}
      </span>
      <h2 className="text-3xl md:text-4xl font-bold mt-2 text-white">
        {title}
      </h2>
      <div className="w-12 h-1 bg-blue-500 mx-auto mt-4 rounded-full" />
    </div>
  );
};

export default SectionTitle;
