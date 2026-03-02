---
title: Next.js에서 Axios를 유지하며 Fetch 캐싱 적용 및 검증하기
tags: ["Next.js", "Axios", "Fetch", "Caching"]
date: "2026.01.21"
---

부트캠프 최종 프로젝트를 Next.js로 진행했다. Next.js의 렌더링 최적화와 Data Cache를 제대로 활용하려면 프레임워크가 자체 확장한 fetch 함수를 써야 한다.

하지만 캐싱 하나 때문에 Axios의 인스턴스(Instance)나 인터셉터(Interceptor) 같은 편의 기능을 포기하기엔 아쉬웠다. 직접 fetch 래퍼(Wrapper)를 구현하는 비용도 크다고 판단했다. 그래서 Axios를 유지한 채 Next.js의 캐싱 레이어를 활용할 방법을 찾았다.

## Next.js 캐싱과 Axios의 충돌 원인

Next.js 공식 문서에 따르면 Data Cache나 Request Memoization 기능은 브라우저의 기본 `fetch` API를 Next.js가 서버 사이드에서 자체적으로 패치(patch)한 버전을 통해서만 동작한다.

반면, Axios는 Node.js 환경에서 기본적으로 `http` 모듈을 사용해 네트워크 요청을 처리한다. 
따라서 Axios로 API를 호출하면 Next.js가 가로채어 캐싱을 적용하는 `fetch` 파이프라인을 완전히 우회하게 되어 매번 새로운 데이터를 가져오게 된다.

## Axios Fetch Adapter 도입

[Axios 공식 문서](https://github.com/axios/axios/releases/tag/v1.7.0)를 보면 v1.7.0부터 `adapter` 옵션에 `fetch`가 공식 추가되었다. 본래는 `xhr`이나 `http`를 쓸 수 없는 엣지(Edge) 환경을 위한 기능이다.

하지만 이를 명시적으로 선언하면 Node.js 환경(Next.js 서버)에서도 강제로 `fetch`를 사용하도록 만들 수 있다.

```typescript
// 특정 요청에만 적용할 경우
const { data } = await axios.get(url, {
  adapter: 'fetch'
});

// 인스턴스 전체에 적용할 경우
const fetchAxios = axios.create({
  adapter: 'fetch'
});

```

## 정말로 캐싱이 동작하는가? (성능 및 로그 검증)

이론상으로는 `fetch` 어댑터를 쓰면 캐싱이 동작해야 한다. 실제 환경에서 Next.js의 Data Cache 레이어가 정확히 동작하는지 검증 코드를 작성했다.

```tsx
// eslint-disable-next-line @typescript-eslint/naming-convention
const API_URL = "https://jsonplaceholder.typicode.com/posts";

// 1. [기본 fetch] 매 요청마다 새 데이터를 가져온다.
const getFetch = () => fetch(API_URL).then((res) => res.json());

// 2. [Next.js Data Cache 적용] 60초마다 캐시를 갱신한다.
const cacheFetch = () => fetch(API_URL, {
    cache: "force-cache",
    next: { revalidate: 60 },
  }).then((res) => res.json());

// 3. [Axios 기본 호출] 캐시 레이어를 우회하며 매번 네트워크 통신이 발생한다.
const getAxios = () => axios.get(API_URL).then((res) => res.data);

// 4. [Axios + Next.js 캐시 통합] adapter를 통해 fetch로 우회하여 캐시를 적용한다.
const cacheAxios = () => axios.get(API_URL, {
      adapter: "fetch",
      fetchOptions: { cache: "force-cache", next: { revalidate: 60 } },
    }).then((res) => res.data);

const withPerformanceLog = async <T,>(label: string, fetcher: () => Promise<T>): Promise<T> => {
  const start = performance.now();
  const data = await fetcher();
  const end = performance.now();
  const time = (end - start).toFixed(2);

  console.log(`\x1b[36m[Cache Test]\x1b[0m \x1b[33m${label.padEnd(12)}\x1b[0m : \x1b[32m${time}ms\x1b[0m`);
  return data;
};

const CacheTestPage = async () => {
  await withPerformanceLog("getFetch", getFetch);
  await withPerformanceLog("cacheFetch", cacheFetch);
  await withPerformanceLog("getAxios", getAxios);
  await withPerformanceLog("cacheAxios", cacheAxios);

  return (
    <div>
      <h1>데이터 캐싱 테스트</h1>
    </div>
  );
};

```

![콘솔확인](https://cdn.jsdelivr.net/gh/spde3289/blog-assets@main/content/post/2026-01-21-nextjs-axios-fetch-adapter-caching/console.png)

서버를 띄우고 여러 번 새로고침을 수행한 결과 `cacheFetch`와 `cacheAxios` 모두 초기 요청 이후부터는 응답 시간이 눈에 띄게 단축되었다. 
어댑터가 의도대로 동작하여 Next.js 서버의 영구 캐시를 참조하고 있다는 뜻이다.

시간 측정 외에도 `next.config.ts`에 로깅 설정을 추가하면 터미널에서 명시적인 캐시 히트 여부를 확인할 수 있다. 
콘솔에 `(cache hit)` 로그가 찍히는 것을 직접 확인했다.

```typescript
const nextConfig: NextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

```

![캐시로그](https://cdn.jsdelivr.net/gh/spde3289/blog-assets@main/content/post/2026-01-21-nextjs-axios-fetch-adapter-caching/cache.png)

## 이슈 검증: Revalidate 옵션 누락 이슈

기능 도입 전 추가로 고려해야 할 트레이드오프나 버그가 있는지 Axios 깃허브 이슈를 탐색하다 
과거 버전에 [**Using Next.js' patched fetch with Axios fetch adapter does not pass init options (#6886)**](https://github.com/axios/axios/issues/6886) 라는 이슈가 있었다. 
Next.js 고유 옵션인 `next: { revalidate: 60 }` 값이 내부 `fetch` 함수로 제대로 전달되지 않는다는 내용이다.

현재 프로젝트에서 사용하는 Axios v1.13.3 기준으로 이 문제가 해결되었는지 직접 테스트했다.
1. `revalidate: 1` (1초 후 재검증)로 설정 후 새로고침 반복.
2. `.next/dev/cache/fetch-cache` 디렉터리 내부 캐시 파일의 수정 시간 갱신 여부 관찰.

다행히 파일이 주기적으로 갱신되었다. ISR(Incremental Static Regeneration) 형태의 Time-based Revalidation이 정상 동작하는 것을 확인했다.

| 이전 | 이후 |
| :---: | :---: |
| ![기존](https://cdn.jsdelivr.net/gh/spde3289/blog-assets@main/content/post/2026-01-21-nextjs-axios-fetch-adapter-caching/before.png) | ![캐싱](https://cdn.jsdelivr.net/gh/spde3289/blog-assets@main/content/post/2026-01-21-nextjs-axios-fetch-adapter-caching/after.png) |


## 마치며

`Axios`의 `fetch` 어댑터를 사용하면 두 가지 이점을 모두 챙길 수 있다. Next.js의 렌더링 최적화(Data Cache)와 `Axios`의 강력한 인터셉터 기능이다.

JWT 토큰 자동 갱신이나 공통 에러 핸들링을 위해 `fetch` 기반 래퍼 함수를 새로 짤 필요가 없다. 
Axios의 인스턴스(Instance)나 인터셉터(Interceptor) 같은 편리한 기능을 활용해 개발 비용을 크게 줄일 수 있었다.