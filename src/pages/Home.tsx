import styled from "styled-components";
import { SearchBar } from "../components/SearchBar";
import { TextSplitAni } from "../components/TextSplitAni";

const Home = () => {

  return ( 
    <Main>
      <IntroductionContainder>
        <Introduction>
          안녕하세요. <br />
          다앙한 경험을 좋아하는 <br />
          개발자 김지훈입니다. <br />
        </Introduction>
        <Categories>
          <div>
            <TextSplitAni text={"console.log('Hello World')"} />
          </div>
        </Categories>
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

const Categories = styled.div`
  width: 260px;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  align-items: center;
`;


export default Home;
