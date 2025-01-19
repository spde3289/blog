---
title: Next 앱 라우팅과 페이지 라우팅
tags: [Next.js]
date: "2024.03.23"
---
React를 사용 할 때는 react-router-dom 라이브러리를 사용 했지만 Next.js에는 라이브러리 없이 라우팅이 가능하다.

## App 라우터와 Page 라우터 

Next.js 에서는 2개의 방법으로 라우팅이 가능하다. 하나는 기존에 있던 클라이언트 중심의 Pages Router이고 Next.js 13에 추가 된 서버 중심의 App Router가 있다.

##    

[https://nextjs.org/docs/pages/building-your-application/routing](https://nextjs.org/docs/pages/building-your-application/routing) 

Page Router는 pages 디렉터리 에 파일이 추가 된다면 경로를 사용할 수 있다.

Pages 리렉토리에 index 파일을 생성하면 자동으로 라우팅 된다. pages/index.js → / pages/blog/index.js → /blog

만약 / 가 아닌 first-post로 라우팅이 하고 싶다면 first-post.js 파일을 생성 하면 된다. pages/blog/first-post.js → /blog/first-post pages/dashboard/settings/username.js → /dashboard/settings/username

동적 라우팅도 가능한데 []로 감싸주면 동적 라우팅이 가능하다. pages/posts/[id].js → posts/1 또는 posts/2 pages/[id]/index.js → posts/1 또는 posts/2

[...segmentName] 대괄호 안에 세그먼트를 추가하면 다음과 같이 표시할 수 있다. pages/shop/[...slug].js → /shop/clothes 또는 /shop/clothes/tops 또는 /shop/clothes/tops/t-shirts

[[...segmentName]]와 같이 이중 대괄호 안에 세그먼트를 추가하면 매개변수가 없는 경로 또한 일치하게 된다. pages/shop/[...slug].js → /shop 또는 /shop/clothes 또는 /shop/clothes/tops 또는 /shop/clothes/tops/t-shirts

최상위의 _app.js 파일에서 공통 레이아웃을 기존 React와 같이 적용 가능

Pages 폴더 바로 아래에 404.js를 만들어 주면 된다.

##    

[https://nextjs.org/docs/app/building-your-application/routing](https://nextjs.org/docs/app/building-your-application/routing) 

Next.js 13 부터는 기반의 App Router를 지원한다.

[https://nextjs.org/docs/app/building-your-application/rendering/server-components](https://nextjs.org/docs/app/building-your-application/rendering/server-components) 

## 라우팅 규칙 

![백엔드 이미지](/img/next/AppRouteNPageRoute/terminology-component-tree.avif)
 

-  : 계층 구조를 시각화하기 위한 규칙이다. 예를
              들어 상위 및 하위 구성 요소가 있는 구성 요소 트리, 폴더 구조 등이
              있다.
-  : 새 루트(첫 번째)에서 시작하여 잎(마지막)에서
              끝나는 트리의 일부다.
-  : 루트 레이아웃과 같은 트리 또는 하위 트리의 첫 번째
              노드다.
-  : URL 경로의 마지막 세그먼트와 같이 자식이 없는 하위
              트리의 노드다.
![백엔드 이미지](/img/next/AppRouteNPageRoute/terminology-url-anatomy.avif)
 

-  : 슬래시로 구분된 URL 경로의 일부다.
-  : 도메인 뒤에 오는 URL의 일부(세그먼트로 구성)
예를 들어 아래와 같은 폴더 구조에서 /dashboard/analytics 경로에는 Page.js 파일이 없기 떄문에 유효하지 않은 경로가 된다.

App라우팅의 동적 라우팅은 Page라우팅과 동일하게 적용된다.

App라우팅에서 레이아웃은 기본적으로 서버 컴포넌트이다. 서버 컴포넌트는 13버전에서 추가된 개념인데 추후 서술하도록 하겠다. App 라우팅에서도 공통 레이아웃을 정의하는게 가능한데 아래의 사진과 같이 폴더에 layout 파일을 생성해 주면 /dashboard 와 /dashvoard/settings 는 공통된 레이아웃을 공유하게 된다.

루트 레이아웃은 최상위 수준의 폴더에서 정의되고 모든 경로에 적용 되는 레이아웃이다.

![백엔드 이미지](/img/next/AppRouteNPageRoute/defining-routes.avif)
만약 최상위 레이아웃에서 html태그와 body태그를 넣지 않거나 하위 레이아웃에서 html태그나 body태그를 포함시킨다면 에러가 발생하니 주의 하도록 하자

![백엔드 이미지](/img/next/AppRouteNPageRoute/캡처.png)
![백엔드 이미지](/img/next/AppRouteNPageRoute/캡처1.png)
템플릿은 각 하위 레이아웃이나 페이지를 래핑해준다는 점에서 레아아웃과 유사하지만 라우트 이동 시 Layout는 기본적으로 리렌더링이 이루어 지지 않는다는 점이 다르다. 템플릿은 공통된 탬플릿을 사용하는 경우에도 라우트 이동시 DOM요소가 다시 생성되어 상태가 보존되지 않는다.

## 참고 자료 

[https://velog.io/@2ast/React-%EC%84%9C%EB%B2%84-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8React-Server-Component%EC%97%90-%EB%8C%80%ED%95%9C-%EA%B3%A0%EC%B0%B0#%EC%84%9C%EB%A1%A0-%ED%8A%B8%EB%A0%8C%EB%94%94%ED%95%A8%EB%8F%84-%EA%B0%9C%EB%B0%9C%EC%9E%90%EC%97%90%EA%B2%8C-%EC%A4%91%EC%9A%94%ED%95%9C-%EB%AF%B8%EB%8D%95%EC%9D%B4%EB%8B%A4](https://velog.io/@2ast/React-%EC%84%9C%EB%B2%84-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8React-Server-Component%EC%97%90-%EB%8C%80%ED%95%9C-%EA%B3%A0%EC%B0%B0#%EC%84%9C%EB%A1%A0-%ED%8A%B8%EB%A0%8C%EB%94%94%ED%95%A8%EB%8F%84-%EA%B0%9C%EB%B0%9C%EC%9E%90%EC%97%90%EA%B2%8C-%EC%A4%91%EC%9A%94%ED%95%9C-%EB%AF%B8%EB%8D%95%EC%9D%B4%EB%8B%A4) 

[https://velog.io/@jjunyjjuny/nextjs-13.4.0%EB%B6%80%ED%84%B0-%EC%95%88%EC%A0%95%ED%99%94%EB%90%9C-App-Router.-Pages-Router%EC%99%80-%EB%B9%84%EA%B5%90](https://velog.io/@jjunyjjuny/nextjs-13.4.0%EB%B6%80%ED%84%B0-%EC%95%88%EC%A0%95%ED%99%94%EB%90%9C-App-Router.-Pages-Router%EC%99%80-%EB%B9%84%EA%B5%90) 

[https://nextjs.org/docs/app/building-your-application/rendering/server-components](https://nextjs.org/docs/app/building-your-application/rendering/server-components) 

[https://nextjs.org/docs/app/building-your-application/routing](https://nextjs.org/docs/app/building-your-application/routing) 

[https://nextjs.org/docs/pages/building-your-application/routing](https://nextjs.org/docs/pages/building-your-application/routing) 
