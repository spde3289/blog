"use client";
import useElementOnScreen from "@/hooks/useElementOnScreen";

interface TitleProps {
  title: string;
  style?: string;
  attr?: {
    [key: string]: string | boolean;
  };
}

const Title = ({ style, title, attr }: TitleProps) => {
  const { ref, isVisible } = useElementOnScreen();
  return (
    <h2
      ref={ref}
      className={`section-title transition-all ${
        isVisible ? "reveal" : "opacity-0"
      } ${style}`}
      {...attr}
    >
      {title}
    </h2>
  );
};

export default Title;
