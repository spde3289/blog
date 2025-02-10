---
title: 2025년 추가된 HTML, CSS 기능
tags: [frontEnd]
date: "2025.01.12"
---
2025년이 되어 HTML과 CSS에 새로운 기능들을 소개하며 활용할 방법들을 고민하도록 하겠습니다.

직접 정보를 보고싶은 분은 [여기](https://www.smashingmagazine.com/2024/12/new-front-end-features-for-designers-in-2025/)에서 확인할 수 있습니다.

## 1. CSS Layers (@layer)
https://developer.mozilla.org/en-US/docs/Web/CSS/@layer

CSS에 우선 순위를 설정할 수 있습니다.
Layer는 아래와 같이 선언해 사용할 수 있으며 나중에 선언한 Layer가 스타일 우선 순위를 가집니다.
```CSS
@layer <layer-name>  {
  ...
} 
```

상단부에 미리 순서를 정의해 우선순위를 결정할 수 있습니다. 
- `reset` >`components`
```css
@layer components, reset;
@layer reset { /* 우선순위가 됨 */
  * {
      margin: 0;
      padding: 0;
  }
}
@layer components {
  .button {
      background-color: blue;
  }
}
```

## 2. Scope At-rules (@scope)
https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries

container query는 viewport기준이 아니라 요소의 크기에 따라 반응형으로 스타일링이 가능합니다.

`@container <컨테이너 이름>`형식으로 쓰이고 미디어 쿼리처럼 사용할 수 있습니다.
```
.card h2 {
  font-size: 1em;
}

@container (min-width: 700px) {
  .card h2 {
    font-size: 2em;
  }
}
```

## 3. Scope At-rules 
https://developer.mozilla.org/en-US/docs/Web/CSS/@scope

`@scope`를 스타일을 적용할 수 있는 범위를 제한할 수 있습니다.

```html
<ul class="name">
  <li>김덕배</li>
  <li>완강식</li>
</ul>

<ul class="age">
  <li>24</li>
  <li>52</li>
</ul>
```
```css
li {
  color: green;
}

@scope (.name) {
  :scope {
    background: skyblue;
    padding: 0.5rem;
  }

  li {
    color: blue;
  }
}

@scope (.age) {
  & {
    background: pink;
    padding: 0.5rem;
  }

  & li {
    color: red;
  }
}
```

## 4. text‑wrap: balance
https://developer.mozilla.org/en-US/docs/Web/CSS/text-wrap

요소 내부에 텍스트를 균형있게 정렬해주는 기능입니다.

## 5. scroll-snap 속성
https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll_snap  
https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-type

scroll-snap 속성을 이용하면 자바스크립트 없이 요소가 스크롤 되는 위치에 자동으로 
스냅되도록 하는 CSS속성 입니다.

## 마치며 
이 외에도 [여기](https://www.smashingmagazine.com/2024/12/new-front-end-features-for-designers-in-2025/)에서 다른 변경사항들을 확인할 수 있습니다.  
저는 scroll-snap 속성이 가장 신기했고 진행하고 있는 프로젝트에 적용해 더 좋은 사용자 경험을 제공할 수 있을거 같단 생각이 듭니다. 