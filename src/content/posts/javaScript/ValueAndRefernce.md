---
title: 자바스크립트의 값과 레퍼런스
tags: [javaScript]
date: "2024.06.08"
---
오늘은 you don`t Know JavaScript 책을 읽고 그 내용에 관해 글을 써보겠습니다.

자바스크립트에는 원시 자료형(값)과 참조 자료형(레퍼런스)이 존재합니다. 원시 자료형은 불변 하고 값 자체가 변수에 할당된다는 특징이 있고 
참조 자료형은 변경 가능하고 변수에 저장된 메모리 주소가 할당된다는 특징이 있습니다.

### 값 (Value) 

```
string: 문자열. 예: 'Hello' 

number: 숫자. 예: 42 

bigint: 매우 큰 숫자. 예: 9007199254740991n 

boolean: true 또는 false 

undefined: 값이 정의되지 않았을 때의 상태 

symbol: 고유하고 변경할 수 없는 값 

null: 값이 존재하지 않음을 나타내는 특수한 값 
```

>이런 원시 데이터(값)의 특징은 복사라는 개념을 따릅니다. 

예를 들어 숫자 값을 변수에 할당하면 그 값 자체가 복사 됩니다. 아래의 예시 처럼 x의 값을 바꿔도 y는 영향을 받지 않습니다.

```javascript
let x = 10;
let y = x;  // x의 값을 y에 복사

x = 20;     // x의 값만 변경됨

console.log(y);  // 10
```
### 레퍼런스 (Reference) 

```
Object : 키(key)-값(value) 쌍의 집합. 예: {name: 'Alice', age: 25}

Array : 리스트 형태의 자료형. 예: ['apple', 'banana', 'cherry'] 

Function : 특정 작업을 실행하는 코드 블록 이외에도 복잡한 데이터를 가리킵니다.
```
이런 복잡 데이터는 값 자체가 아니라 데이터가 저장된 메모리 주소를 저장합니다. 즉 변수는 데이터를 가르키는 주소만 저장하고 여러 변수가 같은 메모리 주소를 가르킬 수 있습니다. 

여기서 obj1과 obj2는 같은 객체를 참조하고 있기 때문에 obj2의 값을 변경하면 obj1에도 영향을 줍니다.

```javascript
let obj1 = { name: 'Alice', age: 25 };
let obj2 = obj1;  // obj2는 obj1을 참조

obj2.age = 30;     // obj2의 값을 변경하면 obj1에도 영향을 미침

console.log(obj1.age);  // 30
```
## 값 복사와 레퍼런스 복사의 차이

한번 정리해보자면 

**값 복사**
- 원시 데이터는 변수에 할당될 때 그 값이 할당됩니다
- 복사된 변수는 독립적으로 하나의 값을 변경해도 다른 값에 영향을 미치지 않습니다.

**레퍼런스 복사**
- 객체나 배열은 변수에 할당될 때 그 값을 참조하는 메모리 주소가 복사됩니다.
- 같은 데이터를 참조하는 여러 변수에서 변경 사항이 공유됩니다.

자바스크립트가 복잡 데이터 타입에 대해서 레퍼런스 복사를 이용하는 이유는 메모리 효율성과 최적화 때문입니다.
원시 데이터와 달리 객체나 배열은 데이터가 중첩될 경우 구조가 매우 복잡해질 수 있어 메모리 주소 복사를 통해 효율성을 높입니다.

### 얕은 복사와 깊은 복사

그러면 객체나 배열을 다룰때 불필요한 데이터 변경을 피하기 위한 방법이 있습니다.

#### 얕은 복사

( ... ) 스프레드 연산자를 사용해 얕은 복사를 수행할 수 있으며 객체나 배열의 최상위 속성만을 복사하고 
내부에 중첩된 객체나 배열은 원본 데이터를 참조합니다.
```javascript
const original = { a: 1, b: { c: 2 } };
const shallowCopy = { ...original };

shallowCopy.a = 10;          // 최상위 값 변경 (독립적)
shallowCopy.b.c = 20;        // 중첩된 객체 값 변경 (원본 영향)

console.log(original);       // { a: 1, b: { c: 20 } }
console.log(shallowCopy);    // { a: 10, b: { c: 20 } }
```

아래의 코드를 보면 최상위 레벨의 속성만 복사해 깊은 복사처럼 보일 뿐 여전히 앝은 복사입니다.

```javascript
let original = { a: 1, b: 2 };
let copy = { ...original };

copy.a = 10;

console.log(original.a); // 1 (독립적)
console.log(copy.a);     // 10
```
```javascript
const original = { a: 1, b: { c: 2 } };
const copy = { ...original };

// copy의 중첩된 객체를 수정
copy.b.c = 10;

const object = { a: 1, b: { c: 10 } }; // 비교할 다른 값 생성

console.log(original); // 10 { a: 1, b: { c: 2 } } (원본도 변경됨)
console.log(copy.b === original.b); // true (중첩 객체는 같은 참조)

console.log(object.b === original.b); // false original과 동일해 보이지만 다른 값이다.
```


#### 깊은 복사

모든 수준의 데이터를 복사해 원본과 완전히 독립적인 새로운 데이터를 생성합니다. 
따라서 원본 데이터를 변경해도 복사된 데이터는 영향을 받지 않습니다.

깊은 복사는 JSON.parse()와 JSON.stringify()를 사용해 수행하거나 lodash의 cloneDeep() 같은 라이브러리를 사용해 수행할 수 있습니다.
> JSON.parse()와 JSON.stringify() RegExp이나 Date같은 특수 객체나 undefined, 함수, Symbol, 순환 참조의 경우는 복사되지 않습니다.

```javascript
const original = { a: 1, b: { c: 2 } };
const deepCopy = JSON.parse(JSON.stringify(original));

deepCopy.a = 10;             // 최상위 값 변경
deepCopy.b.c = 20;           // 중첩된 객체 값 변경

console.log(original);       // { a: 1, b: { c: 2 } }
console.log(deepCopy);       // { a: 10, b: { c: 20 } }
```

## 마무리

사실 이 책을 처음 읽은 것은 2년 전이었습니다. 오늘 다시 읽으면서 그 땐 이해하지 못 했던 부분들을 많이 이해할 수 있었고 
그동안 개발을 하며 느낌적으로 알고 있던 것들을 확실히 정리하고 넘어갈 수 있어 뜻깊은 시간이 되었습니다.


앞으로도 이런 개념적인 부분을 공부하는 시간을 주기적으로 가져야겠다고 생각한 하루였습니다.