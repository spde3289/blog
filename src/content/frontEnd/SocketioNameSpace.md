---
title: Socket.io Namespace & Room 기능 이해하기
tags: [FrontEnd]
date: "2024.04.20"
---
Namespace와 Room은 Socket.IO의 중요한 기능으로, 실시간 애플리케이션에서 클라이언트와 서버 간의 메시지 전송을 보다 효율적으로 관리하는 데 사용됩니다. 이 기능들은 여러 클라이언트가 동시에 접속하는 환경에서 채널 또는 그룹 단위로 메시지를 관리하고, 다양한 이벤트를 분리하여 효율적으로 처리할 수 있게 해줍니다.

## Namespace 란? 

Namespace는 api 엔드포인트 같이 /chat은 채팅관련 이벤트를 처리하는 채널 /notification은 알람과 관련된 이벤트를 처리하는 채널로 분류할 수 있습니다. of 메서드를 이용해 네임스페이스에 접속할 수 있습니다. 

```javascript
// 클라이언트측 코드
// 기본 네임스페이스에 연결
const defaultSocket = io();
// 채팅 네임스페이스에 연결
const chatSocket = io('/chat');
// 알림 네임스페이스에 연결
const notificationSocket = io('/notification');
// 메시지 보내기
chatSocket.emit('message', '안녕하세요! 채팅 메시지입니다.');
// 알림 보내기
notificationSocket.emit('alert', '새로운 알림이 도착했습니다.');

```
```javascript
// 서버측 코드
const io = require('socket.io')
// 기본 네임스페이스 ("/")
io.on('connection', (socket) => {
  console.log('기본 네임스페이스에 연결됨');
});
// /chat 네임스페이스
const chatNamespace = io.of('/chat');
chatNamespace.on('connection', (socket) => {
  console.log('채팅 네임스페이스에 연결됨');
  socket.on('message', (msg) => {
    console.log('채팅 메시지:', msg);
    chatNamespace.emit('message', msg); // 채팅 네임스페이스에 메시지 브로드캐스트
  });
});
// /notification 네임스페이스
const notificationNamespace = io.of('/notification');
notificationNamespace.on('connection', (socket) => {
  console.log('알림 네임스페이스에 연결됨');
  socket.on('alert', (alert) => {
    console.log('알림 내용:', alert);
    notificationNamespace.emit('alert', alert); // 알림 네임스페이스에 알림 브로드캐스트
  });
});

```
## Namespace의 종류 

1. 기본 네임스페이스(Default Namespace) 2. 사용자 정의 네임스페이스(Custom Namespace) 
    기본적으로 모든 클라이언트는 ( / ) 네임스페이스에 연결이 되고 io.on('connection', callback)을 통해 네임스 페이스의 연결을 처리합니다.
    특정 기능이나 사용자 그룹을 분리하기 위한 네임스페이스입니다. /admin처럼 일반 사용자와 분리된 통신을 처리 할 수 있습니다.

```javascript
const adminNamespace = io.of('/admin'); // admin 네임스페이스에 입장

adminNamespace.use((socket, next) => {
  // 사용자 권한 확인 로직
  next();
});

adminNamespace.on('connection', (socket) => {
  // 관리자 전용 이벤트 처리
});

```
3. 동적 네임스페이스(Dynamic Namespace) 
    정규 표현식을 사용해 네임스페이스를 생성하는 것 또한 가능합니다

```javascript
const workspaces = io.of(/^/w+$/);

workspaces.on('connection', (socket) => {
  const workspace = socket.nsp;
  // 해당 네임스페이스에 대한 처리
});
workspaces.use((socket, next) => {
  // 접근 권한 확인 로직
  next();
});

```
## Namespace Middleware 

Middleware란? Namespace에 대한 요청을 처리하기 이전에 미리 응답을 처리해 다음단께로 전달할 하는 구조입니다. axios 인터셉터와 비슷한 역할을 합니다.

Socket.io는 Namespace Middleware또한 설정할 수 있습니다. 보안이 필요한 서비스나 비즈니스 로직등을 처리함에 있어 유용하게 사용할 수 있습니다.

```javascript
const io = require('socket.io')
// '/chat' 네임스페이스에 미들웨어 추가
const chatNamespace = io.of('/chat');
// 미들웨어 정의
chatNamespace.use((socket, next) => {
  // 클라이언트에서 전달한 인증 토큰 확인 (예: JWT)
  const token = socket.handshake.query.token;
  if (token === 'valid-token') {
    return next();  // 인증 성공하면 계속 연결
  } else {
    return next(new Error('인증 실패'));  // 인증 실패하면 연결 차단
  }
});
chatNamespace.on('connection', (socket) => {
  console.log('채팅 네임스페이스에 연결됨');
  socket.on('message', (msg) => {
    console.log('메시지:', msg);
  });
});

```
## Room 이란? 

Room은 네임스페이스의 하위 개념이라고 생각하시면 됩니다. 하나의 네임스페이스에 여러개의 방이 존재할 수 있습니다. 이 방안에 있는 여러개의 소켓이 서로 통신할 수 있습니다. 채팅방 같은 기능이라고 생각하시면 됩니다.

![백엔드 이미지](/img/frontEnd/SocketioNameSpace/SocketioNameSpace.png)
join 이나 leave 같은 메서드를 이용해 room에 참가하거나 떠날 수도 있고 chatroom1과 chatroom2 두 개의 방에 동시에 참여할 수 있습니다. to 메서드를 이용하면 특정 방에 있는 모든 소켓에게 메시지를 전송할 수 도 있습니다.

```javascript
// 클라이언트 코드
const socket = io();
// 방에 입장하기
socket.emit('joinRoom', 'chatroom');
// 방에서 나가기
socket.emit('leaveRoom', 'chatroom');
// 메시지 보내기
socket.emit('sendMessage', 'chatroom', '안녕하세요, 모두!');

```
```javascript
// 서버 코드
const io = require('socket.io')
io.on('connection', (socket) => {
  console.log('새로운 클라이언트가 연결됨:', socket.id);
  // 클라이언트가 'chatroom' 방에 입장
  socket.on('joinRoom', (roomName) => {
    socket.join(roomName); // 방에 입장
  });
  // 클라이언트가 'chatroom' 방에서 나가기
  socket.on('leaveRoom', (roomName) => {
    socket.leave(roomName); // 방에서 나감
  });
  // 방에 있는 모든 클라이언트에게 메시지 보내기
  socket.on('sendMessage', (roomName, message) => {
    io.to(roomName).emit('message', message); // 방에 있는 모든 클라이언트에게 메시지 전송
  });
});


```