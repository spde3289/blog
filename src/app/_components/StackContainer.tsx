import items, { Stack } from "@/data/stack";
import ContentsContainer from "./content/ContentsContainer";
import Title from "./content/Title";

interface StackCardProps {
  stack: Stack;
}

const StackCard = ({ stack }: StackCardProps) => {
  return (
    <div className="flex flex-col items-center group relative">
      <div className="h-10 w-10 z-1 overflow-hidden rounded">
        <img
          className="w-full h-full object-cover"
          src={stack.img.src}
          alt={stack.img.alt}
          {...stack.img.options}
        />
      </div>
      <div className="translate-y-full left-1/2 -translate-x-1/2 px-1.5 py-0.5 bg-white text-gray-dark font-semibold rounded md:text-sm text-center whitespace-nowrap z-99 absolute -bottom-1 opacity-0 group-hover:opacity-100 text-sm">
        {stack.title}
      </div>
    </div>
  );
};

const StackConatiner = () => {
  return (
    <ContentsContainer>
      <Title title="기술" />
      <div className="mb-12  reveal">
        <div className="flex justify-center gap-4">
          <div className="text-center text-2xl font-bold mb-6">스택</div>
          <div className="text-center text-2xl font-bold mb-6">도구</div>
        </div>
        <div className="section-item-wrapper max-w-64 m-0 mx-auto flex-wrap gap-2 sm:gap-1 md:gap-4 justify-center">
          {items.stackItems.map((stack) => (
            <StackCard key={stack.title} stack={stack} />
          ))}
          {items.toolItmes.map((stack) => (
            <StackCard key={stack.title} stack={stack} />
          ))}
        </div>
      </div>
    </ContentsContainer>
  );
};

export default StackConatiner;
