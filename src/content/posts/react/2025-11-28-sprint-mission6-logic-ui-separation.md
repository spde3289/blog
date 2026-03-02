---
title: 스프린트 미션 6 로직/UI 분리로 얻은 것들
series: 스프린트 부트캠프
tags: ["Sprint", "React", "useReducer", "Form", "Refactoring", "컴포넌트 설계", "styled-components"]
date: "2025.11.28"
---

이전에 **“추상화와 유연성은 양립할 수 있는가?”** 라는 글을 쓰면서 이런 질문을 던졌었다.

- 왜 필드 하나 바꾸는데 파일을 세 군데나 고쳐야 하지?
- 분리했다고 생각했는데 왜 구조가 단단하지 않을까?
- 데이터를 기준으로 설계한다고 했는데, 오히려 의존성이 꼬여버린 건 아닐까?
- 추상화와 유연성은 같이 가져갈 수 없는 건가?

이번 스프린트 미션 6에서는 로그인/회원가입 화면을 다시 손보면서, 위 질문들에 대한 내 기준을 코드에 녹여봤다.

## 로그인 페이지: 로직과 UI 나누기

폴더 구조를 손본 뒤에는 로그인/회원가입 페이지 로직을 다시 들여다봤다.  
이전에는 input 상태 관리, 검증 로직, 에러 메시지, 네비게이션까지 한 컴포넌트 안에서 뒤섞여 있었다.

이번에는 `useReducer`를 사용해서 **“폼 상태 관리”** 와 **“UI 렌더링”** 을 최대한 분리하려고 했다.

## 폼 상태 관리: useReducer로 상태 흐름 고정하기

로그인 폼의 상태는 아래처럼 정의했다.

```jsx
const initialFormState = {
  userEmail: "",
  userPassword: "",
  touched: {
    userEmail: false,
    userPassword: false,
  },
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_FIELD":
      return {
        ...state,
        [action.name]: action.value,
      };
    case "BLUR":
      return {
        ...state,
        touched: {
          ...state.touched,
          [action.name]: true,
        },
      };
    case "RESET":
      return initialFormState;
    default:
      return state;
  }
};
```

* `userEmail`, `userPassword`는 실제 입력값이다.
* `touched`는 각 필드가 blur 되었는지 여부다. (에러 메시지를 언제 보여줄지 결정하는 기준이다.)

이렇게 만들어두면 컴포넌트에서는 `dispatch`만 던지면 된다.

```jsx
const [formState, dispatch] = useReducer(formReducer, initialFormState);
const { userEmail, userPassword, touched } = formState;

const handleChange = (name) => (e) => {
  dispatch({
    type: "CHANGE_FIELD",
    name,
    value: e.target.value,
  });
};

const handleBlur = (name) => () => {
  dispatch({ type: "BLUR", name });
};
```

필드가 늘어나도 액션 타입(`CHANGE_FIELD`, `BLUR`)만 유지하면 형태가 크게 흔들리지 않는다.
“상태 흐름”을 한 곳에 묶었다는 점이 가장 컸다.

## 검증 로직 분리: getEmailError, getPasswordError

검증도 UI에서 떼어내서 함수로 분리했다.

```jsx
import { hasMinLength } from "@/utils/common";
import { isValidEmail } from "@/utils/string";

const getEmailError = (value, touched) => {
  if (!touched) return "";

  if (value.trim() === "") return "이메일을 입력해주세요.";
  if (!isValidEmail(value)) return "잘못된 이메일 형식입니다.";

  return "";
};

const getPasswordError = (value, touched) => {
  const length = 12;

  if (!touched) return "";

  if (value.trim() === "") return "비밀번호를 입력해주세요.";
  if (!hasMinLength(value, length))
    return `비밀번호를 ${length}자 이상 입력해주세요.`;

  return "";
};
```

이렇게 해두면 로그인 컴포넌트는 “에러 메시지를 어떻게 만들어내는지”보다 “지금 유효한지”에 집중할 수 있다.

```jsx
const emailError = getEmailError(userEmail, touched.userEmail);
const passwordError = getPasswordError(userPassword, touched.userPassword);

const isValid =
  userEmail.trim() !== "" &&
  userPassword.trim() !== "" &&
  !emailError &&
  !passwordError;
```

`isValid`를 기준으로 버튼 disabled도 바로 제어했다.

## 로그인 페이지: 최종 형태

아래는 위 상태 관리 + 검증 로직을 적용한 로그인 페이지 코드다.

