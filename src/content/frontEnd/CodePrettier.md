---
title: 코드 포멧팅 prettier
tags: [FrontEnd]
date: "2023.07.27"
---
## 코드 포멧터 Prettier 

여러 사람들과 개발을 하게되면 각자 개발 습관에 따라 세미콜론(;), 줄간격, 행 등이 각각이 달라 코드가 뒤죽박죽이 되는 상황이 생기게 됩니다. 이때 Prettier를 사용하게 되면 정해진 규칙에 따라 모맷팅 해주기 때문에 수고 없이 코드를 짜기만 하면 됩니다.

## 사용방법 

```javascript

  yarn add prettier

  npm i prettier


```
설치가 끝났다면 .prettierrc.json 파일을 만들어 관리해줄 수 있다.

```javascript

  {
    "tabWidth": 2, // 탭 간격
    "useTabs": false, // 탭 대신 스페이스를 사용여부
    "singleQuote": false, // 작은따옴표(')를 사용할지 큰 따옴표를 사용할지(") true일시 (')
    "semi": true, // 세미콜론 사용여부
    "jsxSingleQuote": true, // JSX에서 작은 따옴표를 사용여부
    "trailingComma": "es5", // 객체나 배열의 마지막 요소에 쉼표를 붙일지 여부
    "printWidth": 100 // 한 줄의 최대길이를 지정한다.
  }


```
package.json파일 scripts에 prettier --write . 를 추가해주면 간단한 명령어를 실행할 때 마다 코드 포맷팅이 실행된다.

설정에서 Default Formatter 를 검색해주고 Default Formatter 부분에 Prettier - Code Fromatter 를 지정해주고 Settings에서 Text Editor를 클릭한 후 Formatting를 다시 클릭해준다

Format On Paste : 사용자가 코드를 붙여넣기 했을 때, 자동으로 코드를 정렬 Format On Save : 사용자가 코드를 저장 했을 때, 자동으로 코드를 정렬 Format On Type : 사용자가 코드를 입력할 때, 자동으로 코드를 정렬 

설정하면 명령어를 실행하지 않아도 자동으로 포맷팅이 된다.

[https://github.com/prettier/prettier-vscode](https://github.com/prettier/prettier-vscode) 

[https://ux.stories.pe.kr/150](https://ux.stories.pe.kr/150) 
