---
title: 서버 컴포넌트 프리렌더링을 위한 토큰 관리 마이그레이션 - LocalStorage에서 Cookie로
series: global-nomad
tags: ["nextjs", "ssr", "cookie", "auth", "middleware"]
date: "2026.02.07"
---

Next.js App Router를 도입한 가장 큰 이유는 서버 컴포넌트(RSC)를 활용한 프리렌더링(Pre-rendering)과 이를 통한 SEO 최적화였다. 하지만 프로젝트를 진행하던 중 인증이 필요한 데이터를 서버 컴포넌트에서 페칭하려 할 때 구조적인 한계에 부딪혔다.

기존 인증 로직은 로그인 성공 시 발급받은 액세스 토큰과 리프레시 토큰을 브라우저의 `localStorage`에 저장하고 있었다. 클라이언트 컴포넌트에서는 문제가 없었지만, 서버 환경에서 실행되는 서버 컴포넌트는 클라이언트의 로컬 스토리지에 접근할 수 없다. 당연히 API 요청 시 헤더에 토큰을 실어 보낼 수 없었고, 이는 유저 맞춤형 페이지의 초기 렌더링을 불가능하게 만들었다.

이 문제를 해결하기 위해 토큰 저장소를 `localStorage`에서 `Cookie`로 변경하기로 결정했다. 쿠키는 브라우저가 서버로 요청을 보낼 때 자동으로 헤더에 포함되므로, Next.js 환경(서버 컴포넌트, 미들웨어)에서도 손쉽게 토큰을 읽고 사용할 수 있다.

마이그레이션 과정에서 단순히 저장소만 바꾸는 것에 그치지 않고, 프론트엔드 아키텍처 관점에서 인증 흐름을 전면적으로 수정했다.

## 1. Route Handler를 활용한 프록시 계층 (BFF) 구현

가장 먼저 한 고민은 '클라이언트에서 직접 쿠키를 설정할 것인가, 서버에서 설정할 것인가'였다. 
클라이언트에서 `document.cookie`로 직접 토큰을 굽게 되면 XSS 공격에 취약해진다. 
따라서 보안성을 높이기 위해 `HttpOnly` 속성을 가진 쿠키를 사용해야 했고, 이를 위해 Next.js의 Route Handler를 활용했다.

```typescript
// src/app/(auth)/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { API_ENDPOINTS, BASE_URL } from "@/constants/apiEndPoint";
import { setTokenCookies } from "@/lib/client/auth";

const POST = async (request: NextRequest) => {
  try {
    const { email, password } = await request.json();
    const res = await fetch(`${BASE_URL}${API_ENDPOINTS.AUTH.LOGIN}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json({ message: data.message || "로그인 실패" }, { status: res.status });
    }

    // 서버 측(Route Handler)에서 HttpOnly 쿠키 설정
    const { accessToken, refreshToken, user } = data;
    await setTokenCookies({ accessToken, refreshToken });
    
    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ message: "로그인 에러" }, { status: 500 });
  }
};

