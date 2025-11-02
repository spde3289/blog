---
title: 자바스크립트는 싱글 스레드인데 비동기 처리가 가능한 이유
tags: [javaScript]
date: "2024.10.26"
---
문뜩 자바스크립트는 싱글 스레드 언어인데 웹 및 node.js 환경에서 비동기로 동작할 수 있을까?

사실 비동기로 동작할 수 있는 이유는 웹 및 node.js 환경은 싱글 스레드가 아니기 때문에 가능하다는 걸 알지만 
어떤 원리로 동작하는지는 모르기에 한번 찾아보았습니다.

## 자바스크립트의 동작 방식
자바스크립트의 동작 구조의 핵심 요소는 `Call Stack`, `Heap`, `Event Loop`로 이루어져 있습니다.

### 호출 스택 (Call Stack)
- 함수의 실행 순서를 기록하는 구조의 스택입니다.
- 함수가 호출되면 스택에 쌓이고, 실행이 끝나면 제거됩니다.

### 힙 (Heap)
- 객체, 변수 등 메모리 할당이 일어나는 영역입니다.
- 메모리 관리(가비지 컬렉션)는 엔진이 자동으로 처리합니다.

### 이벤트 루프 (Event Loop)
- 호출 스택과 태스크 큐를 지속적으로 감시하며, "호출 스택이 비어 있을 때" 큐의 콜백을 실행시킵니다.

## 비동기 처리 메커니즘
자바스크립트는 분명 싱글 스레드 언어지만 브라우저는 **Web APIs**를 Node.js는 **libuv** 라이브러리를 사용해 
비동기 작업을 처리합니다.

우선 예제를 보며 설명하도록 하겠습니다.
```js
console.log("Start");
setTimeout(() => console.log("Timeout"), 0);
fetch("https://api.example.com").then(() => console.log("Fetch 완료"));
console.log("End");
```

**실행순서**  
- console.log("Start") → 호출 스택에 올라가 즉시 실행  
- setTimeout → 호출 스택에 올라간 후 Web API로 이동 → 타이머가 Web API 영역에서 카운트
- fetch → 호출 스택에 올라간 후 Web API로 이동 → 네트워크 요청이 Web API 영역에서 처리  
- console.log("End") → 즉시 실행  
- 호출 스택이 비면, 이벤트 루프가 **태스크 큐(마이크로태스크/매크로태스크)**를 확인후 마이크로태스크를 우선 출력
  - fetch의 콜백은 마이크로태스크 큐에, setTimeout은 매크로태스크 큐에 저장됩니다  
> 매크로태스크 : setTimeout, setInterval, DOM 이벤트, I/O 작업같은 비동기 작업  
> 마이크로태스크 : Promise, MutationObserver, process.nextTick 작업 같은 비동기 작업


극단적으로 이런 코드가 있다고 했을때 과연 어떻게 실행될까요?  
```js
useEffect(() => {
  const Timer = setTimeout(() => console.log("타이머"), 1000);
  for (let i = 0; i < 50000; i++) {
    console.log("카운트1");
  }
  for (let i = 0; i < 50000; i++) {
    console.log("카운트2");
  }
  return () => {
    clearTimeout(Timer);
  };
}, []);
```

정답은 1초가 지나도 호출 스택에 작업이 남아있기 때문에 `console.log("카운트1")` `console.log("카운트2")`가 
모두 출력된 후 `console.log("타이머")`가 출력됩니다.

## 마치며 
자바스크립트는 싱글 스레드로 동작하지만 Web API와 libuv를 활용하여 비동기 작업을 처리할 수 있습니다.  

오늘 자바스크립트의 동작 방식에 대해서 알아보았는데 앞으로는 비동기 코드의 실행 흐름을 고려하면서 작성해야겠다고 생각하게 되었습니다.
