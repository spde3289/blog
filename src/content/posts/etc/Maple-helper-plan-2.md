---
title: 메이플 헬퍼 기획 - 2
tags: [etc, 메이플 헬퍼]
series: 메이플 헬퍼
date: "2024.10.12"
---

## 기술 스택 및 아키텍처 설계
### 기술 스택
- **Next.js**: 서버 사이드 렌더링(SSR)과 정적 사이트 생성(SSG)을 지원하는 React 프레임워크.
- **React**: 사용자 인터페이스를 구축하기 위한 JavaScript 라이브러리.
- **TypeScript**: JavaScript에 타입 안정성을 추가해 개발 생산성 향상.
- **Axios**: HTTP 요청을 간편하게 처리하는 라이브러리.
- **Tailwind CSS**: 유틸리티 기반의 CSS 프레임워크로 빠르게 스타일링 가능.
- **Vercel**: Next.js 애플리케이션을 배포하기 위한 플랫폼.

클라이언트에서 직접 Nexon Open API에 요청을 보내면 개발자 API KEY가 노출될 위험이 있기 때문에
Next.js의 API 라우트를 활용하여 API KEY를 안전하게 보호하려고 합니다.

Axios 인스턴스를 생성해 기본 URL, 헤더, 에러 처리 등을 일괄적으로 관리하려고 합니다.

tailwind를 이용해 빠른 웹 개발을 하려 합니다.

### 아키텍쳐
**폴더 구조**
```
/src
|-- /commonComponents         # 공통 컴포넌트 모음
|-- /components               # 개별적인 UI 컴포넌트
|-- /context                  # React Context API 관련 파일
|-- /data                     # 데이터 관련 유틸 (예: 더미 데이터, JSON 파일 등)
|-- /fetch                    # API 요청을 위한 함수 모음
|-- /hooks                    # 커스텀 훅 정의
|-- /icons                    # 아이콘 관련 파일
|-- /lib                      # 유틸리티 및 공통 함수
|-- /pages                    # Next.js 페이지 라우팅
|   |-- /api                  # API 라우트 (서버 사이드)
|   |-- /fonts                # 웹 폰트 관리
|   |-- /gem                  # 특정 기능 관련 페이지
|   |-- /genesis              # 추가적인 페이지 폴더
|   |-- _app.tsx              # Next.js의 App 컴포넌트
|   |-- _document.tsx         # Next.js의 Document 설정
|   `-- index.tsx             # 메인 페이지
|-- /styles                   # 스타일 및 Tailwind 설정
|-- /type                     # TypeScript 타입 정의
|-- /utils                    # 공통 유틸리티 함수
|
|-- .env                      # 환경 변수 설정 파일
|-- .eslintrc.json            # ESLint 설정 파일
|-- .gitignore                # Git에서 제외할 파일 목록
|-- .prettierrc               # Prettier 코드 스타일 설정
|-- next-env.d.ts             # Next.js 관련 타입 정의
|-- next.config.mjs           # Next.js 설정 파일
|-- package.json              # 프로젝트 의존성 관리
|-- postcss.config.mjs        # PostCSS 설정 파
|-- README.md                 # 프로젝트 설명 문서
|-- tailwind.config.ts        # Tailwind CSS 설정 파일
|-- tsconfig.json             # TypeScript 설정 파일
`-- yarn.lock                 # Yarn 패키지 종속성 관리 파일
```

next.js는 page 라우팅 방식과 최근에 나온 app 라우팅 방법이 있는데 
팀프로젝트에서 사용해본 경험이 있는 page 라우팅을 선택했습니다.

**데이터 흐름**
![아키텍쳐 이미지](/img/etc/Maple-helper-plan-2/architecture.png)