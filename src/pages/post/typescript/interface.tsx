import { PostHeader, GiscusApp } from "../../../components/posts/post";
import { PostContainer, Main, TextBox, ReferenceLink, SubTitle, List } from "../style";
import CodeContainer from "@/common/components/CodeContainer";

const code1 = `
  // 인터페이스의 정의
  interface Info {
    name: string;
    age: number;
  }

  // 변수 info의 타입으로 Info 인터페이스를 선언하였다.
  const info: Info = {
    name: "Kim",
    age: 22
  };

`;

const code2 = `
  interface Info {
    name: string;
    age?: number; // 속성의 끝에 ?를 사용해준다
  }

  const info = {
    name: "Kim"
  };

  function person(info: Info) {
    console.log(info.name) // Kim
  }
  person(info)

`;

const code3 = `
  interface Info {
    readonly name: string;
    age: number; 
  }

  const info: Info = {
    name: "Kim",
    age: 22
  };

  info.name = Lee // Cannot assign to 'name' because it is a read-only property.
  info.age = 30

`;

const code4 = `
  const arr: ReadonlyArray<number> = [1,2,3];
  arr.splice(0,1); // error
  arr.push(4); // error
  arr[0] = 100; // error
`;

const code5 = `
  interface Info {
    name: string;
  }

  function person(info: Info) {
    // 어쩌구 저쩌구 내부 동작
  }
  person({nameoas: "Lee"}) 
  // Argument of type '{ nameoas: string; }' is not assignable to parameter of type 'Info'.
  // Object literal may only specify known properties, and 'nameoas' does not exist in type 'Info'.

`;

const code6 = `
  const info = { age: 'what' }';
  brewBeer(info as Info);
  // 만일 인터페이스에 정의하지 않은 속성들을 추가로 사용하고 싶을 때는 아래와 같은 방법을 사용하면 된다.
  interface Info {
    name?: string;
    [propName: string]: any;
  }

`;

const code7 = `
  interface Info {
    name: string;
    nameFun(name: string): void;
  }

  class person implements Info {
    name: string = 'Lee';
    nameBeer(b: string) {
      this.name = b;
    }
    constructor() {}
  }

`;

const code8 = `
  interface Info {
    name: string;
  }
  interface Developer extends Info {
    skill: string;
  }
  let fe = {} as Developer;
  fe.name = 'Lee';
  fe.skill = 'TypeScript';

`;

const code9 = `
  interface Person {
    name: string;
  }
  interface Drinker {
    drink: string;
  }
  interface Developer extends Person {
    skill: string;
  }
  let fe = {} as Developer;
  fe.name = 'josh';
  fe.skill = 'TypeScript';
  fe.drink = 'Beer';

`;
export default function InterfaceGenericLearn() {

  return (
    <PostContainer>
      <PostHeader title='타입스크립트 인터페이스' tagName='typescript' date='2023.05.13' />
      <Main>
        <TextBox>
          타입스크립트에서는 인터페이스를 활용해 변수의 타입으로 사용할 수 있다. <br />
          인터페이스는 클래스와 비슷한데 클래스와는 다르게 정의만 할 뿐 구현이 되지 않는다는 차이점이 있다. 타입스크립트에서 인터페이스는 상호 간에 정의한 약속 혹은 규칙을 의미한다. 인터페이스는 보통
          다음과 같은 범주에 대해 정의할 수 있다.
        </TextBox>
        <List>
          <li>객체의 스펙(속성과 속성의 타입)</li>
          <li>함수의 파라미터</li>
          <li>함수의 스펙(파라미터, 반환 타입 등)</li>
          <li>배열과 객체를 접근하는 방식</li>
          <li>클래스</li>
        </List>
        <SubTitle>인터페이스 알아보기</SubTitle>
        <TextBox>인터페이스는 변수의 타입으로 사용할 수 있다.</TextBox>
        <CodeContainer>
          {code1}
        </CodeContainer>
        <SubTitle size='sub'>옵셔널 속성</SubTitle>
        <TextBox>
          인터페이스에는 ? 를 사용해서 옵셔널한 속성을 부여할 수 있다. <br />
          옵셔널한 속성을 부여하면 모든 속성을 사용하지 않아도 된다.
        </TextBox>
        <CodeContainer>
          {code2}
        </CodeContainer>
        <SubTitle size='sub'>읽기 전용 속성</SubTitle>
        <TextBox>
          읽기 전용 속성은 객체를 생성할때 값을 할당하면 그 이후에는 바꿀 수 없는 속성을 의미한다 readonly 속성을 앞에 사용하면 된다. <br />
          또한 ReadonlyArray{"<T>"}를 사용하면 배열또한 읽기전용으로 지정 할 수 있습니다.
        </TextBox>
        <CodeContainer>
          {code3}
        </CodeContainer>
        <CodeContainer>
          {code4}
        </CodeContainer>
        <SubTitle size='sub'>객체 선언과 관련된 타입 체킹</SubTitle>
        <TextBox>타입스크립트를 사용한다면 좀 더 엄밀한 속성 검사를 진행한다.</TextBox>
        <CodeContainer>
          {code5}
        </CodeContainer>
        <TextBox>
          인터페이스에 선언되어 있는 속성과 다를경우 오탈자 점검을 요하는 오류가 난다. <br />
          만일 이런 타입 추론을 무시하고 싶다면 아래와 같이 선언한다.
        </TextBox>
        <CodeContainer>
          {code6}
        </CodeContainer>
        <SubTitle size='sub'>클래스 타입</SubTitle>
        <TextBox>C#이나 자바처럼 타입스크립트에서도 클래스가 일정 조건을 만족하도록 타입 규칙을 정할 수 있다.</TextBox>
        <CodeContainer>
          {code7}
        </CodeContainer>
        <SubTitle size='sub'>인터페이스 확장</SubTitle>
        <TextBox>클래스와 마찬가지로 인터페이스도 인터페이스 간 확장이 가능하다.</TextBox>
        <CodeContainer>
          {code8}
        </CodeContainer>
        <TextBox>혹은 아래와 같이 여러 인터페이스를 상속받아 사용할 수 있다.</TextBox>
        <CodeContainer>
          {code9}
        </CodeContainer>
        참고자료 :<br />
        <ReferenceLink href='https://poiemaweb.com/typescript-interface' target='_blank'>
          https://poiemaweb.com/typescript-interface
        </ReferenceLink>
        <br />
        <ReferenceLink href='https://joshua1988.github.io/ts/guide/interfaces.html#%EC%9D%B8%ED%84%B0%ED%8E%98%EC%9D%B4%EC%8A%A4' target='_blank'>
          https://joshua1988.github.io/ts/guide/interfaces.html
        </ReferenceLink>
        <br />
      </Main>
      <GiscusApp />
    </PostContainer>
  );
}
