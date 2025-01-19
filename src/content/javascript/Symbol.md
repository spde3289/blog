---
title: Symbol에 대해서
tags: [javascript]
date: "2023.04.11"
---
Symbol은 ES6에서 추가된 7번째 데이터 타입이다. 심볼은 주로 이름의 충돌 위험이 없는 객체의 프로퍼티 키를 만들기 위해서 사용한다.

## Symbol의 생성 

Symbol은 Symbol()함수를 호출하어 생성한다 이때 생성된 Symbol은 객체가 아니라 변경 불가능한 원시타입의 값이다.

```javascript

  const mySymbol = Symbol();

  console.log(mySymbol); // Symbol()
  console.log(typeof mySymbol); // symbol


```
이렇게 보면 생성자 함수로 객체를 생성하는 것처럼 보이지만 Symbol함수는 String, Number, Boolean 생성자와 달리 new 연산자와 함께 호출하지 않는다.

```javascript

  new Symbol(); // TypeError: Symbol is not a constructor


```
Symbol함수에는 문자열을 인수로 전달할 수 있는데 이 문자열은 심벌 값에 대한 설명, 디버깅 용도로만 사용된다.

```javascript

  // 심벌 값에 대한 설명이 같더라도 유일무이한 심벌 값을 생성한다.
  const mtSymbol1 = Symbol("mySymbol");
  const mtSymbol2 = Symbol("mySymbol");

  console.log(mySymbol1 === mtSymbol2); //false


```
## Symbol과 프로퍼티 은닉 

어떠한 외부에서 가져온 객체에 값을 추가해야 하는 상황이 있다고 할때 symbol을 이용할 수 있다.

```javascript

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


```
심벌은 중복되지 않는 상수 값을 생성하는 것은 물론 기존에 작성된 코드에 영향을 주지 않고 새로운 프로퍼티를 추가하기 위해 도입되었다.

## Symbol 객체 

한번 브라우저 콘솔에서 Symbol함수를 참조해보자

![백엔드 이미지](/img/javascript/Symbol/SymbolObject.png)
자바스크립트에서 기본제공하는 심벌 값을 Well-know Symbol 이라고 부른다. 이는 자바스크립트 엔진의 내부 알고리즘에 사용되는데 예를 들어 Array, String, Map, Set, TypedArray, arguments, NodeList, HtmlCollection과 같이 for of문으로 순회 가능한 빌트인 이터러블은 Well-known Symbol인 symbol.iterator를 키로 갖는 메서드를 가지며, symbol.iterator 메서드를 호출하면 이터레이터를 반환하도록 ECMAScript 사양에 규정되어 있다. 빌트인 이터러블은 이터레이션 프로토콜을 준수한다. 만약 빌트인 이터레블이 아닌 객체를 이터레블처럼 동작하도록 구현 하고 싶으면 이터레이션 프로토콜을 따르면 된다.

참고자료 : 

[https://ko.javascript.info/symbol](https://ko.javascript.info/symbol) 

[https://poiemaweb.com/es6-symbol](https://poiemaweb.com/es6-symbol) 

[https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Symbol](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Symbol) 
