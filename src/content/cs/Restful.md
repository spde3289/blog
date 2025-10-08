---
title: RESTful이란?
tags: [cs]
date: "2023.02.16"
---
## RESTful이란? 

RESTful 는 REST API의 REST를 잘 따르는 시스템을 RESTful하다 라고 할 수 있다. RESTful은 REST를 REST답게 쓰기 위한 방법으로, 누군가가 공식적으로 발표한 것이 아니다. 즉, REST 원리를 따르는 시스템은 RESTful이란 용어로 지칭된다.

그럼 REST는 무엇일까? REST는 (Representational state transfer)의 약어로 자원을 이름(자원의 표현)으로 구분하여 해당 자원의 상태(정보)를 주고 받는 모든 것을 의미한다. REST는 클라이언트 측에서 URL형태로 Server에 요청을 할 수 있는데 요청을 보내는 방법으로는 HTTP프로토콜의 Method를 사용한다. HTTP프로토콜은 GET, POST, PUT, DELETE와 같은 메서드를 제공한다 위와 같은 메서드를 이용해 요청을 보내면 Server에서는 JSON, XML, TEXT, RSS등 여러 형태로 응답을 보내주는데 보통 JSON, XML형태로 데이터를 주고 받는게 일반적이라고 할 수 있다.

REST API란 REST 기반으로 서비스 API를 구현한 것 이라고 할 수 있다. 그럼 REST API의 설계 규칙이 있는데 아래와 같다. 

- 슬래시 구분자(/)는 계층 관계를 나타내는데 사용한다.
- URL 마지막 문자로 슬래시(/)를 포함하지 않는다.
- 언더바(_)사용을 지향하는대신 하이픈(-)을 사용하여 URL가독성 높인다.
- URL경로로는 소문자를 사용한다.
- 파일 확장자를 URL에 포함하지 않는다.
- 슬래시 구분자(/)는 계층 관계를 나타내는데 사용한다.
REST API 서버 응답으로는 다음과 같은 구성 요소가 포함되어 있어야 한다.

 

- 1xx : 전송 프로토콜 수준의 정보 교환
- 2xx : 클라어인트 요청이 성공적으로 수행됨
- 3xx : 클라이언트는 요청을 완료하기 위해 추가적인 행동을 취해야 함
- 4xx : 클라이언트의 잘못된 요청
- 5xx : 서버쪽 오류로 인한 상태코드
 응답 본문에는 리소스 표현이 포함이 되고 서버는 요청 헤더에 포함된 내용을 기반으로 응답을 보내준다. 클라이언트는 XML 또는 JSON 형식으로 정보를 요청할 수 있습니다. 예를 들어, 클라이언트가 John이라는 사람의 이름과 나이를 요청하면 서버는 다음과 같이 JSON 표현을 반환해준다. 

 응답에는 응답에 대한 헤더 또는 메타데이터도 포함이 되는데 이는 응답에 대한 추가 컨텍스트를 제공하고 서버, 인코딩, 날짜 및 콘텐츠 유형과 같은 정보를 포함한다.

[https://aws.amazon.com/ko/what-is/restful-api/](https://aws.amazon.com/ko/what-is/restful-api/) 

[https://gmlwjd9405.github.io/2018/09/21/rest-and-restful.html](https://gmlwjd9405.github.io/2018/09/21/rest-and-restful.html) 
