---
title: BFF를 적용한 메이플 헬퍼 API 요청 구조 리팩토링
series: 메이플 헬퍼
tags: ["BFF", "API Route", "Nexon Open API", "리팩토링", "에러 처리", "성능 측정"]
date: "2025.12.12"
---

메이플 헬퍼는 넥슨 오픈 API를 붙여서 데이터를 가져온다.  
처음에는 “API 키 숨기기”가 목표라서 Next.js API 라우터를 프록시처럼만 사용했는데, 개발이 진행될수록 스파게티 코드가 되어가는걸 느꼈다.

이번 리팩토링에서 방향성을 정리해봤다.

- **클라이언트가 오직 “내 서버(/api)”만 보게 만들기**
- 넥슨 API 응답을 **클라이언트에서 쓰기 좋은 형태로 서버에서 가공해서 내려주기**
- 결과적으로 API 라우터가 **프록시가 아니라 BFF(Backend For Frontend)** 역할을 하게 만들기

## 현재 구조

### 요청 흐름

`클라이언트 → API 라우터 → Nexon 오픈 API 서버`

넥슨 API 키를 브라우저로 노출하지 않기 위해 API 라우터를 사용했다.

실제 동작은 아래 흐름이었다.

1. 클라이언트가 원하는 데이터를 요청한다
2. API 라우터가 요청을 받아 넥슨 오픈 API 서버로 그대로 전달한다
3. API 라우터는 받은 응답을 가공 없이 클라이언트로 그대로 돌려준다
4. 클라이언트는 응답을 가공하고(필터링/스탯 변환 등) 화면에 뿌린다

### 이 흐름의 단점

- **API 요청 로직과 데이터 가공 로직이 클라이언트에 섞인다**
- 화면 기능이 늘어날수록 “데이터를 어디서 어떻게 손댔는지” 추적이 어렵다
- 넥슨 API 응답 구조에 클라이언트가 직접 의존한다 → 구조 변경에 취약하다
- 하나의 기능을 위해 여러개의 넥슨 API 엔드 포인트에 요청을 보내야한다.
  - ex) 캐릭터 리스트, 캐릭터 상세 정보, 캐릭터 스텟 정보, 캐릭터 스킬 정보 등...

---

## 리팩토링 목표: BFF로 역할 나누기

API 라우터에서 클라이언트가 원하는 형태로 데이터를 가공하도록 변경했다.

`클라이언트 → (BFF) API 라우터 → Nexon 오픈 API 서버`

### 클라이언트가 할 일

- 서버에서 내려준 데이터를 **추가 가공 없이** 사용한다.
- UI와 서비스 로직에만 집중한다

### API 라우터(BFF)가 할 일

넥슨 오픈 API에서 받은 데이터를 **클라이언트가 바로 쓸 수 있는 형태로 가공**한다.

- 예: 캐릭터 리스트를 가져온 뒤 `레벨/전투력 필터링`, `스탯 영문 매핑` 같은 로직을 서버에서 처리한다

이렇게 역할을 나눠 각기 다른 책임을 가지게 했다.

- 클라이언트는 UI에만 집중한다
- 서버는 데이터 조회 + 가공 책임을 가진다
- 넥슨 API의 변경이 생겨도 “서버만 고치면” 된다

## 에러 구조 통일

BFF로 바꾸면서 같이 잡고 싶었던 게 에러의 통일이었다.  
특히 넥슨 API 에러 / 내부 로직 에러 / 데이터 파싱 에러가 뒤섞이면 디버깅이 너무 힘들어졌다.

### 1) 넥슨 API 에러일 때

- 넥슨 API에서 에러 응답(400 + error.body)
- Axios → onError 실행
- `new ApiError({ message, status, type: 'NexonApiError', payload })` 후 `Promise.reject(...)`
- `getCharacterBasic`에서 `await` 시 ApiError가 터지고 위로 전파
- `fetchCharacterFullInfo`에서 `catch`로 ApiError를 다시 감싸 throw
- `Promise.allSettled` 결과는 `{ status: 'rejected', reason: ApiError 인스턴스 }`

이 흐름 덕분에 “일부 성공/일부 실패” 같은 케이스에서도 응답을 안정적으로 만들 수 있었다.

### 2) 서버 로직에서 에러가 날 때

- `throw new ApiError(...)`
- 최종 `catch`에서 공통 포맷으로 응답한다

### 3) 스탯 변환(파싱) 로직에서 에러가 날 때

매핑 누락이나 숫자 변환 실패 같은 로직에서 에러가 발생하면 추적하기 힘들겠단 생각이 들어 별도의 에러 처리를 해줬다.

