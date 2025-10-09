interface ContentsContainerProps {
  children: React.ReactNode;
  style?: string;
}

const ContentsContainer = ({ children, style }: ContentsContainerProps) => {
  return <section className={`section-container ${style}`}>{children}</section>;
};

export default ContentsContainer;
