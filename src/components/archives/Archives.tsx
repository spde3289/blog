import styled from "styled-components";

const Archives = () => {

  return (
    <Main>
      <Acrchive>
        <Title>
          Archives
        </Title>
        <TimeLineSection>
          <TimeLine>
            <Date className="year">2023</Date>
          </TimeLine>
          <TimeLine>
            <Date>08.22</Date><Note>디자인 변경및 시멘틱한 코드변경 완료</Note>
          </TimeLine>
          <TimeLine>
            <Date>08.21</Date><Note>path alias 적용디자인 변경및 시멘틱한 코드변경 완료</Note>
          </TimeLine>
          <TimeLine>
            <Date>08.17</Date><Note>블로그 디자인 변경및 시멘틱한 코드변경 시작</Note>
          </TimeLine>
          <TimeLine>
            <Date>05.20</Date><Note>github-Action을 통한 CI/CD 적용</Note>
          </TimeLine>
          <TimeLine>
            <Date>05.16</Date><Note>코드 리펙토링 시작</Note>
          </TimeLine>
          <TimeLine>
            <Date>05.12</Date><Note>TypeScript 적용</Note>
          </TimeLine>
          <TimeLine>
            <Date>05.10</Date><Note>Vite 적용</Note>
          </TimeLine>
          <TimeLine>
            <Date>03.23</Date><Note>다크모드 추가</Note>
          </TimeLine>
        </TimeLineSection>
        <TimeLineSection>
          <TimeLine>
            <Date className="year">2022</Date>
          </TimeLine>
          <TimeLine>
            <Date>12.04</Date><Note>개발 블로그 시작</Note>
          </TimeLine>
        </TimeLineSection>
      </Acrchive>
    </Main>
  );
};

const Main = styled.div`
  width: 1000px;
  margin: 0 auto;
  padding-top: 48px;
`;

const Acrchive = styled.div`

`;

const Title = styled.h1`
  font-size: 1.8rem;
`;

const TimeLineSection = styled.ul`
  margin-top: 50px;
  padding: 15px;
`;

const TimeLine = styled.li`
  position: relative;
  margin-bottom: 20px;
  &:before {
    content: "";
    height: 42px;
    width: 4px;
    top: 15px;
    left: 70px;
    display: inline-block;
    position: absolute;
    background-color: #c2c6cc;
  }
  &:last-child{
      &:before {
        content: none;
    }
  }
`;

const Date = styled.span`
  margin-right: 20px;
  position: relative;
  font-size: 16px;

  &.year{
    font-size: 24px
  }

  &:after {
    content: "";
    position: absolute;
    display: inline-block;
    height: 10px;
    width: 10px;
    top: 4px;
    left: 66px;
    align-self: center;
    background-color:#c2c6cc;
    border: 1.5px solid #c2c6cc;;
    border-radius: 10px;
  }
`;

const Note = styled.span`
  margin-left: 40px;
`;

export default Archives