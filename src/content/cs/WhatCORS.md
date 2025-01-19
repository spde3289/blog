---
title: CORS란?
tags: [Cs]
date: "2024.05.04"
---
Express를 이용해 백엔드를 개발하던 중 CORS에러가 발생하게 되었습니다. cors 라이브러리를 이용해 문제를 해결했지만 이 cors가 무엇인지 또 어떻게 해결해야 하는지를 기록하려고 합니다. CORS를 알기 이전에 Same-Origin정책과 Cross-Origin에 대해서 알아야 하는데 Same-Origin은 웹 보안 모델에서 같은 Origin에서 제공됨을 의미합니다. 반대로 Cross-Origin는 서로 다른 출처임을 의미합니다.

## CORS란? 

CORS(Cross-Origin Resource Sharing)는 서버가 자신의 리소스를 다른 출처에서 가져올 수 있도록 허용하는 HTTP 헤더 기반의 메커니즘입니다. 약간 말이 어려운데 간단하게 풀어서 말하면 출처가 다른 도메인에 fetch()나 XMLHttpRequest를 이용해 데이터를 요청한다면 보안상의 이유로 요청을 차단한다는 말입니다. 예를 들어서 브라우저A 에서 백엔드로 데이터를 가져오고 있다고 합시다. 이때 브라우저A 와 유사한 웹 사이트인 브라우저B를 만들어 백엔드에 데이터 요청을 할 시 이를 요청을 거부해 데이터 유출을 방지하거나 CSRF(교차 사이트 요청 위조) 공격 방지의 역할을 합니다.

여기에서 출처(origin)란 "도메인, 프로토콜, 포트"의 조합을 의미합니다. 예를 들어, https://example.com:443는 "https", "example.com", "443 포트"로 이루어진 하나의 출처입니다.

![백엔드 이미지](/img/cs/WhatCORS/URLimg.png)
protocol : http, https host : 사이트 도메인 port : 포트번호 path : 사이트 내부 경로 query string : 쿼리스트링 hash : Fragment

CORS를 살펴보면 서버가 요청에 대한 응답을 차단하는 것 처럼 보이지만 사실 브라우저에서 이 작업이 이루집니다. 

이렇게 CORS의 동작하는 방법이 아주 간단해보이지만 CORS가 동작하는 방법은 세가지나 있습니다. 사실 동작하는 순서 정도만 알고 있어도 문제를 해결하는데 큰 문제는 없지만 여기까지 왔으니 세가지의 시나리오까지 공부하고 넘어가겠습니다.

## CORS 동작 유형 

### Simple Request 

이름 그대로 단순 요청은 사전 요청 없이 서버로 요청을 보내 이루어집니다. 서버에서 Access-Control-Allow-Origin를 보내주면 브라우저에서 CORS 정책 위반 여부를 검사합니다. 아무 요청이나 단순 요청이 되는건 아니고 조건을 충족해야만 합니다. 조건 1. 조건 2. 조건 3. 
    HTTP 메서스 GET, POST, HEAD중 하나
    "CORS-safe"헤더 사용 (Accept, Accept-Language, Content-Language, Content-Type, DPR, Downlink, Save-Data, Viewport-Width, Width) 와 같은 헤더.
    만약 Content-Type를 사용하는 경우에는 application/x-www-form-urlencoded, multipart/form-data, text/plain만 허용

![백엔드 이미지](/img/cs/WhatCORS/Simple.png)
까다로운 조건 때문에 단순 요청보단 사전 요청이 많이 일어납니다.

### Preflight Request 

사전 요청은 서버에 OPTIONS 메서드를 사용하여 CORS 정책을 확인하는 요청입니다.

