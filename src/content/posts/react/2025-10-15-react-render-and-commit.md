---
title: React 렌더 단계와 커밋 단계 정리
tags: ["React", "렌더링", "커밋", "Reconciliation", "useEffect"]
date: "2025.10.15"
---

React를 쓰다 보면 “렌더링이 됐다”라는 말을 습관적으로 쓰는데, 실제로는 **계산하는 단계**와 **DOM에 반영하는 단계**가 분리돼 있다. 
이걸 구분하지 않으면 `useEffect` / `useLayoutEffect` 타이밍, 성능 문제, “왜 화면이 잠깐 멈추지?” 같은 상황을 설명하기가 애매해진다.

## 렌더링이 트리거되는 순간

React에서 렌더링이 시작되는 대표적인 경우는 아래 두 가지다.

- **초기 렌더링**: `root.render(<App />)` 같은 진입점에서 시작한다.
- **업데이트**: state/props 변경으로 다시 렌더링이 예약된다.

업데이트가 생겼다고 해서 “페이지 전체를 다시 그림”이 아니다. React는 이전 결과와 다음 결과를 비교해서 **필요한 변경만 DOM에 반영**하려고 한다. 보통 이 흐름을 Reconciliation이라고 부른다.

## React 렌더링은 두 단계로 나뉜다

1. **렌더 단계(Render)**: 다음 UI를 계산한다.
2. **커밋 단계(Commit)**: 계산된 결과를 실제 DOM에 반영한다.

이 둘을 나눈 핵심 의도는 간단하다.

- 렌더 단계는 **순수하게 계산만** 하게 만들고 싶다.
- 커밋 단계는 **DOM 변경을 최소로, 짧게** 끝내고 싶다.

## 렌더 단계(Render)

렌더 단계에서 React는 컴포넌트를 **호출해서 JSX를 계산**한다.

- state 업데이트가 일어나면 그 컴포넌트가 다시 호출된다.
- 기본 동작 기준으로는 **자식 컴포넌트도 함께 호출**되는 경우가 많다.
  - 다만 `React.memo`, `useMemo`, `useCallback`, `shouldComponentUpdate` 같은 최적화로 “다시 호출하지 않기”를 만들 수 있다.

여기서 중요한 점은, 렌더 단계에서는 **DOM을 직접 건드리지 않는다**는 거다.  
“무슨 DOM을 바꿀지”를 계산만 해두고, 실제 반영은 커밋 단계에서 한다.

### 렌더 단계에서 지켜야 할 규칙

- 같은 props/state면 **같은 JSX가 나와야 한다.**
  - 렌더 중에 랜덤값, 현재 시간 같은 걸로 결과가 흔들리면 디버깅이 어려워진다.
- state는 **직접 수정하지 말고** 새 값으로 교체해야 한다.
  - 객체/배열을 제자리에서 바꾸면 변경 추적이 꼬일 수 있다.

## 커밋 단계(Commit)

커밋 단계는 렌더 단계에서 계산된 변경 사항을 **실제 DOM에 반영**하는 과정이다.

- 초기 렌더링: 생성된 DOM 노드를 실제 DOM 트리에 붙인다.
- 업데이트: 이전 결과와 달라진 부분만 DOM에 반영한다.

커밋은 **동기적으로** 진행된다. 이 단계가 길어지면 사용자 입장에서는 화면이 멈춘 것처럼 느껴질 수 있다. 그래서 React는 커밋을 가능한 짧게 유지하려고 한다.

## 커밋 단계에서 같이 일어나는 일

커밋 단계 전후로 React 내부에서 실제로 체감되는 흐름은 대략 이렇다.

1. DOM 업데이트
2. ref 연결/해제
3. `useLayoutEffect` 실행 (DOM 반영 직후, 페인트 전)
4. 브라우저 페인트(Paint)
5. `useEffect` 실행 (페인트 후)

예시로 보면 더 직관적이다.

```jsx
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);
  const divRef = useRef(null);

  useLayoutEffect(() => {
    console.log("LayoutEffect:", divRef.current?.textContent);
  });

  useEffect(() => {
    console.log("Effect:", count);
  });

  return (
    <div ref={divRef}>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
};
```

`+` 버튼을 눌렀을 때 흐름은 이렇게 정리할 수 있다.

1. `setCount(count + 1)` 실행 → 렌더 단계 시작
2. React가 새로운 JSX를 계산
3. 렌더 단계 종료 → 커밋 단계 시작
4. DOM 텍스트가 새 값으로 반영
5. `useLayoutEffect` 실행 (페인트 전)
6. 브라우저가 화면을 그림
7. `useEffect` 실행 (페인트 후)

## 정리
* **Trigger**: state/props 변경으로 시작된다.
* **Render**: 다음 UI를 계산한다. DOM은 건드리지 않는다.
* **Commit**: 계산 결과를 DOM에 반영한다. 이 단계는 동기적으로 진행된다.

### 참고

* React 공식 문서: [https://ko.react.dev/learn/render-and-commit](https://ko.react.dev/learn/render-and-commit)

