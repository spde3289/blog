---
title: discord.js로 봇을 만들어보자
tags: [node.js]
date: "2023.09.08"
---

## 프로젝트 소개

메이플스토리라는 게임을 하다가 디스코드로 내 캐릭터에 대한 정보를 볼 수 있으면 편하겠다는 생각이 들었고, 친구와 이야기 하다 너무 재미있을 것 같아 당장 만들어보았다. discord.js가 너무 잘 만들어져 있어 생각보다 간단하게 만들 수 있었다.

## 프로젝트

axios를 이용해 HTTP 요청으로 웹에 대한 정보를 가져와 cheerio를 이용해 웹에 대한 데이터를 쉽게 가공해 원하는 정보를 가져올 수 있도록 했다.

개발을 하기 이전에 우선 봇을 생성해주어야 하는데 방법은 에 아주 친절하게 적혀 있으니 가이드 대로 생성하면 손쉽게 만들 수 있다.

[https://discord.com/developers/docs/getting-started](https://discord.com/developers/docs/getting-started)

원하는 데이터를 크롤링을 통해 가져와지는 것 을 확인 했으면 다음으로는 봇과 소통할 수 있도록 해야한다.

![백엔드 이미지](/img/node/CreateDiscordBotOne/capture2.png) 
발급 밭은 토큰을 이용해 봇에 로그인 할 수 있다.

![백엔드 이미지](/img/node/CreateDiscordBotOne/capture.png)
![백엔드 이미지](/img/node/CreateDiscordBotOne/capture1.png) 
처럼 작성해 준 뒤 node app.js 를 이용하면 아래와 같이 동작하는 것 을 확인 할 수 있다.

![백엔드 이미지](/img/node/CreateDiscordBotOne/result.png) 
![백엔드 이미지](/img/node/CreateDiscordBotOne/search.png)
