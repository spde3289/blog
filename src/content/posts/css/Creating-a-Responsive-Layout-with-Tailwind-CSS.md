---
title: Tailwind CSS 반응형 레이아웃 만들기
tags: [css]
date: "2024.12.21"
---
이전에 메이플 헬퍼 서비스에 Tailwind CSS를 이용해 반응형 레이아웃을 적용한 과정을 공유하려 합니다. 

## Tailwind CSS의 반응형 레이아웃
유틸리티를 사용해 CSS의 media query처럼 반응형 작업이 가능합니다.

![반응형 디자인 표](/img/css/Creating-a-Responsive-Layout-with-Tailwind-CSS/ResponsiveDesign.png)

```html
<!-- 768px 이상일 때 w-32 -->
<!-- 1024px 이상일 때 w-48 -->
<img class="w-16 md:w-32 lg:w-48" src="...">
```

### 커스텀 breakpoint
tailwind.config 에서 직접 breakpoint를 설정할 수 있습니다.
```js
// tailwind.config.js

module.exports = {
  theme: {
    screens: {
      'sm': '500px',
      // => @media (min-width: 640px) { ... }

      'md': '1000px',
      // => @media (min-width: 1024px) { ... }

      'lg': '1500px',
      // => @media (min-width: 1280px) { ... }
    },
  }
}
```
min, max의 범위를 지정해 설정할 수 도 있습니다.
```js
// tailwind.config.js

module.exports = {
  theme: {
     screens: {
      sm: { min: "390px", max: "819px" },
      md: { min: "820px", max: "1023px" },
      lg: { min: "1080px" },
    },
  }
}
```

## 추가로
기존에 있는 서비스에 모바일 레이아웃을 적용하면서 느낀점은 반응형 디자인 작업을 할 때면 작은 화면부터 큰 화면으로 작업을 하는게 좋을 것 같다는 생각이 들었습니다.