---
title: react에서 addEventListener와 state
tags: [react]
date: "2023.07.18"
---
## 문제점 

최근 개발을 하다 window.addEventListener로 호출한 함수 내에서 state값이 초기 값 그대로 읽히는 경우가 있었다. 아래와 같이 코드를 작성 했을 떄 state값은 계속 변경 되지만 console.log()로 state값을 읽을땐 초기값만 출력이 된다.

```javascript

  import { useState, useEffect } from 'react';

  function MyComponent() {
    const [state, setState] = useState(0);
  
    const eventHandler = () => {
      setState((pre)=> pre + 1);
      console.log(state) // state값은 계속 변경되지만 console.log() 찍어보면 초기값인 0만 찍힌다.
    };

    useEffect(() => {
      window.addEventListener('click', eventHandler);
      return () => {
        window.removeEventListener('click', eventHandler);
      };
    }, []); 
  
    return <div>{state}</div>; 
  }
  

```
이렇게 동작하는 원인이 무엇일까? 이렇게 동작하는 이유는 이벤트 핸들러 함수는 비동기적으로 실행되기 때문에 함수가 호출될 떄의 상태를 유지하면서 실행되기 때문이다. 그래서 state값이 초기 값으로 고정되는 것 이다.

## 해결방법 

이를 해결하는 방법은 useEffect deps에 state를 추가해주면 된다. 그럼 state값이 변경 될 때 마다 리랜더링 되면서 최근값을 반영 하는 함수가 새롭게 선언되면서 초기에 의도한 대로 동작한다.

```javascript

  import { useState, useEffect } from 'react';

  function MyComponent() {
    const [state, setState] = useState(0);
  
    const eventHandler = () => {
      setState((pre)=> pre + 1);
      console.log(state) // state 값이 변경되는 걸 확인 할 수 있다.
    };

    useEffect(() => {
      window.addEventListener('click', eventHandler);
      return () => {
        window.removeEventListener('click', eventHandler);
      };
    }, [state]); // deps에 state를 추가
  
    return <div>{state}</div>; 
  }

```
[https://stackoverflow.com/questions/66213641/react-keypress-event-taking-only-initial-state-values-and-not-updated-values](https://stackoverflow.com/questions/66213641/react-keypress-event-taking-only-initial-state-values-and-not-updated-values) 

[https://medium.com/hcleedev/web-event%EC%99%80-addeventlistener-%EC%95%8C%EC%95%84%EB%B3%B4%EA%B8%B0-%EA%B0%9C%EB%85%90-react%EC%97%90%EC%84%9C-%EC%A3%BC%EC%9D%98%ED%95%A0-%EC%A0%90-a581adc49aa4](https://medium.com/hcleedev/web-event%EC%99%80-addeventlistener-%EC%95%8C%EC%95%84%EB%B3%B4%EA%B8%B0-%EA%B0%9C%EB%85%90-react%EC%97%90%EC%84%9C-%EC%A3%BC%EC%9D%98%ED%95%A0-%EC%A0%90-a581adc49aa4) 