```

이렇게 구성하면 클라이언트는 직접 백엔드 API와 통신하지 않고 Next.js 서버(`/api/auth/login`)와 통신한다. 
이로써 프론트엔드 환경에서 토큰이 직접 노출되는 것을 막고, 인증 흐름을 보다 안전하게 통제할 수 있다. 
카카오 로그인 콜백(`/api/auth/kakao/callback`) 역시 같은 방식으로 백엔드와 통신 후 서버 단에서 리다이렉트와 쿠키 설정을 처리하도록 변경했다.

## 2. Middleware를 통한 토큰 갱신 및 헤더 주입 자동화

쿠키에 담긴 토큰을 모든 요청마다 수동으로 꺼내서 헤더에 넣는 것은 비효율적이다. Next.js의 미들웨어를 거치도록 아키텍처를 설계하여 이 과정을 자동화했다.

미들웨어에서 리프레시 토큰을 이용한 토큰 갱신 로직까지 담당하게 했다. 
이전에 클라이언트(Axios 인터셉터)에서 처리하던 복잡한 토큰 재발급 로직을 미들웨어로 위임한 것이다.

```typescript
// src/middleware.ts
export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  if (!pathname.startsWith("/api/")) return NextResponse.next();
  
  // (예외 처리 생략)
  
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  // accessToken이 있으면 헤더에 자동 주입
  if (accessToken) {
    const headers = new Headers(request.headers);
    headers.set("Authorization", `Bearer ${accessToken}`);
    return NextResponse.next({ request: { headers } });
  }

  // accessToken이 만료되고 refreshToken만 있는 경우 갱신 시도
  if (refreshToken) {
    const tokens = await refreshTokens(refreshToken);
    if (tokens) {
      const headers = new Headers(request.headers);
      headers.set("Authorization", `Bearer ${tokens.accessToken}`);
      const response = NextResponse.next({ request: { headers } });
      
      // 갱신된 토큰으로 새 쿠키 발급
      response.cookies.set("accessToken", tokens.accessToken, {
        ...COOKIE_OPTIONS, maxAge: TOKEN_MAX_AGE.ACCESS,
      });
      // (refreshToken 쿠키 세팅 로직 생략)
      
      return response;
    }
    // 갱신 실패 시 쿠키 삭제 (강제 로그아웃 유도)
    const response = NextResponse.next();
    response.cookies.delete("accessToken");
    response.cookies.delete("refreshToken");
    return response;
  }

  return NextResponse.next();
};

```

## 3. 클라이언트 상태 관리의 단순화 및 Rewrites 설정

위와 같은 구조 개편 덕분에 클라이언트단의 코드는 매우 가벼워졌다.

기존 Zustand `useAuthStore`와 Axios 설정에 존재하던 `localStorage` 관련 로직을 전부 삭제했다. 
클라이언트의 API 요청은 `next.config.ts`의 `rewrites` 기능을 통해 Next.js 서버를 거쳐 실제 백엔드로 향하게 된다.

```typescript
// next.config.ts
async rewrites() {
  return {
    fallback: [
      {
        source: "/api/:path*",
        destination: "https://외부백엔드API/:path*",
      },
    ],
  };
},

```

## 4. 인증 아키텍처 개편 성과 요약
이번 마이그레이션을 통해 세 가지 측면에서 뚜렷한 이점을 확보했다.

- **보안성(Security):** 클라이언트가 직접 제어할 수 없는 HttpOnly 속성의 쿠키를 사용하여 XSS 취약점을 사전에 차단했다.
- **사용성(UX):** 서버 컴포넌트에서 인증 토큰을 활용한 SSR 데이터 페칭이 가능해졌다. 이로 인해 유저 맞춤 페이지의 초기 로딩 속도가 크게 향상되었고, 클라이언트에서 렌더링을 기다리며 발생하던 화면 깜빡임 현상을 완전히 없앴다.
- **유지보수(DX):** 클라이언트 내부의 복잡한 로직을 걷어내고 통신 계층을 Next.js 미들웨어로 중앙화했다. 실제로 복잡하게 얽혀 있던 클라이언트의 Axios 설정 파일을 83줄에서 9줄로 대폭 축소하며 코드 가독성과 유지보수성을 크게 높였다.

## 트레이드오프 및 결론

이 아키텍처 도입으로 얻은 가장 큰 이점은 **목표했던 서버 컴포넌트의 프리렌더링이 자유로워졌다는 점**이다. 
`cookies().get('accessToken')`을 통해 서버 컴포넌트에서도 안전하게 인증된 데이터를 페칭하여 완성된 HTML을 그릴 수 있다. 클라이언트의 코드 복잡도도 크게 줄어들었다.

하지만 명확한 트레이드오프도 존재한다.
모든 클라이언트의 API 요청이 브라우저에서 외부 백엔드로 직접 향하는 것이 아니라 Next.js 서버(Middleware 및 Rewrites)를 한 번 더 거치게 된다. 
이는 필연적으로 Next.js 서버의 컴퓨팅 리소스 소모를 증가시킨다. 트래픽이 많아질 경우 프록시 서버 역할을 하는 Next.js 서버 자체가 병목 구간이 될 수 있으므로, 향후 서비스 규모가 커진다면 비용이나 성능 측면에서 이중 프록시 구조에 대한 재검토가 필요할 수 있다.