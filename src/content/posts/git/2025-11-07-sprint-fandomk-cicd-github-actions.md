---
title: GitHub Actions로 팬덤케이 CI/CD 파이프라인 구축
series: 스프린트 부트캠프
tags: ["GitHub Actions", "CI/CD", "Vercel", "Next.js", "Release", "Branch Protection"]
date: "2025.11.07"
---

이번 주부터 스프린트 기본 팀 미션을 시작했다. 이번 기회에 GitHub Actions로 CI/CD를 제대로 구축해보기로 했다.

예전에도 GitHub Actions로 배포 자동화를 설정한 적은 있지만, 그때는 검색해서 코드를 복사/붙여넣기 하면서 맞추는 방식이었다. 이번엔 공식 문서를 기준으로 흐름을 정리하고, 내가 의도한 트리거와 권한으로 동작하게 만드는 걸 목표로 했다.

먼저 워크플로를 쓰기 전에 배포 전략부터 잡았다.

## 배포 전략

### 목표
- PR 단계에서 품질 보장(CI: Lint, Build)
- `develop → main` 병합 흐름에서 프로덕션 배포 자동화(CD)

### 브랜치 & 환경
- **feature/**: `develop`에서 분기하고 작업 후 `develop`으로 PR
- **develop**: 통합(스테이징) 브랜치. PR 머지 전에 CI를 강제한다
- **main**: 프로덕션. `develop`이 머지되면 릴리즈 발행 → 프로덕션 배포로 이어지게 한다

### 파이프라인 요약

#### 1) feature → develop (PR 시 CI만)
- 트리거: `pull_request` (base=`develop`)
- 작업: Lint → Build(Next.js)
- 결과: 둘 다 통과해야 merge 가능(브랜치 보호 규칙으로 강제)

#### 2) main 반영 (push) → 태그/릴리즈 생성
- 트리거: `push` (branch=`main`)
- 작업: 버전 태깅 → GitHub Release 생성
- 결과: 배포 기준점(릴리즈)을 남긴다

#### 3) 릴리즈 발행 (published) → Vercel 프로덕션 배포
- 트리거: `release` (types: `published`)
- 작업: Vercel CLI로 production 환경 pull → build → prebuilt 배포
- 결과: 배포 완료

## GitHub Actions 구성요소 정리
- **Workflow**: `.github/workflows/*.yml`에 정의되는 자동화 파이프라인 단위
- **Event**: `push`, `pull_request`, `release` 등 워크플로를 트리거하는 이벤트
- **Jobs**: 작업 단위. 기본은 병렬 실행이고, `needs:`로 의존성을 걸면 순차 실행이 된다
- **Steps**: Job 내부에서 순차 실행되는 단계. 같은 러너 환경을 공유해서 step 간 파일/캐시 공유가 쉽다
- **Actions**: 재사용 가능한 단위 기능(예: `actions/checkout@v4`)
- **env / secrets**: `Settings > Secrets and variables > Actions`에서 관리한다

## 워크플로우 구성

## 1) PR용 CI: Lint & Build

```yaml
name: lint & build check

on:
  pull_request:
    branches:
      - develop

jobs:
  build:
    name: build
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "22"
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Lint Check
        run: npm run lint

      - name: Build Next.js
        run: npm run build --profile
````

여기서 의도는 단순하다. `develop`으로 들어오는 PR은 무조건 Lint/Build를 통과해야 머지되게 만드는 거다. 실제 강제는 브랜치 보호 규칙에서 “Required status checks”로 설정한다.

## 2) main 푸시 시: 버전 태깅 & 릴리즈 생성

```yaml
name: Create release & tag

on:
  push:
    branches:
      - main

permissions:
  contents: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Bump version and push tag
        id: tag_version
        uses: mathieudutour/github-tag-action@v6.2
        with:
          github_token: ${{ secrets.TOKEN }}

      - name: Create a GitHub release
        uses: ncipollo/release-action@v1
        with:
          tag: ${{ steps.tag_version.outputs.new_tag }}
          name: Release ${{ steps.tag_version.outputs.new_tag }}
          body: ${{ steps.tag_version.outputs.changelog }}
```

`contents: write` 권한이 없으면 태그/릴리즈 생성이 막힌다. 그래서 permissions를 명시했다.

토큰은 레포 정책에 따라 `GITHUB_TOKEN`으로도 충분할 수 있는데, 나는 팀에서 쓰는 방식(커스텀 토큰)을 맞추려고 `secrets.TOKEN`을 사용했다.

## 3) 릴리즈 발행 시: Vercel 프로덕션 배포

```yaml
name: Deploy Release to Vercel

on:
  release:
    types: [published]

jobs:
  deploy:
    name: deploy
    runs-on: ubuntu-latest
    env:
      VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
      VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
      VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
    steps:
      - uses: actions/checkout@v4
        with:
          ref: main
          fetch-depth: 0

      - name: Install Vercel CLI
        run: npm i -g vercel@latest

      - name: Pull Vercel env (production)
        run: vercel pull --yes --environment=production --token "${VERCEL_TOKEN}"

      - name: Vercel build (production)
        run: vercel build --prod --token "${VERCEL_TOKEN}"

      - name: Deploy to Vercel (Production, prebuilt)
        run: vercel deploy --prebuilt --prod --token "${VERCEL_TOKEN}"
```

릴리즈가 발행되는 순간을 “배포 트리거”로 삼았다. `main`에 코드가 들어왔다고 무조건 배포하는 게 아니라, 릴리즈 단위로 운영 배포를 관리하고 싶었다.

## release → deploy를 2단계로 나눈 이유

`main push`에서 태그/릴리즈를 만들고, `release published`에서 배포를 하게 나눴다.

한 파일에 합쳐도 되지만, 나는 분리하는 쪽이 더 낫다고 봤다.

* 릴리즈 생성 실패와 배포 실패를 로그에서 분리해서 보기 쉽다
* “운영 배포는 릴리즈가 기준”이라는 규칙이 워크플로 구조에 그대로 남는다
* 디버깅할 때 어디가 문제인지 빠르게 좁힐 수 있다

## 마치며

이번엔 Actions를 “돌아가게만 만드는 수준”이 아니라, 트리거/권한/흐름을 내가 설명할 수 있는 수준으로 맞췄다.

특히 `pull_request`, `push`, `release` 트리거를 어떻게 쪼개면 파이프라인이 깔끔해지는지 감이 잡혔다.
