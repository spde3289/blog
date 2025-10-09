interface TitleProps {
  title: string;
  style?: string;
  attr?: {
    [key: string]: string | boolean;
  };
}

const Title = ({ style, title, attr }: TitleProps) => {
  return (
    <h2 className={`section-title reveal ${style}`} {...attr}>
      {title}
    </h2>
  );
};

export default Title;
