---
title: 메이플 헬퍼 SEO 개선하기
tags: [frontEnd, 메이플 헬퍼]
series: 메이플 헬퍼
date: "2024.12.27"
---
서비스를 배포한 이후 검색 결과 상단에 노출되지 않았지만 SEO를 개선해 노출도를 향상시켰던 내용을 기록하려 합니다.

## SEO 개선 3가지 방법
### 메타태그 최적화
적절한 메타태그 사용은 검색 엔진과 사용자에게 페이지의 핵심 정보를 전달할 수 있는 
중요한 포인트 입니다.

저의 경우는 `HeadMeta`컴포넌트를 만들어 활용했습니다.

```js
const HeadMeta = ({ title, description, Keywords }: HeadMetaProps) => {
  return (
    <Head>
      <meta property="title" content={title || Meta.title} />
      <meta name="description" content={description || Meta.description} />
      <meta name="Keywords" content={Meta.Keywords + (Keywords || '')} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title || Meta.title} />
      <meta
        property="og:description"
        content={description || Meta.description}
      />
      <meta name="og:Keywords" content={Meta.Keywords + (Keywords || '')} />
      <meta property="og:url" content="https://www.maple-helper.com/" />
      <meta name="twitter:title" content={title || Meta.title} />
      <meta
        name="twitter:description"
        content={description || Meta.description}
      />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{title || Meta.title}</title>
    </Head>
  )
}
```


### 구글 서치 콘솔 등록
구글 서치 콘솔은 웹사이트의 검색 노출 성능을 분석하고 관리하는 무료 도구입니다.

구글 서치 콘솔을 이용하면 어떤 키워드로 검색에 노출되는지 확인할 수 있고 직접 색인 요청을 보내 
특정 페이지가 구글의 색인에 반영되도록 할 수 있습니다.

### 사이트맵 제출
사이트맵은 검색엔진들이 정보를 더 효율적으로 크롤링할 수 있도록 돕는 역할을 합니다.

Next.js를 이용하는 경우 `getServerSideProps`를 사용해 필요한 URL데이터를 불러와 XML 컨텐츠를 생성할 수 있지만  
저는 next-sitemap 라이브러리를 이용해 설정 파일만 작성하고 빌드 시 자동으로 정적 사이트맵과 robots.txt를 생성했습니다.

#### 설정 파일
```js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.maple-helper.com/', // 배포된 사이트의 URL로 변경
  generateRobotsTxt: true, // robots.txt 생성 여부
  // 추가 설정 가능
}

```

## 개선 후 변화
![메이플 헬퍼 검색](/img/frontEnd/Maple-Helper-SEO-Improvement/googleMapleHelper.png)
![서치 콘솔 이미지](/img/frontEnd/Maple-Helper-SEO-Improvement/searchConsole.png)

개선을 한 후에 유의미한 검색어 노출이 된 점을 확인할 수 있었습니다.

검색엔진 최적화에 대한 자세한 정보를 알고 싶으시면 [여기](https://developers.google.com/search/docs?hl=ko)를 
참고하시면 됩니다.