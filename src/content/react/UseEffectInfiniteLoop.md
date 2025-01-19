---
title: useEffect 무한루프
tags: [react]
date: "2022.09.28"
---
이 블로그를 만들면서 useEffect를 사용했는데 렌더링이 계속 일어나 사이트가 다운됐었다

우선 useEffect 가 무슨 일을 하는지 알아보자. useEffect는 컴포넌트가 마운트 된 후, 컴포넌트가 업데이트가 된 후 컴포넌트가 마운트 되기 전 실행된다. 이때 종속정에 특정 state나 props를 전달하면 혹은 변경될 때 useEffect가 실행된다. seEffect 가 어떻게 동작하는지 알았으면 다시 문제를 확인해보자.

useEffect(함수,[종속성])

![백엔드 이미지](/img/react/UseEffectInfiniteLoop/code_1.png)
useEffect 함수에 state를 변경하는 setPage를 실행시키면 page의 값이 변경이 되고 종속정의 값이 변하여 useEffect 가 다시 실행돼서 무한렌더링이 일어났던 것이다.

그럼 이 문제를 어떻게 해결해야 할까 첫번째로는 종속성에 빈 배열을 제공하는 것이다. 빈 배열을 제공함으로써 종속성의 값이 변할 일이 없으니 단 한번만 마운트후 종료된다. 허나 위의 방법을 이용하면 처음 의도한 방법과 달리 state를 실행할 때 마다 값이 변경되지 않는다. 그러니 코드를 종속정에 의존하지 않도록 짜는것 이다.

![백엔드 이미지](/img/react/UseEffectInfiniteLoop/code_2.png)
react hook은 아주 편리한 기능인 것 같다 하지만 이와 같이 잘 모르고 사용하게 되면 에러가 생기게 되니 잘 숙지후에 이용하도록 하자.
