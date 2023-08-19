import styled from "styled-components";
import { Link } from "react-router-dom";

type props = {
  category: string;
  link: string;
  title: string;
  body: string;
  date: string;
};

const PostBox = ({ category, link, title, body, date }: props) => {
  return (
    <Link to={link} state={{ Title: title }}>
      <PostBoxContainer>
        <PostBoxTitle>{title}</PostBoxTitle>
        <PostBoxContent>{body}</PostBoxContent>
        <PostBoxInfo>
        <div>{date}</div>
          <CategoryContainer>
            <Category>{category}</Category>
          </CategoryContainer>
        </PostBoxInfo>
      </PostBoxContainer>
    </Link>
  );
};

const PostBoxContainer = styled.div`
  margin: 0 auto 10px;
  padding: 40px 0;
  border-bottom: 1px solid #e4e4e4;
  &:hover{
    transform: translate(5px, -5px);
    transition: transform 0.1s ease-in-out 0s;
  }
`;

const PostBoxTitle = styled.h2`
  margin-bottom: 12px;
  font-size: 26px;
  line-height: 38px;
  letter-spacing: -.02em;
`;

const PostBoxContent = styled.p`
  margin: 25px 0 30px;
  font-size: 16px;
  word-break: break-all;
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const PostBoxInfo = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 13px;
`;

const CategoryContainer = styled.ul`
  display: flex;
`;

const Category = styled.li`
  margin-right: 5px;
`;

export default PostBox;
