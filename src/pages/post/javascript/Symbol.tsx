import PostHeader from "../../../components/posts/post/PostHeader";
import GiscusApp from "../../../components/posts/post/GiscusApp";
import { PostContainer, Main, TextBox, ReferenceLink, CodeContainer, SubTitle, ImgContainer } from "../style";
import SymbolObject from "./imgs/Symbol/SymbolObject.png";

export default function SymbolAbout() {
  const code1 = `
    const mySymbol = Symbol();

    console.log(mySymbol); // Symbol()
    console.log(typeof mySymbol); // symbol
  `;

  const code2 = `
    new Symbol(); // TypeError: Symbol is not a constructor
  `;

  const code3 = `
    // 심벌 값에 대한 설명이 같더라도 유일무이한 심벌 값을 생성한다.
    const mtSymbol1 = Symbol("mySymbol");
    const mtSymbol2 = Symbol("mySymbol");

    console.log(mySymbol1 === mtSymbol2); //false
  `;

  const code4 = `
    const obj ={};

    let my = Symbol("my");

    obj[my] = "나야!";

    for(const key in obj){
      console.log(key); // 아무것도 출력되지 않는다
    };

    console.log(Object.keys(obj)); // []
    console.log(Object.getOwnPropertyNames(obj)); // []
    console.log(obj); // { [Symbol(my)]: 나야! }
    console.log(obj[my]); // 나야!
  `;

  return (
    <PostContainer>
      <PostHeader title='Symbol에 대해서' tagName='javascript' date='2023.04.11' />
      <Main>
        <TextBox>Symbol은 ES6에서 추가된 7번째 데이터 타입이다. 심볼은 주로 이름의 충돌 위험이 없는 객체의 프로퍼티 키를 만들기 위해서 사용한다.</TextBox>
        <SubTitle>Symbol의 생성</SubTitle>
        <TextBox>Symbol은 Symbol()함수를 호출하어 생성한다 이때 생성된 Symbol은 객체가 아니라 변경 불가능한 원시타입의 값이다.</TextBox>
        <CodeContainer>
          <pre>
            <code>{code1}</code>
          </pre>
        </CodeContainer>
        <TextBox>이렇게 보면 생성자 함수로 객체를 생성하는 것처럼 보이지만 Symbol함수는 String, Number, Boolean 생성자와 달리 new 연산자와 함께 호출하지 않는다.</TextBox>
        <CodeContainer>
          <pre>
            <code>{code2}</code>
          </pre>
        </CodeContainer>
        <TextBox>Symbol함수에는 문자열을 인수로 전달할 수 있는데 이 문자열은 심벌 값에 대한 설명, 디버깅 용도로만 사용된다.</TextBox>
        <CodeContainer>
          <pre>
            <code>{code3}</code>
          </pre>
        </CodeContainer>
        <SubTitle>Symbol과 프로퍼티 은닉</SubTitle>
        <TextBox>어떠한 외부에서 가져온 객체에 값을 추가해야 하는 상황이 있다고 할때 symbol을 이용할 수 있다.</TextBox>
        <CodeContainer>
          <pre>
            <code>{code4}</code>
          </pre>
        </CodeContainer>
        <TextBox>심벌은 중복되지 않는 상수 값을 생성하는 것은 물론 기존에 작성된 코드에 영향을 주지 않고 새로운 프로퍼티를 추가하기 위해 도입되었다.</TextBox>
        <SubTitle>Symbol 객체</SubTitle>
        <TextBox>한번 브라우저 콘솔에서 Symbol함수를 참조해보자</TextBox>
        <ImgContainer>
          <img src={SymbolObject} alt='심볼의 객체' />
          Symbol 객체
        </ImgContainer>
        <TextBox>
          자바스크립트에서 기본제공하는 심벌 값을 Well-know Symbol 이라고 부른다. <br />
          이는 자바스크립트 엔진의 내부 알고리즘에 사용되는데 예를 들어 Array, String, Map, Set, TypedArray, arguments, NodeList, HtmlCollection과 같이 for of문으로 순회 가능한 빌트인 이터러블은
          Well-known Symbol인 symbol.iterator를 키로 갖는 메서드를 가지며, symbol.iterator 메서드를 호출하면 이터레이터를 반환하도록 ECMAScript 사양에 규정되어 있다. <br />
          빌트인 이터러블은 이터레이션 프로토콜을 준수한다. 만약 빌트인 이터레블이 아닌 객체를 이터레블처럼 동작하도록 구현 하고 싶으면 이터레이션 프로토콜을 따르면 된다.
        </TextBox>
        <TextBox></TextBox>
        <TextBox>
          참고자료 : <br />
          <ReferenceLink href='https://ko.javascript.info/symbol' target='_blank'>
            https://ko.javascript.info/symbol
          </ReferenceLink>{" "}
          <br />
          <ReferenceLink href='https://poiemaweb.com/es6-symbol' target='_blank'>
            https://poiemaweb.com/es6-symbol
          </ReferenceLink>{" "}
          <br />
          <ReferenceLink href='https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Symbol' target='_blank'>
            https://developer.mozilla.org/Symbol
          </ReferenceLink>
        </TextBox>
      </Main>
      <GiscusApp />
    </PostContainer>
  );
}
