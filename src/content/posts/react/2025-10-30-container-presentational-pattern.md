---
title: Container/Presentational Pattern 데이터 로직과 UI 로직 분리
tags: ["React", "Design Pattern", "컴포넌트 설계", "아키텍처"]
date: "2025.10.30"
---

React로 컴포넌트를 만들다 보면 “데이터 로직”이랑 “UI 로직”이 한 컴포넌트 안에 섞이기 시작한다.

처음엔 빨리 만들 수 있는데,
규모가 커지면 수정 포인트가 늘고, 재사용도 어렵고, 테스트도 힘들어지는 쪽으로 간다.

이때 자주 언급되는 설계 방식 중 하나가 **Container / Presentational 패턴**이다.

## 디자인 패턴

디자인 패턴은 개발하면서 반복해서 마주치는 문제를, 일정한 방식으로 풀기 위한 “설계 템플릿”에 가깝다.

Container/Presentational도 React에서 로직과 화면을 분리하려는 시도 중 하나고,
요즘엔 훅으로 대체되는 경우가 많지만 “역할 분리 기준” 자체는 여전히 유효하다고 생각한다.

## Container / Presentational 패턴

핵심은 단순하다.

- **Container**: 데이터 가져오기/가공/상태 관리처럼 “동작”을 책임진다.
- **Presentational**: 전달받은 데이터를 “어떻게 보여줄지”만 책임진다.

같은 UI를 다른 데이터 소스로 재사용해야 하거나,
UI 수정과 데이터 로직 수정을 서로 덜 영향 주게 만들고 싶을 때 효과가 있다.

## Presentational Component

Presentational 컴포넌트는 UI에 집중한다.

- 마크업과 스타일을 가진다.
- 데이터 요청, 비즈니스 로직을 갖지 않는다.
- 외부에서 받은 `props`를 기반으로 렌더링한다.
- 로컬 UI 상태(토글, 인풋 값 같은)는 가질 수 있지만, “데이터의 진실”은 컨테이너가 가진다.

## Container Component

Container 컴포넌트는 동작과 데이터를 책임진다.

- 데이터 요청/가공/상태 관리(useState, useEffect, React Query 등)를 담당한다.
- UI는 직접 그리지 않거나(최소한으로만) Presentational에 위임한다.
- 자식에게 데이터와 핸들러를 `props`로 내려준다.

## 사용 예시

아래는 텍스트 목록을 출력하는 예시다.

- `Texts`: 화면만 그린다.
- `TextsContainer`: 데이터를 가져와서 `Texts`에 넘긴다.

```jsx
const Texts = ({ texts }) => {
  return (
    <>
      {texts.map((text) => (
        <p key={text}>{text}</p>
      ))}
    </>
  );
};

const TextsContainer = () => {
  const [texts, setTexts] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await fetch("https://text.com");
      const data = await res.json();
      setTexts(data);
    })();
  }, []);

  return <Texts texts={texts} />;
};
```

여기서 중요한 포인트는 `Texts`가 데이터 요청/가공을 전혀 모른다는 점이다.
`Texts`는 “받은 걸 그리는 역할”만 하고, 데이터 관련 책임은 `TextsContainer`에 남는다.

## 훅이랑 뭐가 달라?

React에 커스텀 훅이 자리 잡으면서,
데이터 로직은 `useFetchTexts()` 같은 훅으로 빼고 UI 컴포넌트가 직접 호출하는 방식이 흔해졌다.

그래도 Container/Presentational 패턴은 “어떤 책임을 어디에 둘지” 결정할 때 기준점이 된다.
특히 UI 재사용과 테스트 관점에서 역할을 나누는 감각을 잡는 데 도움이 됐다.

## 참고 자료

* patterns-dev: Container/Presentational 패턴
  * [https://patterns-dev-kr.github.io/design-patterns/container-presentational-pattern/](https://patterns-dev-kr.github.io/design-patterns/container-presentational-pattern/)
