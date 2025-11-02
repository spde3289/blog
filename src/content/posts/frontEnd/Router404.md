---
title: React-router 404 not found
tags: [frontEnd]
date: "2022.11.10"
---
## 문제발생 

블로그에 댓글 기능을 추가하고 싶어 Giscus을 알아보고 바로 블로그에 적용을 한 후 잘 동작하나 확인을 하던 와중 갑자기 404NotFound가 떠버리는 상황이 발생했다.

## 이유 

우선 깃허브 페이지는 SPA를 지원하지 않는다. 하지만 나는 React에서 SPA를 구현하기 위해 React Router를 사용했고 깃허브 페이지는 ( https://spde3289.github.io/posts ) 와 같은 새로운 경로의 URL을 인식하지 못 하고 새로고침시에 404를 반환하는 것 이다.

## 해결방법 

## HashRouter 

일단 HashRouter 를 사용하는 방법이 있다. BrowserRourer를 HashRouter로 변경을 해주면 될 정도로 간단한 방법인데 단점으로는 못생긴 url과 검색 엔진 최적화(SEO)가 안 된 다는 것 이다.

![백엔드 이미지](/img/react/Router404/HashRouter.png)
이와 같이 사용방법은 아주 간단한데 공식문서에서도 나와 있듯이 추천하는 방법은 아니다.

 

[https://reactrouter.com/en/main/router-components/hash-router](https://reactrouter.com/en/main/router-components/hash-router) 

## index.html 리다이렉션 - 깃허브 

 

[https://github.com/sujinleeme/spa-github-pages-ko](https://github.com/sujinleeme/spa-github-pages-ko) 

이 방법은 위에 있는 방법보다는 나은 방법이다. 우선 퍼플릭 폴더에 404.html파일을 만든 후에

![백엔드 이미지](/img/react/Router404/404.html.png)
이 코드를 작성해주면 된다. 그리고 index.html파일에서 아래와 같은 코드를 작성해주면 된다.

![백엔드 이미지](/img/react/Router404/script.png)
## 마치며 

처음 이 문제가 발생하고나서 해결까지 상당한 시간이 걸렸는데 막상 해결하고나니 어려운문제가 아니였다고 생각이 든다. 내가 이 문제를 어렵다고 생각한 이유는 지금까지 개발하면서 외부적인 요인으로 문제가 생긴적은 처음이라 해결 방향을 잘 못잡은게 아닌가라는 생각이 든다. 구글링을 하며 여러 해결방법들을 프로젝트에 적용을 해보기도 하고 발생한 문제를 여러 단계로 나눠 해결하고자도 해보았지만 가장 중요한건 문제에 대한 타인에게 설명 할 수 있을 정도의 이해와 관련 API 참조문서를 찾아보고 연역적인 사고를 통해 추론해내는 방법이 중요하다 생각이 들었다. 나는 앞으로도 많은 문제들을 마주하게 될 것 이고 그때마다 해결방법이 나올 때 까지 구글링을 반복하는 것 은 비효율적일뿐더러 성장에 있어서도 안 좋은 방향이다. 이 문제의 가장 큰 성과는 문제를 해결함이 아니라 앞으로 내가 어떤 방법으로 문제를 해결해 나가면 될지를 배웠다고 생각이 든다.
