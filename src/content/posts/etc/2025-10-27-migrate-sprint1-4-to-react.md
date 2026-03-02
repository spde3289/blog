---
title: 데이터 주도 구조로 페이지를 단순화한 React 마이그레이션
series: 스프린트 부트캠프
tags: ["React", "마이그레이션", "리팩토링", "폼 설계", "아키텍처"]
date: "2025.10.27"
---

## 들어가기에 앞서

스프린트 부트캠프에서 React 강의가 시작되면서, 앞으로 진행하는 미션도 React로 구현해야 했다.

기존 Sprint 1~4 결과물을 그대로 옮기는 수준에서 끝내고 싶진 않았다. 같은 기능을 만들더라도 **확장성과 유지보수성**이 좋아지는 방향으로 프로젝트 구조를 다시 잡는 걸 목표로 했다.

## 프로젝트 구조

### 사용 기술

- **프론트엔드**: React, JavaScript
- **스타일링**: styled-components
- **라우팅**: React Router

### 폴더 구조

```text
.
├── mission1~4                # 스프린트 미션 1 ~ 4
├── src/
│   ├── app/                  # 전역 설정, 라우팅, 상태 관리 등 (App, Router 설정)
│   ├── assets/               # 이미지, 폰트, 아이콘 같은 정적 리소스
│   ├── components/           # 공용 컴포넌트 (Button, Modal, Header 등)
│   ├── hooks/                # 커스텀 훅 (재사용 가능한 공통 로직)
│   ├── pages/                # 페이지 단위 컴포넌트 (라우팅 기준 화면)
│   ├── styles/               # 전역 스타일, 테마 파일
│   ├── main.jsx              # 진입점 (ReactDOM.createRoot, App 렌더링)
│   └── utils.js              # 유틸 함수 모음
│
├── .gitignore
├── eslint.config.js
├── index.html
├── jsconfig.json
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js
```

구조를 나눈 기준은 단순했다.

* **pages**는 화면(라우팅) 단위로 책임을 갖는다.
* **components**는 페이지에 종속되지 않는 재사용 UI를 모은다.
* **hooks / utils**는 공통 로직을 페이지/컴포넌트에서 분리한다.
* 전역 설정(라우터/레이아웃 성격)은 **app**에 둔다.

## 스키마 기반 폼(Schema Form) 컴포넌트

React로 옮기면서 가장 먼저 손댄 건 폼 생성 로직이었다.

로그인/회원가입 페이지를 보면 UI도 비슷하고, 인풋 검증 로직도 거의 같았다. 페이지마다 “인풋 + 에러 상태 + 검증 함수”를 반복해서 들고 있는 구조는, 페이지가 늘어날수록 유지보수 비용이 바로 올라간다.

그래서 “폼을 코드로 짜는 방식” 대신, **스키마(객체)로 폼을 만들도록** 바꿨다.

### SchemaForm의 목적

* 스키마를 넘기면 필드가 자동 생성된다.
* 스키마 규칙에 따라 검증이 수행된다.
* 필드가 늘어도 “UI 코드 추가”가 아니라 “스키마 확장”으로 끝난다.

### SchemaForm 구조

```jsx
import { useCallback, useMemo, useState } from "react";
import InputContainer from "./InputContainer";
import * as S from "./SchemaForm.styles";
import VisibilityInputContainer from "./VisibilityInputContainer";

// 초기 값 설정 함수
const getInitialState = (fields) => {
  const initialState = {};
  fields.forEach((fieldGroup) => {
    fieldGroup.rules.forEach((rule) => {
      initialState[rule.attribute.id] = "";
    });
  });
  return initialState;
};

const SchemaForm = ({ fields, onSubmit, className, submitText }) => {
  const [formValues, setFormValues] = useState(() => getInitialState(fields));

  const handleUpdateCentralState = useCallback((name, newValue) => {
    setFormValues((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  }, []);

  const { isFormValid, errorMessages } = useMemo(() => {
    let isValid = true;
    const errors = {};

    fields.forEach((fieldGroup) => {
      fieldGroup.rules.forEach((rule) => {
        const fieldId = rule.attribute.id;
        const value = formValues[fieldId] || "";

        const result = rule.checkValue(value, formValues);

        if (!result.isValid) {
          isValid = false;
          errors[fieldId] = result.message;
        } else {
          errors[fieldId] = "";
        }
      });
    });

    return { isFormValid: isValid, errorMessages: errors };
  }, [formValues, fields]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isFormValid && onSubmit) {
      onSubmit(formValues);
      return;
    }

    console.error("제출 실패: 폼이 유효하지 않습니다.");
  };

  const renderInputComponent = (rule, containerProps) => {
    const elementKey = rule.attribute.id;

    if (rule.isVisibility) {
      return <VisibilityInputContainer key={elementKey} {...containerProps} />;
    }

    switch (rule.element) {
      case "input": {
        const inputType = rule.attribute.type;

        if (
          inputType === "email" ||
          inputType === "text" ||
          inputType === "password"
        ) {
          return <InputContainer key={elementKey} {...containerProps} />;
        }

        return null;
      }

      default:
        return null;
    }
  };

  return (
    <S.Form className={className} onSubmit={handleSubmit}>
      {fields.map((field) => (
        <S.Fieldset {...field.attribute} key={field.index}>
          {field.rules.map((rule) => {
            const containerProps = {
              rule,
              formValues,
              errorMessages,
              handleUpdateCentralState,
            };

            return renderInputComponent(rule, containerProps);
          })}
        </S.Fieldset>
      ))}

      <S.SubmitButton type="submit" disabled={!isFormValid}>
        {submitText}
      </S.SubmitButton>
    </S.Form>
  );
};

export default SchemaForm;
```

