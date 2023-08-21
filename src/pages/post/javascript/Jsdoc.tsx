import PostHeader from "@/components/posts/post/PostHeader";
import GiscusApp from "@/components/posts/post/GiscusApp";
import { PostContainer, Main, TextBox, ReferenceLink, SubTitle } from "../style";
import { example1, example2, example3, example4 } from "./imgs/JSDoc";
import CodeContainer from "@/common/components/CodeContainer";

const code1 = `
  /**
   * 가격과 개수 입력받아 출력하는 함수
   * @param {number} price 가격 입력란 입니다
   * @param {number} count 개수 입력란 입니다
   * @returns 가격과 개수를 곱한 값을 출력합니다.
   */
  const sum = (price, count) => {
    return price * count;
  };

`;

const code2 = `
  /**
   * 가격과 개수 입력받아 출력하는 함수
   * @param {number} price 가격 입력란 입니다
   * @param {number} count 개수 입력란 입니다
   * @returns 가격과 개수를 곱한 값을 출력합니다.
   */
  const sum = (price, count) => {
    return price * count;
  };

`;

const code3 = `
  /**
   * @type {string}
   */
  const name = '곽철용';

`;

const code4 = `
  /**
  * @see {@link https://example.com| 더 많은 정보}
  */
  const sum = ({price, count}) => {
    return price * count;
  };

`;

export default function Jsdoc() {

  return (
    <PostContainer>
      <PostHeader title='Jsdoc주석에 대해서 알아보자' tagName='javascript' date='2023.02.26' />
      <Main>
        <TextBox>
          JSDoc 주석은 JavaScript 코드에 추가되는 문서화 주석이다. <br />이 주석은 함수, 변수, 객체의 설명, 타입정보 등을 제공할 수 있다. <br />
        </TextBox>
        <SubTitle>JSDoc 주석 사용법</SubTitle>
        <CodeContainer>
          {code1}
        </CodeContainer>
        <img src={example1} alt='JSDoc주석 힌트' />
        <TextBox>이와 같이 함수를 호출 할 때 주석를 보여주게 된다.</TextBox>
        <SubTitle size='sub'>@deprecated</SubTitle>
        <TextBox>해당태그를 사용하면 취소선을 그어준다</TextBox>
        <CodeContainer>
          {code2}
        </CodeContainer>
        <img src={example2} alt='JSDoc주석 힌트' />
        <SubTitle size='sub'>@type</SubTitle>
        <TextBox>해당태그를 사용하면 타입을 명시 할 수 있다.</TextBox>
        <CodeContainer>
          {code3}
        </CodeContainer>
        <img src={example3} alt='JSDoc주석 힌트' />
        <SubTitle size='sub'>@see</SubTitle>
        <TextBox>해당태그를 리소스를 참조할 떄 사용할 수 있다.</TextBox>
        <CodeContainer>
          {code4}
        </CodeContainer>
        <img src={example4} alt='JSDoc주석 힌트' />
        <TextBox>이것 말고도 더 다양한 태그들이 있으니 JSDoc 참고 사이트를 확인해보도록 하자</TextBox>
        <SubTitle>참고 사이트</SubTitle>
        <ReferenceLink href='https://jsdoc.app/' target='_blank'>
          https://jsdoc.app/
        </ReferenceLink>
      </Main>
      <GiscusApp />
    </PostContainer>
  );
}
