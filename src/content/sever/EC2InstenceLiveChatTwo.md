---
title: EC2 인스턴스 서버 환경 구성하기 - 2
tags: [Sever]
date: "2024.05.18"
---
이전 포스트에서 서버에 배포하고 실행까지 했지만 이번엔 도메인 연결과 HTTPS인증까지 다루려고 합니다.

## 탄력적 IP 주소 할당 

EC2 인스턴트는 기본적으로 동적 IP를 할당받기 때문에 인스턴스를 재부팅하거나 종료할 경우 IP가 변경됩니다. HTTP 인증과 같은 작업에는 고정된 IP주소가 필요하기 때문에 탄력적 IP주소를 할당해 줍니다.

![백엔드 이미지](/img/sever/EC2InstenceLiveChatTwo/ip.png)
## AWS Certificate Manager(ACM)인증서 발급 

SSL/TLS 인증을 위한 인증서를 발급 받아주면 됩니다. 이 과정은 5분에서 20분 정도 걸립니다. 만약 서브도메인을 사용할 생각이라면 example.com *.example.com 둘다 등록하시면 됩니다.

## 보안그룹 인바운드 규칙 

그동안 HTTP와 HTTPS 인바운드 규칙을 추가해줍니다.

![백엔드 이미지](/img/sever/EC2InstenceLiveChatTwo/inbound.png)
## 대상그룹 생성 

다음으로 로드 밸런싱의 대상그룹을 생성한 다음 생성한 인스턴트에 사용중인 8080포트로 연결해줍니다.

![백엔드 이미지](/img/sever/EC2InstenceLiveChatTwo/tg.png)
![백엔드 이미지](/img/sever/EC2InstenceLiveChatTwo/tgPort.png)
## 로드밸런서 생성 

로드 밸런스는 HTTP로 접속했을 떄 HTTPS로 리다이렉션 해주는 역할을 합니다. 리스너 및 라우팅에는 사전에 생성한 대상그룹을 설정해주고 보안그룹은 사전에 편집한 보안그룹을 할당해주면 됩니다.

![백엔드 이미지](/img/sever/EC2InstenceLiveChatTwo/lbCreate.png)
![백엔드 이미지](/img/sever/EC2InstenceLiveChatTwo/lb.png)
이렇게 생성을 해줬다면 로드밸런스 리스너 및 규칙 HTTP:80포트에 규칙을 추가해 HTTP로 접속하면 HTTPS로 리다이렉션 하도록 해줍니다.

![백엔드 이미지](/img/sever/EC2InstenceLiveChatTwo/ifHttp80.png)
![백엔드 이미지](/img/sever/EC2InstenceLiveChatTwo/workhttp80.png)
![백엔드 이미지](/img/sever/EC2InstenceLiveChatTwo/http80.png)
## Route 53 생성 

![백엔드 이미지](/img/sever/EC2InstenceLiveChatTwo/route53host.png)
가비아에서 도메인을 구매했다면 http://live-support.shop/ 의 NS유형을 가비아 네임서버에 등록해 줍니다.

![백엔드 이미지](/img/sever/EC2InstenceLiveChatTwo/route53ns.png)
아까 발급 받았던 AWS Certificate Manager인증서를 Router53에 등록해 줍니다.

그 다음 생성한 로드밸런서를 이용해 EC2인스턴스 와 도메인을 연결시켜주면 됩니다.

![백엔드 이미지](/img/sever/EC2InstenceLiveChatTwo/route53api.png)
여기까지 작업을 잘 하셨다면 이제 등록한 도메인으로 접속을 했을때 서비스에 접속할 수 있게됩니다. 하지만 저는 vercel을 이용해 프론트 배포를 했기 때문에 vercel에도 도메인을 등록해야 합니다.

## velcel 도메인 등록 

velcel 도메인 등록은 아주 간단한데 프로젝트 설정에 들어가 Domains에서 등록하고자 하는 도메인을 입력한 후 Route53에 돌아가 해당 레코드 생성을 해주면 된다.

![백엔드 이미지](/img/sever/EC2InstenceLiveChatTwo/vercelAdd.png)
![백엔드 이미지](/img/sever/EC2InstenceLiveChatTwo/aRecode.png)
![백엔드 이미지](/img/sever/EC2InstenceLiveChatTwo/cname.png)
## 발생했던 문제 

모든 서버환경을 구성했음에도 불구하고 EC2 인스턴스 서버가 velcel에 도메인 등록만 하면 접속이 되지 않는 이슈가 있었습니다. 초기에 원인을 찾지 못해 헤매고 있던 중 api.live-support.shop에 접속하면 일반적인 에러 페이지 대신 Vercel 404 에러 페이지가 뜨는 점이 이상하다는 생각이 들었고 Vercel에 Domain 설정을 찾아보던 중 원인을 발견했습니다.

velcel에 도메인을 등록하면 자동으로 DNS Records값이 설정되었고 DNS Records설정 값을 삭제해주니 정상적으로 동작했습니다.

![백엔드 이미지](/img/sever/EC2InstenceLiveChatTwo/vercelDomain.png)
![백엔드 이미지](/img/sever/EC2InstenceLiveChatTwo/vercelDsn.png)