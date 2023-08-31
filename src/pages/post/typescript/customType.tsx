import { PostHeader, GiscusApp } from "@/components/posts/post";
import { PostContainer, Main, TextBox, ReferenceLink, SubTitle } from "../style";
import CodeContainer from "@/common/components/CodeContainer";

const code1 = `
  type Name = string;
  type Age = number;

  type Preson = {
    name : Name;
    age : Age;
  };

  const person: Person = {
    name : Kim,
    age : 24
  };
  
`;

const code2 = `
  type Position = "fixed" | "absolute" ;

  const menu = (position:Position = "flex") => {
    // 어쩌구 저쩌구
  };

  menu("absolute") // 타입 Position과 맞지 않으면 에러가 발생한다.
  
`;

export default function CustomTypesLearn() {
  return (
    <PostContainer>
      <PostHeader title='타입스크립트 커스텀 타입' tagName='typescript' date='2023.05.20' />
      <Main>
        <SubTitle>커스텀 타입이란?</SubTitle>
        <TextBox>
          타입스크립트에는 커스텀 타입이라는게 있다. 커스텀 타입은 말 그대로 타입을 커스텀 하여 만들 수 있다는 말인데 기존 타입에 새로운 이름을 지정해준다거나 새로운 타입을 선언해주는 것 이 가능하다.
        </TextBox>
        <CodeContainer>{code1}</CodeContainer>
        <TextBox>커스텀 타입을 사용하면 보다 강력하게 타입을 지정할 수 있다.</TextBox>
        <CodeContainer>{code2}</CodeContainer>
        <TextBox>위와 같이 사용하면 잘못된 함수의 사용을 막을 수 있다.</TextBox>
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
