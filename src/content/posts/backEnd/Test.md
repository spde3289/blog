---
title: 빌드 테스트 반ㅇ마ㅣㄴ럼니ㅏㅇ
tags: [backEnd]
date: "2026.04.27"
---
Express는 Node.js에서 가장 인기 있는 웹 애플리케이션 프레임워크로 HTTP 요청 및 응답을 처리하는데 필요한 많은 기능들을 이용해 추상화된 API를 제공할 수 있습니다.

## Express의 주요 기능 

1. 라우팅 
    express는 간단하게 URL경로의 엔드포인트를 만들 수 있습니다 또한 해당 경로의 HTTP 메서드에 따라 요청을 처리할 수 있습니다.

```javascript
const express = require('express');
const app = express();

// GET 요청 처리
app.get('/', (req, res) => {
  res.send('홈페이지');
});

// POST 요청 처리
app.post('/login', (req, res) => {
  res.send('로그인');
});

app.listen(3000, () => {
  console.log('서버가 3000번 포트에서 실행 중입니다.');
});

```
2. 미들웨어 
    요청과 응답 사이에 특정 작업을 수행할 수 있는 함수입니다. use 메서드를 이용해 간단하게 사용할 수 있고 모든 요청에 대한 핸들링이나 특정 경로에 대한 핸들링을 지정할 수 있습니다.

```javascript
app.use((req, res, next) => { // 모든 경로의 미들웨어
  console.log("요청 URL : ", req.url);
  next(); // 다음 미들웨어로 전달
});
app.use("/admin",(req, res, next) => { // /admim 경로의 미들웨어
  console.log("요청 URL : ", req.url);
  next(); // 다음 미들웨어로 전달
});

```
3. 템플릿 엔진 
    express는 동적인 HTML 페이지를 생성할 수 있습니다. 이는 웹 어플리케이션을 구축하는데 도움을 줍니다.

```javascript
app.use((req, res, next) => { // 모든 경로의 미들웨어
  console.log("요청 URL : ", req.url);
  next(); // 다음 미들웨어로 전달
});
app.use("/admin",(req, res, next) => { // /admim 경로의 미들웨어
  console.log("요청 URL : ", req.url);
  next(); // 다음 미들웨어로 전달
});

```