---
title: require와 import의 차이점
tags: [javaScript]
date: "2024.09.07"
---
라이브쳇 개발을 하며 백엔드 서비스에는 require를 프론트 서비스에는 import를 사용했는데 문뜩 
어떤 차이가 있는지 궁금해져서 정리해보려 합니다. 

## require와 import

`require`와 `import`는 자바스크립트에서 모듈을 불러오는 문법으로   
`require`는 CommonJS에서 사용하는 모듈 시스템 `import`는 ES6에서 사용하는 모듈 시스템 입니다.

```javascript
const module = require('module-name');

module.exports = module;
```
```javascript
import module from 'module-name';

export default module;
```

## 사용 환경

### require
CommonJS는 Node.js 환경에서 지원되고 브라우저 환경에서 사용하기 위해선 Wabpack같은 번들러가 필요합니다.  

### import
ES6 모듈은 최신 JavaScript 표준이기 때문에 브라우저와 Node.js 환경 모두 지원합니다.

## 동작 방식

### require
런타임에 모듈을 로드하며 가져온 모듈은 캐싱되어 여러번 호출해도 처음에 로드된 모듈만을 반환 합니다.

### import 
컴파일 시점에 모듈을 로드하며 정적 분석을 통해 의존성과 최적화가 가능합니다.   
하지만 `import()` 함수를 이용해 동적으로 가져온 모듈은 최적화를 할 수 없습니다.

## 그래서?
`import`가 최신 표준 ES6 Modules를 따르고 있기 때문에 새로운 프로젝트에서는 `import`를 사용하는 것이 권장되나  
기존 프로젝트의 호환성을 고려한다면 `require`를 사용해도 무관합니다.

마지막으로 Node.js환경에서 `import`를 사용하는 방법에 대해 알려드리고 끝내도록 하겠습니다.  
` package.json`파일을 보면 `type` 속성을 `"module"`로 변경해주면 됩니다.

![json파일](/img/javascript/Require-vs-Import/package.png)

```json
{
	"type": "module"
}
```