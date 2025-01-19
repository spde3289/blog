---
title: styled-component를 사용해보자
tags: [FrontEnd]
date: "2023.02.03"
---
react를 처음 공부할 때 html과 js는 한 파일에서 작성하는데 css도 한 파일에서 작성 할 수 있지 않을까 란 생각이 들어 찾아보다가 styled-component를 알게 되었다. styled-component는 js in css 로 말 그대로 js파일 내부에 css를 작성한다는 뜻으로 styled-component의 장점으로는 css의 컴포넌트화로 유지보수가 쉬워지고 재사용성이 올라간다.

## 패키지 설치 

```javascript

  # npm 설치
  npm install --save styled-components

  # yarn 설치
  yarn add styled-components


```
## 사용 방법 

설치가 잘 되었다면 사용방법에 대해 알아보자

```javascript

  import styled from "styled-components";

  const Title = styled.h1`
    font-size: 1.5em;
    text-align: center;
    color: palevioletred;
  `;

  render(
    <Title>타이틀1</Title>
  )


```
태그이름을 선언해 준후에 styled.태그 뒤에 ``(백틱)을 사용해서 원하는 css를 작성하면 된다. 이때 Title이라는 태그를 중복해서 사용할 때 color색상만 다르게 하고 싶다면 props로 값을 넘겨줄 수 있다.

```javascript

  import styled from "styled-components";

  const Title = styled.h1`
    font-size: 1.5em;
    text-align: center;
    color: ${({color})=> color ? color : 'palevioletred'}
  `;

  render(
    <Title>타이틀1</Title>
    <Title color='blue'>타이틀2</Title>
  )


```
그리고 이전에 선언했던 태그를 상속하여 작성할 수 있다.

```javascript

  import styled from "styled-components";

  const Title = styled.h1`
    font-size: 1.5em;
    text-align: center;
    color: ${({color})=> color ? color : 'palevioletred'}
  `;

  const SubscribeTitle = styled(Title)`
    border: 1px solid palevioletred;
  `;

  render(
    <Title>타이틀1</Title>
    <SubscribeTitle color='blue'>타이틀2</SubscribeTitle>
  )


```
[https://styled-components.com/](https://styled-components.com/) 
