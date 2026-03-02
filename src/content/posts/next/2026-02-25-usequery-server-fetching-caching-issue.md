---
title: useQuery 서버패칭 캐싱 문제
series: 글로벌 노마드
tags: ["Next.js", "React Query", "Zustand", "Caching"]
date: "2026.02.25"
---

Next.js App Router 환경에서 마이페이지 프로필 수정 기능을 구현하던 중 데이터 동기화 문제를 겪었다.
서버 컴포넌트에서 유저 정보를 프리패칭(Pre-fetching)하여 클라이언트 컴포넌트로 넘기고, 클라이언트에서는 React Query와 Zustand를 이용해 상태를 관리하는 구조였다.
닉네임이나 프로필 이미지를 변경하는 API 호출이 성공했음에도 화면의 데이터가 즉각적으로 갱신되지 않고, 페이지 이동 후에도 이전 데이터가 노출되는 현상이 발생했다.

### 문제 원인 파악

원인은 서버 컴포넌트의 정적 데이터와 클라이언트의 동적 상태 간 타이밍 불일치에 있었다. 
서버 컴포넌트는 최초 렌더링 시 API를 호출해 데이터를 가져온다.
클라이언트에서 `useUpdateMyInfo` 혹은 `useUploadProfileImage` 뮤테이션을 통해 서버의 실제 데이터를 변경하더라도, 서버 컴포넌트는 자신이 이미 가져온 과거의 데이터를 스스로 다시 패칭하지 않는다.
이로 인해 Zustand 스토어를 업데이트하거나 React Query 캐시를 무효화(`invalidateQueries`)하더라도, Next.js의 라우터 캐시가 남아있는 한 변경 전 데이터가 계속해서 주입되는 문제가 발생했다.

### 해결 과정 및 판단 기준

사용자 경험(UX) 측면에서 데이터 수정 직후 즉각적인 시각적 피드백이 필요했다. 동시에 앱 내부를 이동할 때 데이터의 정합성도 보장되어야 했다.

**1. 클라이언트 상태 즉각 업데이트 (Zustand)**
API 수정 요청이 성공(`onSuccess`)하면 먼저 Zustand 스토어의 `updateUser` 액션을 호출해 클라이언트 전역 상태를 부분적으로 덮어씌웠다. 
이를 통해 새로고침 없이도 헤더나 이미지 뷰어의 유저 정보가 즉각적으로 변경되도록 처리했다.

**2. 서버 컴포넌트 데이터 갱신 (`router.refresh()`)**
클라이언트 상태만 바꾸면 근본적인 서버 컴포넌트의 캐시 데이터는 여전히 과거 상태에 머문다. 이를 해결하기 위해 `useRouter`의 `refresh()` 메서드를 활용했다.
`router.refresh()`는 현재 라우트를 새로고침하지 않고도, 백그라운드에서 서버 컴포넌트 데이터를 다시 패칭하여 클라이언트의 React 상태를 유지한 채 서버 사이드 데이터를 최신화한다.

```tsx
const router = useRouter();
const updateUser = useAuthStore((state) => state.updateUser);

// 프로필 이미지 변경 로직 예시
const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
  // ... (파일 업로드 처리)
  updateProfile(
    { profileImageUrl },
    {
      onSuccess: () => {
        // 1. 전역 스토어 즉시 업데이트 (UI 피드백)
        updateUser({ profileImageUrl });
        
        // 2. 서버 컴포넌트 데이터 재패칭 (데이터 정합성 보장)
        router.refresh();
        
        alert("프로필 이미지가 변경되었습니다.");
      },
    }
  );
};

```

### 트레이드오프 및 한계점

이슈를 발견한 시점이 프로젝트 발표를 불과 1시간 앞둔 시점이었다.
당장 구조를 뜯어고치기에는 위험 부담이 너무 컸고 즉각적으로 적용할 수 있는 가장 빠르고 확실한 해결책이 필요했다. 
그래서 기존에 구축해둔 Zustand 스토어 업데이트와 `router.refresh()`를 조합한 방식을 선택했다.

하지만 장기적인 아키텍처 관점에서는 아쉬움이 남는다. 
React Query의 `initialData`나 전역 Hydration을 적극적으로 활용해 서버와 클라이언트의 상태를 하나의 흐름으로 묶어 완벽히 동기화하는 방법이 더 안정적인 구조라고 생각한다.
