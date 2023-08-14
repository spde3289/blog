import PostHeader from "../../../components/posts/post/PostHeader";
import GiscusApp from "../../../components/posts/post/GiscusApp";
import { PostContainer, Main, TextBox, ReferenceLink, SubTitle, CodeContainer } from "../style";

export default function TypeInference() {
  const code1 = `

  `;

  const code2 = `

  `;

  return (
    <PostContainer>
      <PostHeader title='타입스크립트 타입 추론' tagName='typescript' date='2023.08.15' />
      <Main>
        <SubTitle>커스텀 타입이란?</SubTitle>
        <TextBox>
          타입스크립트에는 커스텀 타입이라는게 있다. 커스텀 타입은 말 그대로 타입을 커스텀 하여 만들 수 있다는 말인데 기존 타입에 새로운 이름을 지정해준다거나 새로운 타입을 선언해주는 것 이 가능하다.
        </TextBox>
        <CodeContainer>
          <pre>
            <code>{code1}</code>
          </pre>
        </CodeContainer>
        참고자료 :<br />
        <ReferenceLink href='https://velog.io/@cjh951114/TypeScript-2.2-%EC%BB%A4%EC%8A%A4%ED%85%80-%ED%83%80%EC%9E%85-%EC%A0%95%EC%9D%98' target='_blank'>
          https://velog.io/@cjh951114/TypeScript
        </ReferenceLink>
        <br />
      </Main>
      <GiscusApp />
    </PostContainer>
  );
}
