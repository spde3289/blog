import styled from "styled-components";
import PostHeader from "@/components/posts/post/PostHeader";
import GiscusApp from "@/components/posts/post/GiscusApp";
import { result, totalSearch, change, embeds, expCrawling, charSrarch } from "./imgs"
import { PostContainer, Main, SubTitle, TextBox, ImgContainer, Subheading, ReferenceLink } from "../../style";

export default function CreateDiscordBotTwo() {
  return (
    <PostContainer>
      <PostHeader title='discord.js로 봇을 만들어보자 - 2' tagName='node.js' date='2023.10.05' />
      <Main>
        <SubTitle>
          봇 개발
        </SubTitle>
        <ImgContainer>
          <Img src={result}/>
        </ImgContainer>
        <TextBox>
          여기에는 문제점이 있었는데 크롤링을 인기도 랭킹에서 하다보니 인기도가 0인
          캐릭터들은 검색이 되지 않는 문제가 있었다. 이 문제를 해결하기 위해선 종합랭킹
          에서 크롤링을 해와야하는데 여기는 일반월드와 리부트월드가 나눠져 있어서 
          조건문을 통해 일반월드 검색 결과가 없다면 리부트월드를 검색 하도록 변경했다.
        </TextBox>
        <ImgContainer>
          <Img src={totalSearch}/>
        </ImgContainer>
        <ImgContainer>
          <Img src={change}/>
        </ImgContainer>
        <SubTitle>
          Embeds 적용
        </SubTitle>
        <TextBox>
          이렇게 가져온 데이터를 이전보다 더 잘 보여주고 싶어서 찾아보니 Embeds라는 기능이
          있었다. Embeds를 사용하면 이미지를 추가 할 수 있고 여러자기 속성등을 사용할 수 
          있게 된다. 
        </TextBox>
        <ReferenceLink href="https://discordjs.guide/popular-topics/embeds.html#embed-preview">
          사용법
        </ReferenceLink>
        <ImgContainer>
          <Img src={embeds} />
        </ImgContainer>
        <TextBox>
          그런데 서버로고 이미지는 잘 로드되는데 캐릭터 이미지는 로드가 되지않는 문제가 있었다.
          이 부분은 다른 게시글에서 다루도록 하고 경험치가 %로 나타나는게 아니라 보기 너무 
          불편하다 생각해 %로 바꿔주기로 했다. 
        </TextBox>
        <SubTitle>
          경험치로직 추가
        </SubTitle>
        <TextBox>
          우선 %로 보여주기 위해선 레벨별 필요 경험치가 필요했는데 나무위키에 레벨별 필요 경험치에 
          대한 정보가 있어서 크롤링을 통해 손쉽게 가져올 수 있었다. 
        </TextBox>
        <ImgContainer>
          <Img src={expCrawling} />
        </ImgContainer>
        <SubTitle>
          결과
        </SubTitle>
        <ImgContainer>
          <Img src={charSrarch} />
        </ImgContainer>
      </Main>
      <GiscusApp />
    </PostContainer>
  );
}

const Img = styled.img`
  max-width: 100%;
`;