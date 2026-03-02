---
title: Tailwind CSS 조건부 스타일링과 클래스 충돌 해결 - cn 유틸리티 도입
series: 글로벌 노마드
tags: ["tailwind-css", "clsx", "tailwind-merge", "utility"]
date: "2026.02.02"
---

Tailwind CSS를 사용해 재사용 가능한 UI 컴포넌트를 설계하다 보면 조건부 스타일링 처리에서 한계에 부딪힌다. 
템플릿 리터럴과 삼항 연산자가 중첩되면서 코드가 지저분해지는 것은 물론이고 가장 큰 문제는 클래스 우선순위 충돌이다. 
컴포넌트 내부에 기본 여백(`p-4`)을 설정해 두었는데 외부에서 props로 새로운 여백(`p-8`)을 주입할 경우 두 클래스가 충돌하여 개발자가 의도한 대로 덮어씌워지지 않는 현상을 자주 겪었다.

Tailwind CSS는 문자열에 나중에 적힌 클래스가 무조건 우선순위를 가지는 것이 아니라 최종적으로 생성된 CSS 번들 파일 내의 정의 순서에 따라 스타일이 적용된다. 
이 문제를 해결하고 가독성을 높이기 위해 `clsx`와 `tailwind-merge` 패키지를 조합한 `cn` 유틸리티 함수를 도입했다.

```typescript
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * clsx로 조건부 클래스를 결합하고,
 * tailwind-merge로 중복되거나 충돌하는 테일윈드 클래스를 정리한다.
 */
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

```

각 라이브러리의 역할과 도입 근거는 다음과 같다.

1. **`clsx`**: 객체나 배열 형태로 들어오는 복잡한 조건부 클래스들을 하나의 문자열로 깔끔하게 결합해 준다. 가독성 확보를 위해 선택했다.
2. **`tailwind-merge`**: `clsx`만으로는 `p-4 p-8`과 같은 Tailwind 클래스 충돌을 해결할 수 없다. `tailwind-merge`는 Tailwind의 유틸리티 클래스 그룹을 이해하고 있어 동일한 속성을 제어하는 클래스가 여러 개 들어오면 우선순위가 높은(나중에 선언된) 클래스만 남기고 나머지를 지워준다.

이 두 가지를 조합한 `cn` 함수를 사용하면 베이스 스타일이 지정된 컴포넌트에서도 외부에서 전달받은 `className`을 안전하게 병합할 수 있다.

```tsx
// 사용 예시
const Button = ({ className, variant, ...props }) => {
  return (
    <button 
      className={cn(
        "px-4 py-2 rounded-md bg-blue-500 text-white", // 기본 스타일
        variant === "danger" && "bg-red-500", // 조건부 스타일 (clsx 역할)
        className // 외부 주입 스타일 (twMerge가 기본 스타일과 충돌 시 외부 스타일 우선 적용)
      )} 
      {...props} 
    />
  );
}

```
