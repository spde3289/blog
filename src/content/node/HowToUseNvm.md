---
title: node 버전관리 nvm
tags: [node.js]
date: "2024.01.26"
---
## NVM 모듈 

node를 사용하다보면 개발환경에 따라 버전을 변경해야하는 상황이 오게 된다. 이때 nvm을 사용한다면 편리하게 버전을 변경하며 사용할 수 있다.

## NVM 설치 

여기에 있는 링크에 들어가서 nvm-setup.exe나 nvm-setup.zip 파일을 받아 설치를 해주면 된다.

[https://github.com/coreybutler/nvm-windows/releases](https://github.com/coreybutler/nvm-windows/releases) 

## NVM 사용법 

설치를 해주었다면 사용법은 간단하다.

```javascript

  nvm -v // nvm 버젼 확인

  nvm current // 현재 사용중인  노드버전 확인
  
  nvm ls // 설치된 노드버전 확인

  nvm ls-remote // 설치 가능한 모든 노드버전 조회

  nvm install xx.xx.x // 해당 노드버전 설치
  
  nvm uninstall xx.xx.x // 해당 노드버전 삭제

  nvm use xx.xx.x // 해당 노드버전으로 변경
  
```
[https://github.com/nvm-sh/nvm/blob/master/README.md](https://github.com/nvm-sh/nvm/blob/master/README.md) 
