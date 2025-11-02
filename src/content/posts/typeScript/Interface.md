---
title: 타입스크립트 인터페이스
tags: [typeScript]
date: "2023.05.13"
---
타입스크립트에서는 인터페이스를 활용해 변수의 타입으로 사용할 수 있다. 인터페이스는 클래스와 비슷한데 클래스와는 다르게 정의만 할 뿐 구현이 되지 않는다는 차이점이 있다. 타입스크립트에서 인터페이스는 상호 간에 정의한 약속 혹은 규칙을 의미한다. 인터페이스는 보통 다음과 같은 범주에 대해 정의할 수 있다.

- 객체의 스펙(속성과 속성의 타입)
- 함수의 파라미터
- 함수의 스펙(파라미터, 반환 타입 등)
- 배열과 객체를 접근하는 방식
- 클래스
## 인터페이스 알아보기 

인터페이스는 변수의 타입으로 사용할 수 있다.

```javascript

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


```
## 옵셔널 속성 

인터페이스에는 ? 를 사용해서 옵셔널한 속성을 부여할 수 있다. 옵셔널한 속성을 부여하면 모든 속성을 사용하지 않아도 된다.

```javascript

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


```
## 읽기 전용 속성 

읽기 전용 속성은 객체를 생성할때 값을 할당하면 그 이후에는 바꿀 수 없는 속성을 의미한다 readonly 속성을 앞에 사용하면 된다. 또한 ReadonlyArray 를 사용하면 배열또한 읽기전용으로 지정 할 수 있습니다.

```javascript

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


```
```javascript

  const arr: ReadonlyArray<number> = [1,2,3];
  arr.splice(0,1); // error
  arr.push(4); // error
  arr[0] = 100; // error

```
## 객체 선언과 관련된 타입 체킹 

타입스크립트를 사용한다면 좀 더 엄밀한 속성 검사를 진행한다.

```javascript

  interface Info {
    name: string;
  }

  function person(info: Info) {
    // 어쩌구 저쩌구 내부 동작
  }
  person({nameoas: "Lee"}) 
  // Argument of type '{ nameoas: string; }' is not assignable to parameter of type 'Info'.
  // Object literal may only specify known properties, and 'nameoas' does not exist in type 'Info'.


```
인터페이스에 선언되어 있는 속성과 다를경우 오탈자 점검을 요하는 오류가 난다. 만일 이런 타입 추론을 무시하고 싶다면 아래와 같이 선언한다.

```javascript

  const info = { age: 'what' }';
  brewBeer(info as Info);
  // 만일 인터페이스에 정의하지 않은 속성들을 추가로 사용하고 싶을 때는 아래와 같은 방법을 사용하면 된다.
  interface Info {
    name?: string;
    [propName: string]: any;
  }


```
## 클래스 타입 

C#이나 자바처럼 타입스크립트에서도 클래스가 일정 조건을 만족하도록 타입 규칙을 정할 수 있다.

```javascript

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


```
## 인터페이스 확장 

클래스와 마찬가지로 인터페이스도 인터페이스 간 확장이 가능하다.

```javascript

  interface Info {
    name: string;
  }
  interface Developer extends Info {
    skill: string;
  }
  let fe = {} as Developer;
  fe.name = 'Lee';
  fe.skill = 'TypeScript';


```
혹은 아래와 같이 여러 인터페이스를 상속받아 사용할 수 있다.

```javascript

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


```
[https://poiemaweb.com/typescript-interface](https://poiemaweb.com/typescript-interface) 

[https://joshua1988.github.io/ts/guide/interfaces.html#%EC%9D%B8%ED%84%B0%ED%8E%98%EC%9D%B4%EC%8A%A4](https://joshua1988.github.io/ts/guide/interfaces.html#%EC%9D%B8%ED%84%B0%ED%8E%98%EC%9D%B4%EC%8A%A4) 
