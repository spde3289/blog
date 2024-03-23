import styled from "styled-components";
import PostHeader from "@/components/posts/post/PostHeader";
import GiscusApp from "@/components/posts/post/GiscusApp";
import {
  PostContainer,
  Main,
  TextBox,
  List,
  ImgContainer,
  SubTitle,
  ReferenceLink,
  Subheading,
} from "@/pages/post/style";

export default function ImageTag() {
  return (
    <PostContainer>
      <PostHeader title='웹폰트 최적화' tagName='Front-end' date='2024.03.06' />
      <Main>
        <TextBox>
          Next를 이용해 팀프로젝트를 진행하던 중 Next에서는 img태그 대신 Next에서 제공하는 Image컴포넌트를 사용하는걸
          알게 되었다. Image컴포넌트가 제공하는 기능과 장점에 대해 알아보려한다.
        </TextBox>
        <SubTitle>Next/Image 컴포넌트의 기능</SubTitle>
        <TextBox>Image 컴포넌트가 제공하는 기능은 다음과 같다.</TextBox>
        <List>
          <li>이미지 크기 최적화와 최신 이미지 포맷 지원</li>
          <li>CLS방지</li>
          <li>이미지 블러 기능</li>
          <li>이미지 리사이징</li>
        </List>
        <ReferenceLink target='_' href='https://nextjs.org/docs/app/building-your-application/optimizing/images'>
          참고자료
        </ReferenceLink>
        <Subheading>이미지 크기 최적화와 최신 이미지 포맷 지원</Subheading>
        <TextBox>
          Next에선 이미지 
        </TextBox>
        <ReferenceLink target='_' href='https://nextjs.org/docs/pages/api-reference/components/image'>
          참고자료
        </ReferenceLink>
      </Main>
      <GiscusApp />
    </PostContainer>
  );
}

const Img = styled.img`
  width: 100%;
`;
