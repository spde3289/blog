---
title: next.js의 데이터 패칭
tags: [next]
date: "2024.08.03"
---

next.js에서 데이터를 가져올 때 사용되는 함수들이 있습니다.
`getStaticProps()` `getStaticPaths()` `getServerSideProps()`
전부 데이터를 가져올 때 사용되는 함수지만 차이점이 있어서 이에 대한 정보를 정리해보려 합니다.

## getStaticProps()
`getStaticProps()`는 빌드 시점에서 데이터를 가져오고 페이지를 정적으로 생성할 때 사용됩니다.

이 함수는 페이지가 빌드될 때 한 번만 호출되며 변경이 적은 콘텐츠를 렌더링할 때 사용됩니다.

```javascript
export async function getStaticProps() {
  const res = await fetch('https://api.github.com/repos/vercel/next.js')
  const repo = await res.json()
  return { props: { repo } }
}
 
export default function Page({ repo }) {
  return repo.stargazers_count
}
```

## getStaticPaths()
이 함수는 동적 경로를 가진 페이지에서 미리 빌드할 경로를 정의할 때 사용됩니다. `getStaticProps()`함수와 같이 사용됩니다.

```javascript
export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          name: 'next.js',
        },
      }, 
    ],
    fallback: true, 
  }
}
 
export async function getStaticProps() {
  const res = await fetch('https://api.github.com/repos/vercel/next.js')
  const repo = await res.json()
  return { props: { repo } }
}
 
export default function Page({ repo }) {
  return repo.stargazers_count
}
```
fallback의 옵션으로는  
`false` : 빌드된 경로 외의 페이지는 404를 반환  
`true` : 빌드된 경로 외의 페이지를 요청 시, 빌드되지 않은 페이지는 서버에서 데이터를 가져와 렌더링 후 캐싱  
`blocking` : 경로를 요청할 때 빌드되지 않은 페이지는 서버에서 데이터를 가져오고, 준비가 되면 클라이언트에 제공  
가 있습니다. 
## getServerSideProps()
`getServerSideProps()`는 요청시마다 데이터를 가져오고 서버에서 데이터를 가져와 렌더링 하기 때문에 SEO와 초기 페이지 로딩 속도에 유리합니다. 
```javascript
export async function getServerSideProps() {

  const res = await fetch('https://api.github.com/repos/vercel/next.js')
  const repo = await res.json()

  return { props: { repo } } // Page에 Porps 전달
}
 
export default function Page({ repo }) {
  return (
    <main>
      <p>{repo.stargazers_count}</p>
    </main>
  )
}
```

## 마치며 

| 함수                    | 실행 시점            | 사용 용도                       | 장점                        | 단점                        |
|---------------------|----------------------|----------------------------------|-----------------------------|-----------------------------|
| `getStaticProps()`        | 빌드 시점            | 정적 생성 (SEO 최적화, 빠른 로딩) | 성능 향상, 캐싱 가능          | 빌드 후 데이터 변경 불가     |
| `getStaticPaths()`        | 빌드 시점            | 동적 경로에 대한 정적 생성       | 동적 경로 지원                | 새로운 경로는 빌드 후 추가해야 함 |
| `getServerSideProps()`    | 요청 시점            | 서버에서 데이터를 가져와야 할 때 | SEO 최적화, 실시간 데이터 반영 | 서버 요청마다 데이터 로딩, 느린 페이지 로딩 |


Next.js로 프로젝트를 구성하다보니 React 와는 다른점이 많아 배워야 할 부분들이 참 많은 것 같습니다.  



[참고 자료](https://nextjs.org/docs/pages/building-your-application/data-fetching)