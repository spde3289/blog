---
title: 정적 게시글을 Server Action으로 읽으려다 삽질한 기록
series: 블로그
tags: ["nextjs", "react", "server-actions", "useactionstate", "caching"]
date: "2025.11.23"
---

Next.js 기반 블로그를 리팩토링하던 중 문득 궁금증이 생겼다. 
정적 빌드된 게시글의 HTML을 필요할 때만 비동기로 불러오면서 로딩 UI도 자연스럽게 띄우고 싶었다. 
이때 폼 제출에 주로 쓰이는 `useActionState`와 서버 액션(Server Action) 조합을 일반적인 '데이터 패칭(Data Fetching)'에도 사용할 수 있을지 테스트해 보았다.

## 서버 액션으로 데이터 패칭 시도

먼저 게시글 경로를 받아 HTML 문자열을 반환하는 서버 액션을 작성했다.

```tsx
'use server'

import { getPostContent } from '@/lib/server/getBlogData'

export async function getPostAction(pathroot: string): Promise<string> {
  return getPostContent(pathroot)
}

```

그리고 클라이언트 컴포넌트에서 `useActionState`에 이 액션을 연결했다.

```tsx
const [html, action, isPending] = useActionState(getPostAction, '')

```

## 문제: 두 번째 호출부터 파라미터가 오염되는 현상

첫 번째 실행은 의도한 대로 HTML을 잘 불러왔다. 하지만 다른 게시글을 클릭해 액션을 두 번째로 호출하는 순간 에러가 발생했다. 서버 액션이 받아야 할 `pathroot` 인자 자리에, 이전 호출의 결과물인 **'게시글 HTML 전체 문자열'**이 들어가 버린 것이다.

## 원인 분석: useActionState의 시그니처 설계

공식 문서를 확인해 보니 원인은 `useActionState`가 액션 함수에 인자를 넘기는 방식에 있었다. 이 훅은 기본적으로 아래와 같은 형태의 함수 시그니처를 기대한다.

```ts
async function action(previousState, payload) {
  // ...
}

```

* **첫 번째 인자:** `previousState` (초기엔 `initialState`, 이후엔 직전 액션의 반환값)
* **두 번째 인자:** `dispatchAction(payload)` 호출 시 넘겨준 실제 데이터

내가 작성한 `getPostAction(pathroot)`은 단일 인자를 받는 함수였다. 
React 입장에서는 첫 번째 인자인 `pathroot` 자리에 가차 없이 `previousState`(이전 HTML 반환값)를 꽂아버린 것이다.

이 문제를 억지로 우회하려면 시그니처를 `(prevHtml, pathroot)` 형태로 수정하면 되지만 단순히 '읽기 전용 데이터'를 가져오기 위해 상태 머신을 억지로 끼워 맞추는 느낌이 강하게 들었다.

## 판단 및 트레이드오프: API Route(Route Handler)로 선회

근본적으로 Next.js 공식 문서에서도 Server Action은 데이터를 읽어오는 용도(Fetching)가 아니라 **폼 제출 및 데이터 변경(Mutation)** 문맥에서 사용할 것을 권장하고 있다.

따라서 읽기 전용 데이터를 가져오는 데 Server Action을 오용하는 것은 프레임워크의 설계 의도와 어긋난다고 판단했다. 결국 상태를 변형하는 액션 대신 전통적이고 목적에 맞는 API Route(Route Handler)를 구현하는 것으로 방향을 틀었다.

```tsx
import { getPostContent } from '@/lib/server/getBlogData'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const pathroot = request.nextUrl.searchParams.get('pathroot')
  if (!pathroot) return new Response('pathroot를 찾을 수 없어요', { status: 400 })

  try {
    const html = getPostContent(pathroot)
    return new Response(html, {
      status: 200,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    })
  } catch (error) {
    return new Response(error instanceof Error ? error.message : '알 수 없는 에러가 발생했어요', {
      status: 500,
    })
  }
}

```

클라이언트에서는 일반적인 `fetch`를 사용해 데이터를 호출하도록 수정했다.

```tsx
const handleGetPostContent = async (pathroot: string) => {
  const encoded = encodeURIComponent(pathroot)
  // Route Handler는 기본적으로 캐싱되지 않으므로 필요에 따라 force-cache 설정
  const res = await fetch(`/api/posts?pathroot=${encoded}`, { cache: 'force-cache' })

  if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`)

  const html = await res.text()
  setPostContent(html)
}

```

## 마무리 및 배운 점

단순한 호기심으로 시작한 삽질이었지만, 프레임워크가 제공하는 도구의 정확한 목적을 짚고 넘어갈 수 있었다.

1. `useActionState`는 액션 함수의 첫 번째 인자로 무조건 `previousState`를 주입하므로, 단일 인자 함수와 결합하면 예기치 않은 파라미터 오염이 발생한다.
2. Server Action은 데이터 조회가 아닌 **데이터 변경(Mutation)**에 특화된 도구다.
3. 데이터를 읽기만 할 때는 목적에 맞게 Route Handler나 서버 컴포넌트에서의 직접 fetch를 사용하는 것이 아키텍처 의도에 부합한다. 또한 Route Handler의 GET 메서드는 기본적으로 캐싱되지 않으므로(`opt-in`), 필요하다면 캐시 설정을 직접 챙겨야 한다.