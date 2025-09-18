---
title: 타입스크립트 타입 종류
tags: [typeScript]
date: "2023.05.09"
---
타입스크립트에 대한 수요가 늘어나 타입스크립트를 공부하면서 정리해보려 한다. 타입스크립트는 타입을 지정해 줌으로써 기존 자바스크립트에서 발생하는 에러를 미리 예방 할 수 있다는 장점이 있다.

## 타입스크립트 기본타입 

- Boolean
- Number
- String
- Array
- Tuple
- Enum
- any
- void
- Object
- never
## Boolean 

참/거짓(true/false)에 대한 타입이다

```javascript

  const isTrue: boolean = false;


```
## Number 

값이 숫자이면 다음과 같이 선언한다.

```javascript

  const num: number = 6;


```
## String 

값이 문자열이면 다음과 같이 선언한다.

```javascript

  const str: string = 'string';


```
## Array 

값이 배열일 경우 다음과 같이 선언한다.

```javascript

  const arr: number[] = [1,2,3];
  const arr: Array<number> = [1,2,3];


```
## Tuple 

Tuple은 배열의 길이가 고정되고 각 요소의 타입이 지정되어 있는 배열 형식을 의미합니다.

```javascript

  let arr: [string, number] = ['hi', 10];
  // 정의 하지 않은 타입, 인덱스로 접근할 경우 오류가 난다.
  arr[1].concat('!'); // Error, 'number' does not have 'concat'
  arr[5] = 'hello'; // Error, Property '5' does not exist on type '[string, number]'.


```
## Enum 

Enum은 C, Java와 같은 다른 언어에서 흔하게 쓰이는 타입으로 특정 값(상수)들의 집합을 의미합니다.

```javascript

  enum Avengers { Capt, IronMan, Thor }
  let hero: Avengers = Avengers.Capt;
  //
  enum Avengers { Capt, IronMan, Thor }
  let hero: Avengers = Avengers[0];
  //
  enum Avengers { Capt = 2, IronMan, Thor }
  let hero: Avengers = Avengers[2]; // Capt
  let hero: Avengers = Avengers[4]; // Thor


```
## any 

any는 모든 타입에 대해서 혀용한다는 의미를 가지고 있다 하지만 너무 남발하게 되면 TypeScript를 사용하는 의미를 잃어버리니 조심하도록 하자.

```javascript

  const str: any = 'hi';
  const num: any = 10;
  const arr: any = ['a', 2, true];


```
## void 

void는 어떤 값도 존재 할 수 없을을 나타낸다.

```javascript

  let unusable: void = undefined;
  unusable: void = null;
  // 함수일 경우 반환 하는 값이 없으면 void로 지정한다.
  function returnNothing(): void {
    return;
  }


```
## object 

object는 interface, class의 상위 타입이다. object로 정의하면 any타입처럼 모든 값을 할당 할 수 있다. 하지만 any와 같이 typeScript를 사용하는 의미가 없어지니 조심하자.

```javascript

  let obj: object = { name: 'NAME', age: 29 };

  obj = { A: 'A', B: 'B' };


```
## Never 

Never타입은 절대 발생할 수 없는 타입을 나타낸다.

```javascript

  // never를 반환하는 함수는 함수의 마지막에 도달할 수 없다.
  function error(message: string): never {
      throw new Error(message);
  }
  
  // 반환 타입이 never로 추론된다.
  function fail() {
      return error("Something failed");
  }
  
  // never를 반환하는 함수는 함수의 마지막에 도달할 수 없다.
  function infiniteLoop(): never {
      while (true) {
      }
  }


```
[https://joshua1988.github.io/ts/guide/basic-types.html](https://joshua1988.github.io/ts/guide/basic-types.html) 

[https://www.typescriptlang.org/docs/handbook/2/everyday-types.html](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html) 

[https://joshua1988.github.io/ts/guide/basic-types.html#%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EA%B8%B0%EB%B3%B8-%ED%83%80%EC%9E%85](https://joshua1988.github.io/ts/guide/basic-types.html#%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EA%B8%B0%EB%B3%B8-%ED%83%80%EC%9E%85) 
