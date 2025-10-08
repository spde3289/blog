import items, { Stack } from "@/data/stack";

interface StackCardProps {
  stack: Stack;
}

const StackCard = ({ stack }: StackCardProps) => {
  return (
    <div className="flex flex-col items-center ">
      <div className="h-10 w-10 overflow-hidden rounded">
        <img
          className="w-full h-full object-cover"
          src={stack.img.src}
          alt={stack.img.alt}
          {...stack.img.options}
        />
      </div>
      <div>{stack.title}</div>
    </div>
  );
};

const StackConatiner = () => {
  return (
    <section className="section-container">
      <h2 className="section-title ">기술</h2>
      <div className="mb-12">
        <div className="text-center text-2xl font-bold mb-6">스택</div>
        <div className="section-item-wrapper flex-wrap gap-5 justify-center">
          {items.stackItems.map((stack) => (
            <StackCard key={stack.title} stack={stack} />
          ))}
        </div>
      </div>
      <div>
        <div className="text-center text-2xl font-bold mb-6">도구</div>
        <div className="section-item-wrapper flex-wrap gap-5 justify-center">
          {items.toolItmes.map((stack) => (
            <StackCard key={stack.title} stack={stack} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StackConatiner;