```jsx
import { PATH } from "@/app/router";
import lgGoogle from "@/assets/imgs/ic_google.png";
import lgKakao from "@/assets/imgs/ic_kakao.png";
import lgLogo from "@/assets/imgs/lgLogo.png";
import BlueButton from "@/components/common/BlueButton";
import Input from "@/components/common/Input";
import PassWordInput from "@/components/common/PassWordInput";
import { hasMinLength } from "@/utils/common";
import { isValidEmail } from "@/utils/string";
import { useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as S from "./LoginPage.styles";

const initialFormState = {
  userEmail: "",
  userPassword: "",
  touched: {
    userEmail: false,
    userPassword: false,
  },
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_FIELD":
      return {
        ...state,
        [action.name]: action.value,
      };
    case "BLUR":
      return {
        ...state,
        touched: {
          ...state.touched,
          [action.name]: true,
        },
      };
    case "RESET":
      return initialFormState;
    default:
      return state;
  }
};

const getEmailError = (value, touched) => {
  if (!touched) return "";
  if (value.trim() === "") return "이메일을 입력해주세요.";
  if (!isValidEmail(value)) return "잘못된 이메일 형식입니다.";
  return "";
};

const getPasswordError = (value, touched) => {
  const length = 12;
  if (!touched) return "";
  if (value.trim() === "") return "비밀번호를 입력해주세요.";
  if (!hasMinLength(value, length))
    return `비밀번호를 ${length}자 이상 입력해주세요.`;
  return "";
};

const LoginPage = () => {
  const navigate = useNavigate();
  const [formState, dispatch] = useReducer(formReducer, initialFormState);
  const { userEmail, userPassword, touched } = formState;

  const emailError = getEmailError(userEmail, touched.userEmail);
  const passwordError = getPasswordError(userPassword, touched.userPassword);

  const isValid =
    userEmail.trim() !== "" &&
    userPassword.trim() !== "" &&
    !emailError &&
    !passwordError;

  const handleChange = (name) => (e) => {
    dispatch({
      type: "CHANGE_FIELD",
      name,
      value: e.target.value,
    });
  };

  const handleBlur = (name) => () => {
    dispatch({ type: "BLUR", name });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;

    console.log("제출 값:", formState);
    navigate(PATH.ITEMS);
    dispatch({ type: "RESET" });
  };

  return (
    <S.Main>
      <S.Section>
        <S.LogoTitle>
          <Link to={PATH.INDEX}>
            <img src={lgLogo} alt="판다마켓 로고" />
          </Link>
        </S.LogoTitle>

        <S.Form onSubmit={handleSubmit}>
          <Input
            value={userEmail}
            label="이메일"
            id="userEmail"
            type="email"
            placeholder="이메일을 입력해주세요"
            error={emailError}
            onChange={handleChange("userEmail")}
            onBlur={handleBlur("userEmail")}
          />
          <PassWordInput
            value={userPassword}
            label="비밀번호"
            id="userPassword"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            error={passwordError}
            onChange={handleChange("userPassword")}
            onBlur={handleBlur("userPassword")}
          />
          <BlueButton size="lg" radius="max" type="submit" disabled={!isValid}>
            로그인
          </BlueButton>
        </S.Form>

        <S.EaseLoginContainer>
          간편 로그인 하기
          <ul>
            <S.EaseLoginItem>
              <a href="https://www.google.com/" target="_blank" rel="noreferrer">
                <img src={lgGoogle} alt="구글 아이콘" />
              </a>
            </S.EaseLoginItem>
            <S.EaseLoginItem>
              <a
                href="https://www.kakaocorp.com/page/"
                target="_blank"
                rel="noreferrer"
              >
                <img src={lgKakao} alt="카카오 아이콘" />
              </a>
            </S.EaseLoginItem>
          </ul>
        </S.EaseLoginContainer>

        <S.ToBottom>
          판다마켓이 처음이신가요?
          <Link to={PATH.SIGNUP}>회원가입</Link>
        </S.ToBottom>
      </S.Section>
    </S.Main>
  );
};

export default LoginPage;
```

이제 이 컴포넌트에서 내가 확인하는 포인트가 바뀌었다.

* 폼의 상태 흐름이 어떻게 흘러가는지
* 에러가 언제, 어떤 기준으로 생기는지
* submit 이후 어떤 동작을 하는지

Input의 모양, 버튼 스타일 같은 건 공통 컴포넌트에 있으니, 페이지에서는 “페이지가 해야 하는 일”에 더 집중할 수 있었다.

## 공통 컴포넌트: Input과 BlueButton

로그인/회원가입뿐 아니라 다른 페이지에서도 쓰이기 때문에 Input과 Button은 공통 컴포넌트로 분리했다.

### Input 컴포넌트

