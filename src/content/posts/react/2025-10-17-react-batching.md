---
title: React의 Batching(일괄 처리) setState를 여러 번 호출해도 렌더링이 한 번인 이유
tags: ["React", "렌더링", "성능 최적화"]
date: "2025.10.17"
---

React에서 `setState`(또는 `useState`의 setter)를 연속으로 호출했는데, 렌더링이 한 번만 발생하는 경우가 있다.  
이건 React가 **Batching(일괄 처리)**으로 업데이트를 묶어서 처리하기 때문이다.

## 상태 업데이트를 여러 번 했는데 왜 렌더링은 한 번만 일어날까?

아래 코드처럼 `setCount`를 3번 호출해도, 클릭 한 번에 렌더링 로그는 한 번만 찍히는 걸 볼 수 있다.

```jsx
const Counter = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
  };

  console.log("렌더링");
  return <button onClick={handleClick}>{count}</button>;
};
```

여기서 핵심은 React가 `setState` 호출마다 즉시 렌더링하지 않는다는 점이다.

* `setCount` 호출 → “업데이트 요청”이 생성된다
* React가 업데이트를 내부 **업데이트 큐(queue)**에 쌓는다
* 이벤트 핸들러가 끝난 뒤, 큐에 쌓인 업데이트를 모아서 처리한다
* 그 결과로 **렌더링은 한 번만** 발생한다

React Developer Tools의 하이라이트 기능을 켜두면 커밋이 한 번만 일어나는 걸 눈으로 확인할 수 있다.

![2025.10.17.gif](https://cdn.jsdelivr.net/gh/spde3289/blog-assets@main/content/post/2025-10-17-react-batching/2025.10.17.gif)

## React는 언제 큐를 비우고 렌더링할까? (배칭 경계)

React 입장에서 중요한 건 “업데이트가 더 들어올 수 있는 실행 구간”을 하나로 묶는 거다.
그래서 `setState`를 호출할 때마다 바로 렌더링하지 않고, **지금 처리 중인 작업이 끝나는 지점**에서 한 번에 반영한다.

* React 17까지는 보통 **React가 제어하는 이벤트 핸들러 실행 구간**이 배칭의 기본 경계였다
  즉, 클릭 이벤트 핸들러가 끝날 때까지 업데이트를 모아두고, 핸들러가 끝나는 순간 한 번만 렌더링했다.
* React 18부터는 **Automatic Batching**으로 배칭 범위가 넓어졌다
  이벤트 핸들러뿐 아니라 `Promise.then`, `setTimeout` 같은 비동기 콜백에서도 “같은 작업 단위(한 번의 실행 흐름)” 안에서 발생한 업데이트를 묶어서 처리하는 경우가 많아졌다.

결국 포인트는 이거다.

> React는 “지금 처리 중인 흐름에서 더 이상 업데이트가 안 들어오겠다”라고 판단되는 경계에서 큐를 비우고 렌더링(그리고 커밋)까지 진행한다.

## 같은 state를 3번 업데이트했는데 왜 값이 +3이 아니지?

위 코드는 렌더링이 한 번인 것과 별개로, `count` 값도 기대와 다르게 동작할 수 있다.

`setCount(count + 1)` 형태는 “현재 렌더 시점의 count 스냅샷”을 기준으로 새 값을 만들어서 요청한다.
클릭 시점의 `count`가 0이면, 3번 호출해도 전부 `setCount(1)` 요청이 된다.

결과는 이렇게 된다.

* 요청 1: 1로 설정
* 요청 2: 1로 설정
* 요청 3: 1로 설정
* 최종: 1

“3번 더하기”를 의도한 거라면 함수형 업데이트를 써야 한다.

```jsx
setCount((c) => c + 1);
setCount((c) => c + 1);
setCount((c) => c + 1);
// 최종: +3
```

Batching은 “렌더링을 몇 번 하느냐”에 대한 최적화고,
함수형 업데이트는 “같은 큐 안에서 상태를 어떻게 누적 계산하느냐”에 대한 선택이다.

## React 17 vs React 18: 자동 배칭 범위가 달라졌다

React 17까지는 이벤트 핸들러 내부에서만 batching이 일어나는 경우가 많았다.
하지만 React 18부터는 자동 배칭(Automatic Batching)이 도입되면서
**비동기 코드(setTimeout, Promise)** 안에서도 상태를 묶어서 처리할 수 있다.

```jsx
import { useState } from "react";

const App = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  const handleAsync = () => {
    Promise.resolve().then(() => {
      setCount((c) => c + 1);
      setText("업데이트 완료");
      // React 18에서는 보통 이 두 개가 한 번의 렌더링으로 처리된다.
    });
  };

  console.log("렌더링 발생");
  return <button onClick={handleAsync}>클릭</button>;
};
```

## 배칭을 무시하고 “지금 당장” DOM 반영이 필요할 때

Batching은 대부분 이득이지만, 상태 변경 직후 **바뀐 DOM을 바로 읽거나 조작**해야 할 때 문제가 된다.
이럴 때 `flushSync`를 쓰면 업데이트를 강제로 동기 처리해서 **커밋까지 끝낸 뒤** 다음 코드를 실행할 수 있다.

```jsx
import { useState, useRef } from "react";
import { flushSync } from "react-dom";

const CommentBox = () => {
  const [comments, setComments] = useState(["첫 번째 댓글"]);
  const listRef = useRef(null);

  const addComment = () => {
    flushSync(() => {
      setComments((prev) => [...prev, "새로운 댓글"]);
    });

    listRef.current?.lastElementChild?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div>
      <button onClick={addComment}>댓글 추가</button>
      <ul ref={listRef}>
        {comments.map((c, i) => (
          <li key={c + i}>{c}</li>
        ))}
      </ul>
    </div>
  );
};
```

* `flushSync` 없이 `setComments`만 호출하면, 배칭 때문에 DOM 반영이 뒤로 밀릴 수 있다
* 그 상태에서 `scrollIntoView`를 바로 실행하면 “아직 DOM에 없는 요소”를 기준으로 동작할 수 있다
* `flushSync`로 감싸면 업데이트가 즉시 커밋되고, 그 다음 DOM 작업이 안전해진다

`flushSync`는 렌더링을 강제로 당겨오는 기능이라 자주 쓰면 성능에 불리할 수 있다.
“상태 변경 직후 DOM이 반드시 필요하다” 같은 경우에만 쓰는 게 맞다.

## 요약

* React는 `setState` 호출을 바로 렌더링으로 연결하지 않고, 내부 큐에 모아서 한 번에 처리한다
* React 18은 자동 배칭 범위가 넓어서 비동기 코드에서도 한 번의 렌더링으로 묶이는 경우가 많다
* 같은 state를 여러 번 업데이트해 누적 값을 만들려면 함수형 업데이트가 안전하다
* DOM을 즉시 반영해야 하면 `flushSync`로 커밋 타이밍을 강제로 제어할 수 있다

## 참고자료

* React 공식 문서: [https://ko.react.dev/learn/state-as-a-snapshot](https://ko.react.dev/learn/state-as-a-snapshot)
* React 18 Automatic Batching: [https://react.dev/blog/2022/03/29/react-v18#automatic-batching](https://react.dev/blog/2022/03/29/react-v18#automatic-batching)
