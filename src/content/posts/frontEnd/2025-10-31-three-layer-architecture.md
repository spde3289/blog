---
title: 3-Layers로 UI/로직/데이터 책임 분리하기
tags: ["architecture", "layered", "react"]
date: "2025.10.31"
---

## 3-Layers 기본 개념

크게 세 계층으로 나눠서 설계한다.

1. **Presentation Layer (프리젠테이션)**
   - 사용자에게 보이는 UI
   - React 기준으로는 컴포넌트, 화면 상태(로딩/에러/빈 상태) 표현이 여기로 간다.

2. **Business Logic Layer (비즈니스 로직)**
   - 앱의 규칙과 처리 흐름
   - 검증, 계산, 조건 분기, 상태 관리, 도메인 규칙 같은 “결정”이 모이는 곳이다.
   - React에서는 보통 hooks / services / utils 중 일부가 이 역할을 맡는다.

3. **Data Access Layer (데이터 접근)**
   - 실제 데이터 소스와 통신하는 계층
   - API 호출, fetch 래퍼, axios 인스턴스, DB 쿼리 같은 “가져오기/보내기”가 여기로 간다.

## Container/Presentational 패턴이랑 뭐가 다를까?

비슷한 결이 있다.
다만 Container/Presentational은 보통 **UI vs 로직** 분리에 집중하고, 3-Layers는 거기에 **데이터 접근까지 분리**해서 의존성을 더 선명하게 만든다.

## 왜 나누나

프로젝트가 커질수록 “수정해야 할 곳”을 찾는 비용이 커진다.  
내가 운영 중인 메이플 헬퍼에서도 비슷한 문제가 있었다.

보스 결정석 수익 계산 로직이 여러 컴포넌트에 중복으로 퍼져 있었고, 패치로 로직을 바꿀 때마다 사용처를 찾아가며 같이 고쳤다.  
이런 상황에서 레이어를 나누면 변경이 들어오는 지점을 한 군데로 모을 수 있다.

- UI 변경은 **Presentation**만
- 규칙 변경은 **Business Logic**만
- 통신 변경은 **Data Access**만

## 의존성 방향 규칙

레이어를 나누는 것만으로는 부족하고, **의존성 방향을 고정**해야 효과가 난다.

- Presentation → Business Logic → Data Access 방향으로만 참조한다.
- Data Access가 UI를 모르고, Business Logic도 UI에 종속되지 않는 게 핵심이다.
  - 그래야 UI를 바꿔도 로직이 안 흔들리고, 데이터 통신 방식을 바꿔도 UI가 덜 깨진다.

## 예시: 상품 리스트 페이지

### Presentation Layer

```tsx
// Presentation Layer
const ProductListPage = () => {
  const { products, isLoading } = useProductList();

  if (isLoading) return <Spinner />;
  return <ProductList products={products} />;
};
```

### Business Logic Layer

```tsx
// Business Logic Layer (Hook)
import { useEffect, useState } from "react";
import { getProducts } from "@/data/products";

export const useProductList = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  return { products, isLoading };
};
```

### Data Access Layer

```tsx
// Data Access Layer (API)
import api from "@/lib/api";

export const getProducts = async () => {
  const res = await api.get("/products");
  return res.data;
};
```

## 단점도 있다

* 파일 수가 늘고, 처음엔 구조 잡는 시간이 더 든다.
* 작은 기능인데도 “어디에 둘지” 고민이 생긴다.

그래도 코드가 커지기 시작하면, 이 초반 비용이 나중에 유지보수 비용을 훨씬 줄여준다.

## 마무리

아직 메이플 헬퍼에 완전히 적용해본 건 아니다.
근데 UI/로직/데이터를 분리하려는 기준을 고정하는 것만으로도, “수정할 때 어디를 건드려야 하는지”가 선명해진다.

## 참고자료
- [IBM - 3 계층 아키텍처란?](https://www.ibm.com/kr-ko/think/topics/three-tier-architecture)
