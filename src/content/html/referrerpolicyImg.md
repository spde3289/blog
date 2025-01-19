---
title: referrer 외부 링크 금지 이미지
tags: [html]
date: "2023.05.06"
---
팀프로젝트를 진행하던 도중 외부에서 불러온 이미지가 로드되지 않고 404를 반환하는 이슈가 있었다. 404를 반환한 이유를 알아보니 네이버에서 이미지를 가져올 때 보안에 관련된 이유로 404를 반환하는 것 이였다. 반환 하는 이유는 Referer 체크로 외부 링크를 금지하여 404를 반환 하는 것이다. 이를 해결 할 수 있는 방법으로는 이미지에 (referrerpolicy="no-referrer")속성을 추가해주면 된다.

```javascript

  <img alt="어쩌고" referrerpolicy="no-referrer" src="저쩌고" />


```
no-referrer 속성을 사용하면 Referer정보를 요청 헤더에 포함하지 않도록 해 404를 반환하지 않고 무사히 사용할 수 있다.

[https://inpa.tistory.com/entry/WEB-%F0%9F%93%9A-HTTP-referer-%EB%9E%80](https://inpa.tistory.com/entry/WEB-%F0%9F%93%9A-HTTP-referer-%EB%9E%80) 

[https://velog.io/@sejinkim/Referrer-Policy%EC%9D%98-%EC%9D%B4%ED%95%B4#%EB%A0%88%ED%8D%BC%EB%9F%AC%EA%B0%80-%EC%97%86%EC%96%B4%EC%A1%8C%EC%96%B4%EC%9A%94](https://velog.io/@sejinkim/Referrer-Policy%EC%9D%98-%EC%9D%B4%ED%95%B4#%EB%A0%88%ED%8D%BC%EB%9F%AC%EA%B0%80-%EC%97%86%EC%96%B4%EC%A1%8C%EC%96%B4%EC%9A%94) 

[https://ogaeng.com/http-referrer/](https://ogaeng.com/http-referrer/) 

[https://yceffort.kr/2020/09/referer-and-referrer-policy](https://yceffort.kr/2020/09/referer-and-referrer-policy) 
