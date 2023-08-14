import PostHeader from "../../../components/posts/post/PostHeader";
import GiscusApp from "../../../components/posts/post/GiscusApp";
import Bj1712 from "./imgs/BJ1712/BJ1712.png";
import { PostContainer, Main, TextBox, ImgContainer, SubTitle, ReferenceLink } from "../style";

const BJ1712 = () => {
  return (
    <PostContainer>
      <PostHeader title='백준 1712번 알고리즘 [node.js]' tagName='알고리즘' date='2022.12.01' />
      <Main>
        <TextBox>
          <ReferenceLink href='https://www.acmicpc.net/problem/1712'>
            https://www.acmicpc.net/problem/1712
          </ReferenceLink>
        </TextBox>
        <SubTitle>문제</SubTitle>
        <TextBox>
          첫 줄에 A, B, C 가 주어지는데 A는 고정비용 B는 가변비용 C는 판매가격이라고 할 때 최초로 총
          수입이 총 비용보다 많아져 이익이 발생하는 손익분기점을 넘기는 값을 구하는 문제이다
        </TextBox>
        <SubTitle>풀이</SubTitle>
        <TextBox>
          간단하게 생각해서 마진은 판매가격에서 가변비용을 빼주게 되면 나온다. <br />
          이 마진을 고정비용으로 나눠주게 되면 손익분기점이 나오는데 우리는 손익분기점을 넘기는 값을
          구해야 하기 때문에 1을 더해주면 된다. <br />
          그리고 만약 손익분기점이 존재하지 않는다면 -1을 출력해준다
        </TextBox>
        <ImgContainer>
          <img alt='code1' src={Bj1712} />
        </ImgContainer>
      </Main>
      <GiscusApp />
    </PostContainer>
  );
};

export default BJ1712;
