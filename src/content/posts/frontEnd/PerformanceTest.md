---
title: 프론트엔드 성능 측정
tags: [frontEnd]
date: "2024.03.05"
---
## 웹 성능이란 

웹 성능은 페이지의 로딩 시간, 렌더링 속도, 사용자 경험등을 나타내는 말이다. 따라서 웹 성능 측정은 아주 중요한 과정이며 오늘은 웹 성능 측정 도구중 하나인 Lighthouse에 대해서 기록하도록 하겠다.

##    

[https://developer.chrome.com/docs/lighthouse/performance/performance-scoring?hl=ko#metrics](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring?hl=ko#metrics) 

Lighthouse는 구글에서 개발한 웹 페이지 성능 측정 도구로 크롬 브라우저에 내장되어 있어 개발자도구에서 Lighthouse 탭을 이용해 사용할 수 있다.

## 성능 지표 

![백엔드 이미지](/img/frontEnd/PerformanceTest/img1.png)
Lighthouse는 다음과 같은 지표를 보여준다 1. Performance 웹 페이지의 로딩속도를 측정해 지표로 보여준다. 2. Accessibility 웹 사이트의 접근성을 얼마나 잘 지켰나 검사한다. 3. Best Practices 웹 페이지가 웹 표준을 잘 지키고 있는지 검사한다. 4. SEO 웹 페이지가 검색 엔진에 대해 최적화가 잘 되었는지를 검사한다. 5. Progressive Web App 웹 페이지가 웹과 앱이 유사한 사용자 경험을 제공하는지 검사한다.

## 진단 

![백엔드 이미지](/img/frontEnd/PerformanceTest/img3.png)
![백엔드 이미지](/img/frontEnd/PerformanceTest/img2.png)
1. First Contentful Paint는 브라우저가 첫 번째 DOM 컨텐츠를 렌더링하는데 걸리는 시간을 나타낸다. 2. Largest Contentful Paint는 뷰포트에서 가장 큰 컨텐츠 요소가 화면에 렌더링 될 때 걸리는 시간을 타나낸다. 3. Total Blocking Time는 웹 페이지 로딩이 차단된 시간을 나타낸다 주로 과정에서 CSS 및 JS파일의 다운로드 및 파싱, 렌더링을 차단하는 JavaScript코드의 실행이 원인이 된다. 4. Cumulative Layout Shift는 사용자가 불편함을 유발 할 수 있는 요소를 측정하는 지표이다. 5. Speed Index는 웹 페이지를 불러올 때 컨텐츠가 시각적으로 표시될 때 까지 걸리는 시간을 나타낸다.

## 성능 최적화 기대 효과 

이렇게 Lighthouse를 이용해 성능 최적화를 진행하면 보다 빠른 웹 서비스를 제공할 수 있고 이 점은 유저 이탈률을 줄일 수 있다. 실제로 유저들은 3초 이내에 페이지가 로딩되지 않으면 뒤로가기 버튼을 누른다는 구글의 조사 자료가 있다. 또한 빠른 페이지 로딩으로 서버 및 네트워크 리소스 낭비를 줄여 비용을 절감 할 수 있다.

## 추가로 

그동안 나는 개발에만 관심이 있었지 성능 최적화 같이 비지니스나 서비스 운영 쪽으로는 생각하지 못 했었다. 하지만 여러 구직 활동을 진행하면서 서비스 최적화에 대해 알게 되었고 직접 공부해보니 개발이외에도 고려해야 할 부분이 참 많다는걸 느꼈다.

[https://devocean.sk.com/blog/techBoardDetail.do?ID=165395&boardType=techBlog](https://devocean.sk.com/blog/techBoardDetail.do?ID=165395&boardType=techBlog) 
