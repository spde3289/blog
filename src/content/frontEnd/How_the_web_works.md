---
title: 웹의 동작 방식
tags: [frontEnd]
date: "2024.07.13"
---
오늘은 어렴풋이 알고 있었던 웹의 동작 방식에 대해 올바르게 알고 넘어가기 위해 글을 작성합니다.

요즘 개발을 하고 서버에 배포를 하다보면 동작 원리에 대해 궁금증이 많아지고 있습니다.

## WEB의 동작 원리
1. 우선 사용자가 웹 브라우저에 URL을 입력하거나 링크를 클릭을 합니다.
2. 브라우저는 DNS 서버를 통해 해당 URL을 IP 주소로 변환합니다.
3. 브라우저는 해당 IP 주소로 HTTP 요청을 보냅니다.
4. 웹 서버는 요청을 처리하고, TCP/IP 연결을 통해 브라우저에 리소스를 반환합니다.
5. 브라우저는 받은 리소스를 처리하여 웹 페이지를 렌더링하고 사용자에게 표시합니다.

## 용어 설명

### TCP/IP (Transmission Control Protocol / Internet Protocol)
이전에 socket 통신에 대한 글을 쓸 때 다뤘던 내용인데 TCP/IP는 OSI 7 Layer중 Layer 3, Layer 4를 
다루는 프로토콜 입니다.
**TCP**
- 데이터를 작은 패킷으로 나누어 전송하고, 모든 패킷이 제대로 도착했는지 확인하는 프로토콜입니다. 
**IP**
- 인터넷상의 주소 규칙입니다.

### DNS (Domain Name System)
도메인 이름을 IP 주소로 변환해주는 서버 입니다.

### HTTP (HyperText Transfer Protocol)
브라우저와 서버 간에 데이터를 주고받는 프로토콜입니다.


[참고 자료](https://developer.mozilla.org/ko/docs/Learn_web_development/Getting_started/Web_standards/How_the_web_works)