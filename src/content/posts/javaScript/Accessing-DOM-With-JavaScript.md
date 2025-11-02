---
title: JavaScript를 이용한 DOM에 접근하기
tags: [javaScript]
date: "2025.09.23"
---
오늘은 부트캠프에서 **JavaScript를 이용한 DOM에 접근하는 방법**에 대해 배웠다. 평소엔 React로만 개발을 해왔기 때문에 바닐라 JavaScript를 이용해서 직접 DOM을 다루는 경험은 거의 없었는데, 이번 기회에 정리해두면 좋을 것 같아서 블로그에 기록해본다.

## 1. 자바스크립트로 태그 선택하기

DOM(Document Object Model)에서 원하는 태그를 선택하는 방법은 여러 가지가 있다. 가장 많이 쓰이는 메소드들을 정리해보면 아래와 같다.

| 메소드 | 의미 | 결과 |
| --- | --- | --- |
| `document.getElementById('id')` | HTML **id 속성**으로 태그 선택하기 | 해당 id의 태그 하나 |
| `document.getElementsByClassName('class')` | HTML **class 속성**으로 태그 선택하기 | 해당 class의 태그 모음(HTMLCollection) |
| `document.getElementsByTagName('tag')` | HTML **태그 이름**으로 태그 선택하기 | 해당 tag의 태그 모음(HTMLCollection) |
| `document.querySelector('css')` | **CSS 선택자**로 태그 선택하기 | 가장 첫 번째로 일치하는 태그 하나 |
| `document.querySelectorAll('css')` | **CSS 선택자**로 태그 선택하기 | 모든 일치하는 태그 모음(NodeList) |

## 2. 유사 배열이란?

DOM에서 태그를 선택했을 때 종종 `HTMLCollection`이나 `NodeList` 같은 결과가 나온다. 이걸 **유사 배열**이라고 한다.

- 숫자 형태의 인덱싱이 가능하다.
- `length` 프로퍼티를 가지고 있다.
- 하지만 배열의 기본 메소드를 그대로 쓸 수는 없다. (예: `map`, `forEach` 등 일부는 안됨)
- `Array.isArray(유사배열)`을 해보면 `false`가 나온다.

즉, 배열처럼 생겼지만 진짜 배열은 아니라는 점을 기억해야 한다.

## 3. 이벤트와 이벤트 핸들링

브라우저에서 일어나는 모든 사건을 **이벤트**라고 한다.

예를 들어:

- 버튼 클릭
- 스크롤
- 키보드 입력

이벤트가 발생했을 때 원하는 동작을 실행하려면 **이벤트 핸들링(Event Handling)**이 필요하다.

그리고 실제로 이벤트가 일어났을 때 실행되는 코드를 **이벤트 핸들러(Event Handler)**라고 한다. 보통 **이벤트 리스너(Event Listener)**라고도 부른다.

## 4. 이벤트 핸들러 등록 방법

이벤트 핸들러를 등록하는 방법은 크게 두 가지가 있다.

### 4-1. 자바스크립트에서 등록하기

```js
const btn = document.querySelector('#myBtn');

btn.onclick = function() {
  console.log('Hello Codeit!');
};
```

### 4-2. HTML 태그에서 바로 등록하기
```html
<button id="myBtn" onclick="console.log('Hello Codeit!')">클릭!</button>
```