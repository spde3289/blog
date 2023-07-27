import PostHeader from "../../../../components/post/PostHeader";
import GiscusApp from "../../../../components/post/GiscusApp";
import { PostContainer, Main, SubTitle, TextBox } from "../../style";

export default function ThemProjectChimTwo() {
  return (
    <PostContainer>
      <PostHeader title='팀프로젝트 기록 - 2' tagName='react' date='2023.04.06' />
      <Main>
        <TextBox>프로젝트에서 중반쯤 오니 진행상황에 대해 보고하는</TextBox>
      </Main>
      <GiscusApp />
    </PostContainer>
  );
}
