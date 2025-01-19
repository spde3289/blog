---
title: discord.js로 봇을 만들어보자 - 3
tags: [node.js]
date: "2023.10.25"
---
## 디스코드 봇 호스팅하기 

이번엔 만들었던 디스코드 봇을 aws에 호스팅 해보도록 하겠다.

## 시작 

1. 우선 아마존 aws에 계정을 만들고 카드 등록까지 해준다

2. 인스턴스 시작 버튼을 눌러 인스턴스를 생성해준다.

![백엔드 이미지](/img/node/CreateDiscordBotThree/인스턴스시작.png)
2. EC2 인스턴스 이름을 적고 OS를 선택해준다. (나는 Ubuntu를 선택했다.)

![백엔드 이미지](/img/node/CreateDiscordBotThree/awsTest.png)
![백엔드 이미지](/img/node/CreateDiscordBotThree/setOS.png)
3. 그리고 가장 중요한 키를 생성해준다. 이건 잃어버리면 안 되니 백업을 해준 후 인스턴스 시작을 해준다.

![백엔드 이미지](/img/node/CreateDiscordBotThree/createKey.png)
4. 생성이 완료 되었다면 서버에 로그인을 하기 위해 이전에 생성해주었던 키를 PuTTK key Generator을 통해 변환해줘야 한다.

![백엔드 이미지](/img/node/CreateDiscordBotThree/changeKey.png)
5. 그런 후 아래와 같이 작성해준다.

![백엔드 이미지](/img/node/CreateDiscordBotThree/setKey.png)
6. winSCP를 켜서 로그인을 해주면 되는데 호스트 이름으로는 (퍼블릭 IPv4 DNS) 사용자 이름으로는 ubuntu 그리고 비밀번호는 고급으로 들어가 SSH / 인증 에서 개인키 파일에 아까 변환 한 파일을 넣어주면 된다.

![백엔드 이미지](/img/node/CreateDiscordBotThree/login.png)
7. 로그인을 성공적으로 마쳤다면 만든 파일을 전부 넣어주면 된다.

![백엔드 이미지](/img/node/CreateDiscordBotThree/setFile.png)
8. 파일들이 성공적으로 넘어가 있는게 확인이 되었다면 npm, nodejs 를 설치 해 주면 된다.

![백엔드 이미지](/img/node/CreateDiscordBotThree/lsFile.png)
9. 그 이후 무중단 관리도구인 forever를 설치해 forever start [js script] 를 실행시켜 주면 된다.

[https://www.npmjs.com/package/forever](https://www.npmjs.com/package/forever) 

10. 그러면 따로 실행시켜주지 않아도 디스코드 봇이 실행되는 것을 볼 수 있다.

![백엔드 이미지](/img/node/CreateDiscordBotThree/complete.png)