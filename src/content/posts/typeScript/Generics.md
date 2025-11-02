---
title: 타입스크립트 제너릭
tags: [typeScript]
date: "2023.07.11"
---
## 제너릭이란? 

제너릭이란 타입을 파라미터처럼 사용 할 수 있는걸 의미한다. 제너릭의 장점으로는 다양한 타입에 대한 재사용성이 올라간다는 점이 있다.

```javascript

  const returnFunction = (arg: number): number => {
    return arg;
  };


```
위의 코드를 보면 받은 파라미터를 그대로 반환해 주는데 받은 파라미터 타입이 number가 아니라면? 타입별로 함수를 만들어주게 되면 코드의 재사용성도 떨어지고 유지보수도 힘들어진다. 이떄 사용하면 좋은게 제러릭이다.

```javascript

  const returnFunction = <T>(arg: T): T => {
    return arg;
  };

  returnFunction<number>(10);
  returnFunction<string>("10");
  returnFunction<boolean>(true);


```
만약 파라미터로 받은 값의 length를 확인 하고싶어 아래와 같이 작성하면 에러를 반환하게 된다. (Property 'length' does not exist on type 'T') 이때 제너릭에 배열임을 명시해주면 된다.

```javascript

  const returnFunction = <T>(arg: T): T => {
    return arg.length;
  };  
  

```
1번과 2번은 같은 의미이다.

```javascript

  // 1
  const returnFunction = <T>(arg: T[]): T[] => {
    return arg.length;
  };
  // 2
  const returnFunction = <T>(arg: Array<T>): Array<T> => {
    return arg.length;
  };

  returnFunction<number>(10);


```
ts파일에서의 화살표 함수를 사용할때는 이렇게 사용하면 되는데 tsx파일에서 제너릭을 사용하게 되면 (JSX element 'T' has no corresponding closing tag.) 같은 에러가 발생한다. 를 태그로 인식해 발생하는 문제인데 이때는 아래와 같이 사용하면 된다.

```javascript

  const returnFunction = <T extends {}>(arg: T): T => {
    return arg;
  };


```
[https://www.typescriptlang.org/docs/handbook/generics.html](https://www.typescriptlang.org/docs/handbook/generics.html) 

[https://joshua1988.github.io/ts/guide/generics.html#%EC%A0%9C%EB%84%A4%EB%A6%AD-%EC%A0%9C%EC%95%BD-%EC%A1%B0%EA%B1%B4](https://joshua1988.github.io/ts/guide/generics.html#%EC%A0%9C%EB%84%A4%EB%A6%AD-%EC%A0%9C%EC%95%BD-%EC%A1%B0%EA%B1%B4) 

[https://lakelouise.tistory.com/188#%F0%9F%93%9D-union-type](https://lakelouise.tistory.com/188#%F0%9F%93%9D-union-type) 
