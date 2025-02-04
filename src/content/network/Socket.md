---
title: Socket통신
tags: [network]
date: "2024.04.02"
---
## Socket 통신 

Socket통신은 양쪽 프로세스 간에 양방향 통신을 가능하게 해주는 네트워크 통신 방법입니다. 소켓은 TCP와 UDP 소켓으로 구분되며 각각 의 차이점은 아래와 같습니다.

TCP 통신 - 연결 지향적 프로토콜로 데이터 전송의 신뢰성을 보장되기 위해 설계되었습니다. 이는 서로에게 언제든 실시간으로 통신을 보낼 수도 받을 수도 있습니다. TCP 통신은 Handshake라는 과정을 거치며 소켓을 각자 생성하여 서로가 연결되었음을 알게 되고 이후 서로 실시간 통신을 할 수 있게 됩니다. HTTP/HTTPS 통신도 TCP 통신에 해당됩니다. Handshake 과정: 1. SYN: 송신자가 수신자에게 연결 요청을 보냅니다. 2. SYN-ACK: 수신자가 연결 요청을 수락하고, 확인 응답을 보냅니다. 3. ACK: 송신자가 수신자의 확인 응답을 받고, 연결이 확립됩니다. 

UDP 통신 - 비연결 지향적 프로토콜로 실시간 스트리밍과 같이 빠른 응답 시간이 필요한 상황에서 쓰입니다. UDP 통신은 Handshake과 같은 과정이 없어 바로 데이터를 전송할 수 있으며 TCP통신과 달리 패킷 손실에 대해 신경쓰지 않습니다. 이와 같으점 때문에 1 대 다수(1/N)의 장치와 통신을 할때 쓰여지고 라디오방송, 라이브방송 같이 여러 사람과 통신을 해야하며 빠른 데이터 전송과 같은 상황에 쓰여집니다.

![백엔드 이미지](/img/network/Socket/Socket.gif)
## Socket 통신과 HTTP 통신의 차이점 

HTTP통신과 Socket통신의 가장 큰 차이점은 연결성입니다. HTTP통신은 요청과 응답에 대한 처리가 독립적으로 이루어져 서로의 요청과 응답에 대해 영향을 주지 않습니다. 하지만 Socket통신은 연결이 이루어진 후 데이터를 주고받을 수 있다는 점이 있습니다.
