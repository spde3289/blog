---
title: 인터페이스와 인터셉터를 이용한 공통된 에러, 헤더 URL 처리
tags: [frontEnd]
date: "2024.10.19"
---
메이플스토리 API를 활용한 웹 서비스 개발 중 API 키 노출 방지와 중복 코드 최소화를 위해 
Next.js API 라우트와 Axios 인터셉터를 결합한 경험을 공유합니다. 특히 TypeScript의 Generic을 
활용해 타입 안정성을 강화한 과정을 중점적으로 설명드리겠습니다.

## 문제 상황
클라이언트에서 바로 Nexon API를 호출하게 되면 API KEY가 노출되는 문제와  
API 호출에 헤더 및 URL설정 등이 반복되어 필요한 상황이 있었습니다.

## 해결 방법
### Next.js API 라우트
우선 프록시 서버 역할로 API KEY를 보호할 수 있도록 Next.js API 라우트를 이용하기로 했습니다.

**클라이언트 -> Next.js API -> Nexon API 호출**

### Axios 인스턴스 생성, Axios 인터셉터 적용
Axios 인터셉터를 활용하면 API 호출의 공통 설정을 관리할 수 있어 유지보수성을 높일 수 있습니다

## 구현 방법
우선 APIKEY를 숨기기 위해 환경설정 파일에 API KEY와 요청을 보낼 Base URL을 등록해줍니다.
```.env
NEXT_PUBLIC_MAPLEAPI_KEY="발급받은 API KEY"
NEXT_PUBLIC_URL=https://open.api.nexon.com/maplestory
```

저는 클라이언트와 Next.js API 라우트에서 모두 요청을 보내야 하니 
클라이언트와 Next.js API 라우트에 필요한 인터페이스를 각각 생성해줍니다.

```ts
/* 클라이언트 */

// Base URL
export const getClientBase = () => process.env.NEXT_PUBLIC_BACKEND_URL

const client = axios.create({
  timeout: 5000,
  baseURL: getClientBase(),
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
})
```
```ts
/* Next.js API 라우트 */

// Base URL
export const getBackEndBase = () => process.env.NEXT_PUBLIC_URL
// 메이플 api 키
export const getMapleKey = () => process.env.NEXT_PUBLIC_MAPLEAPI_KEY

const backend = axios.create({
  timeout: 5000,
  baseURL: getBackEndBase(),
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'x-nxopen-api-key': getMapleKey(),
  },
})
```

이러면 클라이언트에선 `client` 변수를 이용해 Next.js API 라우트 에선 `backend`변수를 이용해 데이터 요청을 보낼 수 있습니다.

하지만 `GET`, `POST`, `PUT`, `Patch`, `Delete` 요청을 제너틱 타입을 이용해 응답 타입의 강제화와 메소드 통일성을 확보합니다. 

```typescript
export const Get = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  const response = await backend.get(url, config)
  return response
}

export const Post = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  const response = await backend.post(url, data, config)

  return response
}

export const Put = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  const response = await backend.put(url, data, config)
  return response
}

export const Patch = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  const response = await backend.patch(url, data, config)

  return response
}

export const Delete = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  const response = await backend.delete(url, {
    ...config,
    data,
  })

  return response
}
```
`backend.interceptors.request.use()`와 `backend.interceptors.response.use()` 를 이용해 `request`와 `response`의 요청을 중간에 처리할 수 있습니다. 

저는 `request`요청에는 성공잘 보냈나 확인하기 위해 Next.js API 라우트에는 `console.log`를 이용해 확인했고 클라이언트 `response`요청은 에러를 공통으로 처리하기 위해 Nexon OPEN API 에서 제공하는 에러 코드 케이스테 따라 처리하도록 했습니다.
```typescript
// Next.js API 라우트 request
backend.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const { method, url } = config
    console.log(`[API - REQUEST] ${method?.toUpperCase()} ${url}`)
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  },
)

// 클라이언트 
client.interceptors.response.use((res: AxiosResponse): AxiosResponse => {
  // 응답을 받은 후 처리할 작업
  return res
}, onError)

const onError = (error: AxiosError | Error): Promise<AxiosError> => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      const name = error.response.data.name || '' // 기본값을 빈 문자열로 설정
      switch (name) {
        case 'OPENAPI00001':
          alert('500: 서버 내부 오류')
          break
        case 'OPENAPI00002':
          alert('403: 권한이 없는 경우')
          break
        case 'OPENAPI00003':
          alert('400: 유효하지 않은 식별자')
          break
        case 'OPENAPI00004':
          alert('400: 파라미터 누락 또는 유효하지 않음')
          break
        case 'OPENAPI00005':
          alert('400: 유효하지 않은 API KEY')
          break
        case 'OPENAPI00006':
          alert('400: 유효하지 않은 게임 또는 API PATH')
          break
        case 'OPENAPI00007':
          alert('429: API 호출량 초과')
          break
        case 'OPENAPI00009':
          alert('400: 데이터 준비 중')
          break
        case 'OPENAPI00010':
          alert('400: 게임 점검 중')
          break
        case 'OPENAPI00011':
          alert('503: API 점검 중')
          break
        default:
          alert('알 수 없는 오류')
      }
    }
  }

  return Promise.reject(error)
}
```

요청을 보낼 때 특정 요청만을 보내는 함수를 만들어 요청을 보내기면 하면 됩니다.
```ts
// 캐릭터 정보를 가져오는 함수
export const getCharInfo = async (
  characterName: string,
): Promise<ResponseDataType<MainCharacterResponse>> => {
  try {
    const characterResponse = await Get<
      ResponseDataType<MainCharacterResponse>
    >(Paths.character, {
      params: {
        character_name: characterName,
      },
    })
    return characterResponse.data
  } catch (error) {
    console.error(error)
    throw new Error('Failed to get Char')
  }
}
```

### 마치며
Axios 인터셉터를 활용해 공통 에러 처리 및 로깅을 적용하고 각 HTTP요청을 함수화 해 타입 안정성을 확보하는 과정에서 많은 시행착오를 겪었습니다. 
특히 타입 안정성을 강화하는데 있어서 TypeScript를 활용한 명시적인 타입 설계와 안전한 코드 작성하는 방법을 이해할 수 있었습니다.

또 예외 처리를 구현하면서 다양한 케이스의 에러를 고려해야 했고 이를 통해 더 견고한 API요청 방식을 고민할 수 있었습니다.

[axios 문서](https://axios-http.com/docs/intro)