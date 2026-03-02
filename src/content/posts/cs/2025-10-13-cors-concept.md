---
title: CORS의 개념과 동작 원리 Simple Request와 Preflight
tags: ["CORS", "HTTP", "Browser", "Security"]
date: "2025.10.13"
---

## 시작하기에 앞서

예전에 CORS 글을 한 번 써둔 적이 있는데, 그때는 “대충 이런 느낌” 정도로만 정리했었다. 이번에는 브라우저가 **어떤 기준으로 CORS를 적용하고**, **왜 어떤 요청은 바로 보내고 어떤 요청은 OPTIONS를 먼저 보내는지** 흐름을 기준으로 정리하려 한다.

## CORS란?

CORS(Cross-Origin Resource Sharing)는 **브라우저가 교차 출처 요청을 다룰 때 적용하는 보안 규칙**이다.

- 브라우저는 보안을 위해 **같은 출처(Same-Origin)** 에서만 리소스를 주고받게 제한한다.
- 같은 출처는 **프로토콜 + 호스트(도메인) + 포트** 조합이 모두 같을 때를 말한다.
- 셋 중 하나라도 다르면 **다른 출처(Cross-Origin)** 로 취급한다.

![URL이미지](https://cdn.jsdelivr.net/gh/spde3289/blog-assets@main/content/post/2025-10-13-cors-concept/image.png)

- `https://myapp.vercel.app` → `https://api.myapp.vercel.app` (호스트가 달라서 Cross-Origin)
- `http://myapp.vercel.app` → `https://myapp.vercel.app` (프로토콜이 달라서 Cross-Origin)
- `https://localhost:3000` → `https://localhost:4000` (포트가 달라서 Cross-Origin)

## 브라우저는 어떻게 CORS를 판단할까?

브라우저는 요청을 보낼 때 “이게 교차 출처 요청인지”를 다음처럼 판단한다.

1. **현재 페이지의 Origin**을 기준으로 잡는다.  
   예: `https://myapp.vercel.app`

2. `fetch`, `axios` 등으로 요청할 **대상 URL의 Origin**을 뽑는다.  
   예: `https://api.myapp.vercel.app`

3. 두 Origin이 다르면 **CORS 정책을 적용**한다.

4. CORS 요청이면 브라우저가 자동으로 `Origin` 헤더를 붙이고, 서버 응답의 CORS 관련 헤더를 검사해서 **JS 코드가 응답을 읽어도 되는지** 결정한다.

한 줄로 줄이면 이거다.

> 브라우저는 “요청을 보낸 쪽 Origin”과 “요청 대상 Origin”이 다르면 CORS 정책을 적용한다.

## CORS의 핵심 포인트

CORS에서 헷갈리기 쉬운 포인트가 하나 있다.

- **요청 자체를 막는 게 아니다.**
- 서버 응답은 도착할 수 있다.
- 다만 브라우저가 **JS에서 응답을 읽는 것**을 차단한다.

그래서 네트워크 탭에는 응답이 보이는데, 콘솔에는 CORS 에러가 뜨는 상황이 나온다.

## CORS 동작 흐름

CORS는 크게 두 방식으로 동작한다.

- **단순 요청(Simple Request)**
- **사전 요청(Preflight Request)**

### 단순 요청 (Simple Request)

아래 조건을 만족하면 브라우저는 **바로 본 요청을 보낸다.**

- 메서드가 `GET` / `POST` / `HEAD` 중 하나
- 요청 헤더가 “단순 헤더(simple header)” 범위 안에 있다  
  (예: `Accept`, `Content-Type` 등. 단, `Content-Type`은 아래 값일 때만 단순 요청 조건에 들어간다)
- `Content-Type`이 아래 중 하나다
  - `application/x-www-form-urlencoded`
  - `multipart/form-data`
  - `text/plain`

**동작 흐름**

1) 브라우저 → 서버 (본 요청 전송)

```http
GET /data
Origin: https://myapp.vercel.app
```

* `Origin`은 “이 요청이 어디서 왔는지”를 나타낸다.
* 보안상 이유로 `프로토콜 + 호스트 + 포트`까지만 포함하고, 경로(path)는 포함하지 않는다.
* 사용자가 임의로 `Origin` 값을 넣어서 조작하는 건 브라우저 환경에서 막혀 있다.

2. 서버 → 브라우저 (CORS 허용 여부를 헤더로 답한다)

```http
Access-Control-Allow-Origin: https://myapp.vercel.app
```

브라우저는 응답을 받으면 이런 식으로 검사한다.

* `Access-Control-Allow-Origin` 값이 요청의 `Origin`과 일치하는가?
* 쿠키/인증정보를 포함하는 요청이면, `Access-Control-Allow-Credentials: true`가 있는가?

조건이 맞으면 브라우저가 JS 코드에 응답을 넘겨준다.

3. 서버가 허용하지 않으면

* 서버가 `Access-Control-Allow-Origin`을 안 주거나, 값이 매칭되지 않으면
* 브라우저 콘솔에 CORS 에러가 뜨고, JS 코드에서 응답 접근이 막힌다.

### 사전 요청 (Preflight Request)

요청이 단순 요청 조건을 만족하지 않으면, 브라우저는 **본 요청 전에 OPTIONS로 허락을 먼저 구한다.**

* 메서드가 `PUT`, `PATCH`, `DELETE` 같은 것들일 때
* `Authorization` 같은 커스텀 헤더를 붙일 때
* `Content-Type: application/json`처럼 단순 요청 조건을 벗어날 때

**동작 흐름**

1. 브라우저 → 서버 (사전 요청)

```http
OPTIONS /user
Origin: https://myapp.vercel.app
Access-Control-Request-Method: PUT
Access-Control-Request-Headers: Content-Type, Authorization
```

> “내가 이 Origin에서 PUT 메서드랑 이런 헤더로 요청 보내려고 하는데 괜찮나?”

2. 서버 → 브라우저 (허용 정책 응답)

```http
Access-Control-Allow-Origin: https://myapp.vercel.app
Access-Control-Allow-Methods: GET, POST, PUT
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Max-Age: 3600
```

* `Access-Control-Allow-Methods`: 허용할 메서드
* `Access-Control-Allow-Headers`: 허용할 헤더
* `Access-Control-Max-Age`: 같은 조건의 preflight를 일정 시간 캐시해서 OPTIONS를 매번 보내지 않게 한다

3. 브라우저 → 서버 (본 요청 전송)

preflight가 통과하면 그제서야 실제 요청이 나간다.

```http
PUT /user
Origin: https://myapp.vercel.app
Content-Type: application/json
Authorization: Bearer token...
```

## 정리

* CORS는 **브라우저가 교차 출처 요청을 다룰 때 적용하는 보안 규칙**이다.
* 브라우저는 요청의 Origin과 대상 Origin을 비교해 다르면 CORS를 적용한다.
* 단순 요청이면 바로 본 요청을 보내고,
* 단순 요청이 아니면 OPTIONS(preflight)로 먼저 허락을 구한 뒤 본 요청을 보낸다.
* CORS 위반 시 서버 응답이 도착해도 **브라우저가 JS 접근을 차단**한다.
