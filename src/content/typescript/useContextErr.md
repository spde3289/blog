---
title: TypeScript 환경에서 createContext 사용하기
tags: [typescript]
date: "2023.08.16"
---
최근 타입스크립트 환경에서 creactContext를 사용하다 아래와 같은 에러가 발생해 createContext 사용방법과 해결방법을 정리해보려 한다.

```javascript

  //ERR
  "Type Object must have a '[Symbol.iterator]()' method that returns an iterator."


```
## creactContext 사용방법 

기본적으로 creactContext를 생성해주면 된다.

```javascript

  import { createContext } from "react";

  interface UserInfoType {
    name: string;
  }

  const UserInfoContext = createContext<UserInfoType>({name: "Kim"});


```
그 이후 구성 요소를 context.Provider 로 래핑 해준뒤 useContext로 호출해 사용할 수 있다.

```javascript

  import { useState, useContext } from "react";

  const App = () => {
    const [name, setName] = useState<UserInfoType>({name: "lee"});

    return (
      <UserInfoContext.Provider value={name}>
        <MyComponent />
      </UserInfoContext.Provider>
    );
  };

  const MyComponent = () => {
    const { name } = useContext(UserInfoContext);

    return <p>The current name is {name}.</p>;
  };


```
만약 기본값이 없다면 null으로 지정해주면된다.

```javascript

  interface CurrentUserContextType {
    username: string;
  }

  const CurrentUserContext = createContext<CurrentUserContextType | null>(null);


```
여기서 문제가 발생했는데 .Provider로 래핑해준 후 사용해주려 하니 위와 같은 에러가 발생했다. 이때 런타임 유형 검사를 통해 에러를 방지할 수 있다 혹은 as 빈 객체를 기본값으로 사용하고 예상되는 context 유형으로 캐스트 하는 것 이다.

```javascript

  import { createContext } from "react";

  interface UserInfoType {
    name: string;
  }

  const UserInfoContext = createContext<UserInfoType| null>(null);

  const useUserInfo = () => {
    const currentContext = useContext(UserInfoContext);
    if (!currentContext) {
      throw new Error(
        "useCurrentUser has to be used within <CurrentContext.Provider>"
      );
    }

    return currentContext;
  }

  // 또는 

  interface UserInfoType {
    name: string;
  }

  const UserInfoContext = createContext<UserInfoType>({} as UserInfoType);


```
[https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/context/](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/context/) 

[https://yamoo9.gitbook.io/typescript/types/type-assertions](https://yamoo9.gitbook.io/typescript/types/type-assertions) 
