import styled from "styled-components";
import PostHeader from "@/components/posts/post/PostHeader";
import GiscusApp from "@/components/posts/post/GiscusApp";
import {
  result, totalSearch, change,
  embeds, expCrawling, charSrarch,
  charImgLink, imgUrl, fsImgWriter,
  solve, exception
} from "./imgs"
import { PostContainer, Main, SubTitle, TextBox, ImgContainer, ReferenceLink } from "../../style";

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
        <SubTitle>
          경험치로직 추가
        </SubTitle>
        <TextBox>
          경험치가 %로 나타나는게 아니라 보기 너무 불편하니 %로 바꿔주기로 했다. <br />
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
        <TextBox>
          그런데 서버 로고만 보여지고 캐릭터 이미지가 로드 되지 않는다.
        </TextBox>
        <SubTitle>
          문제 해결
        </SubTitle>
        <TextBox>
          크롤링이 잘못 된 건가 싶어 콘솔을 찍어 확인해 보니 이미지 주소는 유효한걸 확인 
          할 수 있었다. 
        </TextBox>
        <ImgContainer>
          <Img src={charImgLink} />
        </ImgContainer>
        <TextBox>
          또 지켜야할 이미지 규격이 있나 공식 문서를 확인해 보니 첨부파일 또는 http(s)만을 지원한다는 
          설명 외에는 없었다. 그래서 다른 이미지 url을 넣어보니 잘 출력되는걸 확인 할 수 있었다.
        </TextBox>
        <ImgContainer>
          <Img src={imgUrl} />
        </ImgContainer>
        <TextBox>
          그래서 나와 같은 문제를 겪고 있는 사람들이 있나 확인을 위해 스텍오버플로우와 깃허브 이슈
          채널을 확인하다 같은 문제를 겪고 있는 사람을 찾을 수 있었다. 
        </TextBox>
        <ReferenceLink href="https://github.com/discordjs/discord.js/issues/6940">
          깃허브 이슈 링크
        </ReferenceLink>
        <TextBox>
          내용을 요약하자면 discord.js의 문제가 아니라 discord 자체적인 문제이니 discord에 문의 하라고 한다. 
          이 문제를 해결하기 위해 하루종일 찾아봤지만 뭔가 허무한 결과가 나와버렸다... <br />
          하지만 이대로 문제를 놔둘 순 없어서 크롤링한 이미지를 서버에 저장한 후 보여주기로 했다.
        </TextBox>
        <TextBox>
          이미지 저장 로직을 작성해 준 후 일치하는 이름이 없을 경우 예외 처리를 해줘 봇이 다운되는 일을 막아줬다.
        </TextBox>
        <ImgContainer>
          <Img src={fsImgWriter} />
        </ImgContainer>
        <ImgContainer>
          <Img src={exception} />
        </ImgContainer>
        <TextBox>
          이제 이미지가 성공적으로 출력되는걸 확인 할 수 있었다.
        </TextBox>
        <ImgContainer>
          <Img src={solve} />
        </ImgContainer>
      </Main>
      <GiscusApp />
    </PostContainer>
  );
}

const Img = styled.img`
  max-width: 100%;
`;