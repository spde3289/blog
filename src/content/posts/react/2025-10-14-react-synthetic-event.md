---
title: React 합성 이벤트(SyntheticEvent) 정리
tags: ["React", "JavaScript", "Event"]
date: "2025.10.14"
---

React에서 이벤트 핸들러를 쓰면 브라우저의 네이티브 이벤트가 그대로 넘어오는 게 아니라, React가 감싼 **SyntheticEvent(합성 이벤트)** 가 넘어온다. 이 레이어 덕분에 브라우저 구현 차이를 크게 신경 쓰지 않고 동일한 방식으로 이벤트를 다룰 수 있다. 

## 합성 이벤트가 뭔가

SyntheticEvent는 브라우저의 native event를 감싼 래퍼 객체다. `preventDefault()`, `stopPropagation()` 같은 인터페이스를 동일하게 제공하고, 브라우저가 달라도 이벤트가 일관되게 동작하도록 정규화한다.

네이티브 이벤트가 필요하면 `event.nativeEvent`로 접근할 수도 있다.

## React는 이벤트를 어떻게 관리하나

### 1) 이벤트 위임(Event Delegation)

React는 이벤트 리스너를 전역(document)에 붙이는 방식에서 바뀌었다. **React 17부터는 document가 아니라 “루트 DOM 컨테이너”에 이벤트 리스너를 붙인다.** 
이 방식은 React 트리 전체에서 발생한 이벤트를 한 지점에서 받아서 내부 이벤트 시스템으로 라우팅하는 구조다.

### 2) 캡쳐링도 지원한다

React 이벤트는 기본적으로 버블링 단계 핸들러(`onClick`)로 동작하고, 캡쳐 단계가 필요하면 `onClickCapture`처럼 `Capture`를 붙여서 등록한다.

## 이벤트 풀링(Event Pooling) 이슈

React 16 이하(그리고 React Native)에서는 SyntheticEvent를 재사용(풀링)해서 이벤트 핸들러가 끝나면 속성이 초기화되는 동작이 있었다. 그래서 비동기에서 event를 쓰면 값이 사라지는 문제가 생겼다.

```ts
function handleClick(e: any) {
  console.log(e.type); // click
  setTimeout(() => console.log(e.type)); // (React 16 이하) 값이 비어버릴 수 있었다
}
```

React 17(웹)부터는 **이벤트 풀링을 쓰지 않는다.** 그래서 비동기에서도 이벤트 객체를 그대로 쓰는 흐름이 자연스럽다. ([React][1])
참고로 예전에는 `e.persist()`로 풀링을 막았는데, v17부터는 풀링 자체가 없어서 `persist()`가 의미가 없어졌다. ([React][2])

## 정리

* SyntheticEvent는 native event를 감싼 래퍼고, 브라우저 차이를 정규화해서 동일한 인터페이스로 이벤트를 다루게 해준다. ([React][2])
* React는 이벤트를 루트 컨테이너에 위임하는 방식으로 이벤트 시스템을 운영한다(React 17 기준). ([React][3])
* React 17(웹)부터는 이벤트 풀링이 없어져서 비동기에서도 이벤트 객체를 사용할 수 있다. ([React][1])

## 참고 자료

* SyntheticEvent 문서 ([React][2])
* Event Pooling(React 16 이하 / React Native 관련) ([React][1])
* React 17 변경점: 이벤트 위임 대상(document → root) ([React][3])

[1]: https://legacy.reactjs.org/docs/legacy-event-pooling.html "Event Pooling – React"
[2]: https://legacy.reactjs.org/docs/events.html "SyntheticEvent – React"
[3]: https://legacy.reactjs.org/blog/2020/10/20/react-v17.html "React v17.0 – React Blog"
