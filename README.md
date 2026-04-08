# 개발 블로그

기술 학습 내용, 프로젝트 경험, 문제 해결 과정, 회고를 기록하고 공유하기 위해 만든 개인 개발 블로그입니다.  
단순히 글을 작성하는 공간을 넘어, 시리즈 기능과 구조화된 콘텐츠 관리 방식을 통해 글의 흐름과 맥락까지 전달할 수 있도록 설계했습니다.

## 배포 링크

- 서비스 주소: [spde3289.dev](https://www.spde3289.dev/)

## 프로젝트 소개

이 프로젝트는 그동안 여러 곳에 흩어져 있던 기술 학습 내용과 프로젝트 회고를 한곳에 모아 체계적으로 관리하고자 시작되었습니다.

기존에는 학습 내용과 프로젝트 회고가 여러 곳에 흩어져 있어 관리가 어렵고, 게시글 간의 연결성도 부족하다고 느꼈습니다. 이를 해결하기 위해 게시글을 체계적으로 관리할 수 있는 블로그를 직접 제작했습니다.

특히 단일 게시글 나열 방식에서 벗어나, 특정 주제나 프로젝트와 관련된 글을 하나의 흐름으로 탐색할 수 있도록 **시리즈 모아보기 기능**을 도입했습니다. 
이를 통해 방문자가 단편적인 글이 아니라 문제 해결 과정과 의사결정의 맥락까지 자연스럽게 파악할 수 있도록 개선했습니다.

또한 글을 읽는 경험 자체도 중요하게 생각하여, 코드 하이라이팅, 반응형 UI, 다크모드, SEO 대응, 버전 관리 자동화 등 블로그 운영에 필요한 요소를 지속적으로 개선하고 있습니다.

## 기술 스택

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS

### Content / Rendering
- gray-matter
- remark / rehype
- rehype-pretty-code
- Shiki

### Deployment / Automation
- Vercel
- GitHub Actions
- next-sitemap

## 프로젝트 구조

```bash
src/
├── app/         # Next.js App Router 페이지 및 레이아웃
├── assets/      # 이미지 등 정적 리소스
├── components/  # 공통 UI 컴포넌트
├── constants/   # 상수 관리
├── content/     # 마크다운 게시글 원본 데이터
├── contexts/    # React Context 관련 로직
├── hooks/       # 커스텀 훅
├── lib/         # 공통 로직, 라이브러리 설정
├── scripts/     # 빌드 전 데이터 가공 스크립트
├── styles/      # 전역 스타일 및 스타일 관련 파일
├── svg/         # SVG 리소스 및 관련 컴포넌트
├── types/       # TypeScript 타입 정의
└── utils/       # 범용 유틸 함수
```

## 실행 방법

### 1. 저장소 클론

```bash
git clone https://github.com/spde3289/blog
cd blog
```

### 2. 패키지 설치

```bash
npm install
```

### 3. 개발 서버 실행

```bash
npm run dev
```

### 4. 프로덕션 빌드

```bash
npm run build
```

### 5. 프로덕션 서버 실행

```bash
npm run start
```

## 콘텐츠 작성 방식

이 프로젝트는 마크다운 기반으로 게시글을 작성하고,  
빌드 과정에서 HTML 및 JSON 형태로 변환해 사용하는 구조입니다.

게시글은 아래 경로에 마크다운 파일로 작성합니다.

```bash
content/posts/{카테고리}/{slug}.md
content/posts/react/use-effect.md
content/posts/next/app-router.md
```
### Front Matter 작성 예시
게시글 상단에는 메타데이터를 작성해야 합니다.
```md
---
title: "게시글 제목"
description: "게시글 설명"
date: "작성 일자"
tags: ["Next.js", "React", "TypeScript"]
series: "시리즈명"
---
```
