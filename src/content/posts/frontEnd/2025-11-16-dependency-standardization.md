---
title: 팀 프로젝트 디펜던시 표준화로 개발 생산성 올린 방법
series: 팬덤케이
tags: ["팀프로젝트", "Node.js", "Husky", "lint-staged", "ESLint", "Stylelint"]
date: "2025.11.16"
---

팀 프로젝트를 진행하다 보면 코드보다 “환경” 때문에 시간이 더 많이 소모되는 경우가 있다.

이번 **팬덤케이(Fandom-K)** 프로젝트에서도 비슷한 문제가 발생했는데, 팀원별로 프로젝트 설정이 달라서 컨벤션이 일관되지 않았다.

팀 전체가 공통으로 신뢰할 수 있는 개발 환경으로 표준화한 과정을 정리해둔다.

## 문제 1: 팀원마다 Node 버전이 달랐다

프로젝트 초반, 서로의 코드를 pull 받아 실행하는데 갑자기 에러가 터졌다.

- “내 로컬에서는 돌아가는데?”
- “왜 난 컴파일 에러가 나지?”

원인을 확인해보니 팀원마다 **Node 버전이 달랐다.**  
일부는 LTS, 일부는 최신, 일부는 오래된 버전을 사용하고 있었다.

같은 리포지토리인데 결과가 달라지는 **재현 불가능한 문제**가 반복됐다.

그래서 **Node 버전 통일**을 결정했다.

```json
// package.json
"engines": {
  "node": "22.18.0"
}
```

* `engines` 설정만으로는 **실제로 버전을 강제하지 않는다**
* 다른 버전을 써도 `dev`가 그냥 실행된다

그래서 **개발 서버 실행 전에 Node 버전을 검사하는 스크립트**를 추가했다.

```js
// check-node-version.cjs
const required = "22.18.0";
const current = process.versions.node;

if (current !== required) {
  console.error(`❌ Node ${required} 버전이 필요합니다. 현재 버전: ${current}`);
  process.exit(1);
}
```

그리고 `dev` 스크립트에서 체크를 걸었다.

```json
"dev": "node check-node-version.cjs && vite"
```

이제는 Node 버전이 다르면 **즉시 실행 실패**한다.

## 문제 2: 사전에 정의한 컨벤션이 지켜지지 않았다

프로젝트 시작 전에 개발 컨벤션을 문서로 정리했는데, 실제 개발이 시작되자 규칙이 지켜지지 않는 문제가 생겼다. 

### 컴포넌트 규칙(요약)

* 화살표 함수로 작성
* `export default` 사용
* 아이콘은 SVG 컴포넌트로 제작 (`~/assets/svg`)
* 자식 없는 컴포넌트는 셀프 클로징
* 폴더는 소문자, 페이지 컴포넌트는 `Page.jsx`로 끝남
* 스타일 파일은 분리: `{컴포넌트}.style.js`

그런데 실제로는 이런 일이 생겼다.

* 어떤 페이지는 `Page.js`, 어떤 곳은 `index.jsx`
* styled-components 파일명이 `.style.js` / `.styled.js`로 섞임
* 컴포넌트 네이밍 규칙이 따로 놀기 시작함
* import에서 `.jsx`를 붙이기도 하고, 안 붙이기도 함

사람이 지키는 룰은 언제든 깨진다.
그래서 문서를 믿는 게 아니라 **시스템으로 강제**하기로 했다.

## 해결: Husky + lint-staged로 “커밋 단계에서 강제”

커밋하기 전에 자동으로 검사/수정해서, 컨벤션이 깨진 코드가 리포지토리에 들어오지 못하게 막는 방식이다.

### 1) Husky 세팅

```bash
npm install husky lint-staged --save-dev
npm set-script prepare "husky"
npm run prepare
```

pre-commit 훅 생성:

```bash
npx husky add .husky/pre-commit "npm run lint-front"
```

### 2) lint-staged 설정

```json
"lint-staged": {
  "src/**/*.{js,jsx}": [
    "eslint --fix",
    "prettier --write",
    "stylelint --fix"
  ]
}
```

이제 커밋할 때 **변경된 파일만** 대상으로 자동 검사/수정이 돌아간다.

* 들쑥날쑥한 코드 스타일이 자동으로 통일된다
* 스타일 순서나 네이밍 규칙도 자동으로 정리된다
* 규칙 위반은 커밋 단계에서 바로 막힌다

## stylelint로 “스타일 순서”까지 통일했다

스타일 코드는 특히 사람마다 습관이 달랐다.

* 어떤 사람은 `display → width → margin`
* 어떤 사람은 `width → margin → display`
* 어떤 사람은 빈 줄을 많이 넣고
* 어떤 사람은 붙여서 쓴다

팀 단위에서 스타일 구조까지 통일하려고 stylelint 설정을 추가했다.

```json
// 프로젝트에서 사용한 설정 일부
"order/properties-order": [
  {
    "groupName": "Layout",
    "properties": [
      "display",
      "visibility",
      "overflow",
      "position",
      "top", "right", "bottom", "left"
    ]
  },
  {
    "groupName": "Box",
    "properties": [
      "width", "height",
      "margin", "padding",
      "border"
    ]
  }
]
```

## import 뒤에 `.js`, `.jsx`가 붙는 문제도 막았다

팀원마다 import 방식이 갈렸다.

```jsx
import Button from "./Button.jsx";
```

```jsx
import Button from "./Button";
```

우리는 후자를 기준으로 잡고 eslint로 강제했다.

```json
"import/extensions": [
  "error",
  "ignorePackages",
  { "js": "never", "jsx": "never" }
]
```

이제 `.js` / `.jsx`를 붙이면 바로 에러가 난다.

## 마치며

이전까지는 혼자 하는 프로젝트가 대부분이라 컨벤션이나 환경 차이를 크게 체감하지 못했다.

근데 팀장이 되어 프로젝트를 이끌다 보니, 팀원 개인의 스타일을 그대로 두면 프로젝트 일관성이 무너진다는 걸 확실히 느꼈다.

### 컨벤션은 사람이 지키는 게 아니라 시스템이 지켜줘야 했다

* Node 버전 통일
* Lint / Prettier / Stylelint 자동화
* Husky로 커밋 단계에서 강제

이런 안전장치가 없으면 컨벤션 문서는 그냥 문서로 끝난다.

### 소통의 부채는 작아 보여도 나중에 크게 돌아왔다

사소한 규칙도 초기에 합의하지 않으면, 뒤늦게 정리할 때 비용이 몇 배로 늘어난다.