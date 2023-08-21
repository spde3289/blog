import styled from "styled-components";

type props = {
  tagName: string;
  title: string;
  date: string;
};

const PostHeader = ({ tagName, title, date }: props) => {
  return (
    <>
      <ContentHeader>
        <Title>{title}</Title>
        <Info>{date} · {tagName}</Info>
      </ContentHeader>
    </>
  );
};

const ContentHeader = styled.header`
  width: 1000px;
  padding: 12px;
  margin-top: 20px;
  border-bottom: 1px solid #ccc;
`;

const Title = styled.h1`
  font-size: 36px;
  margin: 20px 0;
`;

const Info = styled.p`
  font-size: 16px;
`;

export default PostHeader;
