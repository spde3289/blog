---
title: Tailwind CSS 사용법
tags: [frontEnd]
date: "2024.08.10"
---
![플러그인 이미지](/img/frontEnd/How-to-Use-Tailwind-CSS/tailwind.png)

이번에 next.js로 프로젝트를 구성하면서 Tailwind CSS를 사용하기로 해서
자세하게 알고 넘어가보려 합니다. 

## Tailwind CSS
Tailwind CSS는 유틸리티-퍼스트(Utility-first) 접근 방식을 기반으로 하는 CSS 프레임워크로, 
클래스 기반 스타일링을 통해 빠르고 효율적인 UI 개발이 가능합니다.

### Tailwind CSS 설치
```bash
npm install -D tailwindcss

yarn add -D tailwindcss
```

### 템플릿 경로 구성
tailwind.config 파일에서 테일윈드의 구성요소를 설정할 수 있습니다.
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {}, // 커스텀 스타일을 설정할 수 있습니다.
  },
  plugins: [],
}
```

### Tailwind CSS 스타일 추가하기

메인 CSS파일에서 Tailwind CSS 스타일을 추가할 수 있습니다.

```css
@tailwind base; 
/* 테일윈드의 기본 스타일을 삽입합니다. */

@tailwind components; 
/* 테일윈드에서 제공하는 컴포넌트 스타일을 삽입합니다. */

@tailwind utilities; 
/* 테일윈드에서 제공하는 유틸리티 클래스를 정의합니다.  */

@tailwind variants 
```

자바스크립트 파일에서 직접 임포트해 스타일을 적용할 수 있습니다.  
그리고 `@apply`를 이용해 Tailwind 유틸리티 클래스를 사용할 수 있습니다.
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

.container {
  @apply max-w-7xl mx-auto px-4;
}

.text-xl {
  @apply text-xl font-semibold text-gray-800;
}
```

`@tailwind base`는 기본 스타일을 초기화 하거나 Tailwind CSS에서 제공하는 
일관된 스타일을 정의할 수 있습니다.


```css
@tailwind base;

@layer base{
  *, ::before, ::after {
    box-sizing: border-box;
    border-width: 0;
    border-style: solid;
    border-color: currentColor;
  }
  body {
    margin: 0;
    font-family: inherit;
    line-height: inherit;
  }
}
```

`@tailwind components`는 Tailwind CSS에서 제공하는 `container`와 같은 컴포넌트 
스타일이나 커스텀 컴포넌트 스타일을 정의 합니다.

```css
@tailwind components;

@layer components{
  .container {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    padding-left: 1rem; /* 16px */
    padding-right: 1rem; /* 16px */
  }

  .btn {
    @apply px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700;
  }

  @media (min-width: 640px) {
    .container {
      max-width: 640px;
    }
  }
}
```

`@tailwind utilities`는 Tailwind CSS에서 제공하는 `mt-10`과 같은 새로운 
유틸리티 클래스를 정의할 수 있습니다.

```css
@tailwind utilities;

@layer utilities{
  .mt-15 {
    margin-top: 3.75rem; /* 사용자 정의 마진 값 */
  }
}
```
`@tailwind variants`는 `hover`, `focus`, `active`같은 상태를 다룰 때 사용됩니다.

```css
@tailwind variants;

@variants hover {
  .btn {
    @apply bg-blue-500;
  }
}
```

### 모듈화 

`@apply`를 사용해 모듈화 하면 `.module.css` 스타일의 일관성을 유지하면서 
컴포넌트 기반의 스타일을 관리할 수 있습니다.

```css
/* Button.module.css */
.button {
  @apply px-4 py-2 bg-blue-500 text-white rounded-lg;
}
```

### `tailwind.config.js` 커스텀

Tailwind 구성파일에 테마, 색상, 글꼴, 간격 등 다양한 기본 값을 커스텀할 수 있습니다.

```
module.exports = {
  theme: {
    extend: {
      colors: {
        customColor: '#ff5733',
      },
    },
  },
}
```
### 플러그인

Tailwind CSS IntelliSense 플러그인을 사용해 자동완성이나 클래스 이름, 
CSS 함수 및 지시문 에 대한 제안을 받을 수 있습니다.

![플러그인 이미지](/img/frontEnd/How-to-Use-Tailwind-CSS/plugin.png)