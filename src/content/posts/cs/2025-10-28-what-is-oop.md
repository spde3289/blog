---
title: OOP(Object-Oriented Programming, 객체 지향 프로그래밍) 이란?
tags: ["OOP", "객체지향", "설계", "리팩토링", "React"]
date: "2025.10.28"
---

스프린트 미션 1~4를 React로 마이그레이션한 뒤 멘토님께 코드 리뷰를 받았다.

![image.png](https://cdn.jsdelivr.net/gh/spde3289/blog-assets@main/content/post/2025-10-28-what-is-oop/image.png)

피드백 요지는 “지금 구조에서 객체(스키마)가 너무 많은 책임을 가진다”에 가까웠고, 멘토링 시간에 추가로 아래 키워드를 같이 던져주셨다.

- OOP(객체 지향 프로그래밍)
- 3-Layers 아키텍처
- Presentational 컴포넌트 / Container 컴포넌트

오늘은 그중에서 OOP만 먼저 정리해봤다.

## 절차 지향 프로그래밍

절차 지향 프로그래밍은 말 그대로 **‘순서대로 실행되는 절차’**를 중심으로 프로그램을 짜는 방식이다.  
무엇을 **어떤 순서로** 실행해야 하는지가 핵심이다.

예를 들어 “컵에 물을 따라 마시는 프로그램”을 만든다고 가정해보자.

> 컵을 고른다 → 물을 고른다 → 물을 따른다 → 마신다

```jsx
// 절차 지향 방식
function pourWater() {
  console.log("물을 따른다");
}

function drinkWater() {
  console.log("물을 마신다");
}

// 순서대로 실행
pourWater();
drinkWater();
```

레시피처럼 단계를 나열해서 “흐름”으로 프로그램을 만든다.

## 객체 지향 프로그래밍

객체 지향 프로그래밍(OOP)은 프로그램을 **여러 객체(Object)**로 나누고, 객체들이 서로 **협력**해서 동작하게 만드는 방식이다.
현실 세계를 코드로 표현한다고 설명하는 경우가 많은데, 핵심은 “역할과 책임을 객체로 쪼개는 관점”에 가깝다고 느꼈다.

같은 “컵에 물을 따라 마신다”를 객체 관점으로 보면, “컵”이 상태를 가지고 행동을 가진다.

```jsx
// 객체 지향 방식
class Cup {
  constructor() {
    this.isFull = false;
  }

  fill() {
    this.isFull = true;
    console.log("컵에 물을 따랐다");
  }

  drink() {
    if (this.isFull) {
      console.log("물을 마셨다");
      this.isFull = false;
    } else {
      console.log("컵이 비어있다!");
    }
  }
}

const myCup = new Cup();
myCup.fill();
myCup.drink();
```

여기서 중요한 건 “컵이 물을 담을 수 있다 / 비어있다” 같은 상태와, “따르기 / 마시기” 같은 행동이 **같은 경계 안에** 있다는 점이다.

> 참고: JavaScript는 원래 프로토타입 기반이고 `class`는 문법 설탕(syntax sugar)이라서, OOP를 “클래스 문법”으로만 이해하면 오히려 흐려질 수 있다. 나는 일단 “책임 분리” 관점으로 보는 게 더 도움 됐다.

## OOP의 핵심 4가지 특징

객체 지향 프로그래밍을 설명할 때 자주 나오는 네 가지 개념이다.

### 캡슐화(Encapsulation)

데이터(속성)와 기능(메서드)을 하나로 묶고, 외부에서 직접 건드리지 않게 보호하는 개념이다.

자동차를 운전할 때 엔진 내부가 어떻게 동작하는지 몰라도 된다.
필요한 인터페이스(핸들, 페달)만 노출하고 내부는 숨긴다.

### 추상화(Abstraction)

복잡한 것들 중에서 **필요한 것만 남기고 단순하게 표현**하는 개념이다.

예를 들어 “사람” 객체를 만든다고 할 때, 이름/나이/직업은 필요할 수 있지만 DNA 정보는 대부분의 프로그램에서 불필요하다.
핵심만 남기고 나머지는 버린다.

### 상속(Inheritance)

이미 만들어진 객체(클래스)의 기능을 다른 객체가 물려받아 재사용하는 개념이다.

예를 들어 “동물”이 공통 기능(먹기, 자기)을 제공하고, 강아지/고양이는 각자 행동(짖기/야옹)을 추가하는 식이다.

다만 상속은 결합도를 올리는 경우도 있어서, 무조건 좋은 도구라고 보긴 어렵다. (이건 OOP 자체보다 설계 선택의 문제다.)

### 다형성(Polymorphism)

같은 이름의 메서드가 상황에 따라 다르게 동작하는 개념이다.

예를 들어 `speak()`라는 메서드가 있을 때,
강아지는 “멍멍”, 고양이는 “야옹”처럼 같은 인터페이스를 각자 다르게 구현할 수 있다.

## 내가 만들었던 스키마를 다시 보면서 든 생각

마이그레이션 과정에서 아래 같은 스키마를 만들었고, 이 객체를 `SchemaForm` 컴포넌트에 넘겨서 폼 UI를 생성하도록 구현했었다.

```ts
type FIELDS = {
  index: number; // 각각의 fieldset을 구분하는 index
  rules: {
    element: string; // 생성할 HTML 태그
    isVisibility?: boolean; // 비밀번호 숨김/보임 버튼 여부
    ContainerAttribute?: {}; // 비밀번호 숨김/보임 버튼 컨테이너 속성
    label?: {
      contents: string; // label 텍스트
    };
    attribute: {}; // 필드 속성 id값은 필수
    checkValue: (
      value,      // 현재 필드의 입력 값
      allValues   // 전체 필드의 입력값
    ) => { isValid: boolean; message: string };
  }[];
}[];
```

OOP를 “역할과 책임 분리” 관점으로 다시 보니까, 멘토님이 왜 “이 객체가 하는 일이 너무 많다”고 했는지 이해가 됐다.

* `rules.element` 때문에 렌더링 로직이 특정 태그/구조에 강하게 묶인다.
* `isVisibility`는 비밀번호에만 해당되는 값이라서 공통 스키마에 섞여 있다.
* `ContainerAttribute`는 `isVisibility`에 사실상 종속적이다.
* 유효성 검사 함수(`checkValue`)까지 섞여서 **UI 정의 + 로직 + 예외 케이스**가 한 객체에 붙어 있다.

즉, 스키마가 “폼 정의”를 넘어 “렌더링 방식”과 “검증 로직”까지 다 끌어안는 구조였다.

그래서 나는 다음처럼 “UI 정의”와 “검증 로직”을 먼저 분리하는 게 낫겠다고 생각했다.

```ts
const FIELD_DEFS = [
  // UI 관련된 정보를 담는 데이터
  {
    id: "userEmail",
    label: "이메일",
    widget: "TextInput",
    props: { placeholder: "이메일을 입력해주세요" },
  },
  {
    id: "userPassword",
    label: "비밀번호",
    widget: "PasswordInput",
    props: { placeholder: "비밀번호를 입력해주세요" },
  },
];

const validators = {
  // 유효한 데이터인지 검증하는 로직
  userEmail: (v: string) => {
    if (!v) return "이메일을 입력해주세요.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "잘못된 이메일 형식입니다.";
    return "";
  },
  userPassword: (v: string) => {
    if (!v) return "비밀번호를 입력해주세요.";
    if (v.length < 12) return "비밀번호를 12자 이상 입력해주세요.";
    return "";
  },
};
```

이렇게 나누면 적어도 “스키마가 렌더링과 검증까지 다 책임지는 구조”에서 벗어나고,
각 덩어리의 변경 이유가 분리된다.

* UI가 바뀌면 `FIELD_DEFS`만 바뀐다.
* 검증 규칙이 바뀌면 `validators`만 바뀐다.

이번 글을 쓰면서 느낀 건, OOP를 “클래스/상속 문법”으로만 보면 감이 잘 안 오고,
내 경우에는 “한 덩어리가 너무 많은 책임을 갖고 있나?”로 보는 게 바로 리팩토링 힌트로 이어졌다.

## 참고자료

* [MDN - 객체 지향 프로그래밍](https://developer.mozilla.org/ko/docs/Learn_web_development/Extensions/Advanced_JavaScript_objects/Object-oriented_programming)
* [모두의 연구소 - 객체 지향 입문자 가이드](https://modulabs.co.kr/blog/oop-beginner-guide)
* [velog - OOP(Object-Oriented Programming, 객체 지향 프로그래밍) 이란?](https://velog.io/@hkoo9329/OOPObject-Oriented-Programming-%EA%B0%9D%EC%B2%B4-%EC%A7%80%ED%96%A5-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D-%EC%9D%B4%EB%9E%80)
