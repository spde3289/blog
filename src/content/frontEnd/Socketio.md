---
title: Socket.io에 대해서
tags: [FrontEnd]
date: "2024.04.13"
---
## Socket.io에 대해서 

Socket.io는 WebSocket 프로토콜을 기반으로 실시간 양방향 통신을 지원하는 라이브러리입니다.

## Socket.io의 특징 

1. WebSocket 프로토콜 사용 2. 양방향 통신 3. 이벤트 기반 통신 4. Room과 Namespace 
    socket.io는 WebSocket을 기본 통신 방법으로 사용하지만 WebSocket을 지원하지 않는 환경에서는 Long Poling 등의 대체 방식을 사용해 호환성을 유지합니다. 
    클라이언트와 서버가 서로 데이터를 주고받을 수 있습니다.
    데이터를 교환할 때 이벤트라는 개념을 사용하는데 클라이언트와 서버 모두 이벤트를 생성하거나 이를 수신하는 작업을 수행할 수 있습니다. 
    Room: 특정 사용자 그룹을 만들어 메시지를 제한적으로 전달할 수 있는 기능. Namespace: URL 경로를 분리하여 논리적으로 독립된 통신 채널을 제공.

```javascript
// 클라이언트 예제
socket.emit('message', 'Hello, Server!'); // 이벤트 전송
socket.on('response', (data) => {
  console.log(data); // 서버에서 보낸 응답 처리
});

```
```javascript
// 서버 예제
io.on('connection', (socket) => {
  console.log('클라이언트가 연결되었습니다.');
  
  socket.on('message', (msg) => {
    console.log("클라이언트 메시지 : ", msg);
    socket.emit('response', 'Hello, Client!');
  });
});

```
## WebSocket 프로토콜이란? 

WebSocket은 HTML5 표준에 정의된 네트워크 프로토콜이고 RFC 6455에 의해 표준화되었습니다. WebSocket은 HTTP 요청을 통해 초기 Handshake를 설정한 후 TCP 기반의 지속적인 양방향 연결을 유지합니다.

WebSocket은 연결이 지속적으로 유지되므로 서버 자원을 계속 소모할 수 있습니다. 따라서 서버의 연결 수와 리소스를 효율적으로 관리해야 합니다. 또한 WebSocket은 기본적으로 보안 기능을 제공하지 않기 때문에, 보안을 위해 wss://(WebSocket Secure)를 사용하는 것이 권장됩니다.

![백엔드 이미지](/img/frontEnd/Socketio/Image.png)