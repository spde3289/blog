---
title: React 커스텀 Hook 만들기
tags: [react]
date: "2023.04.20"
---
리엑트를 다룰 때 useState나 useEffect같은 Hook을 많이 사용해 봤을거다. 근데 이 Hook을 개발자가 원하는대로 만드는게 가능하다. 커스텀 훅은 반복되는 로직을 관리하는데 매우 용이하다.

## 사용방법 

커스텀 훅을 만드는 방법은 그렇게 어렵지 않다. 이전에 커스텀 훅을 만들때 지켜야 할 규직이 몇가지 있는데 다음과 같다.

- 커스텀 훅의 이름은 use + 대문자로 시작하는 이름을 지정해야 한다
- 커스텀 훅에는 react에서 제공하는 내장 훅을 사용해야한다.
- 커스텀 훅은 jsx가 아닌 오브젝트나 배열을 return 해준다.
다음과 같이 아이디와 비번의 값을 입력받는 컴포넌트가 있다.

```javascript

  const Form = () => {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");

    const handleId = (e) => {
      setId(e.target.value);
    }

    const handlePassword = (e) => {
      setPassword(e.target.value);
    }

    return(
      <>
        <label>
          id :
          <input value={id} onChange={handleId}/>
        </label>
        <label>
          password :
          <input value={password} onChange={handlePassword}/>
        </label>
      </>
    )
  }


```
위에 있는 코드에서 중복되는 로직이 보일거다. 우리는 이제 이걸 커스텀 훅으로 만들어 재사용성을 높혀 보도록 하겠다.

```javascript

  const app = () => {
    const idForm = useFormInput("");
    const passwordForm = useFormInput("");

    return(
      <>
        <label>
          id :
          <input value={idForm.value} onChange={idForm.onChange}/>
        </label>
        <label>
          password :
          <input value={passwordForm.value} onChange={passwordForm.onChange}/>
        </label>
      </>
    )
  }

  const useFormInput = (Value) => {
    const [value, setValue] = useState(Value);
  
    function handleChange(e) {
      setValue(e.target.value);
    }
  
    return {
      value: value,
      onChange: handleChange
    };
  }


```
물론 커스텀 훅이 없어도 개발하는데 지장을 주지는 않지만 잘만 사용하면 아주 편리한 기능이니 어렵더라도 잘 활용하도록 해야겠다는 생각이 들었다. 또한 커스텀 훅을 이용하면 재사용성도 올라가고 관리도 용이해져 마다할 이유가 없다고 생각한다.

[https://react.dev/learn/reusing-logic-with-custom-hooks](https://react.dev/learn/reusing-logic-with-custom-hooks) 
