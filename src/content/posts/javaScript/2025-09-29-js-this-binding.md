---
title: this 바인딩 규칙
tags: ["JavaScript", "this", "실행 컨텍스트"]
date: "2025.09.29"
---

`this`는 “어디서 정의했는지”보다 “어떻게 호출했는지”에 의해 결정된다.  
그래서 규칙을 **호출 방식** 기준으로 외우는 게 제일 덜 헷갈린다.

## `this` 바인딩 규칙

### (1) 전역 컨텍스트 (top-level)

전역에서의 `this`는 **환경**에 따라 달라진다.

- 브라우저 **일반 스크립트(script)**: `this === window`
- 브라우저 **모듈(module)**: `this === undefined`
- Node.js **CommonJS 모듈**: `this === module.exports` (초기엔 `{}`)
- Node.js **ESM 모듈**: `this === undefined`

```js
console.log(this);
```

> 참고로 “전역 객체”를 안전하게 쓰려면 `window` 대신 `globalThis`가 덜 위험하다.

---

### (2) 일반 함수 호출

함수를 “그냥 호출”하면 `this`는 기본 바인딩 규칙을 따른다.

* **sloppy mode(비 strict)**: `this === globalThis`
* **strict mode**: `this === undefined`

```js
function foo() {
  console.log(this);
}

foo(); // sloppy: globalThis, strict: undefined
```

> ES module은 기본이 strict라서, 모듈 안에서 이런 호출은 대부분 `undefined`가 나온다.

---

### (3) 메서드 호출

`obj.fn()` 형태로 호출하면 `this`는 **점(.) 앞의 객체(obj)**로 바인딩된다.

```js
const obj = {
  name: "jihun",
  greet() {
    console.log(this.name);
  },
};

obj.greet(); // "jihun"
```

자주 실수하는 케이스는 “메서드를 떼서 호출”하는 경우다.

```js
const greet = obj.greet;
greet(); // this가 obj가 아니다 (sloppy면 globalThis, strict면 undefined)
```

---

### (4) 생성자 함수 호출 (`new`)

`new`로 호출하면 `this`는 **새로 만들어진 인스턴스**를 가리킨다.

```js
function Person(name) {
  this.name = name;
}

const p = new Person("jihun");
console.log(p.name); // "jihun"
```

추가로, 생성자에서 **객체를 return**하면 그 객체가 결과로 나간다(원래 인스턴스 대신).

---

### (5) `call`, `apply`, `bind`

원하는 객체를 `this`로 **명시 지정**할 수 있다.

* `call` / `apply`: 즉시 실행
* `bind`: `this`가 고정된 새 함수 반환

```js
function greet() {
  console.log(this.name);
}

const user = { name: "jihun" };

greet.call(user);  // "jihun"
greet.apply(user); // "jihun"

const bound = greet.bind(user);
bound(); // "jihun"
```

---

### (6) 화살표 함수

화살표 함수는 **자기 `this`가 없다.**
대신 **바깥 스코프의 `this`(lexical this)**를 그대로 캡처한다.

```js
const obj = {
  name: "jihun",
  arrow: () => console.log(this),
  normal: function () {
    console.log(this);
  },
};

obj.normal(); // obj
obj.arrow();  // obj가 아니다 (바깥 this)
```

`obj.arrow()`라고 “호출 방식이 메서드”처럼 보이더라도, 화살표 함수는 그 규칙을 무시하고 바깥 `this`를 쓴다.

---

## 이벤트 핸들러에서의 `this`

DOM 이벤트에서 `addEventListener`의 콜백을 **일반 함수로** 넘기면 `this`는 보통 “이벤트가 걸린 요소”다.

```js
button.addEventListener("click", function () {
  console.log(this); // button 요소
});
```

화살표 함수를 쓰면 `this`는 요소가 아니라 **바깥 this**가 된다.
(브라우저 모듈이면 `undefined`일 수도 있다.)

```js
button.addEventListener("click", () => {
  console.log(this); // 바깥 this
});
```

## 요약

* `this`는 호출 방식으로 결정된다.
* 일반 함수 호출: sloppy면 `globalThis`, strict면 `undefined`
* 메서드 호출: `obj.fn()`에서 `this === obj` (단, 떼서 호출하면 깨진다)
* `new`: 새 인스턴스
* `call/apply/bind`: 강제 지정
* 화살표 함수: 자기 `this` 없음, 바깥 `this`를 캡처
