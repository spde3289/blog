---
title: 타입스크립트 정리
tags: [typescript]
date: "2024.08.17"
---
타입스크립트를 사용한 지 1년 정도가 되었는데 그동안 작성했던 타입스크립트 정리 글에 잘못된 부분들이 많아
이 게시글을 작성하며 다시 정리해 보려고 합니다.

## `TypeScript` 란?

타입스크립트는 자바스크립트를 기반으로 한 정적 타입 언어입니다. 컴파일 시점에서 타입 오류를 확인할 수 있고
타입을 명시해 유지보수하기 쉽고 미리 오류를 잡을 수 있도록 도와줍니다.

## 타입

### 기본 타입
```
문자열(String): string
숫자(Number): number
불리언(Boolean): boolean
Null: null
Undefined: undefined
Symbol: symbol
BigInt: bigint
```
### Array
배열은 `타입[]` `Array<타입>` 두가지 방법으로 선언할 수 있으며 `|` 유니언(Union)을 사용하면 
여려개의 타입을 가질 수 있습니다.
```typescript
let numbers: number[] = [1, 2, 3]; // 숫자만 가질 수 있습니다.

let strings: Array<string> = ["a", "b", "c"]; // 문자만 허용되는 배열 입니다.

let array: (string | number)[] = [1, 2, "A"]; // 숫자와 문자가 허용됩니다.
```

### Tuple
튜플은 고정된 길이와 순서를 가지는 배열 입니다.
```typescript
let user: [string, number] = ["Alice", 25];
```

### Enum
열거형은 관련된 타입도 정의한 수 있습니다.
```typescript
enum Direction {
    Up = 1,
    Down, // 2
    Left, // 3
    Right // 4
}
let move: Direction = Direction.Up; // 1
```

### Object
객체의 구조에 대해 타입을 정의할 수 있습니다.
```typescript
type User = {
    id: number;
    name: string;
    isActive: boolean;
};

let user: User = {
    id: 1,
    name: "Alice",
    isActive: true,
};
```

### Function
함수의 매개변수와 반환값에 대한 타입을 지정할 수 있습니다.
```typescript
function add(a: number, b: number): number {
  return a + b;
}

const subtract = (a: number, b: number): number => {
  return a - b;
}

add(3, 5) // 8
add(3, "5") // Argument of type 'string' is not assignable to parameter of type 'number'.ts(2345)
```

### any, unknown, void, never
```
any: 모든 타입을 허용합니다.
unknown: any와 같이 모든 타입에 할당할 수 있지만 타입 단언이 필요합니다.
void: 비어있다는 의미로 반환값이 없는 함수에 사용할 수 있습니다.
never: 절대 발생하지 않는 값을 의미하며 주로 오류를 던지는 함수등에 사용하며 값이 비어있다는 `void`와 혼동하면 안됩니다.
```

### Generic
제네릭 타입은 타입을 매개변수처럼 받아 사용할 수 있습니다.
```
function identity<T>(value: T): T {
    return value;
}

let output = identity<string>("Hello");
```

### 타입추론
타입스크립트는 명시적은 타입선언을 하지 않아도 타입에 대한 정보를 제공합니다.
```typescript
let text = "text" 

text = 1 //Type 'number' is not assignable to type 'string'.ts(2322)
```
이 타입추론은 제네릭 타입에도 적용할 수 있습니다.
```typescript
function Box<T>(arg: T): T {
  return arg;
}

let num = Box(10);  // num은 number 타입
let str = Box("Hello, TypeScript!");  // str은 string 타입
```


## 타입 선언 방법
타입을 선언하는 방법으론 `type`과 `Interface`가 있습니다.

### type
변수처럼 `type` 키워드를 이용해 타입을 선언할 수 있습니다.
```typescript
type IdType = number
type NameType = string
type UserType = {
  id: IdType;
  name: NameType;
  info: string[]
}

const user: UserType = {
  id: 1234;
  name: "김지훈"
  info: ["안", "녕"]
}
```

