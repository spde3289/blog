---
title: WeakMap과 WeakSet
tags: ["JavaScript", "WeakMap", "WeakSet", "Garbage Collection"]
date: "2025.10.24"
---

## 들어가며

자바스크립트에는 Map, Set 이외에도 WeakMap, WeakSet이라는 자료구조가 있다.

이 둘은 “약한 참조(weak reference)”라는 특성을 가지는데, 이 특성 때문에 메모리 관리에서 Map/Set과 다른 동작을 한다.

이 글을 보기 전에 가비지 컬렉션 개념을 알고 있으면 이해가 더 빠르다.

* [가비지 컬렉션](http://spde3289.dev/blog/javaScript/2025-10-22-javascript-garbage-collection)


## WeakMap

WeakMap은 Map처럼 **키-값(key-value)** 구조를 갖는 자료구조다.

차이는 “키가 약하게 참조된다”는 점이다. 즉, WeakMap의 키로 쓰인 객체가 애플리케이션에서 더 이상 참조되지 않으면(도달 불가능해지면) GC 대상이 되고, 그 키에 연결된 엔트리도 함께 정리될 수 있다.

> 중요한 점: **언제 삭제될지는 보장되지 않는다.**
> GC 타이밍은 런타임이 결정한다.

### 기본 문법

```js
const weakMap = new WeakMap();

let user = { name: "지훈" };
weakMap.set(user, "로그인됨");

console.log(weakMap.get(user)); // "로그인됨"

// user 참조를 제거
user = null;

// 이후 GC가 동작하면,
// WeakMap에서도 해당 엔트리가 정리될 수 있음
```

| 메서드                       | 설명            |
| ------------------------- | ------------- |
| `weakMap.set(key, value)` | 키-값 쌍 저장      |
| `weakMap.get(key)`        | 키에 해당하는 값 반환  |
| `weakMap.has(key)`        | 해당 키 존재 여부 반환 |
| `weakMap.delete(key)`     | 키-값 쌍 삭제      |

Map과 달리 `keys()`, `values()`, `entries()` 같은 순회 메서드가 없고, 반복도 불가능하다.

### 사용 예시: 객체에 “부가 데이터” 붙이기

WeakMap은 객체에 부가 정보를 저장할 때 유용하다. 객체 자체를 수정하지 않고도, 객체에 “따라붙는 데이터”를 만들 수 있다.

```js
const visitsCountMap = new WeakMap();

function countUser(user) {
  const count = visitsCountMap.get(user) || 0;
  visitsCountMap.set(user, count + 1);
}

let user = { name: "지훈" };

countUser(user);
countUser(user);

console.log(visitsCountMap.get(user)); // 2

user = null; // 도달 불가능해짐 → 엔트리도 정리될 수 있음
```

이 패턴의 장점은, user가 사라질 때 “부가 데이터도 같이” 정리될 수 있어서 메모리 누수 위험을 줄일 수 있다는 점이다.

---

## WeakSet

WeakSet은 Set과 비슷하지만 **값으로 객체만 저장할 수 있는 Set**이다.

WeakSet에 들어간 객체가 애플리케이션에서 더 이상 참조되지 않으면 GC 대상이 되고, WeakSet에서도 함께 정리될 수 있다.

```js
let john = { name: "John" };

const visitedSet = new WeakSet();

visitedSet.add(john);
console.log(visitedSet.has(john)); // true

john = null; // 객체 참조 제거 → 이후 정리될 수 있음
```

| 메서드                     | 설명          |
| ----------------------- | ----------- |
| `weakSet.add(value)`    | 객체 추가       |
| `weakSet.has(value)`    | 객체 존재 여부 확인 |
| `weakSet.delete(value)` | 객체 제거       |

WeakSet도 반복/크기 확인/전체 항목 조회가 불가능하다.

## 정리하면

* **WeakMap**

  * Map과 유사하지만 **키는 객체만 가능**하다.
  * 키 객체가 도달 불가능해지면, 그 키에 매핑된 **엔트리가 정리될 수 있다.**
* **WeakSet**

  * Set과 유사하지만 **객체만 저장**할 수 있다.
  * 저장된 객체가 도달 불가능해지면, **항목이 정리될 수 있다.**
* 둘 다

  * 순회(`for...of`) 불가, `size` 확인 불가
  * 구성 요소 하나를 대상으로 하는 메서드만 지원한다.
  * GC 타이밍은 런타임이 결정하므로 “즉시 삭제”를 기대하면 안 된다.

객체에는 “주요 데이터”를 두고, WeakMap/WeakSet에는 “부수적인 데이터(캐시/방문 기록/메타 정보)”를 붙이는 방식으로 많이 쓴다.

## 참고 자료

* [자바스크립트 튜토리얼 - WeakMap과 WeakSet](https://ko.javascript.info/weakmap-weakset)
* [MDN - WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)
* [MDN - WeakSet](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/WeakSet)
