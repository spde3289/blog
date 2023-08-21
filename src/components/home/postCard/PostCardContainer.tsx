import styled from "styled-components";
import PostCard from "./PostCard";
import postInfo from "@/pages/postPageInfo/postInfo";

const PostCardContainer = () => {

  const recentPost = [...postInfo].reverse().slice(0, 8)

  return (
    <Container>
      <SubTitle>
        최근 올라온 게시글
      </SubTitle>
      <PostContainer>
        {recentPost.map(data => (
          <PostCard
            key={data.key}
            title={data.title}
            date={data.date}
            body={data.body}
            category={data.category}
            link={data.link}
          />
        ))}
      </PostContainer>
    </Container>
  )
}

const Container = styled.div`
  padding-top: 60px;
`;

const SubTitle = styled.h2`
  font-size: 22px;
  font-weight: 700;
`;

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export default PostCardContainer;