import styled from "styled-components";
import PostHeader from "@/components/posts/post/PostHeader";
import GiscusApp from "@/components/posts/post/GiscusApp";

import { PostContainer, Main, SubTitle, TextBox, ImgContainer, Subheading, ReferenceLink } from "../../style";

export default function CreateDiscordBotThree() {
  return (
    <PostContainer>
      <PostHeader title='discord.js로 봇을 만들어보자 - 3' tagName='node.js' date='2023.10.25' />
      <Main>
        <SubTitle>
          aws ec2 
        </SubTitle>
        <TextBox>

        </TextBox>

      </Main>
      <GiscusApp />
    </PostContainer>
  );
}

const Img = styled.img`
  max-width: 100%;
`;