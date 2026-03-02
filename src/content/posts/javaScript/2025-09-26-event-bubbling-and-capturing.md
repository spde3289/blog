---
title: 이벤트 버블링과 캡처링 전파 단계와 target/currentTarget 정리
tags: ["JavaScript", "DOM", "Event", "Frontend"]
date: "2025.09.26"
---

부트캠프에서 이벤트 버블링/캡처링을 다시 들었는데, 면접에서 말로만 설명하고 끝내기엔 아쉬웠다.  
이벤트 전파 단계, `target/currentTarget` 차이, 이벤트 위임에서 자주 터지는 포인트만 정리했다.

## 이벤트 전파(Event Propagation) 3단계

브라우저의 이벤트 전파는 아래 순서로 진행된다.

1. **캡처링(Capturing)**
   - `window` → `document` → ... → **타깃 요소 직전**까지 내려온다.
2. **타깃(Target)**
   - 실제 이벤트가 발생한 **타깃 요소**에서 핸들러가 실행된다.
3. **버블링(Bubbling)**
   - 타깃 → 부모 → 조상으로 **위로 올라가며** 전파된다.

핸들러는 기본적으로 버블링 단계에서 실행된다.  
캡처링 단계에서 실행하고 싶으면 `addEventListener` 옵션에 `capture: true`를 준다.

```js
const el = document.querySelector("#button");

// 버블링(기본값)
el.addEventListener("click", handler);

// 캡처링
el.addEventListener("click", handler, { capture: true });
```

## target vs currentTarget

이벤트 객체에서 가장 많이 쓰는 두 값은 이거다.

* **`event.target`**: 실제로 이벤트가 발생한 요소(사용자가 직접 클릭한 요소)
* **`event.currentTarget`**: **현재 실행 중인 핸들러가 바인딩된 요소**

이 차이가 이벤트 위임에서 바로 체감된다.

```html
<ul id="list">
  <li>첫 번째</li>
  <li>두 번째</li>
</ul>

<script>
  const list = document.querySelector("#list");

  list.addEventListener("click", (event) => {
    console.log("target:", event.target.tagName); // LI (실제로 클릭된 곳)
    console.log("currentTarget:", event.currentTarget.tagName); // UL (핸들러가 달린 곳)
  });
</script>
```

* `target`은 “어디를 눌렀는지” 찾을 때 쓰고
* `currentTarget`은 “이 로직의 주체가 누구인지” 보장할 때 쓴다.

## 버블링이 실무에서 유용한 이유: 이벤트 위임

버블링 덕분에 이벤트 위임(Event Delegation)이 가능하다.

* `<li>`마다 클릭 핸들러를 다는 대신
* 상위 `<ul>`에 하나만 달고, `event.target`으로 분기한다.

장점은 명확하다.

* 핸들러 수가 줄어서 메모리/등록 비용이 줄어든다.
* 동적으로 추가되는 하위 요소도 자동으로 처리된다.

```js
list.addEventListener("click", (event) => {
  const li = event.target.closest("li");
  if (!li) return;

  // li 기준으로 처리
  console.log(li.textContent);
});
```

## stopPropagation()은 왜 조심해야 하나

`event.stopPropagation()`은 전파 자체를 막는다.
문제는 “내가 막아도 되는 전파인지” 판단이 어려울 때가 많다는 점이다.

대표적으로 이런 케이스가 터진다.

* 모달 바깥 클릭 닫기(overlay 클릭 감지)
* 드롭다운 바깥 클릭 닫기
* 상위 레이아웃 공통 클릭 로직

내부 요소에서 무심코 `stopPropagation()`을 쓰면, 상위의 공통 로직이 같이 죽는다.

필요한 경우엔 아래처럼 **범위를 좁혀서** 해결하는 편이 안전하다.

* 상위에서 `event.target`으로 무시할 영역을 걸러내기
* `stopPropagation()` 대신 구조적으로 이벤트가 올라가지 않게 UI를 분리하기

추가로, 같은 요소에 여러 핸들러가 달린 상황까지 막고 싶으면 `stopImmediatePropagation()`이 따로 있다(필요할 때만).

## 요약

* 이벤트 전파는 **캡처링 → 타깃 → 버블링** 순서로 진행된다.
* `target`은 실제 이벤트 발생 지점, `currentTarget`은 핸들러가 등록된 지점이다.
* 버블링은 이벤트 위임의 기반이고, 리스트/동적 UI에서 특히 유용하다.
* `stopPropagation()`은 상위 공통 로직까지 끊을 수 있어서 제한적으로 쓰는 게 낫다.
