---
title: 코드 하이라이팅 highlight.js 적용하기
tags: [frontEnd]
date: "2024.12.01"
---
블로그 글을 작성하다 보면 코드 블록을 사용할 때가 있는데 코드 하이라이팅이 되는 
이미지를 사용하면 복사를 할 수 없고 `<code>` 태그를 이용하면 코드 가독성이 떨어
진다는 단점이 있습니다.  
하지만 이 부분을 해결해주는 라이브러리인 `highlight.js`를 소개하려 합니다.

## 코드 하이라이팅 라이브러리 
코드 하이라이팅을 제공하는 라이브러리는 `highlight.js`뿐 아니라 `prism`도 동일하게 하이라이팅 기능을 제공합니다. 

`highlight.js`의 특징으로는 다양한 테마와 언어를 지원하고 컴포넌트 형태로 하이라이팅을 제공할 수 있습니다.

`prism`의 특징은 번들 크기가 최적화 되어 있고 컴포넌트 기반 API로 React와 잘 어울린다는 장점이 있습니다. 

저는 react를 사용하는 블로그지만 다양한 테마를 제공해주고 사용하기에 간편한 `highlight.js`를 선택했습니다.

## highlight.js 사용 방법

### highlight.js 설치
```bash
npm install highlight.js
```

### 스타일 적용
`hljs.registerLanguage`를 이용하면 특정 언어만 하이라이팅 할 수 있습니다.
```js
import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';

hljs.registerLanguage('javascript', javascript);
export default hljs;
```

`hljs.highlightAll()`를 이용해 컴포넌트로 만들 수 있습니다
```js
import { useEffect } from 'react';
import hljs from 'highlight.js';

const CodeBlock = ({ code }) => {
  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <pre>
      <code className="language-javascript">{code}</code>
    </pre>
  );
};
```



### 테마 적용 
highlight.js에서 제공하는 다양한 테마는 [여기](https://highlightjs.org/demo)에서 미리 확인할 수 있습니다.

```js
import "highlight.js/styles/a11y-dark.css";
```

### 커스텀 스타일 적용
css파일을 생성해 스타일링을 커스텀할 수 있습니다.
```css 
/* 커스텀 테마 예시 */
.hljs {
  background: #1a1a1a;
  color: #f8f8f2;
  border-radius: 8px;
  padding: 1.5rem !important;
}

.hljs-keyword {
  color: #ff79c6;
  font-weight: 600;
}

.hljs-string {
  color: #50fa7b;
}

.hljs-title {
  color: #8be9fd;
}
```

### 공식문서 
https://github.com/highlightjs/highlight.js#getting-started
