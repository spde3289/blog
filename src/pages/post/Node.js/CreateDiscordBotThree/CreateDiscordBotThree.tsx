import styled from "styled-components";
import PostHeader from "@/components/posts/post/PostHeader";
import GiscusApp from "@/components/posts/post/GiscusApp";
import { instanceStart, awsTest, setOS, setKey, changeKey, createKey, login, setFile, lsFile, complete } from "./imgs";

import { PostContainer, Main, SubTitle, TextBox, ImgContainer, ReferenceLink } from "../../style";

export default function CreateDiscordBotThree() {
  return (
    <PostContainer>
      <PostHeader title='discord.js로 봇을 만들어보자 - 3' tagName='node.js' date='2023.10.25' />
      <Main>
        <SubTitle>
          디스코드 봇 호스팅하기 
        </SubTitle>
        <TextBox>
          이번엔 만들었던 디스코드 봇을 aws에 호스팅 해보도록 하겠다. 
        </TextBox>
        <SubTitle>
          시작 
        </SubTitle>
        <TextBox>
          1. 우선 아마존 aws에 계정을 만들고 카드 등록까지 해준다 
        </TextBox>
        <TextBox>
          2. 인스턴스 시작 버튼을 눌러 인스턴스를 생성해준다.
        </TextBox>
        <ImgContainer>
          <Img src={instanceStart} />
        </ImgContainer>
        <TextBox>
          2. EC2 인스턴스 이름을 적고 OS를 선택해준다. (나는 Ubuntu를 선택했다.)
        </TextBox>
        <ImgContainer>
          <Img src={awsTest} />
          <Img src={setOS} />
        </ImgContainer>
        <TextBox>
          3. 그리고 가장 중요한 키를 생성해준다. 이건 잃어버리면 안 되니 백업을 해준 후 인스턴스 시작을 해준다.
        </TextBox>
        <ImgContainer>
          <Img src={createKey} />
        </ImgContainer>
        <TextBox>
          4. 생성이 완료 되었다면 서버에 로그인을 하기 위해 이전에 생성해주었던 키를 PuTTK key Generator을 통해 변환해줘야 한다.
        </TextBox>
        <ImgContainer>
          <Img src={changeKey} />
        </ImgContainer>
        <TextBox>
          5. 그런 후 아래와 같이 작성해준다.
        </TextBox>
        <ImgContainer>
          <Img src={setKey} />
          icacls.exe 파일 이름 /reset <br />
          icacls.exe 파일 이름 /grant:r %username%:(R) <br />
          icacls.exe 파일 이름 /inherItance:r
        </ImgContainer>
        <TextBox>
          6. winSCP를 켜서 로그인을 해주면 되는데 <br />
          호스트 이름으로는 (퍼블릭 IPv4 DNS) 사용자 이름으로는 ubuntu 그리고 비밀번호는 고급으로 들어가 SSH / 인증 에서 개인키 파일에 아까 변환 한 파일을 넣어주면 된다.
        </TextBox>
        <ImgContainer>
          <Img src={login} />
        </ImgContainer>
        <TextBox>
          7. 로그인을 성공적으로 마쳤다면 만든 파일을 전부 넣어주면 된다.
        </TextBox>
        <ImgContainer>
          <Img src={setFile} />
        </ImgContainer>
        <TextBox>
          8. 파일들이 성공적으로 넘어가 있는게 확인이 되었다면 npm, nodejs 를 설치 해 주면 된다. 
        </TextBox>
        <ImgContainer>
          <Img src={lsFile} />
        </ImgContainer>
        <TextBox>
          9. 그 이후 무중단 관리도구인 forever를 설치해 forever start [js script] 를 실행시켜 주면 된다. 
        </TextBox>
        <ReferenceLink href="https://www.npmjs.com/package/forever">
          forever.js
        </ReferenceLink>
        <TextBox>
          10. 그러면 따로 실행시켜주지 않아도 디스코드 봇이 실행되는 것을 볼 수 있다.
        </TextBox>
        <ImgContainer>
          <Img src={complete} />
        </ImgContainer>
      </Main>
      <GiscusApp />
    </PostContainer>
  );
}

const Img = styled.img`
  max-width: 100%;
`;