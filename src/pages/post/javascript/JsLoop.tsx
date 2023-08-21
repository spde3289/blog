import PostHeader from "@/components/posts/post/PostHeader";
import GiscusApp from "@/components/posts/post/GiscusApp";
import { PostContainer, Main, TextBox, ReferenceLink, SubTitle, List } from "../style";
import CodeContainer from "@/common/components/CodeContainer";

const code1 = `
  for([초기문]; [조건문]; [증감문]) {
    // 반복하여 실행할 코드
  };

  for(let i = 0; i <= 3; i++) {
    console.log(i); // 0부터 3까지 출력
  };

`;

const code2 = `
  const object = { a: 1, b: 2, c: 3 };

  for (const property in object) {
    console.log(property); // 객체의 프로퍼티를 출력해준다
  }

  // a
  // b
  // c

`;

const code3 = `
  const object = [
    {a: 1}, 
    {b: 2}, 
    {c: 3}
  ];

  for (const property of object) {
    console.log(property); // 객체의 프로퍼티를 출력해준다
  }

  // {a: 1}
  // {b: 2}
  // {c: 3}

`;

const code4 = `
  while (조건식) {
    // 반복 실행할 코드
  }

  let i = 1;
  while (i <= 10) {
    console.log(i); // 1부터 10까지 출력
    i++;
  }

`;

const code5 = `
  do {
    // 반복 실행할 코드
  } while (조건식);

  let i = 1;
  do {
      console.log(i); // 1부터 10까지 출력
      i++;
  } while (i <= 10);

`;

export default function JsLoop() {

  return (
    <PostContainer>
      <PostHeader title='자바스크립트 반복문' tagName='javascript' date='2023.04.15' />
      <Main>
        <SubTitle>반복문의 종류</SubTitle>
        <List>
          <li>for 문</li>
          <li>for...in 문</li>
          <li>for...of 문</li>
          <li>while 문</li>
          <li>do...while 문</li>
        </List>
        <SubTitle size='sub'>for 문</SubTitle>
        <TextBox>for 문은 특정한 조건이 거짓이 될 때 까지 반복한다.</TextBox>
        <CodeContainer>
          {code1}
        </CodeContainer>
        <SubTitle size='sub'>for...in 문</SubTitle>
        <TextBox>for...in 문은 객체의 속성을 열거할 때 유용하게 활용된다. 하지만 일반적인 배열에도 사용이 가능하다.</TextBox>
        <CodeContainer>
          {code2}
        </CodeContainer>
        <SubTitle size='sub'>for...of 문</SubTitle>
        <TextBox>for...of 문은 배열이나 이터러블(iterable) 객체의 각 요소들을 반복적으로 순회하는 데 사용된다.</TextBox>
        <CodeContainer>
          {code3}
        </CodeContainer>
        <SubTitle size='sub'>while 문</SubTitle>
        <TextBox>while 문은 주어진 조건식이 참이 될 때 까지 반복한다.</TextBox>
        <CodeContainer>
          {code4}
        </CodeContainer>
        <SubTitle size='sub'>do...while 문</SubTitle>
        <TextBox>do...while 문은 우선 코드를 실행 한 후 조건식이 참이면 반복하여 실행한다.</TextBox>
        <CodeContainer>
          {code5}
        </CodeContainer>
        <TextBox>
          참고자료 : <br />
          <ReferenceLink href='https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Loops_and_iteration' target='_blank'>
            https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Loops_and_iteration
          </ReferenceLink>{" "}
          <br />
        </TextBox>
      </Main>
      <GiscusApp />
    </PostContainer>
  );
}
