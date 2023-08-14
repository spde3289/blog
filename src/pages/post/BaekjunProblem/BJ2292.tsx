import PostHeader from "../../../components/posts/post/PostHeader";
import GiscusApp from "../../../components/posts/post/GiscusApp";
import Bj2292 from "./imgs/BJ2292/BJ2292.png";
import { PostContainer, Main, TextBox, ImgContainer, SubTitle, ReferenceLink } from "../style";

const BJ2292 = () => {
  return (
    <PostContainer>
      <PostHeader title='백준 2292번 알고리즘 [node.js]' tagName='알고리즘' date='2022.12.01' />
      <Main>
        <TextBox>
          <ReferenceLink href='https://www.acmicpc.net/problem/2292'>
            https://www.acmicpc.net/problem/2292
          </ReferenceLink>
        </TextBox>
        <SubTitle>문제</SubTitle>
        <TextBox>
          육각형으로 이루어진 벌집이 있다. 중앙에 방 1부터 시작해서 이웃하는 방에 돌아가면서 1찍
          증가하는 번주를 매기는데 숫자 N이 주어졌을 떄, 벌집의 중앙 1에서 N번 방까지 최소 개수의
          방을 지나서 갈때 몇개의 방을 지나가는지(시작과 끝을 포함)를 계산하는 문제이다. 예를 들어
          13까지는 3개, 58까지는 5개를 지난다.
        </TextBox>
        <SubTitle>풀이</SubTitle>
        <TextBox>
          규칙없이 반복문을 돌렸더니 시간초과가 나서 무언가 규칙이 있다는걸 알게 됐다. <br />
          1번방을 시작으로 6, 12, 18, 24 6의 배수 였고 입력 받은 값을 6의 배수보다 작을때 까지
          돌려주면 최소 개수의 방을 구할 수 있다.
        </TextBox>
        <ImgContainer>
          <img alt='code1' src={Bj2292} />
        </ImgContainer>
      </Main>
      <GiscusApp />
    </PostContainer>
  );
};

export default BJ2292;
