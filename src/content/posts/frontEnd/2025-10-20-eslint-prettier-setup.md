---
title: ESLint와 Prettier를 같이 쓰는 설정 정리
tags: ["ESLint", "Prettier", "코드 스타일", "개발 환경"]
date: "2025.10.20"
---

## 왜 Lint가 필요할까?

개발을 하다 보면 논리적인 오류보다 **사소한 실수나 일관성 없는 코드 스타일** 때문에 에러가 나는 경우가 있다.

이런 문제를 **정적으로 분석해서 미리 잡아주는 도구**가 린트(Lint)다.
Lint는 코드가 실행되기 전에 **코드 품질과 스타일을 검사**해 주고, 잘못된 문법이나 사용하지 않는 변수, 일관되지 않은 코드 스타일 같은 걸 잡아준다.

## ESLint는 뭐 하는 도구일까?

ESLint는 자바스크립트/타입스크립트를 위한 대표적인 Lint 도구다.
규칙을 직접 정의할 수도 있고, 커뮤니티에서 제공하는 규칙 세트를 가져와서 쓸 수도 있다.

대표적으로 Airbnb, Google, StandardJS 같은 스타일 가이드가 있다.

## ESLint 설치

Airbnb 규칙을 적용하려면 보통 아래 플러그인들이 같이 필요하다.

```bash
npm install -D eslint eslint-config-airbnb eslint-plugin-import eslint-plugin-react eslint-plugin-jsx-a11y eslint-plugin-react-hooks
```

> 참고
> CRA(Create React App)처럼 기본 ESLint 설정이 포함된 프로젝트도 있다.
> 다만 “무조건 이것만 설치하면 된다”는 식으로 단정하기는 어렵고(확실하지 않음), 현재 프로젝트에 어떤 ESLint 설정이 이미 들어가 있는지 먼저 확인하는 편이 안전하다.

## 기본 설정

프로젝트 루트에 `.eslintrc` 파일을 만들고 아래처럼 작성했다.

```json
{
  "extends": ["airbnb", "plugin:prettier/recommended"],
  "plugins": ["prettier"],
  "env": {
    "browser": true,
    "jest": true
  },
  "ignorePatterns": ["node_modules/"],
  "settings": {
    "import/resolver": {
      "node": {
        "paths": ["src"]
      }
    }
  },
  "rules": {
    "react/jsx-filename-extension": ["warn", { "extensions": [".js", ".jsx"] }]
  }
}
```

### 각 설정의 의미

* **extends**: 다른 규칙 세트를 가져와서 확장한다. 여러 세트를 조합해서 쓸 수 있다.
* **plugins**: 확장(extends)만으로는 활성화되지 않는 추가 기능을 명시적으로 켠다.
* **env**: 브라우저/Jest 환경의 전역 변수를 ESLint가 인식하게 만든다.
* **ignorePatterns**: ESLint 검사 대상에서 제외할 폴더/파일을 지정한다.
* **settings.import/resolver**: `src` 기준 절대경로 import에서 해석 에러가 나지 않게 맞춘다.
* **rules**: 개별 규칙의 동작을 조정한다.

  * `"off"`: 끈다
  * `"warn"`: 경고만 띄운다
  * `"error"`: 에러로 처리한다(상황에 따라 빌드/CI에서 실패할 수 있다)

## Prettier를 같이 쓰는 이유

ESLint가 코드 품질/안전성을 잡는 역할이라면,
Prettier는 **포맷(정렬, 들여쓰기, 줄바꿈)**을 자동으로 맞추는 역할에 더 강하다.

ESLint도 포맷 관련 규칙이 있긴 하지만, 실무에서는 보통 **ESLint + Prettier 조합**을 많이 쓴다.

## Prettier 연동 설치

```bash
npm install -D eslint-config-prettier eslint-plugin-prettier
```

그리고 `.eslintrc`에서 아래 설정을 포함한다.

```json
{
  "extends": ["plugin:prettier/recommended"]
}
```

이 설정은

* ESLint의 포맷 관련 규칙을 꺼서 충돌을 줄이고
* Prettier 규칙을 ESLint 규칙처럼 실행되게 만든다

## Prettier 설정

`.prettierrc` 파일을 만들고 이렇게 설정했다.

```json
{
  "printWidth": 80,
  "singleQuote": true,
  "trailingComma": "all"
}
```

* **printWidth**: 한 줄 최대 길이 기준
* **singleQuote**: 작은따옴표 사용
* **trailingComma**: 가능한 곳에 trailing comma를 붙인다

## 마치며

Lint/Prettier는 “있으면 좋은 도구” 정도가 아니라, 팀 작업이든 개인 작업이든 **실수를 줄이고 유지보수를 편하게 만드는 기본 장치**라고 느꼈다.

나도 그동안은 그냥 남들이 쓰니까 따라 쓰는 느낌이 있었는데, 이번에 설정 항목 의미를 다시 정리하면서 **왜 충돌이 나는지, 어떤 역할 분리가 되는지**가 좀 더 명확해졌다.
