---
title: 웹폰트 최적화
tags: [frontEnd]
date: "2024.03.06"
---
## 웹 폰트가 동작하는 방법 

우선 최적화를 진행하기 전에 웹 폰트가 어떻게 동작하는지 알아보도록 하겠다. 아래의 사진은 브라우저가 렌더링 하는 과정이다.

![백엔드 이미지](/img/frontEnd/FontOptimization/font-critical-rendering_856.png)
[https://web.dev/articles/optimize-webfont-loading?hl=ko](https://web.dev/articles/optimize-webfont-loading?hl=ko) 

1. 브라우저가 HTML 문서을 요청한다. 2. 브라우저가 HTML 응답을 파싱하고 DOM을 구성하기 시작한다. 3. 브라우저가 CSS, JS 및 기타 리소스를 발견하고 요청을 전달한다. 4. 브라우저는 모든 CSS 콘텐츠가 수신된 후 CSSOM을 생성하고 이를 DOM트리와 결합하여 렌더링 트리를 구성한다. - 렌더링 트리가 페이지에 지정된 텍스트를 렝더링 하는데 필요한 글꼴 버전을 표기하면 글꼴 요청이 전달 된다. 5. 브라우저는 레이아웃을 실행하고 콘텐츠를 화면에 페인팅한다. - 글꼴을 아직 사용할 수 없는 경우는 텍스트 픽셀을 렌더링 할 수 없다. - 글꼴을 사용할 수 있게 되면 브라우저가 텍스트 픽셀을 페인팅한다.

이때 WebFonts를 미리 로드하고 font-display를 사용해 사용할 수 없는 글꼴이 있을 때 브라우저 작동 방식을 제어하면 빈 페이지 및 레이아웃 변경을 방지할 수 있다.

## 웹 폰트 최적화 방법 

폰트의 리소스 요청은 다른 리소스 요청보다 늦게 시작하는데 이 요청을 앞당길 수 있는 방법이 있다.

```javascript

    <link rel="preload">
  
```
위와 같이 preload를 사용하면 CSSOM이 생성될 때 까지 기다릴 필요 없이 폰트 리소스 요청을 할 수 있다.

서브셋 폰트란 폰트에서 불필요한 글자를 제거한 폰트 파일을 말하는데 예를 들어 (뿪, 깖) 같이 사용하지 않는 조합을 제거한 파일을 말한다. 서브셋 폰트를 사용하기 위해선 서브셋 폰트를 만들어주는 사이트를 이용하거나 unicode-range를 사용하면 된다. unicode-range는 유니코드의 필요한 범위만 다운 받을 수 있는 방법이다.

```javascript

    @font-face {
      font-family: 'Awesome Font';
      font-style: normal;
      font-weight: 400;
      font-display: auto; 
      src: local('Awesome Font'),
          url('/fonts/awesome-l.woff2') format('woff2'), 
          url('/fonts/awesome-l.woff') format('woff'),
          url('/fonts/awesome-l.ttf') format('truetype'),
          url('/fonts/awesome-l.eot') format('embedded-opentype');
      unicode-range: U+000-5FF; // 사용할 범위 지정
    }
  
```
폰트에도 다양한 형식이 있는데 압축률이 잘 되어있는 형식을 사용하는 방법이다. 일반적으로 WOFF, WOFF2가 압축률이 좋아 로드 속도가 매우 빠르다. WOFF2의 경우 WOFF를 30% ~ 50% 정도 압축했지만 IE11를 지원하지 않기 때문에 잘 고려해보는 것이 좋다. 아래의 사진은 글꼴 형식을 지원하는 브라우저이다.

![백엔드 이미지](/img/frontEnd/FontOptimization/img2.png)
[https://www.w3schools.com/Css/css3_fonts.asp](https://www.w3schools.com/Css/css3_fonts.asp) 

## 마치며 

이처럼 최적화를 위해서 정말 다양한 방법을 이용해 적절한 폰트의 선택과 로딩과정을 신경 써야 한다는 점을 알게 되었다.
