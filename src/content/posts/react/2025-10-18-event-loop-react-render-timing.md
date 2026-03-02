---
title: 이벤트 루프와 React의 렌더링 타이밍을 깊게 파헤치기
tags: ["React", "JavaScript", "Event Loop", "Batching", "useEffect"]
date: "2025.10.18"
---

## 들어가기에 앞서

어제 React의 배칭(Batching)을 정리했는데, “그럼 React는 정확히 **언제** 렌더링을 시작하나?”가 계속 걸렸다.

JS 이벤트 루프의 흐름과 React의 **업데이트 큐 → 렌더 단계 → 커밋 단계**를 한 번에 묶어서 정리해봤다.

## 예제로 시작하기

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

이 코드를 보면 `+3`이 될 것 같지만, 실제로는 대부분 `+1`만 된다.

이유는 간단하다. **한 번의 렌더에서 잡힌 `count` 값은 고정**이라서, 이벤트 핸들러 안의 세 줄은 사실상 전부 같은 업데이트 요청이 된다. React 공식 문서에서도 `setNumber(number + 1)`을 여러 번 호출해도 같은 이유로 기대와 다른 결과가 나온다고 설명한다. ([react.dev][1])

### 같은 상태를 여러 번 “누적”하고 싶다면

```jsx
setCount((c) => c + 1);
setCount((c) => c + 1);
setCount((c) => c + 1);
```

업데이터 함수 형태는 “큐에 쌓인 이전 결과”를 기준으로 다음 값을 계산한다. 그래서 `+3`이 된다. ([react.dev][1])

## React 업데이트가 실제로 흐르는 방식

* `setState`는 “바로 렌더링”이 아니라 **렌더 예약(업데이트 큐에 쌓기)**에 가깝다. ([react.dev][1])
* React는 **이벤트 핸들러 안의 코드가 전부 끝날 때까지 기다렸다가** 상태 업데이트를 처리한다. 그래서 리렌더링이 한 번만 일어난다. ([react.dev][1])

### 렌더 단계(Render phase)와 커밋 단계(Commit phase)

React는 크게 두 단계로 나눠서 일을 한다.

* **렌더 단계**: 컴포넌트를 호출해서 “무엇을 보여줄지” 계산한다. DOM은 여기서 바로 바꾸지 않는다. ([react.dev][2])
* **커밋 단계**: 렌더 단계에서 계산한 변경 사항을 실제 DOM에 반영한다. ([react.dev][2])

그리고 `useEffect`는 커밋 이후에 실행된다. 의존성 비교도 이 시점(커밋 기준)으로 이뤄진다. ([react.dev][3])

> 참고로 개발 환경에서 Strict Mode가 켜져 있으면, 렌더/이펙트가 한 번 더 실행되는 것처럼 보일 수 있다. (개발 전용 동작) ([react.dev][3])

## 타임라인으로 보기

```text
사용자 클릭(하나의 task)
        │
        ▼
[JS] onClick 핸들러 실행 (콜스택 점유)
        │
        │  ├─ setState() 호출들 → React 내부 업데이트 큐에 쌓임
        │  └─ 아직 DOM 반영/렌더는 보류됨
        ▼
[JS] 핸들러 종료 → 콜스택 비워짐
        │
        ▼
[React] 이벤트 핸들러가 끝난 뒤, 큐에 쌓인 업데이트를 처리
        │   ├─ 렌더 단계: 다음 UI 계산(컴포넌트 호출, Fiber 계산)
        │   └─ 커밋 단계: DOM 반영
        ▼
브라우저 페인팅
        ▼
[React] useEffect 실행(상황에 따라 페인트 전/후 차이 가능) 
```

React 18에서는 자동 배칭이 확장돼서, 이벤트 핸들러뿐 아니라 `setTimeout`, `Promise` 같은 경계에서도 “콜백 단위”로 업데이트가 묶인다. ([react.dev][4])

## 실험: 의존성 배열에 “일반 변수”를 넣으면 변경을 감지할까?

요점부터 말하자면

* React는 **렌더링 중에 읽힌 값**을 기준으로 의존성을 저장한다.
* 다음 렌더가 발생했을 때, 이전 값과 `Object.is`로 비교해서 달라졌으면 이펙트를 실행한다. ([react.dev][3])
* 그런데 “일반 변수 변경”만으로는 **렌더 자체가 발생하지 않는다.** 그래서 변경 직후에는 아무 일도 일어나지 않는다.

아래 코드가 그 케이스다.

```jsx
let token = "token";

function handleLogin() {
  token = "new_token"; // 값은 바뀌지만, 렌더 트리거가 아니다
}

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("토큰이 변경됨 : ", token);
  }, [token]);

  return (
    <>
      <button onClick={() => handleLogin()}>토큰 버튼!</button>
      <button onClick={() => setCount(count + 1)}>setState 버튼!</button>
      카운트 : {count}
    </>
  );
}
```

![testCode](https://cdn.jsdelivr.net/gh/spde3289/blog-assets@main/content/post/2025-10-18-event-loop-react-render-timing/2025.10.18.gif)

정리하면,

* `token`이 바뀌어도 **리렌더링이 없으면** React는 의존성 비교를 할 기회가 없다.
* 이후 `setCount`로 리렌더링이 발생하면, 그때 렌더 과정에서 읽힌 `token` 값이 이전과 달라져서 `useEffect`가 실행된다. (의존성 비교는 커밋 기준) ([react.dev][3])

## 정리

| 단계           | JS 관점             | React 관점                                         |
| ------------ | ----------------- | ------------------------------------------------ |
| setState 호출  | 콜스택 안에서 동기 실행     | 업데이트를 큐에 저장(렌더 예약) ([react.dev][1])              |
| 이벤트 핸들러 실행 중 | 같은 task 안에서 계속 실행 | 핸들러 끝날 때까지 렌더 보류(배칭) ([react.dev][1])            |
| 핸들러 종료       | 콜스택 비움            | 렌더 단계 → 커밋 단계 진행 ([react.dev][2])                |
| 커밋 이후        | 페인팅과 연동           | useEffect 실행(상황에 따라 페인트 전/후 차이) ([react.dev][3]) |

## 참고자료

* Queueing a Series of State Updates ([react.dev][1])
* React v18.0 (Automatic Batching) ([react.dev][4])
* Render and Commit ([react.dev][2])
* useEffect reference ([react.dev][3])


[1]: https://react.dev/learn/queueing-a-series-of-state-updates "Queueing a Series of State Updates – React"
[2]: https://react.dev/learn/render-and-commit "Render and Commit – React"
[3]: https://react.dev/reference/react/useEffect "useEffect – React"
[4]: https://react.dev/blog/2022/03/29/react-v18 "React v18.0 – React"
