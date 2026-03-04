---
title: 드래그 슬라이더 구현 중 만난 styled-components 경고와 해결
series: fandom-k
tags: ["styled-components", "React", "성능 최적화", "useRef", "슬라이더"]
date: "2025.11.10"
---

이번 스프린트 팀 프로젝트에서는 **가능한 한 라이브러리에 덜 의존하고, 직접 로직을 구현해보자**는 목표를 세웠다.

그래서 캐러셀/슬라이더도 Swiper 같은 라이브러리를 쓰지 않고 **드래그 + 버튼 이동까지 되는 슬라이더**를 직접 만들었다.

그러다 styled-components에서 아래 경고가 떴다.

> Over 200 classes were generated for component styled.div with the id of "sc-blIAwI".
>
> Consider using the attrs method, together with a style object for frequently changed styles.

처음엔 “클래스가 많이 만들어지면 뭐가 문제지?” 정도로 봤는데, 이게 styled-components 동작 방식 + 성능 이슈랑 연결되는 신호였다.

## 문제 상황: 드래그할 때마다 state 업데이트 + 클래스 폭증

처음 구현은 **드래그 위치를 state로 관리하고**, 그 값을 styled-components props로 넘겨 `transform`을 바꾸는 구조였다.

```jsx
const [offset, setOffset] = useState(0);

const SliderList = styled.div`
  transform: translateX(-${(props) => props.offset}px);
  transition: transform 0.3s ease;
`;

const handleMouseMove = (e) => {
  const nextOffset = /* 계산 로직 */;
  setOffset(nextOffset);
};

// ...
<SliderList offset={offset}>...</SliderList>;
```

드래그는 `mousemove`/`touchmove` 같은 이벤트에서 **짧은 시간에 수십~수백 번 호출**된다.

* `handleMouseMove` → `setOffset`가 계속 호출된다
* `offset`이 계속 바뀐다
* styled-components는 props 기반 스타일이 바뀔 때마다 **새 클래스 변형을 생성**한다
* 어느 순간부터 “200개 넘게 만들었는데 이거 위험하다” 경고가 뜬다

## styled-components 경고가 의미하는 것

경고 메시지의 핵심은 이거다.

* **같은 컴포넌트에서 200개가 넘는 서로 다른 클래스 변형이 생성됐다**
* “자주 바뀌는 스타일은 props 기반 클래스 생성으로 처리하지 말고, `attrs` + style object(인라인 스타일) 같은 방식으로 처리해라”

styled-components는 기본적으로 **props 값에 따라 CSS를 만들어서 `<style>`에 주입**한다.
즉, `transform: translateX(-123px)`, `transform: translateX(-124px)` 같은 값들이 계속 달라지면, 내부적으로 “다른 스타일”로 간주돼 클래스를 계속 만든다.

슬라이더처럼 프레임 단위로 변하는 값(`transform`, `left`, `top` 등)을 이런 방식으로 다루면:

* 스타일 클래스가 계속 늘어난다
* DevTools에서 스타일 추적이 지저분해진다
* 메모리 사용량이 늘어날 수 있다
* 렌더링/스타일 계산 비용이 커질 수 있다

여기서 방향을 바꿨다.

**“드래그 중 고빈도 업데이트는 state/props가 아니라 ref + DOM 스타일로 처리하자.”**


## 해결 전략: 드래그 중에는 ref로만 움직이고, state는 결과만 반영

해결 방식은 크게 두 레벨이 있다.

### 레벨 1: 클래스 생성만 막기 (attrs / inline style)

경고에서 직접 권장하는 방식이다. `transform`을 CSS 템플릿에서 만들지 말고, style로 넣는다.

```jsx
const SliderList = styled.div`
  transition: transform 0.3s ease;
`;

<SliderList style={{ transform: `translateX(-${offset}px)` }} />
```

이러면 **클래스는 고정**되고, 바뀌는 건 인라인 스타일뿐이라 “클래스 폭증” 문제는 사라진다.

다만 이 구조는 드래그 중에도 `setOffset`을 계속 치면 **리렌더가 계속 발생**한다.
슬라이더/드래그 같은 UI에서는 이 부분도 같이 줄이고 싶었다.

### 레벨 2: 리렌더까지 줄이기 (ref + DOM 직접 조작)

드래그 중엔 아예 state를 건드리지 않고, **ref로 값만 업데이트 + DOM 스타일만 갱신**한다.
드래그가 끝났을 때만 state를 한 번 업데이트해서 버튼 활성화 같은 UI 상태에만 쓰는 방식이다.

