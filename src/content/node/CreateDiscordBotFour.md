---
title: discord.js로 봇을 만들어보자 - 4
tags: [node.js]
date: "2024.02.15"
---
얼마전에 메이플 공식 api가 업데이트 됐다고 해서 디스코드 봇을 업데이트하기로 했다. 그래서 메이플 공식 api사용법과 이번에 추가한 내용을 블로그에 담으려 한다.

##    

[https://openapi.nexon.com/](https://openapi.nexon.com/) 

![백엔드 이미지](/img/node/CreateDiscordBotFour/IssueApiKey.png)
여기 공식 api 주소에 들어가 로그인을 한 뒤 어플리케이션 등록을 진행하면 된다.

여기에서 서비스 단계인지 출시 단계인지 선택하는 항목이 있는데 그 둘의 차이점은 초당 최대 허용량과 일일 최대 허용량으로 나뉜다. 개발 api key는 초당 5건과 일일 최대 1,000건을 허용하고 서비스 api key는 초당 500건과 일일 최대 20,000,000건을 허용한다. 

## 사용법 

발급 받은 키를 가지고 캐릭터 정보 조회를 하고 싶으면 우선 캐릭터 식별자 조회를 해야한다.

```javascript

  const API_KEY = "발급 받은 API Key";
  const characterName = "캐릭터명";
  const urlString = "https://open.api.nexon.com/heroes/v1/id?character_name=" + characterName;

  const answer = async (name) => {
    try {
      const data = await axios.get(
          urlString,
        {
          headers: {
            "x-nxopen-api-key": API_KEY
          }
        }
      );
      return data.data;
    } catch (error) {
      return error;
    }
  };

  
```
여기서 받은 캐릭터 식별자를 가지고 여러 정보를 조회 할 수 있게 됐다. 

하지만 나는 기존에 크롤링을 이용해 캐릭터에 대한 기본적인 정보들을 이미 만들어 놨는데 다시 공식 api를 이용해서 만들고 싶지는 않아서 새로운 기능을 추가하기로 했다. 그건 바로 메이플 환산 사이트를 크롤링해 정보를 보여주는 기능이다. 하지만 메이플 환산 사이트는 일반 유저들이 만든 사이트로 메이플 홈페이지와 다르게 로 이루어져 있어 axios를 이용한 크롤링이 불가능 했다. 이 부분의 해결과정과 결과는 다음 포스트에 적어보려한다.
