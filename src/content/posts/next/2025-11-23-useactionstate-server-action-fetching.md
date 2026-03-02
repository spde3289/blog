---
title: 정적 게시글을 Server Action으로 읽으려다 삽질한 기록
series: 블로그
tags: ["Next.js", "React", "Server Actions", "useActionState", "캐싱"]
date: "2025.11.23"
---

이번에 Next.js 블로그를 리팩토링하다가 궁금증이 생겼다.

**`useActionState`는 진짜 폼 액션을 위한 훅인가?**
아니면 일반 서버 액션(Server Action)에도 써도 되는 걸까?

정적 빌드된 게시글 HTML을 “필요할 때만” 가져오면서 로딩 UI도 띄우고 싶어서,
서버 액션 + `useActionState` 조합을 먼저 시도했다.

## 서버 액션으로 게시글 HTML을 읽어오려 했던 시도

```tsx
const [state, dispatchAction, isPending] = useActionState(action, initialState, permalink?)
```

그래서 서버 액션을 하나 만들었다.

```tsx
'use server'

import { getPostContent } from '@/lib/server/getBlogData'

export async function getPostAction(pathroot: string): Promise<string> {
  return getPostContent(pathroot)
}
```

그리고 클라이언트 컴포넌트에서 이렇게 붙였다.

```tsx
const [html, action, isPending] = useActionState(getPostAction, '')
```

## 문제: 두 번째 실행부터 파라미터가 꼬였다

첫 실행은 문제없이 동작했지만 두 번째 실행부터는 서버 액션이 받아야 할 `pathroot` 대신 **이미 변환된 HTML 전체가 다음 호출의 인자로 들어갔다.**

결과적으로 게시글을 못 가져오는 문제가 생겼다.

## 원인: useActionState 액션의 첫 번째 인자는 “이전 state”다

`useActionState`는 액션 함수에 인자를 이렇게 넘긴다. ([React][1])

* 첫 번째 인자: `previousState` (처음엔 `initialState`, 이후엔 직전 반환값)
* 두 번째 인자: 내가 `dispatchAction(payload)`로 넘긴 payload

즉 `useActionState`에 넘기는 함수는 기본적으로 이런 형태를 기대한다.

```ts
async function action(previousState, payload) {
  // ...
}
```

내 코드처럼 `getPostAction(pathroot)`처럼 만들면,
React 입장에서는 `previousState`를 `pathroot` 자리에 꽂아버리게 된다.
그래서 “두 번째부터 HTML이 인자로 들어오는” 현상이 생긴다.

> 억지로 맞추려면 시그니처를 `(prevHtml, pathroot)`로 만들면 된다.
> 근데 이건 “읽기 전용 데이터 로딩”을 액션/상태 머신으로 우회하는 느낌이 강했다.

## 서버 액션은 ‘읽기’보다 ‘변경’ 쪽 문맥에 더 잘 맞는다

Next.js 문서에서도 Server Action을 “폼 제출 + mutation(변경)” 문맥으로 설명한다. ([nextjs.org][2])
그래서 게시글 HTML처럼 **읽기 전용** 데이터를 “가져오기” 위해 Server Action을 쓰는 건 의도가 좀 어긋난다.

읽기 목적이라면 Next.js는 서버 컴포넌트에서 `fetch`나 DB/파일 시스템 같은 I/O로 가져오는 흐름을 기본으로 안내한다. ([nextjs.org][3])

## API Route로 전환

그래서 `/api/posts` 라우트를 만들었다.

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

클라이언트에서는 이렇게 호출했다.

```tsx
const handleGetPostContent = async (pathroot: string) => {
  const encoded = encodeURIComponent(pathroot)
  const res = await fetch(`/api/posts?pathroot=${encoded}`, { cache: 'force-cache' })

  if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`)

  const html = await res.text()
  setPostContent(html)
}
```

## 정리

* `useActionState`는 **액션 함수에 `previousState`를 첫 인자로 넣는 훅**이라서,
  “단일 인자(예: pathroot)로 서버 액션 호출” 같은 방식으로 쓰면 인자가 꼬일 수 있다. ([React][1])
* Next.js에서 Server Action은 보통 **폼 제출/변경(mutation)** 문맥에 맞춰 설명된다. ([nextjs.org][2])
* `fetch`의 `cache`는 **브라우저 fetch와 서버 fetch에서 의미가 다르다.** ([nextjs.org][4])
* Route Handler는 기본 캐시가 아니고, **GET 캐싱은 설정으로 opt-in** 해야 한다. ([nextjs.org][5])

[1]: https://react.dev/reference/react/useActionState "useActionState – React"
[2]: https://nextjs.org/docs/app/getting-started/updating-data "Getting Started: Updating Data | Next.js"
[3]: https://nextjs.org/docs/app/getting-started/fetching-data "Getting Started: Fetching Data | Next.js"
[4]: https://nextjs.org/docs/app/api-reference/functions/fetch "Functions: fetch | Next.js"
[5]: https://nextjs.org/docs/app/getting-started/route-handlers "Getting Started: Route Handlers | Next.js"