![백엔드 이미지](/img/cs/WhatCORS/Preflight.png)
위 사진의 흐름을 설명하자면 와 같은 순서로 이루어집니다.
    Access-Control-Request-Method: 실제 요청에서 사용할 HTTP 메서드 (예: PUT, DELETE). Access-Control-Request-Headers: 실제 요청에서 사용될 헤더들 (예: Authorization, X-Custom-Header). Origin: 요청을 보낸 출처 (예: http://example.com). 
    Access-Control-Allow-Methods: 허용되는 HTTP 메서드 목록. Access-Control-Allow-Headers: 허용되는 헤더 목록. Access-Control-Allow-Origin: 허용된 출처(Origin). 
    이때 요청이 안전하지 않는다면 CORS 에러가 발생하고 본 요청은 보내지 않습니다.

사전 요청은 보안을 강화하는 목적으로썬 매우 훌륭하지만 실제 요청에 걸리는 시간이 늘어난다는 단점이 있는데 Access-Control-Max-Age를 이용하면 사전 요청에 대한 응답을 캐싱해 다음 요청을 보낼땐 사전 요청없이 실제 요청을 보낼 수 있습니다.

### Credentialed Request 

마지막으로 인증된 요청은 클라이언트가 인증 정보를 포함해 서버로 보내는 요청인데 이 인증 정보에 주로 쿠키, Authorization 헤더와 같은 정보를 포함합니다. 인증된 요청에 대한 과정을 설명하자면

![백엔드 이미지](/img/cs/WhatCORS/Credentialed.png)
 
    클라이언트에선 credentials옵션 인증에 대한 정보를 담을 수 있습니다.

| 옵션 값 | 설명 |
| --- | --- |
| same-origin (기본값) | 같은 출처 간 요청에만 인증 정보를 담을 수 있습니다. |
| include | 모든 요청에 인증 정보를 담을 수 있습니다. |
| omit | 모든 요청에 인증 정보를 담지 않습니다. |
axios를 사용하는 경우 withCredentials를 이용해 인증 정보를 포함한 요청을 보낼 수 있다.

```javascript
// 1. axios 전역 설정
axios.defaults.withCredentials = true; // withCredentials 전역 설정

axios.post('https://api.example.com/login', {
  username: 'user',
  password: 'password'
}, {
  headers: {
    Authorization: `Bearer ${token}`, // JWT 토큰을 Authorization 헤더에 포함
  },
  withCredentials: true, // 쿠키를 포함할 경우, 교차 출처 요청 시 설정
})

axios.post('https://api.example.com/data', {
  withCredentials: false, // 인증 정보를 포함하지 않음
})
```
 
>서버는 Access-Control-Allow-Credentials 헤더를 설정해 인증된 요청에 대해 허용할 수 있습니다. 이때 헤더의 값은 true로 설정되어야 합니다. 또한 Access-Control-Allow-Origin 헤더의 값은 * (와일드카드)를 사용할 수 없으면 명시적인 도메인을 설정해야 합니다.

## CORS를 해결하는 방법 

CORS에 대해서 알아 보았는데 그래서 어떻게 해야 이 문제를 해결할 수 있는가 싶을건데 앞서 설명했던 대로 프록시 서버를 사용하거나 서버에서 Access-Control-Allow-Origin 헤더를 세팅하면 됩니다. 여기서 프록시 서버란 클라이언트와 서버 사이에 있는 중간 서버입니다. 하지만 가장 정석적인 해결 방법은 서버에서 Access-Control-Allow-Origin 헤더를 설정하는 방법인데 아래와 같이 설정할 수 있습니다.

```javascript
res.setHeader('Access-Control-Allow-Origin', 'https://naver.com'); // 특정 출처만 허용
res.setHeader('Access-Control-Request-Methods', 'GET, POST, PUT, DELETE'); // 허용할 HTTP 메서드
res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization'); // 허용할 헤더
res.setHeader('Access-Control-Max-Age', '60'); // 프리플라이트 요청 캐시 시간 (60초)
res.setHeader('Access-Control-Allow-Credentials', 'true'); // 쿠키를 통한 자격 증명 포함 여부
res.setHeader('Access-Control-Expose-Headers', 'Content-Length'); // 노출할 헤더

```
하지만 저는 Express를 이용해 백엔드 서버를 구성했기 때문에 cors 미들웨어 라이브러리를 이용해 쉽게 설정할 수 있습니다.

```javascript
const express = require('express');
const cors = require('cors');

const app = express();

const corsOptions = {
  origin: 'https://naver.com', // 특정 출처만 허용
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // 허용할 메서드
  allowedHeaders: ['Origin', 'Accept', 'X-Requested-With', 'Content-Type', 'Access-Control-Request-Method', 'Access-Control-Request-Headers', 'Authorization'], // 허용할 헤더
  credentials: true, // 쿠키 포함 여부
  maxAge: 60, // 프리플라이트 요청 캐시 시간
  exposedHeaders: ['Content-Length'], // 노출할 헤더
};

app.use(cors(corsOptions));

app.listen(3000, () => {
  console.log('서버가 3000번 포트에서 실행 중입니다.');
});

```
## 번외 

CORS가 무엇인지 Same-Origin 정책이 무엇인지, Cross-Origin이 무엇인지 알아보았는데 img, script, link, video, audio, iframe 태그나 CSS 웹 폰트 요청, Stylesheet 내 배경 이미지 요청등 외부 리소스에 요청을 하는 경우도 있는데 왜 CORS가 발생하지 않는지 궁금증이 생겨 알아보니 위와 같은 경우는 JavaScript를 이용한 리소스 요청이 아니라 단순 리소스 요청으로 분류되어 브라우저가 보안 위험이 낮다고 판단해 CORS 정책을 엄격히 적용하지 않는다고 합니다.
