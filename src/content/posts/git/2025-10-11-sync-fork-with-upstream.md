---
title: 포크(fork)한 레포지토리에 원본(upstream) 변경사항 동기화하기
tags: ["Git", "GitHub", "협업", "버전관리"]
date: "2025.10.11"
---

스프린트 미션이나 협업을 하다 보면 팀 저장소를 포크해서 작업하는 경우가 많다.

그런데 시간이 지나면 원본 저장소(upstream)가 업데이트되고, 내 포크 저장소(origin)는 점점 뒤처진다.

이럴 때는 **upstream의 변경사항을 내 로컬과 포크(origin)까지 동기화**해줘야 한다.


## 1. remote 목록 확인하기

현재 프로젝트에 어떤 원격 저장소(remote)가 연결돼 있는지 확인한다.

```bash
git remote -v
```

보통 `origin`만 있을 텐데, 이건 **내가 포크한 저장소**를 가리킨다.

## 2. 원본 저장소(upstream) 추가

원본 팀 레포를 `upstream`이라는 이름으로 추가한다.

```bash
git remote add upstream [원본 저장소 Git URL]
```

추가가 잘 됐는지 다시 확인한다.

```bash
git remote -v
```

`origin`과 `upstream`이 같이 보이면 정상이다.


## 3. upstream 최신 변경사항 가져오기(fetch)

upstream의 최신 상태를 로컬로 가져온다.

```bash
git fetch upstream
```

여기서 중요한 점이 하나 있다.

`fetch`는 upstream의 브랜치 정보를 **로컬에 다운로드만** 해준다.
내 브랜치가 자동으로 업데이트되진 않는다.


## 4. 내 main을 upstream/main으로 동기화하기

대부분은 포크 저장소의 `main`(또는 `master`)을 upstream 기본 브랜치와 맞추는 게 목적이다.

### 방법 A: merge로 반영하기(안전한 기본)

```bash
git checkout main
git merge upstream/main
git push origin main
```

* merge는 기록이 남아서 협업에서 무난하다.
* 충돌이 나면 여기서 해결하면 된다.

### 방법 B: rebase로 반영하기(히스토리 깔끔)

```bash
git checkout main
git rebase upstream/main
git push origin main
```

* rebase는 히스토리를 깔끔하게 유지한다.
* 다만 상황에 따라 충돌 해결이 더 귀찮을 수 있다.

> upstream 기본 브랜치 이름이 `main`이 아닐 수도 있다.
> 그때는 `upstream/master` 같은 실제 브랜치 이름으로 바꿔서 쓰면 된다.


## 5. 최신 main 기준으로 작업 브랜치 만들고 푸시하기

upstream 동기화가 끝났다면, 최신 main에서 작업 브랜치를 만든다.

```bash
git checkout -b react-김지훈
git push -u origin react-김지훈
```

`-u`를 붙이면 이후부터는 `git push`만 해도 같은 브랜치로 푸시된다.

## 정리

1. `git remote -v`로 origin 확인
2. `git remote add upstream ...`으로 원본 연결
3. `git fetch upstream`으로 원본 최신 상태 가져오기
4. `merge` 또는 `rebase`로 내 main에 반영
5. `git push origin main`으로 포크(origin)까지 동기화
6. 최신 main 기준으로 브랜치 만들어 작업

이 방식으로 포크 저장소를 항상 최신 상태로 유지할 수 있다.