```jsx
import * as S from "./Input.styles";

const Input = ({
  value,
  label,
  type,
  error,
  placeholder,
  onChange,
  onBlur,
  onKeyDown,
  id,
}) => {
  return (
    <S.Wrapper>
      {label && <S.Label htmlFor={id}>{label}</S.Label>}
      <S.StyledInput
        value={value}
        id={id}
        type={type}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        placeholder={placeholder}
        aria-invalid={!!error}
        autoComplete={id}
      />
      {error && <S.ErrorText>{error}</S.ErrorText>}
    </S.Wrapper>
  );
};

export default Input;
```

* `label`이 있을 때만 `<label>`을 렌더링했다.
* 에러 유무에 따라 `aria-invalid`를 설정했다.
* `autoComplete`는 `id`와 맞춰 브라우저 자동완성도 고려했다.

Input은 “어떻게 보여줄지”만 책임지고, 에러 메시지 내용이나 값 검증은 상위에서 처리했다.

### BlueButton: 스타일 중복 줄이기

버튼은 스타일 변형이 많다 보니, 스타일 파일 여러 개에서 유사한 코드가 반복되고 있었다.
그래서 `resolveResponsiveValue`라는 헬퍼를 만들고, 사이즈/폰트/반경을 맵 기반으로 관리했다.

```jsx
import * as S from "./BlueButton.styles";

const BlueButton = ({
  children,
  disabled,
  type,
  onClick,
  fontSize = "md",
  size = "md",
  radius = "sm",
  className,
}) => {
  return (
    <S.BlueButton
      size={size}
      radius={radius}
      fontSize={fontSize}
      type={type}
      disabled={disabled}
      className={className}
      onClick={onClick}
    >
      {children}
    </S.BlueButton>
  );
};

export default BlueButton;
```

`BlueButton.styles.js`는 아래처럼 작성했다.
(참고: px 변환은 브라우저 기본값 **1rem = 16px** 기준으로 계산했다.)

```jsx
import resolveResponsiveValue from "@/lib/resolveResponsiveValue";
import styled, { css } from "styled-components";

const BUTTON_SIZE = {
  sm: css`
    height: 42px;
  `,
  md: css`
    height: 48px;
  `,
  lg: css`
    height: 56px;
  `,
};

const FONT_SIZE = {
  xsm: css`
    font-size: 22.4px; /* 1.4rem */
  `,
  sm: css`
    font-size: 25.6px; /* 1.6rem */
  `,
  md: css`
    font-size: 28.8px; /* 1.8rem */
  `,
  lg: css`
    font-size: 32px; /* 2rem */
  `,
};

const RADIUS = {
  sm: css`
    border-radius: 8px;
  `,
  max: css`
    border-radius: 999px;
  `,
};

export const BlueButton = styled.button`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  background-color: var(--blue100);
  color: var(--gray100);

  ${({ size }) => resolveResponsiveValue(BUTTON_SIZE, size)}
  ${({ fontSize }) => resolveResponsiveValue(FONT_SIZE, fontSize)}
  ${({ radius }) => RADIUS[radius]}

  &:hover {
    background-color: var(--blue200);
  }

  &:disabled {
    background-color: var(--gray400);
  }
`;
```

헬퍼 함수는 아래다.

```jsx
import { media } from "@/styles/media";
import { css } from "styled-components";

const resolveResponsiveValue = (map, value) => {
  // 문자열 형태 ("md")일 경우
  if (!value || typeof value === "string") {
    return map[value];
  }

  // 객체 형태 ({ mobile, tablet, desktop })일 경우
  const { mobile, tablet, desktop } = value;

  return css`
    ${map[desktop]}

    ${tablet &&
    css`
      @media ${media.tablet} {
        ${map[tablet]}
      }
    `}

    ${mobile &&
    css`
      @media ${media.mobile} {
        ${map[mobile]}
      }
    `}
  `;
};

export default resolveResponsiveValue;
```

* `size="md"`처럼 문자열로 쓰면 단일 사이즈다.
* `size={{ mobile: "sm", tablet: "md", desktop: "lg" }}`처럼 객체로 넘기면 반응형이다.

이 패턴은 버튼뿐 아니라 다른 컴포넌트에도 그대로 재사용할 수 있어서 스타일 중복을 줄이는 데 도움이 됐다.

## 마치며

이전의 구조보다 지금의 구조가 더 좋아보인다는 강사님의 피드백을 받았다.

이번 미션 이후로 새로운 화면을 만들 때 “이건 로직인가, UI인가?”, “이건 이 페이지 전용인가, 공통이어야 하는가?”를 먼저 묻는 습관이 생겼다.