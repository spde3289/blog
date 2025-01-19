---
title: npm ERR! Cannot read properties of null (reading 'edgesOut')
tags: [FrontEnd]
date: "2023.07.13"
---
최근 배포를 하던 와중에 npm ERR! Cannot properties of null (reading) 이런 에러가 발생했다.

## 문제는? 

최신버젼의 styled-components에서 npm i styled-components를 수행하는 동안 생기는 문제였다.

## 해결방법 

V5 사용, npm install styled-components@5.3.10 원사 사용, yarn install styled-components 베타 버전을 사용하려면,npm install styled-components@latest 나의 경우에는 npm install styled-components@latest 를 사용해 해결했다.

[https://stackoverflow.com/questions/70810819/npm-err-cannot-read-properties-of-null-reading-edgesout](https://stackoverflow.com/questions/70810819/npm-err-cannot-read-properties-of-null-reading-edgesout) 
