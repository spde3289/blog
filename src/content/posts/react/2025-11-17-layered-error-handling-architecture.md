---
title: 팬덤케이 프로젝트 레이어드 에러 처리 구조 설계 기록
series: fandom-k
tags: ["React", "React Router", "Error Boundary", "Axios", "UX", "에러 처리"]
date: "2025.11.17"
---

처음에는 **API 요청 실패 → 토스트 노출**로 단순하게 처리했다.

- 어떤 에러는 토스트만 띄우기엔 너무 중요했다
- 어떤 에러는 전체 페이지를 멈추기엔 너무 사소했다
- 어떤 화면은 갑자기 React Router 기본 에러 화면이 뜨며 UX가 깨졌다

이 문제를 겪던 중, 멘토님이 이런 피드백을 줬다.

> “에러 바운더리를 만들어서 공통적으로 처리해보면 어떨까요?  
> 최상단 레이어에서 처리할 에러와 기능 단위에서 처리할 에러를 구분하면 좋을 것 같아요.”

이 피드백을 바탕으로, 프로젝트에서 **에러를 영향 범위 기준으로 레이어링해서 관리하는 구조**를 만들어 봤다.
결과적으로 에러가 나도 페이지가 무너지지 않았고, UX를 유지하면서 안정적으로 처리할 수 있었다.

## 문제 정의

당시 에러 처리 방식은 대략 이런 상태였다.

- API 실패 → 토스트 표시
- 잘못된 라우터 경로 → React Router 기본 에러 화면 노출
- 특정 섹션만 실패해도 페이지 전체가 붕괴
- loader/action 에러가 의도한 UI에서 잡히지 않음
- 심각한 에러든 사소한 에러든 동일하게 토스트로 처리됨

**오류의 심각도와 책임 범위가 구분되지 않았다.** 그래서 에러를 “어디까지 영향을 주는가(영향 범위)” 기준으로 나눴다.

## 에러 레이어 구조

```txt
1) 페이지 전체에 영향을 주는 에러  → RouteErrorPage
2) 잘못된 URL 접근               → NotFoundPage
3) 특정 섹션만 깨지는 오류        → SectionErrorBoundary
4) API 요청 실패 같은 즉시 알림   → Toast UI (axios interceptor)
```

* 페이지가 렌더링 자체가 불가능하면 “페이지 레벨”에서 잡는다
* 사용자가 길을 잘못 들었으면 “404 전용 화면”으로 안내한다
* 일부 기능만 실패하면 “섹션만 대체(fallback)”한다
* UI를 바꾸지 않고 알려야 하면 “토스트”로 끝낸다

## RouteErrorPage: 라우팅된 페이지 내부 치명적 에러 처리

React Router는 loader/action/lazy component에서 발생하는 에러를 `errorElement`로 페이지 단위에서 잡을 수 있다.

이 레이어는 **페이지 자체를 보여줄 수 없는 수준의 에러**를 처리한다.

```jsx
// router config
errorElement: <RouteErrorPage />
```

```jsx
// RouteErrorPage.jsx
import { useRouteError } from "react-router-dom";

const RouteErrorPage = () => {
  const error = useRouteError();

  const message =
    error?.statusText ||
    error?.message ||
    "알 수 없는 오류가 발생했습니다.";

  return (
    <div>
      <h1>문제가 발생했어요</h1>
      <p>{message}</p>
    </div>
  );
};

export default RouteErrorPage;
```

이 레이어가 필요한 상황은 이런 케이스였다.

* API 500으로 인해 페이지가 의존하는 데이터 로딩이 실패했고, 페이지 구성 자체가 불가능할 때
* loader() 내부에서 `throw new Error()`가 발생했을 때
* 페이지 자체가 깨지는 수준의 오류가 발생했을 때

## NotFoundPage: 잘못된 URL 접근 처리

잘못된 URL로 들어오면 React Router는 기본 에러 화면을 띄운다.
근데 그 화면이 사용자 입장에서는 불편한 상황이기 때문에 404를 만들어 올바른 경로로 돌아가도록 했다.

```jsx
// AppRouter.jsx
{ path: "*", element: <NotFoundPage /> }
```

```jsx
// NotFoundPage.jsx
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const handleGoHome = () => navigate("/", { replace: true });

  return (
    <div>
      <h1>404</h1>
      <p>요청한 페이지를 찾을 수 없어요.</p>
      <button onClick={handleGoHome}>홈으로 가기</button>
    </div>
  );
};

export default NotFoundPage;
```

## SectionErrorBoundary: 섹션 단위 오류 처리

페이지 전체가 아니라 **특정 컴포넌트만 실패**하는 케이스가 있었다.

* 차트 데이터만 실패한 경우
* 특정 섹션 API가 느려서 504가 뜬 경우
* Non-critical 기능에서만 에러가 난 경우

이때 전체 페이지가 무너지는 건 UX 적으로 좋지 않다고 생각했다.
그래서 `react-error-boundary`를 이용해 섹션 단위로 격리했다.

```jsx
import { ErrorBoundary } from "react-error-boundary";

const SectionErrorBoundary = ({ children }) => (
  <ErrorBoundary
    FallbackComponent={SectionErrorFallback}
    onError={(err) => console.error(err)}
  >
    {children}
  </ErrorBoundary>
);
```

```jsx
const SectionErrorFallback = ({ error, resetErrorBoundary }) => {
  const message =
    error?.response?.status === 504
      ? "서버 응답이 지연되어 요청을 처리할 수 없어요. (504 Gateway Timeout)"
      : error?.message || "요청을 처리하는 중 문제가 발생했어요.";

  return (
    <div>
      <h2>⚠️ 섹션 로딩 중 오류가 발생했어요</h2>
      <p>{message}</p>
      <button onClick={resetErrorBoundary}>다시 시도하기</button>
    </div>
  );
};
```

* 해당 섹션만 fallback UI로 교체된다
* 페이지 전체 UX는 유지된다
* “다시 시도하기”로 기능 단위 재시도가 가능하다

## axios interceptor: 즉시 알려야 하지만 화면은 유지해야 하는 에러

axios interceptor에서는 **기능이 실패했음을 즉시 알려야 하는 에러**를 처리했다.

```jsx
client.interceptors.response.use(
  (res) => res,
  (error) => {
    showToast("요청 처리 중 문제가 발생했어요. 다시 시도해주세요.");
    return Promise.reject(error);
  }
);
```

이 레이어는 **즉각적인 피드백**만 주는 역할이다.

* 네트워크 에러
* 서버 지연
* 특정 요청 실패

## 전체 구조 요약

```txt
[ 가장 바깥 ]
  RouteErrorPage (페이지 레벨 치명적 에러)
    └── NotFoundPage (잘못된 경로)
      └── SectionErrorBoundary (섹션 기능 실패)
        └── axios interceptor (요청 실패 알림)
```

에러가 발생하면 영향 범위에 맞는 레이어에서 처리되도록 만들었다.

## 마치며
* 에러 처리는 “보여주는 UI” 문제가 아니라 “관리 기준” 문제다
* 영향 범위를 나누는 것만으로 UX가 크게 좋아진다
* 토스트/페이지/섹션/라우터는 역할이 다르다

다음 프로젝트에서는 여기서 더 나아가서 **Sentry 같은 버그 트래킹 도구를 연동**하고 싶다.
화면에 보여주는 걸 넘어서, 실제 운영 환경에서 어떤 에러가 얼마나 발생하는지 수집하고 그 데이터를 기반으로 전략을 계속 개선해보고 싶다.
