---
title: next.js의 Hydration
tags: [next]
date: "2024.07.27"
---
Next.js 공식문서를 읽어보던 중 중요한 개념이 보여 정리하고 넘어가려고 합니다.

우선 Hydration을 알기 전에 React와 Next의 기본 동작 방식에 대해 알아야 합니다.  

React는 브라우저에서 요청이 들어오면 빈 HTML 파일과 JS 파일로 번들링된 React 파일을 넘겨줍니다.
그 이후 브라우저가 JS파일을 읽어 화면을 그려나가기 시작합니다. 이러한 이유 때문에 
React 프로젝트가 SEO에 적합하지 않고 첫 로딩 속도가 느릴 수 있다는 단점이 있습니다.

Next.js는 빌드 시 사전 렌더링(Pre-Rendering)을 진행하는데 빌드 시 미리 HTML파일을 생성해 
브라우저에서 요청이 들어왔을 때 미리 생성한 HTML 파일을 넘겨줌으로써 초기 로드 속도도 향상 
시키고 SEO에 적합하다는 장점이 있습니다. 

## Hydration이란?

사실 Hydration이라는 개념은 React부터 있는 개념입니다.  
[React 공식문서](https://18.react.dev/reference/react-dom/client/hydrateRoot)

React의 Hydration은 서버에서 미리 생성된 HTML을 먼저 클라이언트에 보낸 후 JS 파일로 번들링된
React 파일을 HTML 파일과 매칭시는 Hydration 작업을 수행합니다. 이때 HTML DOM 요소 위에 한번더 렌더링 하게 되면서 
이벤트나 모듈들이 적용돼 동적 기능이 활성화됩니다.

React는 직접 React API를 설정해 SSR을 구현해야 한다면 Next는 React 기반의 프레임워크답게
내부적으로 서버 렌더링과 정적 사이트 생성 같은 기능을 처리하며 
데이터 패칭, 라우팅, 빌드 시점 렌더링과 같은 기능을 제공합니다.

### Hydration과정에서 생길 수 있는 오류

page 라우터의 Hydration

```javascript
const RandomNumber = () => {
  const randomValue = Math.random(); // 서버에서 렌덤한 값 생성

  return <div>{randomValue}</div>;
};
```

이러한 코드를 작성하게 되면 

```
Text content did not match. Server: "0.7115683340234322" Client: "0.27284691182029364"
```
이처럼 서버에서의 렌더링 결과물과 클라이언트에서의 렌더링 결과물이 일치하지 않아서 생기는 오류입니다. 

문제를 해결하기 위해선 useEffect를 사용해 페이지가 렌더링 된 후 랜덤 한 값을 생성해 주면 됩니다.

```javascript
const RandomNumber = () => {
  const [number, setNumber] = useState<number | null>(null);

  useEffect(()=>{
    setNumber(Math.random())
  },[])

  return <div>{number}</div>;
};
```
하지만 이 방법 또한 사전 렌더링 되어 넘어온 HTML에는 랜덤 한 숫자 값이 보이지 않는다는 단점이 있습니다.

이때 PageRouter는 getServerSideProps를 이용하면 서버에서 랜덤 한 값을 생성해 클라이언트 컴포넌트에 props로 넘겨줄 수 있습니다.

```javascript

export async function getServerSideProps() {
  // 서버에서 랜덤 값 생성
  const randomValue = Math.random();

  return {
    props: {
      randomValue, // 랜덤 값을 컴포넌트에 전달
    },
  };
}

const RandomNumber = ({ randomValue }) => {

  return <div>{randomValue}</div>;
};
```

[next 공식문서](https://nextjs.org/docs/pages/building-your-application/rendering)

## 마치며 

처음 Hydration 에러를 직면했을 때 SSR에 대한 이해가 부족했어서 당황스러웠는데 문제를 해결하기 위해 
공식 문서를 읽어보던 중 SSR에 대한 이해와 Next의 렌더링 방식에 대해 더욱 많은 이해를 할 수 있는 시간이었습니다.