import items, { Stack } from "@/data/stack";

interface StackCardProps {
  stack: Stack;
}

const StackCard = ({ stack }: StackCardProps) => {
  return (
    <div className="flex flex-col items-center group relative">
      <div className="h-10 w-10 overflow-hidden rounded">
        <img
          className="w-full h-full object-cover"
          src={stack.img.src}
          alt={stack.img.alt}
          {...stack.img.options}
        />
      </div>
      <div className="translate-y-full left-1/2 -translate-x-1/2 px-1.5 py-0.5 bg-white text-black rounded md:text-sm text-center whitespace-nowrap font-normal z-10 absolute -bottom-1 opacity-0 group-hover:opacity-100 text-sm">
        {stack.title}
      </div>
      {/* <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/40" /> */}
      {/* 텍스트 */}
      {/* <p className="text-sm opacity-90">호버 시 나오는 설명 텍스트</p>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-4 opacity-0 p-4 text-white transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <h3 className="text-lg font-semibold">타이틀</h3>
      </div> */}
    </div>
  );
};

const StackConatiner = () => {
  return (
    <section className="section-container">
      <h2 className="section-title ">기술</h2>
      <div className="mb-12">
        <div className="text-center text-2xl font-bold mb-6">스택</div>
        <div className="section-item-wrapper flex-wrap gap-2 sm:gap-1 md:gap-5 justify-center">
          {items.stackItems.map((stack) => (
            <StackCard key={stack.title} stack={stack} />
          ))}
        </div>
      </div>
      <div>
        <div className="text-center text-2xl font-bold mb-6">도구</div>
        <div className="section-item-wrapper flex-wrap gap-2 md:gap-5 justify-center">
          {items.toolItmes.map((stack) => (
            <StackCard key={stack.title} stack={stack} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StackConatiner;
