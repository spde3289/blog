---
title: Prototype 이해하기
tags: [javaScript]
date: "2024.11.16"
---
자바스크립트는 객체 지향 언어로 객체를 상속하기 위해 프로토타입이라는 방식을 사용합니다.


이 프로토타입 덕분에 객체에서 `hasOwnProperty`같은 메소드를 부모 객체로 부터 상속받아 사용할 수 있게 됩니다.
```js
const student = {
  name: 'Lee',
  score: 90
};

// student에는 hasOwnProperty 메소드가 없지만 아래 구문은 동작합니다.
console.log(student.hasOwnProperty('name')); // true

console.dir(student);
```
![프로토타입 객체](/img/javascript/Javascript-Prototype/proto.png)
위의 내용이 이해하기 힘들다면 [자바스크립트의 값과 레퍼런스](https://www.spde3289.dev/posts/javascript/ValueAndRefernce) 게시글을 한번 읽고 오시는걸 추천합니다.  

## Prototype 이해하기 이전에
자바스크립트의 원시값(문자열, 숫자 등)은 일시적으로 객체로 변환되어 프로토타입 메서드를 사용할 수 있습니다.  
이 현상을 오토박싱(Auto-boxing)이라고 하며 자바스크립트가 자동으로 값을 랩핑해 주기 때문에 명시적 래퍼 객체 생성은 지양해야 합니다.
```js
const num = 123; // 
const numObj = new Number(123); // 불필요한 객체 생성

console.log(typeof num); // number
console.log(typeof numObj); // "object" (원시값이 아님)
```

## [[Prototype]] vs prototype 프로퍼티
### 두 프로퍼티의 역할
- [[Prototype]]은 객체 내부의 인터널 슬롯으로 객체가 다른 객체의 속성을 참조할 때 사용됩니다.
- prototype 프로퍼티는 함수 객체에서만 볼 수 있으며, 해당 함수를 생성자 함수로 사용할 때 새로 생성되는 객체의 [[Prototype]]을 지정하는 역할을 합니다.

`__proto__`로 접근 가능하지만 `Object.getPrototypeOf()`사용을 권장합니다
```js
function Person(name) {
  this.name = name;
}

var foo = new Person('Lee');

console.dir(Person); // prototype 프로퍼티가 있다.
console.dir(foo);    // prototype 프로퍼티가 없다.

console.log(Object.getPrototypeOf(Person) === Function.prototype);
console.log(Person.prototype === Object.getPrototypeOf(foo));
```



![prototype](/img/javascript/Javascript-Prototype/prototype.png)

## Prototype chain
객체의 프로퍼티나 메소드에 접근하려고 할 때 다음의 순서로 탐색을 합니다.
- 자신의 프로퍼티 검색
- 없으면 __proto__로 이동
- 최상위 Object.prototype까지 반복
- 없으면 undefined
이를 프로토타입 체인이라고 합니다.

## 프로토타입 활용
이런 프로토타입을 이해하고 있으면 모든 인스턴스가 공통된 메서드를 가질 수 있습니다.
```js
// 프로토타입에 함수 할당
function Person(name) {
  this.name = name;
}

// 모든 Person 인스턴스가 공유하는 메서드
Person.prototype.greet = function () {
  console.log(`안녕! 나는 ${this.name}`);
};

const john = new Person("John");
john.greet(); // "안녕! 나는 John"
```
내장 객체에도 `Array.prototype`를 이용해 커스텀 메서드를 생성할 수 있지만  
`prototype`이 오염될 수 도 있기 때문에 신중하게 사용해야 합니다.


## 참고 자료
[MDN 공식 문서](https://developer.mozilla.org/ko/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)  
[모던 자바스크립트 프로토타입](https://poiemaweb.com/js-prototype)