import styled from "styled-components";
import Tag from "../Tag";

type props = {
  tagName: string,
  title: string,
  date: string
}

const PostHeader = ({tagName, title, date}: props) => {
  return (
    <>
      <ContentHeader>
        <Tag tagName={tagName} />
        <Title>{title}</Title>
        <Info>{date}</Info>
      </ContentHeader>
    </>
  );
};

const ContentHeader = styled.header`
  width: 1000px;
  margin-bottom: 50px;
  padding: 15px;
  border-bottom: 1px solid #ccc;
`;

const Title = styled.h1`
  font-size: 36px;
  margin: 20px 0;
`;

const Info = styled.div`
  font-size: 15px;
`;

export default PostHeader;
