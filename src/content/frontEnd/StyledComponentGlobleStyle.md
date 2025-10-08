---
title: styled-component 전역 스타일링에 대해 알아보자
tags: [frontEnd]
date: "2023.02.03"
---
이전에 포스트에서 styled-component 사용법에 대해서 다뤘었는데 오늘은 GlobalStyle과 Theme에 대해 알아보겠다. 

## GolbalStyle 사용방법 

간단하게 createGlobalStyle 이라는 함수를 사용해 css를 작성한 후 최상위 컴포넌트에 추가해주면 된다.

```javascript

  //globalStyle.js

  import { createGlobalStyle } from 'styled-components'   
  
  const GlobalStyle = createGlobalStyle`
    body{
      margin: 0;
      font-family: "Gothic A1";
      font-weight: 500;
    };
    a{
      text-decoration: none;
      color: #000;
    };
  `;

  export default GlobalStyle;


```
```javascript

  //App.jsx

  import GlobalStyle from './globalStyle'   

  function App() {
    return (
      <>
        <GlobalStyle />
        <a href='#'>
          Globle
        </a>
      </>
    );
  }


```
이렇게 사용하면 전역으로 css를 설정할 수 있어 불필요하게 중복되는 스타일링을 줄일 수 있다. 

## Theme 사용방법 

ThemeProvider 이라는 함수로 ThemeProvider 로 감싼 내부의 컴포넌트에게 공통된 값을 내려줄 수 있다. theme를 사용하면 일관된 디자인을 유지할 수 있다는 장점이 있고 디자인 수정이 필요하다면 theme만 변경해주면 된다.

```javascript

  //theme.js

  const theme = {
    color: {
    container: 'pink',
    box: 'blue',
    },
  };

  export default theme;


```
```javascript

  //app.jsx

  import styled, { ThemeProvider } form 'styled-component'
  import theme from './theme';

  function App() {
    return (
      <ThemeProvider theme={theme}>
        <BoxContainer />
      </ThemeProvider>
    );
  };

  function BoxContainer(){
    return(
      <Container>
        <Box></Box>
      </Container>
    );
  };

  const Container = styled.div`
    background-color: ${ ({theme}) => theme.color.container };
  `;

  const Box = styled.div`
    background-color: ${ ({theme}) => theme.color.box };
  `;


```
ThemeProvider 함수를 잘 응용하면 다크모드도 간단하게 만들 수 있다.

[https://styled-components.com/docs/api#createglobalstyle](https://styled-components.com/docs/api#createglobalstyle) 

[https://styled-components.com/docs/api#themeprovider](https://styled-components.com/docs/api#themeprovider) 
