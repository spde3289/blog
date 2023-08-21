import styled from "styled-components";
import { Link } from "react-router-dom";

type props = {
  category: string;
  link: string;
  title: string;
  body: string;
  date: string;
};

const PostCard = ({ category, link, title, body, date }: props) => {

  return (
    <Link to={"posts/" + link}>
      <Container>
        <PostTitle>
          {title}
        </PostTitle>
        <PostContent>
          {body}
        </PostContent>
        <PostFooter>
          {date} · {category}
        </PostFooter>
      </Container>
    </Link>
  )
}

const Container = styled.div`
  width: 213px;
  height: 263px;
  box-sizing: border-box;
  padding: 10px;
  border-radius: 20px;
  background-color: #b9a7a71c;
  margin-top: 20px;
  &:hover{
    transform: translateY(-10px);
    transition: transform 0.1s ease-in-out 0s;
  }
`;

const PostTitle = styled.h3`
  margin-bottom: 12px;
  font-size: 16px;
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const PostContent = styled.p`
  font-size: 14px;
  word-break: break-all;
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 9;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;


const PostFooter = styled.p`
  margin-top: 15px;
  font-size: 14px;
  color: rgb(142, 148, 160);
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export default PostCard