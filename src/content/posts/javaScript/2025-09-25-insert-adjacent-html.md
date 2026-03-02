---
title: insertAdjacentHTML 사용법 정리
tags: ["JavaScript", "DOM", "Web API", "보안"]
date: "2025.09.25"
---

DOM 조작하다 보면 “요소를 어디에 끼워 넣을지” 때문에 `appendChild`랑 `innerHTML` 사이에서 애매할 때가 있다. `insertAdjacentHTML`은 그 애매함을 깔끔하게 풀어준다.

## 기본 사용법

```js
element.insertAdjacentHTML(position, text);
```

* **element** → 기준이 되는 요소
* **position** → 삽입할 위치(문자열)
* **text** → 삽입할 HTML 문자열

`createElement`나 `innerHTML`은 많이 써봤는데, 이 메서드는 “**기존 DOM을 다시 파싱하지 않고**” 필요한 위치에 바로 넣는다는 점이 꽤 실용적이다. ([MDN 웹 문서][1])

## position 옵션

| 값               | 의미                     | 예시                        |
| --------------- | ---------------------- | ------------------------- |
| `"beforebegin"` | 대상 요소 **앞**에 삽입        | `[여기]` `<div>대상</div>`    |
| `"afterbegin"`  | 대상 요소 **첫 번째 자식**으로 삽입 | `<div>` `[여기]` `대상</div>` |
| `"beforeend"`   | 대상 요소 **마지막 자식**으로 삽입  | `<div>대상` `[여기]` `</div>` |
| `"afterend"`    | 대상 요소 **뒤**에 삽입        | `<div>대상</div>` `[여기]`    |

실제로는 `"beforeend"`를 제일 많이 쓰게 된다. 리스트/카드 계속 추가할 때 자연스럽다.

### 예외 케이스도 있음

`"beforebegin"` / `"afterend"`는 **요소가 DOM 트리에 붙어 있고 부모 요소가 있어야만** 동작한다. 아니면 에러가 난다. ([MDN 웹 문서][1])
(그리고 반환값은 `undefined`다. ([MDN 웹 문서][1]))

## 주의할 점: 보안(XSS)

`insertAdjacentHTML`은 입력 문자열을 HTML로 파싱해서 DOM에 꽂는 방식이라, 대표적인 “**injection sink**”로 취급된다. 공격자가 만든 문자열이 들어오면 XSS로 이어질 수 있다. ([MDN 웹 문서][2])

```js
const userInput = '<img src="invalid.jpg" onerror="alert(\'XSS!\')">';
document.getElementById("box").insertAdjacentHTML("beforeend", userInput);
```

이런 식으로 **외부 입력값을 그대로 넣는 습관**이 제일 위험하다. MDN도 `insertAdjacentHTML()`은 XSS에 안전하지 않은 요소(`<script>` 같은 태그나 이벤트 핸들러 속성)를 제거해주지 않는다고 못 박고 있다. ([MDN 웹 문서][2])

* “텍스트만 보여주면 되는 상황” → `textContent` / `insertAdjacentText()`가 맞다. ([MDN 웹 문서][2])
* HTML이 꼭 필요하고, 입력이 섞일 수 있으면 → **검증/정제(sanitize)** 전제가 필요하다. (Trusted Types 같은 접근도 있다.) ([MDN 웹 문서][2])

## 코드 예시 (3가지 방식 비교)

HTML

```html
<h2>과일 목록</h2>

<ul id="list1">
  <li>🍎 사과</li>
</ul>

<ul id="list2">
  <li>🍌 바나나</li>
</ul>

<ul id="list3">
  <li>🍇 포도</li>
</ul>
```

JavaScript

```js
// 1) createElement 방식
const list1 = document.getElementById("list1");
const li1 = document.createElement("li");
li1.textContent = "🍊 오렌지";
li1.classList.add("new-item");
li1.addEventListener("click", () => alert("createElement로 추가됨!"));
list1.appendChild(li1);

// 2) insertAdjacentHTML 방식
const list2 = document.getElementById("list2");
list2.insertAdjacentHTML("beforeend", '<li class="new-item">🥝 키위</li>');

// querySelector(".new-item")는 '첫 번째'만 잡힐 수 있어서,
// 방금 추가한 요소를 확실히 잡고 싶으면 lastElementChild가 더 안전하다.
const li2 = list2.lastElementChild;
li2.addEventListener("click", () => alert("insertAdjacentHTML로 추가됨!"));

// 3) innerHTML 방식
const list3 = document.getElementById("list3");
list3.innerHTML += '<li class="new-item">🍓 딸기</li>';
const li3 = list3.lastElementChild;
li3.addEventListener("click", () => alert("innerHTML로 추가됨!"));
```

여기서 핵심 차이는 이거다.

* `createElement` → 안전하고(특히 사용자 입력 처리), 이벤트/속성 제어가 깔끔하다. 대신 코드가 길다.
* `insertAdjacentHTML` → 위치 지정이 가능하고, **기존 요소를 다시 파싱하지 않아서** `innerHTML`보다 덜 부담스럽다. ([MDN 웹 문서][2])
  다만 문자열 파싱이라 보안 전제는 항상 가져가야 한다. ([MDN 웹 문서][2])
* `innerHTML += ...` → 제일 간단해 보이지만, 내부적으로는 문자열 기반으로 다시 만들기 때문에(상황에 따라) 기존 DOM/이벤트와 충돌할 여지가 있다.

## 마치며

* **마크업을 빠르게 끼워 넣어야 하고, 입력이 신뢰 가능한 경우** → `insertAdjacentHTML`
* **외부 입력(유저 입력/서버 응답 등)이 섞이는 경우** → `createElement` + `textContent` 중심
* **단순히 텍스트만** → `textContent` / `insertAdjacentText()` ([MDN 웹 문서][2])

```

---

맞춤법/문장 쪽은 큰 문제 없었고, 네 글에서 특히 좋았던 포인트는 “`innerHTML +=`가 덮어쓰기 위험이 있다”는 방향을 잡은 거였어. 위 버전에서는 그 이유(기존 DOM 재파싱/문자열 기반 조작)를 조금 더 명확하게 붙여놨어.
::contentReference[oaicite:10]{index=10}
```

[1]: https://developer.mozilla.org/ko/docs/Web/API/Element/insertAdjacentHTML "Element: insertAdjacentHTML() 메서드 - Web API | MDN"
[2]: https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML "Element: insertAdjacentHTML() method - Web APIs | MDN"