## useDraggableSlider 훅 구조

### 1) 뷰포트와 리스트 ref

```jsx
const viewportRef = useRef(null);
const listRef = useRef(null);
```

* `viewportRef`: 사용자가 실제로 보는 영역(마스크)
* `listRef`: 슬라이드 아이템 전체를 감싸는 요소


### 2) 오프셋은 ref로, UI용 상태는 state로 분리

```jsx
const offsetRef = useRef(0);       // 드래그 중 계속 변함 (고빈도)
const [offsetState, setOffsetState] = useState(0); // 버튼/UI 계산용 (저빈도)
```

* `offsetRef.current`는 드래그 중 계속 바뀌어도 리렌더가 없다
* `offsetState`는 드래그 종료/버튼 클릭 같은 “결과 시점”에만 업데이트한다


### 3) transform은 DOM에 직접 적용

```jsx
const applyTransform = useCallback((withTransition) => {
  if (!listRef.current) return;

  listRef.current.style.transition = withTransition
    ? "transform 0.3s ease"
    : "none";

  listRef.current.style.transform = `translateX(-${offsetRef.current}px)`;
}, []);
```

중요한 포인트는 이거다.

* styled-components에 props로 offset을 넘기지 않는다
* `style.transform`만 바꾼다
* 그래서 클래스는 항상 동일하게 유지된다


### 4) 드래그 로직: 드래그 중엔 state 업데이트 금지

```jsx
const startDrag = useCallback((clientX) => {
  isDraggingRef.current = true;
  startXRef.current = clientX;
  startOffsetRef.current = offsetRef.current;
}, []);

const moveDrag = useCallback((clientX) => {
  if (!isDraggingRef.current) return;

  const deltaX = clientX - startXRef.current;
  const nextOffset = clampOffset(startOffsetRef.current - deltaX);

  offsetRef.current = nextOffset;
  applyTransform(false); // 즉시 반응(transition 없음)
}, [applyTransform, clampOffset]);

const endDrag = useCallback(() => {
  if (!isDraggingRef.current) return;

  isDraggingRef.current = false;
  setOffsetState(offsetRef.current); // 여기서만 state 업데이트
}, []);
```

드래그 중엔 `offsetRef.current`만 갱신하고 DOM transform만 바꾼다.
`setOffsetState`는 드래그가 끝날 때 딱 한 번만 호출한다.


### 5) 버튼 이동은 transition을 켜고 state도 갱신

```jsx
const handlePrev = useCallback(() => {
  const next = clampOffset(offsetRef.current - sizes.viewportWidth);
  offsetRef.current = next;

  setOffsetState(next);
  applyTransform(true); // 버튼 이동은 transition 켬
}, [applyTransform, clampOffset, sizes.viewportWidth]);
```

버튼 이동은 “자연스러운 애니메이션”이 중요해서 transition을 켠다.
이때도 기준은 `offsetRef.current`다.

버튼 활성화는 `offsetState`로 계산한다.

```jsx
const hasPrev = offsetState > 0;
const hasNext = offsetState < sizes.maxOffset;
```

## 추가로 같이 챙긴 것: transient props 사용

처음 코드처럼 `<SliderList offset={offset} />`를 쓰면, `offset`이 DOM 속성으로 내려가서 경고가 뜰 수 있다.
styled-components를 쓰면 보통 transient props(`$offset`)로 피한다.

```jsx
<SliderList $offset={offset} />

const SliderList = styled.div`
  transform: translateX(-${(props) => props.$offset}px);
`;
```

이번 글의 핵심 해결은 “드래그 중엔 props 자체를 안 쓰는 구조”였지만, props를 써야 할 상황이면 이 습관도 중요하다.


## 정리
* styled-components가 **props 기반 스타일을 어떻게 클래스화하는지** 이해했다
* 드래그처럼 고빈도 업데이트는 **state보다 ref + DOM 조작**이 더 맞는 경우가 많다는 걸 체감했다
* 애니메이션/이동이 항상 “React state 중심”일 필요는 없다는 기준이 생겼다
* 슬라이더 로직이 훅으로 정리되면서 재사용성과 가독성이 좋아졌다

드래그 위치를 state로 관리하던 방식을 ref 기반으로 바꾸고, transform을 빠르게 갱신하는 쪽으로 설계하니 경고도 사라지고 동작도 더 안정적이었다.
