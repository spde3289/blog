---
title: fetch가 4xx/5xx에서도 catch로 가지 않는 이유
tags: ["JavaScript", "Fetch", "Error Handling", "HTTP"]
date: "2025.10.10"
---

API 호출하다 보면 404나 500이 떨어졌는데도 `catch`가 안 타서 당황할 때가 있다. 이건 `fetch()`가 “HTTP 에러”를 예외로 취급하지 않기 때문이다.

## fetch의 Promise가 reject 되는 조건

`fetch()`는 **요청 자체가 실패했을 때만** Promise를 `rejected`로 만든다. 기준은 단순하다.

- 브라우저가 요청을 보내지 못했거나
- 보냈는데 **응답을 정상적으로 받지 못했거나**
- 요청이 브라우저 정책에 의해 **차단**됐거나

대표적으로 아래 같은 케이스가 `catch()`로 떨어진다.

- DNS 조회 실패
- 네트워크 연결 끊김
- CORS 정책으로 브라우저에서 차단
- 요청이 중간에 취소됨(AbortController 등)
- 서버가 응답을 아예 못 주는 상황(연결 실패/타임아웃에 준하는 케이스)

이 경우에는 “네트워크 레벨에서 실패”라서 `fetch()` Promise 자체가 reject 된다.

## 4xx, 5xx는 왜 catch로 안 갈까?

404, 500은 **서버가 응답을 보낸 것**이다. 즉 네트워크 관점에서는 성공이다.

브라우저는 “이 응답이 비즈니스적으로 실패인지”까지 판단하지 않는다.
`fetch()`의 기준은 이거 하나다.

- 요청을 보냈고 응답을 받았는가?

이 조건만 만족하면 상태 코드가 400이든 500이든 Promise는 `fulfilled`가 된다.
그래서 HTTP 에러 처리는 개발자가 직접 해야 한다.

## 처리 방식: res.ok / res.status 검사

가장 흔한 패턴은 `res.ok`를 체크하고 직접 에러를 던지는 방식이다.

```ts
fetch("/api/data")
  .then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`);
    }
    return res.json();
  })
  .catch((err) => {
    console.error("Fetch Error:", err);
  });
```

* HTTP 에러(4xx/5xx) → `res.ok === false` → 직접 `throw` 해야 `catch`로 간다.

## 실전에서 자주 하는 래핑(공통 함수)

매번 `if (!res.ok)`를 쓰기 싫으면 fetch 래퍼를 하나 만들어두는 게 편하다.

```ts
class HttpError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.name = "HttpError";
    this.status = status;
  }
}

export const fetchJson = async <T>(input: RequestInfo | URL, init?: RequestInit) => {
  const res = await fetch(input, init);

  if (!res.ok) {
    throw new HttpError(res.status, `HTTP error: ${res.status}`);
  }

  // 여기서 json 파싱이 실패하면(응답이 JSON이 아닌데 json() 호출 등)
  // 그 에러는 그대로 throw 되고 호출부의 catch에서 잡힌다.
  return (await res.json()) as T;
};
```

이렇게 해두면 호출부는 “성공 데이터만 받는다”는 전제로 코드가 단순해진다.

## 정리

* `fetch()`는 **네트워크 레벨 실패**에서만 `reject` 된다.
* 4xx/5xx는 “응답은 왔다”에 해당해서 Promise가 `fulfilled` 된다.
* 그래서 HTTP 에러는 `res.ok`/`res.status`로 직접 판단하고 필요하면 `throw`해서 `catch`로 넘겨야 한다.