### Interface
인터페이스는 객체의 타입을 정의하는데 큰 도움이 되며 `readonly`을 이용해 읽기 전용 속성을 정의하거나
`extends`를 이용해 확장할 수 도 있습니다.
```typescript
interface User {
  name: string;
  age: number;
  isAdmin: boolean;

}

const user: User = {
  name: "John",
  age: 30,
  isAdmin: true,
};

```
```typescript
  interface User {
    readonly id: number; // 읽기 전용 속성은 수정할 수 없습니다.
    name: string;
  }

  const user: User = { id: 1, name: "Charlie" };
  user.id = 3; // Cannot assign to 'id' because it is a read-only property.ts(2540)
```
```typescript
interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}

const myDog: Dog = {
  name: "Buddy",
  breed: "Golden Retriever",
};
```

## 타입 연산자

### keyof
`key of`는 인덱싱 가능한 타입의 속성 이름들을 유니온 타입으로 적용시킵니다.
```typescript
type User = {
  id: number;
  name: string;
  age: number;
};

type UserKeys = keyof User; // "id" | "name" | "age"
```

### as
`as`를 사용하면 컴파일러에 명시적으로 타입을 알려줍니다.
```typescript
const value: unknown = "Hello, TypeScript";
const str = value as string; // unknown → string으로 단언

function add(a: string | number, isNumber: boolean) {
  if (isNumber) {
    // Property 'toFixed' does not exist on type 'string | number'.
    // Property 'toFixed' does not exist on type 'string'.ts(2339)
    a.toFixed(2);

    (a as number).toFixed(2) // 이상 없음
  }
}
```
### is
반환 타입을 좁혀주는 역할을 합니다.
```typescript
function isNumber(value: unknown): value is number {
  return typeof value === "number";
}

const input: unknown = 123;
if (isNumber(input)) {
  console.log(input.toFixed(2)); // input이 number로 타입이 좁혀짐
}
```
### in
특정 속성이 있는지 확인합니다.
```typescript
type Cat = { meow: () => void };
type Dog = { bark: () => void };

function makeSound(animal: Cat | Dog) {
  if ("meow" in animal) {
    animal.meow();
  } else {
    animal.bark();
  }
}
```
### extends
인터페이스나 제네릭 타입에 확장할 수 있습니다.
```typescript
function logLength<T extends { length: number }>(value: T): void { // length속성이 있는 변수만 허용함
  console.log(value.length);
}

logLength("Hello"); // string은 length 속성이 있음
logLength([1, 2, 3]); // 배열도 length 속성이 있음

interface Animal {
  name: string;
  age: number;
}

interface Dog extends Animal {
  breed: string;
}

const myDog: Dog = {
  name: "Buddy",
  age: 3,
  breed: "Golden Retriever",
};
```

### infer
조건부 타입과 함께 사용되어 타입을 추론합니다.
```typescript
type ElementType<T> = T extends (infer U)[] ? U : T;

type A = ElementType<string[]>;  // string
type B = ElementType<number>;    // number
type C = ElementType<boolean[]>; // boolean
```

### & 와 |
`&`는 `and`를 의미합니다. `|`는 `or`을 의미합니다
```typescript
type Name = { name: string };
type Age = { age: number };
type Person = Name & Age;

const person: Person = { name: "Alice", age: 30 };

type Status = "success" | "error" | "pending";

function handleStatus(status: Status) {
  if (status === "success") {
    console.log("Success!");
  } else if (status === "error") {
    console.log("Error!");
  }
}
```
### `?` 옵셔널 프로퍼티
객체 타입에서 필수 속성이 아닌 선택적으로 지정합니다.
```typescript
interface User {
  name: string;
  age?: number; // 옵셔널 프로퍼티
}

// age?는 number | undefined 으로 해석됩니다.
```

## 마치며
여기까지 타입스크립트의 문법과 타입의 종류에 대해서 정리했는데   
다음 주에는 타입스크립트의 유틸리티 타입에 대해 정리해 보도록 하겠습니다.

[타입스크립트 공식문서](https://www.typescriptlang.org/)