### Props

| 이름           | 타입                                      | 필수 | 설명                                      |
| ------------ | --------------------------------------- | -- | --------------------------------------- |
| `fields`     | `FieldGroup[]`                          | ✅  | `fieldset` 단위 그룹. 각 그룹은 `rules`를 가진다.   |
| `onSubmit`   | `(values: Record<string, any>) => void` |    | submit 시점에 호출. 검증을 통과한 formValues를 넘긴다. |
| `className`  | `string`                                |    | styled-components 스타일 확장용               |
| `submitText` | `string`                                |    | 제출 버튼 텍스트                               |

### Schema 타입 예시

```ts
type FieldGroup = {
  index: number;
  attribute?: Record<string, any>; // fieldset 속성
  rules: {
    element: string;
    isVisibility?: boolean;
    label?: { contents: string };
    attribute: { id: string; type?: string; [key: string]: any };
    checkValue: (
      value: string,
      allValues: Record<string, string>
    ) => { isValid: boolean; message: string };
  }[];
};

type Fields = FieldGroup[];
```

이 구조에서 핵심은 두 가지였다.

* **중앙 상태(formValues) 하나로 모든 필드를 관리**한다.
* `checkValue(value, allValues)` 형태로 만들어서, “비밀번호 확인” 같은 **교차 검증**도 스키마에서 처리한다.

새로운 인풋이 필요해지면, 페이지 코드를 뜯기보다 `rules`를 추가하는 쪽이 훨씬 덜 피곤했다. 렌더링 로직도 `element`와 `attribute.type` 조합으로 분기하게 만들어서, 케이스를 늘리기가 쉬웠다.

## 데이터 주도적 구조

페이지 컴포넌트가 “데이터를 정의하고, 하위 컴포넌트에 전달하는 역할”만 하도록 바꾼 부분도 있다.

```jsx
const HOME_CONTENT = {
  heroTop: {
    image: part1Img,
    imageAlt: "언덕위 판다",
    children: (
      <S.Wrap>
        <S.HeroTopTitle>일상의 모든 물건을 거래해보세요</S.HeroTopTitle>
        <S.Cta to="/items">구경하러 가기</S.Cta>
      </S.Wrap>
    ),
  },
  features: [
    {
      key: "p2",
      highlight: "Hot item",
      title: "인기 상품을 확인해 보세요",
      description: (
        <>
          가장 HOT한 중고거래 물품을 <br /> 판다 마켓에서 확인해 보세요
        </>
      ),
      image: part2Img,
      imageAlt: "판다 이미지 1",
    },
    {
      key: "p3",
      highlight: "Search",
      title: "구매를 원하는 상품을 검색하세요",
      description: (
        <>
          구매하고 싶은 물품은 검색해서 <br /> 쉽게 찾아보세요
        </>
      ),
      image: part3Img,
      imageAlt: "판다 이미지 2",
      textFirst: true,
    },
    {
      key: "p4",
      highlight: "Register",
      title: "판매를 원하는 상품을 등록하세요",
      description: (
        <>
          어떤 물건이든 판매하고 싶은 상품을
          <br />
          쉽게 등록하세요
        </>
      ),
      image: part4Img,
      imageAlt: "판다 이미지 3",
    },
  ],
  heroBottom: {
    image: part5Img,
    imageAlt: "언덕위 판다",
    children: (
      <S.HeroBottomTitle>
        믿을 수 있는 <br />
        판다마켓 중고 거래
      </S.HeroBottomTitle>
    ),
  },
};

const HomePage = () => {
  const { heroTop, features, heroBottom } = HOME_CONTENT;

  return (
    <main>
      <HeroSection image={heroTop.image} imageAlt={heroTop.imageAlt}>
        {heroTop.children}
      </HeroSection>

      <S.FeatureWrap>
        {features.map((sec) => (
          <FeatureSection
            key={sec.key}
            highlight={sec.highlight}
            title={sec.title}
            description={sec.description}
            image={sec.image}
            imageAlt={sec.imageAlt}
            textFirst={sec.textFirst}
          />
        ))}
      </S.FeatureWrap>

      <HeroSection
        variant="bottom"
        image={heroBottom.image}
        imageAlt={heroBottom.imageAlt}
      >
        {heroBottom.children}
      </HeroSection>
    </main>
  );
};
```

이 방식의 장점은 명확했다.

* 페이지 컴포넌트는 “조립/오케스트레이션”만 한다.
* 콘텐츠를 바꾸는 작업이 “컴포넌트 수정”이 아니라 “데이터 수정”에 가깝다.
* 섹션이 늘어나도 패턴이 동일해서 구조가 쉽게 무너지지 않는다.

다만 `children`에 JSX를 직접 넣는 형태라서, “순수 데이터”라고 보긴 어렵다. 대신 화면 구성 흐름을 유지하면서도, 페이지 코드의 복잡도를 줄이는 목적은 달성했다.

## 마치며

React로 옮기는 작업 자체는 단순 복사에 가깝다. 이번 마이그레이션에서 의미 있었던 건 “같은 기능을 더 덜 반복하게 만드는 구조”를 만들었다는 점이었다.

특히 폼은 페이지가 늘어날수록 반복이 그대로 비용으로 쌓이기 때문에, 초반에 스키마 기반으로 틀을 잡아둔 게 이후 작업을 훨씬 편하게 만들었다.