```jsx
if (!key) {
  throw new ApiError({
    type: 'StatParseError',
    status: 500,
    message: `매핑되지 않은 스탯: ${stat.stat_name}`,
    payload: {
      reason: 'UNMAPPED_STAT',
      rawStatName: stat.stat_name,
      rawStatValue: stat.stat_value,
    },
  })
}

const value = Number(stat.stat_value)

if (Number.isNaN(value)) {
  throw new ApiError({
    type: 'StatParseError',
    status: 500,
    message: `stat_value 숫자 변환 실패`,
    payload: {
      reason: 'INVALID_STAT_VALUE',
      rawStatName: stat.stat_name,
      rawStatValue: stat.stat_value,
    },
  })
}
```

## API 라우터 엔드포인트

API 라우터의 엔드포인트 규칙은 REST의 규칙에 따라 설계했다.

* `/api/characters` → 캐릭터 리스트
* `/api/characters/{characterName}` → 단일 캐릭터

---

## `GET /api/characters`

**Headers**

* `x-user-api-key`: string (required) — 사용자의 API key

**Query**

* `minLevel`: number — 최소 레벨
* `minPower`: number — 최소 전투력

**Response**

```jsx
{
  success: {
    ocid: string;
    userInfo: CharacterBasicResponse;
    userStat: CharacterStats;
  }[],
  errors: {
    message: string
    status?: number
    type?: string
    payload?: {
      characterName: string
    }
  }[]
}
```

캐릭터 목록은 유저의 개인 API 키로 여러 캐릭터 데이터를 한 번에 받아오는 구조다.
근데 이 과정에서 **캐릭터 하나만 요청이 실패해도 전체를 실패 처리**해버리면, 사용자 입장에서는 불편함을 느끼게 된다고 생각했다.

그래서 응답을 성공/실패로 분리하는 방법을 선택했다.

* 성공한 캐릭터는 `success`
* 실패한 캐릭터만 `errors`

## `GET /api/characters/{characterName}`

**Path**
* `characterName`: string (required)

**Response**
```jsx
{
  ocid: string;
  userInfo: CharacterBasicResponse;
  userStat: CharacterStats;
}
```
## 성능 측정: “요청 → 화면 렌더” 기준으로 비교했다

좋은 구조로 변경! 하고 끝내기에는 아쉬워서 성능을 측정해보기로 했다.
요청을 보내고, 실제로 UI에 그려질 때까지를 기준으로 시간을 쟀다.

측정 지표는 3개로 나누고 10회 요청의 평균값을 구해봤다. 

* **network**: 요청 시작 → 응답 도착
* **render**: 응답 도착 → UI가 실제로 그려짐(페인트 이후)
* **e2e**: 요청 시작 → UI가 실제로 그려짐(전체 체감)

### 개선 전(기존 구조)

* **e2e 평균:** 1425.7ms
* **network 평균:** 1193.3ms
* **render 평균:** 232.4ms

=> 응답 기다리는 시간도 길었지만 클라이언트에서 가공/렌더가 섞여 있어서 **render도 꽤 컸다**.

### 개선 후(BFF 적용)

* **e2e 평균:** 655.2ms 
* **network 평균:** 545.3ms
* **render 평균:** 109.9ms

**클라이언트 render개선**
- 기존엔 클라이언트에서 데이터 가공/정렬/예외 흐름까지 같이 들고 있었는데 BFF로 변경 하면서 UI가 훨씬 가벼워졌다.

**전체 체감(e2e)이 개선**
- e2e 기준 1425.7ms → 655.2ms 절반이상 줄어들었다.

## 마치며 
이번에 API 요청 구조를 리팩토링 하면서 BFF라는 개념도 새로 알게 됐고,
클라이언트/서버가 각각 어떤 책임을 가져야 하는지도 다시 정리하게 됐다.

- BFF 적용
  - 클라이언트가 넥슨 API를 직접 알 필요 없게 만들고
  - 내 서버(/api)만 바라보는 구조로 전환했다.
- 역할 분리
  - 클라이언트: 화면 렌더링 + UX만 담당한다.
  - API 라우터(BFF): 넥슨 데이터 조회 + 필요한 형태로 가공해서 내려준다.
- 응답/에러 구조 표준화
  - ApiError 기반으로 에러 타입을 분리하고 공통 포맷으로 응답한다.
  - 넥슨 API 에러 / 내부 로직 에러 / 스탯 파싱 에러를 구분해서 디버깅이 훨씬 수월해졌다.
- 부분 실패 대응
  - 여러 캐릭터 요청 중 일부 실패해도 전체 실패 처리하지 않는다.
  - 성공은 success, 실패는 errors로 분리해서 UX를 유지했다.
- 성능 측정
  - 요청 → UI 렌더 기준으로 측정해서 개선 폭을 수치로 확인했다.
  - e2e/network/render 지표가 모두 개선되었다(글에서 정리한 평균값 기준).