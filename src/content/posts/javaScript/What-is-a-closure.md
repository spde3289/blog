---
title: 클로저란 무엇인가?
tags: [javaScript]
date: "2024.08.31"
---
오늘은 you don`t know javascript를 읽고 클로저라는 개념에 대해 정리해 보도록 하겠습니다.

## 클로저란?
클로저는 자바스크립트에서 함수와 그 함수가 선언된 렉시컬 환경을 같이 기억하는 기능을 말합니다.  
간단하게 말해서 함수 내부에서 함수 외부에 있는 변수에 접근할 수 있는 상황을 의미하며 외부 함수가 
실행을 마쳤음에도 내부 함수가 그 변수를 기억하는 상황입니다.

클로저를 이해하기 위해선 우선 렉시컬 환경이 무엇인지 이해해야 합니다.  

## 렉시컬 환경 이해하기
렉시컬 환경은 스코프와 변수 접근 규칙을 관리하는 메커니즘으로 **사전적 의미로는 코드가 작성된 위치를 의미합니다.**  

예를 들어 아래와 같은 코드가 있을 때 `outer` 함수는 전역에 선언 되었으니 전역 렉시컬 환경에 등록되고   
`outerVar`와 `inner` 함수는 `outer` 함수의 환경 레코드에 저장됩니다.  
마찬가지로 `innerVar`는 `inner` 함수의 환경 레코드에 저장되고 `console.log(outerVar);`는 outer 함수의 렉시컬 환경을 가르킵니다.  
`inner`함수가 실행되면 `outerVar`를 찾기 위해 자신의 환경 **레코드 -> 외부 참조 -> outer 환경에서 발견** 순으로 탐색합니다.
```javascript
const outerouterVar = "가장 외부 변수"; // 전역 스코프

function outer() {
  const outerVar = "외부 변수"; // outer 함수 스코프

  function inner() {
    const innerVar = "내부 변수"; // inner 함수 스코프
    console.log(outerVar); // outer의 변수 접근
    console.log(outerouterVar); // 전역 변수 접근
  }

  inner();
}

outer();
```

렉시컬 환경의 특징으로 함수가 선언된 위치에 따라 스코프가 결정된다는 점인데 아래의 코드를 한번 봐주세요
```javascript
let x = "global";

function foo() {
  console.log(x); // global 출력
}

function bar() {
  let x = "local";
  foo(); // ? 출력
}

bar();
```
블록 스코프에 대해 알고 있다면 쉽게 정답을 맞출 수 있을텐데 당연히 `global`이 출력됩니다.  
블록 스코프는 렉시컬 환경의 개념을 기반으로 동작하기 때문입니다. 

### 정리하자면 
- 함수는 자신이 선언된 환경의 모든 스코프를 기억한다.
- 스코프 체인을 통해 하위 -> 상위 -> 전역으로 변수를 탐색한다.

## 클로저의 필수 조건과 동작 원리
다시 클로저로 돌아와 클로저 함수가 가져야하는 필수 조건에 대해 알아보겠습니다.

**1. 내부 함수가 외부 함수의 변수를 참조해야 합니다.**  
**2. 외부 함수가 내부 함수를 반환해야 합니다.**  
**3. 외부 함수가 종료된 후에도 내부 함수가 살아있어야 합니다.**  
**4. 렉시컬 환경을 기억해야 합니다.**  

이 5개의 필수 조건을 기억하고 다음 예시를 한번 살펴보겠습니다.
```javascript
function outer() {
  let counter = 0; // 외부 변수

  return function inner() {
    counter++; // 외부 변수를 참조
    console.log(`Counter: ${counter}`);
  };
}

