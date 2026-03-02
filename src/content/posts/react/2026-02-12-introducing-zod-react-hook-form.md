---
title: zod 라이브러리 도입 배경 - 폼 유효성 검사의 중앙 집중화
series: 글로벌 노마드
tags: ["react-hook-form", "zod", "validation"]
date: "2026.02.12"
---

현재 개발 중인 서비스에는 사용자의 입력을 받고 그 값을 검증해야 하는 폼(Form) 인터페이스가 유독 많았다. 
아이디와 비밀번호 단 2가지만 입력받는 간단한 로그인 폼부터, 제목, 카테고리, 설명, 가격 등 9개가 넘는 필드를 꽉꽉 채워야 하는 '내 체험 등록' 기능까지 폼의 규모도 다양했다.

초기에는 컴포넌트 내부에 개별적인 상태를 두고 조건문으로 필드를 검증했다. 
하지만 폼이 복잡해질수록 유효성 검사 로직이 여러 곳으로 분산되었고, 컴포넌트의 코드가 비대해져 유지보수가 어려워지는 문제를 겪었다. 
이 문제를 해결하기 위해 React Hook Form과 Zod 조합을 도입했다.

## 라이브러리 선택 기준과 판단 근거

상태 관리와 렌더링 최적화를 위해 React Hook Form을 사용하는 것은 당연한 수순이었다. 
다수의 필드를 다룰 때 불필요한 리렌더링을 막아주기 때문이다. 문제는 '복잡한 검증 로직을 어떻게 깔끔하게 분리할 것인가'였다.

Yup이나 Joi 등 비슷한 스키마 검증 라이브러리가 많지만, 최종적으로 **Zod**를 선택했다. 가장 큰 판단 근거는 압도적인 사용자와 생태계였다. 
많은 프론트엔드 개발자들이 React Hook Form과 Zod 조합을 사용하고 있어 트러블슈팅을 위한 레퍼런스를 찾기 쉬웠고, 라이브러리의 버전 관리와 업데이트가 꾸준히 잘 되고 있어 서비스에 적용하기에 가장 안정적이라고 판단했다.

## 유효성 검사의 중앙 집중화

Zod를 도입한 후 흩어져 있던 검증 로직을 런타임 환경에서 동작하는 단일 스키마 파일로 추출했다.

```typescript
import { z } from "zod";

// 체험 등록 폼 스키마 정의 (검증 로직 중앙화)
export const experienceSchema = z.object({
  title: z.string().min(5, "제목은 최소 5자 이상 입력해야 합니다."),
  category: z.string().nonempty("카테고리를 선택해 주세요."),
  description: z.string().min(20, "설명은 20자 이상 작성해 주세요."),
  price: z.number().min(1000, "가격은 1,000원 이상이어야 합니다."),
  // ... 기타 검증이 필요한 필드들
});

export type ExperienceFormValues = z.infer<typeof experienceSchema>;

```

이렇게 정의한 스키마를 `@hookform/resolvers/zod` 패키지를 이용해 React Hook Form에 연결했다.

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { experienceSchema, ExperienceFormValues } from "@/schemas/experience";

export default function ExperienceForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<ExperienceFormValues>({
    resolver: zodResolver(experienceSchema),
  });

  const onSubmit = (data: ExperienceFormValues) => {
    // 검증을 통과한 안전한 데이터 전송
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("title")} placeholder="체험 제목" />
      {errors.title && <span className="error">{errors.title.message}</span>}
      
      {/* ... 나머지 8개의 필드들 */}
      
      <button type="submit">등록하기</button>
    </form>
  );
}

```

## 도입 결과

이 조합을 적용한 결과, UI 컴포넌트 내부에 복잡하게 얽혀 있던 `if` 조건문들이 완전히 사라졌다. 
UI 렌더링 계층과 데이터 검증 계층을 손쉽게 분리할 수 있었다.

Zod 스키마 객체 내에서 모든 예외 케이스와 에러 메시지를 관리하게 되면서, 프로덕트 전체의 에러 메시지를 일관성 있게 유지할 수 있었다. 
입력받을 데이터가 9개 이상 넘어가는 복잡한 폼을 개발할 때 이 구조의 장점이 가장 크게 다가왔다.