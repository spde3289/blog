---
title: EC2 인스턴스 서버 환경 구성하기 - 1
tags: [Sever]
date: "2024.05.11"
---
이번에 개발한 라이브쳇 서비스를 EC2 인스턴스를 이용해 배포를 했습니다. 이 글은 그 과정을 기록하기 위한 글 입니다.

## 사용할 AWS 서비스 

### ACM 

AWS Certificate Manager로 SSL/TLS 인증서를 생성, 관리 및 배포하는 AWS 서비스 입니다.

### EC2 

Elastic Compute Cloud로 AWS에서 제공하는 가상 서버 서비스 입니다.

### Amazon Route 53 

AWS에서 제공하는 클라우드 기반의 DNS(Domain Name System) 서비스입니다. 웹 트래픽을 라우팅하고 도메인 등록과 같은 기능을 제공합니다.

## 서비스 배포 

우선 EC2인스턴트 시작 버튼을 눌러 인스턴트를 하나 만들어 줍니다.

![백엔드 이미지](/img/sever/EC2InstenceLiveChat/EC2instenceStart.png)
이름 및 태그에 생성할 인스턴트의 이름을 적어준 다음 Ubuntu프리서버를 선택해 줍니다. 그리고 키 페어(로그인)에서 새 키 페어 생성을 눌러 .ppk 와 .pem키를 생성해주면 되는데 이 2개의 키는 잃어버리면 안 되니 꼭 보관해주면 됩니다.

![백엔드 이미지](/img/sever/EC2InstenceLiveChat/EC2StartPage.png)
인스턴스를 생성했으면 연결 버튼을 누른 후 인스턴트에 접속할 수 있습니다. 이 방법 이외에도 putty를 이용해 접속할 수 있습니다. 혹은 SSH 클라이언트 연결을 이용해 개발 환경 플랫폼 터미널(저의 경우는 VScode)에서도 접속이 가능합니다. 인스턴트에 성공적으로 접속했다면 WinSCP를 이용해 인스턴트에 파일을 전송하던 git을 설치해 원격으로 git repository를 클론해주면 됩니다. 

![백엔드 이미지](/img/sever/EC2InstenceLiveChat/instenceConnect.png)
생성한 우분터 서버에서는 아무것도 설치가 되어 있지 않기 때문에 서버 실행에 필요한 것들을 설치해야 합니다. npm node.js git (git을 통해 프로젝트를 가져온다면) git clone 프로젝트 (git을 통해 프로젝트를 가져온다면) 

```javascript

  // 업데이트
  sudo apt update

  // npm 설치를 위한 명령어
  sudo apt install npm

  // node.js 설치를 위한 명령어
  sudo apt install nodejs

  // git 설치를 위한 명령어
  sudo apt install git

  // github에 등록된 나의 프로젝트 가져오기
  git clone https://github.com/어쩌구/저쩌구.git  
  
```
이렇게 기본적인 업데이트 및 설정이 끝났다면 npm install로 package.json의 내역을 설치해주면 됩니다. 이제 진짜 마지막으로 서버의 무중단 배포를 위해 forever라이브러리를 설치해 forever start명령어로 서버를 실행시키면 됩니다.

이렇게 서버를 실행시켰다면 인스턴트 보안그룹에 인바운드 규칙을 추가해주면 되는데 서버를 연 포트를 입력해주면 됩니다.

![백엔드 이미지](/img/sever/EC2InstenceLiveChat/inbound.png)
인스턴스의 퍼블릭 IPv4 DNS의 8080포트로 접속하면 성공적으로 배포가 되었음을 확인할 수 있습니다.

![백엔드 이미지](/img/sever/EC2InstenceLiveChat/sever.png)