const closure = outer(); // outer 실행 후, inner 함수 반환
closure(); // Counter: 1
closure(); // Counter: 2
closure(); // Counter: 3
```
**outer() 함수 호출**  
- `outer`실행 컨텍스트가 생성됩니다.
- `counter` 변수가 0으로 초기화됩니다 
- `inner`함수가 반환되고 `closure` 변수에 `inner`함수가 할당됩니다.   

**closure() 함수 호출 (첫 번째)**  
- `inner`실행 컨텍스트가 생성됩니다. 
- `counter = 1`이 됩니다. 
- `inner` 실행 컨텍스트 제거되지면 `counter`는 메모리에 남아있습니다.   

**closure() 함수 호출 (두 번째)**
- `inner`실행 컨텍스트가 생성됩니다.
- `counter = 2`가 됩니다. 
- `inner` 실행 컨텍스트 제거되지면 `counter`는 메모리에 남아있습니다.   

**closure() 함수 호출 (세 번째)**
- `inner`실행 컨텍스트가 생성됩니다.
- `counter = 3`가 됩니다. 
- `inner` 실행 컨텍스트 제거되지면 `counter`는 메모리에 남아있습니다.   



또 다른 예시를 들어보겠습니다. 아래의 코드를 한번 살펴보면
```javascript
function outer() {
  let counter = 0; // 외부 변수 초기화

  function inner() {
    counter++; // 외부 변수를 증가
    console.log(`Counter: ${counter}`);
  }

  inner(); // 내부 함수 실행
}

// outer만 호출
outer(); // 첫 번째 호출
outer(); // 두 번째 호출
outer(); // 세 번째 호출
```
**첫 번째 outer() 호출**
- `outer()` 함수가 실행되면서 `counter`가 0으로 초기화됩니다.
- 내부 함수 `inner()`가 호출되어 `counter`가 1로 증가합니다.
- `outer()` 실행이 끝나면서 `counter` 변수와 실행 컨텍스트가 메모리에서 제거됩니다.

**두 번째 outer() 호출**
- `outer()` 함수가 실행되면서 `counter`가 0으로 초기화됩니다.
- 내부 함수 `inner()`가 호출되어 `counter`가 1로 증가합니다.
- `outer()` 실행이 끝나면서 `counter` 변수와 실행 컨텍스트가 메모리에서 제거됩니다.

**세 번째 outer() 호출**
- 위와 동일한 과정이 반복됩니다.

꼭 내부에서 외부의 변수를 참조했다고 클로저 함수가 아닌 경우를 보여드렸습니다.

## React에서 클로저의 활용 예시
클로저 개념에 대해서 알아보았는데 사실 가장 중요한건 실제 활용 방법이라고 생각합니다. 

### useState 
`handleClick` 함수는 `setCount`와 `count`를 렉시컬 환경에서 기억합니다.
```javascript
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(prev => prev + 1); // 이전전 값을 기억해 + 1
  };

  return <button onClick={handleClick}>Count: {count}</button>;
}
```

### useEffect
의존성 배열 없이 클로저로 변수를 저장합니다.
```javascript
function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1)
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <div>{seconds}초</div>;
}
```

### 커스텀훅
`count`, `increment`, `decrement`를 반환해 값을 기억합니다.

```javascript
function useCounter(initialValue) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(prevCount => prevCount + 1);
  const decrement = () => setCount(prevCount => prevCount - 1);

  return { count, increment, decrement }; // 함수를 반환
}

// 사용 예시
function App() {
  const { count, increment, decrement } = useCounter(0);
  return (
    <div>
      <button onClick={decrement}>-</button>
      <span>{count}</span>
      <button onClick={increment}>+</button>
    </div>
  );
}
```

### 고차 컴포넌트(HOC)
고차 컴포넌트에서도 클로저가 활용됩니다.
```javascript
function withLogger(WrappedComponent) {
  return function EnhancedComponent(props) {
    useEffect(() => {
      console.log("컴포넌트가 렌더링됨!");
    }, []);

    return <WrappedComponent {...props} />;
  };
}

// 사용 예시
const EnhancedButton = withLogger(Button);
```

이런 예시를 살펴보면 상태 관리, 이벤트 핸들러, 비동기 작업 등 다양한 곳에서 
클로저 함수를 잘 활용하고 있었음을 알 수 있습니다.


## 마치며
you don`t know javascript를 읽으면서 가장 이해하기 힘들었던 부분이였습니다.  
클로저는 JavaScript와 React에서 **상태 관리**, **로직 재사용**, **데이터 은닉**을 가능하게 하는 핵심 개념입니다.  
이 글이 클로저를 이해하는 데 도움이 되었기를 바랍니다.

[참고 자료](https://poiemaweb.com/js-closure)