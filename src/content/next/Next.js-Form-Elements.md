---
title: Next.js Form 구성 요소
tags: [next]
date: "2025.01.25"
---
이번에 블로그를 Next.js로 마이그레이션 하면서 `Form`를 유용하게 사용해 사용방법을 공유하려 합니다.

## Next.js에서의 Form 사용법
HTML에서 `<form>` 태그를 사용해 텍스트, 체크박스, 라디오 박스와 같은 요소들을 구조화해 사용할 수 있는 문법 입니다.

Next.js에서는 `Form`이 화면에 보이면 해당 경로를 미리 불러와 네이게이션 속도를 올려주고 
레이아웃 파일과 로딩 파일을 미리 로드합니다. 또 제출시 새로고침 없어 클라이언트 측에서 이동 처리합니다.

```js
import Form from 'next/form'
 
export default function Page() {
  return (
    <Form action="/search">
      <input name="query" />
      <button type="submit">Submit</button>
    </Form>
  )
}
```

## action 
### 문자열
`action`이 문자열일 경우 다음 props를 지원합니다.

| 속성       | 예제                  | 유형                          | 필수 여부 |
| ---------- | --------------------- | ----------------------------- | --------- |
| `action`   | `action="/search"`    | `string` (URL 또는 상대 경로) | 예        |
| `replace`  | `replace={false}`     | `boolean`                     | 아니요    |
| `scroll`   | `scroll={true}`       | `boolean`                     | 아니요    |
| `prefetch` | `prefetch={true}`     | `boolean`                     | 아니요    |

- **action :** 양식이 제출될 때 이동할 URL 경로 입니다.
- **replace :** 브라우저 히스토리를 새로 추가하지 않고 현재 상태를 덮어씁니다.
- **scroll :** 스크롤의 위치를 결정합니다.
- **prefetch :** 해당 경로를 미리 로드할지 결정합니다.

### 함수
`action`이 함수일 경우 React의 `From`처럼 동작합니다. 

- 제출하면 서버 엑션 함수가 실행
- 서버에서 데이터를 처리한 후 필요한 작업 수행

## 활용
블로그를 만들 때 action 속성에 경로를 전달하여 검색 결과 페이지로 이동하는`Form`을 만들었습니다.
```js
<Form
  action="/search"
  onClick={inputOnClick}
  className="wrapperClassName flex h-fit relative text-sm box-border"
>
  <input
    name="q"
    type="text"
    placeholder="search..."
    onChange={handleInputChange}
    value={inputValue}
    ref={inputRef}
    className="hidden w-44 sm:block md:w-full border border-[#ebeced] pt-2 pr-9 pl-9 pb-2 outline-none rounded-3xl"
  />
</Form>
```
또 데이터를 가져오는 동안 Loading 로딩 UI를 표시할 수 있습니다.
```js
<Suspense fallback={<div>Loading...</div>}>
  <ContentContainer posts={posts} />
</Suspense>
```

