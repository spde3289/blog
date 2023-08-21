import PostHeader from "@/components/posts/post/PostHeader";
import GiscusApp from "@/components/posts/post/GiscusApp";
import { PostContainer, Main, TextBox, ReferenceLink, SubTitle } from "../style";

export default function ErrEdgesOut() {
  return (
    <PostContainer>
      <PostHeader title="npm ERR! Cannot read properties of null (reading 'edgesOut')" tagName='Front-end' date='2023.07.13' />
      <Main>
        <TextBox>최근 배포를 하던 와중에 npm ERR! Cannot properties of null (reading) 이런 에러가 발생했다.</TextBox>
        <SubTitle>문제는?</SubTitle>
        <TextBox>최신버젼의 styled-components에서 npm i styled-components를 수행하는 동안 생기는 문제였다.</TextBox>
        <SubTitle>해결방법</SubTitle>
        <TextBox>
          V5 사용, npm install styled-components@5.3.10 <br />
          원사 사용, yarn install styled-components <br />
          베타 버전을 사용하려면,npm install styled-components@latest <br />
          <br />
          나의 경우에는 npm install styled-components@latest 를 사용해 해결했다.
        </TextBox>
        참고자료 :<br />
        <ReferenceLink href='https://stackoverflow.com/questions/70810819/npm-err-cannot-read-properties-of-null-reading-edgesout' target='_blank'>
          https://stackoverflow.com/questions/70810819/npm-err-cannot-read-properties-of-null-reading-edgesout
        </ReferenceLink>
        <br />
      </Main>
      <GiscusApp />
    </PostContainer>
  );
}
