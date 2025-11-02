---
title: discord.js로 봇을 만들어보자 - 5
series: 디스코드 봇 만들기
tags: [etc, 디스코드 봇 만들기]
date: "2024.02.19"
---
## CSR 웹 사이트 크롤링 

서버에서 페이지가 완성된 후 전달되는 SSR과는 다르게 클라이언트 측에서 렌더링 되는 CSR은 axios를 통해 크롤링 할 수 없다 하지만 Selenuim를 이용하면 브라우저를 생성해 렌더링이 된 후 내용을 얻을 수 있어 CSR에서도 이용할 수 있다 Selenuim은 다양한 브라우저로 사이트를 동작하고 테스트하기 위해 만들어진 도구이다.

## Selenuim 사용법 

```javascript

  const { Builder, By, Key, until } = require('selenium-webdriver');

  // WebDriver 인스턴스를 생성합니다.
  async function example() {
    // 브라우저를 시작합니다.
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        // Google 홈페이지를 엽니다.
        await driver.get('https://www.google.com');

        // 검색창을 찾고 "Selenium"을 입력합니다.
        await driver.findElement(By.name('q')).sendKeys('Selenium', Key.RETURN);

        // 검색 결과를 기다립니다.
        await driver.wait(until.titleContains('Selenium'), 1000);
        
        // 검색 결과 출력
        console.log("Page title is: " + await driver.getTitle());
    } finally {
        // 브라우저를 종료합니다.
        await driver.quit();
    }
  }
  
```
Selenuim은 cheerio처럼 DOM에서 특정 요소를 식별해 낼 수 있다. 이와 같은 기능들을 이용해 원하는 데이터를 크롤링 해와 기능을 만들었지만 환산스텟을 만드는 팀에서 공지가 나왔다. 현재 크롤링을 과도하게 요청하는 사람들이 많아 서버에 부하가 많이 걸려 크롤링을 하는 대신에 파라미터로 검색을 지원하고 있으니 크롤링 대신에 링크를 넣어달다는 요청이였다. 사실 만든 기능이 아깝긴 했지만 공부를 위해 만든 기능이였으니 해당 부분은 크롤링 대신 URL형태로 구현 했다.
