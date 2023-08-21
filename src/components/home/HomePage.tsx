import styled from "styled-components";
import CodeContainer from "@/common/components/CodeContainer";
import { TextSplitAni } from "../TextSplitAni";
import PostCardContainer from "./postCard/PostCardContainer";

const Home = () => {
  return (
    <Main>
      <IntroductionContainder>
        <Introduction>
          안녕하세요. <br />
          다앙한 경험을 좋아하는 <br />
          개발자 김지훈입니다. <br />
        </Introduction>
        <CodeContainer>
          <P>
            <TextSplitAni text={"console.log('Hi, there')"} />
            <CurrentBar>|</CurrentBar>
          </P>
        </CodeContainer>
      </IntroductionContainder>
      <PostCardContainer />
    </Main>
  );
};

const Main = styled.main`
  width: 1000px;
  padding-top: 80px;
  margin: 0 auto;
`;

const IntroductionContainder = styled.div`
  margin: 0 auto 20px;
  display: flex;
  justify-content: space-evenly;
`;

const Introduction = styled.p`
  font-size: 36px;
`;

const P = styled.p`
  color: #7dd3fc;
`;

const CurrentBar = styled.span`
  margin-left: 2px;
  color: #fff;
`;

export default Home;
