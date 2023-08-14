import styled from "styled-components";
import { SearchBar } from "../SearchBar";
import CodeContainer from "./CodeContainer";
import { TextSplitAni } from "../TextSplitAni";

const Home = () => {
  console.log("asd")
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
      <SearchBar />
    </Main>
  );
};


const Main = styled.main`
  height: calc(100vh - 495px);
  margin: 0 auto;
  width: 1000px;
`;

const IntroductionContainder = styled.div`
  width: 700px;
  margin: 160px auto 80px;
  display: flex;
  justify-content: space-between;
`;

const Introduction = styled.p`
  font-family: "Jua";
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
