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
            <Date className="year">2023</Date><Note>접속자 20명 달성 목표</Note>
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
            <Date className="year">2022</Date><Note>블로그 개발 완료</Note>
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
    display: inline-block;
    position: absolute;
    width: 4px;
    height: 42px;
    top: 10px;
    left: 80px;
    background-color: rgba(0, 0, 0, 0.075);
  }
  &:first-child {
    &:before {
      height: 42px;
      top: 15px;
      left: 80px;
    }
  }
  &:last-child{
    &:before {
      content: none;
    }
  }
`;

const Date = styled.span`
  padding-right: 20px;
  position: relative;
  font-size: 16px;
  &.year{
    font-size: 24px;
    padding-right: 4px;
  }
  &.year::after{
    width: 12px;
    height: 12px;
    top: -4px;
    left: 22px;
    border: 3px solid #c2c6cc;
    box-shadow: 0 0 2px 0 #c2c6cc;
    background-color:#fff;
  }
  &:after {
    content: "";
    position: relative;
    display: inline-block;
    width: 7px;
    height: 7px;
    top: -4px;
    left: 36.5px;
    box-sizing: border-box;
    background-color:#c2c6cc;
    box-shadow: 0 0 3px 0 #c2c6cc;
    border-radius: 50%;
  }
`;

const Note = styled.span`
  margin-left: 40px;
`;

export default Archives