---
title: react-router에 대해서 알아보자
tags: [FrontEnd]
date: "2023.02.09"
---
## react-router란? 

react-router는 클라이언트 측 라우팅이 가능하게 도와주는 라이브러리다. react-router를 사용하면 간단하게 url을 변경하면서 여러 페이지로 이루어진 어플리케이션을 만들 수 있다.

## 패키지 설치 

```javascript

  # npm 설치 
  npm install react-router-dom

  # yarn 설치 
  yarn add react-router-dom


```
## 사용방법 

```javascript

  import { BrowserRouter, Routes, Route } from 'react-router-dom';
  /* existing imports */

  function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    );
  }

  export default App;


```
위에 코드에 대해 설명을 하면 우선 최상위 컴포넌트에서 BrowserRouter로 감싸준후 Route를 Routes로 감싸준다. Route에 path에는 url경로를 element에는 보여주고자 하는 컴포넌트를 넣어준다. 그럼 path와 일치하는 Route를 렌더링 시켜주게 된다. path에 *만 적게 된다면 url에 일치하는 경로가 없을시에 보여주게 된다.

```javascript

  import { Link } from 'react-router-dom';
  /* existing imports */

  export default function Home() {
    return (
      <header>
        <nav>
          <Link to='/about'>about</Link> 
          <Link to='/contact'>contact</Link> 
        </nav>
      </header>
    );
  };


```
기존에는 a태그를 사용하지만 react-router에서는 Link를 사용한다 사용방법은 아주 간단한데 보이는거와 같이 to에 원하는 경로를 적어주면 된다.

## URL 파라미터 

useParams를 이용하면 간단하게 파라미터를 받아올 수 있다. path부분에 경로를 /contact/:Id 라고 한다면 /content 부분이 url /:Id부분이 파라미터라고 할 수 있다.

```javascript

  import { Link } from 'react-router-dom';
  /* existing imports */

  export default function Home() {
    return (
      <header>
        <nav>
          <Link to='/about'>about</Link> 
          <Link to='/contact'>contact</Link> 
        </nav>
      </header>
    );
  };


```
```javascript

  import { useParams } from 'react-router-dom';
  /* existing imports */

  export default function Contact() {

    const { Id } = useParams();

    return (
      <div>
        파라미터 Id는 {Id}입니다.
      </div>
    );
  };


```
## 쿼리스트링 

쿼리스트링도 useLocation훅을 이용해 활용할 수 있다. useLocation훅은 location객체를 반환 하는데 location객체는 pathname: URL에서 현재 주소경로 search: ?를 포함한 쿼리스트링 hash: URL에서 #이후의 값 (#이 없는경우 빈 문자열) state: URL에 넣고 싶지 않은 정보를 저장할 수 있다. key: location의 고유 값 (기본은 default) 으로 이루어져있다.

```javascript

  import { useLocation  } from 'react-router-dom';
  /* existing imports */

  export default function Contact() {

    const location = useLocation();

    return (
      <div>
        <ul>
          <li>pathname: {location.pathname} </li>
          <li>search: {location.search} </li>
          <li>hash: {location.hash} </li>
          <li>state: {location.state} </li>
          <li>key: {location.key} </li>
        </ul>
      </div>
    );
  };


```
[https://reactrouter.com/en/main](https://reactrouter.com/en/main) 
