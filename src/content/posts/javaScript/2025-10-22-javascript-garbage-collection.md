---
title: JavaScript 가비지 컬렉션 도달 가능성과 참조 그래프
tags: ["JavaScript", "메모리", "Garbage Collection", "WeakMap", "WeakSet"]
date: "2025.10.22"
---

`WeakMap`, `WeakSet`을 정리하기 전에 “자바스크립트가 메모리를 언제 해제하는지”를 먼저 잡고 가는 게 필요했다.  
결국 Weak 컬렉션의 핵심도 “GC가 회수할 수 있는 참조냐”로 이어지기 때문이다.

## 가비지 컬렉션이란?

C/C++ 같은 언어는 개발자가 직접 메모리를 할당하고 해제한다.  
반면 자바스크립트는 **가비지 컬렉션(GC)**으로 메모리 할당/해제를 자동으로 처리한다.

## 메모리가 관리되는 흐름

자바스크립트는 실행 중에 보통 아래 단계를 반복한다.

1. **할당(Allocation)**: 변수를 선언하거나 객체를 만들 때 메모리를 확보한다.
2. **사용(Use)**: 값에 접근해서 읽거나 수정한다.
3. **해제(Release)**: 더 이상 접근할 수 없는 값을 회수한다.

예시를 보면:

```js
function createUser() {
  const user = {
    name: "jihun",
    age: 25,
  };
  return user;
}

const user1 = createUser(); // 객체가 생성되며 힙에 할당됨
```

`createUser()`가 실행될 때 객체 `user`는 힙(Heap)에 만들어진다.
그리고 `user1`이 그 객체를 참조하고 있으니, 그 메모리는 “살아있는 상태”로 남는다.

## 메모리 해제 기준은 “도달 가능성(Reachability)”

가비지 컬렉터는 **도달할 수 없는 객체(Unreachable Object)**를 찾아 제거한다.
즉, 현재 실행 중인 코드에서 더 이상 참조할 수 없는 값은 쓸모 없다고 보고 회수한다.

```js
let user = { name: "jihun" };

user = null; // 참조가 끊김
```

`{ name: "jihun" }` 객체는 더 이상 어떤 변수에서도 참조하지 않는다.
이 시점부터 가비지 컬렉터 입장에서는 “도달 불가능” 후보가 된다.

## 도달 가능성의 루트(root)

도달 가능성을 판단할 때 기준이 되는 시작점이 있다. 보통 아래를 루트로 본다.

* 전역 객체(window / globalThis)
* 현재 실행 중인 함수의 지역 변수와 매개변수
* 콜스택 내에서 참조되고 있는 클로저 변수

가비지 컬렉터는 루트에서 시작해서 참조 그래프를 따라가며 연결된 객체를 “살아있음”으로 표시한다.
연결되지 않은 객체는 “죽은 객체”로 보고 회수한다.

### 참조 그래프 예시

```js
// 전역 변수(루트)
let person = { name: "jihun" };

person.info = { age: 25, hobby: "coding" };
person.info.detail = { city: "Seoul" };
```

구조를 단순화하면:

```txt
[전역 객체] → person → { name, info } → { age, hobby, detail } → { city }
```

루트에서 모든 객체로 경로가 이어지니 전부 도달 가능이다.

그럼 `person`이 다른 객체를 가리키도록 바꾸면:

```js
person = { name: "minsu" };
```

이제 참조 관계는 이렇게 바뀐다.

```txt
[전역 객체] → person → { name: "minsu" }

(이전 그래프)
❌ { name: "jihun", info: { age, hobby, detail: { city } } }
```

이전 객체는 어디에서도 참조하지 않으니 도달 불가능이 되고, 회수 대상이 된다.

## 내부 동작: mark-and-sweep

가비지 컬렉션은 보통 **mark-and-sweep 계열**을 기반으로 동작한다(엔진마다 최적화 방식은 다를 수 있다).

1. **Mark(표시)**: 루트에서 출발해 도달 가능한 객체를 전부 표시한다.
2. **Sweep(정리)**: 표시되지 않은 객체를 메모리에서 제거한다.

간단한 그림으로 보면:

```txt
[전역 객체] → A → B → C
                ↘︎ D

E (연결 없음)

🟢 A, B, C, D : 도달 가능
🔴 E : 도달 불가능 → 회수 대상
```

### “참조가 남아 있으면” 회수되지 않는다

```js
let user = { name: "jihun" };
let admin = user;

user = null; // admin이 여전히 참조 중

console.log(admin.name); // "jihun"
```

`user`만 끊어도 `admin`이 참조 중이면 객체는 도달 가능 상태라서 회수되지 않는다.

## 클로저와 메모리 유지

클로저도 같은 원리로 “참조가 남는 값”을 만들 수 있다.

```js
function createCounter() {
  let count = 0;

  return function () {
    count++;
    console.log(count);
  };
}

const counter = createCounter();
counter(); // 1
```

`count`는 외부에서 직접 접근할 수 없지만, `counter`가 계속 참조하고 있다.
그래서 `counter`가 살아있는 동안 `count`도 메모리에 유지된다.

> 필요 없는 클로저는 만들지 않거나, 참조를 끊는 방식으로 수명 관리를 의식하는 게 좋다.

## 실무에서 자주 하는 메모리 누수 방지 체크

1. **이벤트 리스너 해제**

   ```js
   element.addEventListener("click", handleClick);
   // ...
   element.removeEventListener("click", handleClick);
   ```

2. **타이머/인터벌 정리**

   ```js
   const timer = setInterval(() => {}, 1000);
   clearInterval(timer);
   ```

3. **전역 변수 최소화**

   * 전역에 남은 참조는 앱이 종료될 때까지 유지될 수 있다.

4. **불필요한 클로저 남용 피하기**

   * 함수가 끝난 뒤에도 내부 변수를 계속 참조하면 메모리가 유지된다.

## 정리

자바스크립트는 GC 덕분에 메모리 해제를 직접 호출하진 않지만,
**참조가 끊기지 않는 값은 GC 대상이 되지 않는다**는 점은 항상 신경 써야 한다.

* 가비지 컬렉터는 **도달 가능성**을 기준으로 동작한다.
* 루트에서 시작해 참조 그래프를 따라가며 살아있는 객체를 표시한다.
* 표시되지 않은 객체를 회수한다(mark-and-sweep 계열).

## 참고자료

* MDN - 메모리 관리: [https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Memory_management](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Memory_management)
* 모던 자바스크립트 튜토리얼 - 가비지 컬렉션: [https://ko.javascript.info/garbage-collection](https://ko.javascript.info/garbage-collection)

