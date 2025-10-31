---
title: 타입스크립트 타입 추론
tags: [typeScript]
date: "2023.08.15"
---
## 타입추론 

타입스크립트에서는 명시적인 타입 표시가 없을때 타입에 대한 정보를 제공한다.

```javascript

  // 일반적인 유형
  let x = 3; // x는 number로 추론된다.

  // 구조분해 코드
  let arr = [0, 1, null]; 
  let [a, b, c] = arr; // a, b, c는 number | null 타입으로 추론된다.


```
일반적인 뿐만이 아니라 구조분해 코드에서도 타입추론이 되어 유용하게 사용 할 수 있다. 

타입추론이 이렇게 유용하다면 타입을 적어주지 않아도 될까? 그렇다면 타입스크립트를 사용하는 의미가 없어진다고 생각한다. 그럼 타입추론을 사용할 때와 강력한 타입 규칙을 사용 예시를 들어보도록 하겠다.

```javascript

  // string 으로 추론이 된다.
  const theme = {
    dark : "dark", 
    light : "light",
  }


```
위와 같이 다크모드 인지 라이트모드인지 명시 되어 있는 문자열 리터럴 타입이 있다. 하지만 확인해 보면 value가 srting으로 되어 있는데 이럴 땐 직접 타입을 지정해 주어야 원치 않는 에러를 막을 수 있다.

```javascript

  type ThemeObj = {
    dark: "dark";
    light: "light";
  };

  const theme: ThemeObj = {
    dark : "dark",
    light : "light",
  }
  
  // 혹은
  const theme = {
    dark : "dark",
    light : "light",
  } as const


```
[https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions) 

[https://www.typescriptlang.org/docs/handbook/type-inference.html](https://www.typescriptlang.org/docs/handbook/type-inference.html) 
