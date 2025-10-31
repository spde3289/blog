---
title: 타입스크립트 정리 - 2
tags: [typeScript]
date: "2024.08.24"
---
저번주에 타입스크립트의 기본 문법과 속성에 대해 정리했는데   
오늘은 타입스크립트에서 제공하는 유틸들에 대해 정리해보도록 하겠습니다.

## 유틸리티 타입

### `Partial<T>`
`Partial<T>`는 객체의 타입을 `?` 옵셔널 프로퍼티로 만들어줍니다.
```typescript
interface Person {
  name: string;
  age: number;
}

const person: Partial<Person> = {
  name: 'John', 
};

// 이렇게 바뀝니다.
// interface Person {
//   name?: string;
//   age?: number;
// }
```

### `Required<T>`
`Required<T>`는 객체의 모든 속성을 필수로 만들어 줍니다.
```typescript
interface Person {
  name?: string;
  age?: number;
}

const person: Required<Person> = {
  name: 'John',
  age: 30, 
};

// 이렇게 바뀝니다.
// interface Person {
//   name: string;
//   age: number;
// }
```

### `Readonly<T>`
`Readonly<T>`는 속성을 읽기 전용으로 만들어주며 속성을 수정할 수 없게 만들 때 사용합니다.
```typescript
interface Person {
  name: string;
  age: number;
}

const person: Readonly<Person> = {
  name: 'John',
  age: 30,
};

person.name = 'Doe'; 
// Cannot assign to 'name' because it is a read-only property.ts(2540)
```

### `Record<K, T>`
`Record<K, T>`는 키 타입 `K` 와 값 타입 `T`를 가지는 객체 타입을 만듭니다.
```typescript
type Person = 'name' | 'age';
type Info = string;

const personInfo: Record<Person, Info> = {
  name: 'John',
  age: '30',
};

// 이런 타입이 생성됩니다.
// type personInfo { 
//   name: string;
//   age: string;
// }
```

### `Pick<T, K>`
`Pick<T, K>`는 타입 `T`에서 일부 속성을 선택해 새로운 타입을 만듭니다.
```typescript
interface Person {
  name: string;
  age: number;
  address: string;
}

type PersonName = Pick<Person, 'name'>; // name 속성만 선택

// 이런 타입이 생성됩니다.
// type personInfo = { 
//   name: string;
// }
```

### `Omit<T, K>`
`Omit<T, K>`는 타입 `T`에서 특정 속성 `K`를 제외한 속성들을 가진 새로운 타입을 만듭니다.
```typescript
interface Person {
  name: string;
  age: number;
  address: string;
}

type PersonWithoutAddress = Omit<Person, 'address'>; // address 속성 제외

// 이런 타입이 생성됩니다.
// type PersonWithoutAddress = { 
//   name: string;
//   age: number;
// }
```

### `Exclude<T, U>`
`Exclude<T, U>`는 타입 `T`에서 타입 `U`에 포함된 타입을 제외한 새로운 타입을 만듭니다.
```typescript
type A = string | number | boolean;
type B = number | boolean;

type C = Exclude<A, B>; // string만 남음

// 이런 타입이 생성됩니다.
// type C = string
```
### `Extract<T, U>`
`Extract<T, U>`는 타입 `T`에서 타입`U`에 포함된 타입을 추출해 새로운 타입을 만듭니다.
```typescript
type A = string | number | boolean;
type B = number | boolean;

type C = Extract<A, B>;

// 이런 타입이 생성됩니다.
// type C = number | boolean
```

### `NonNullable<T>`
`NonNullable<T>`는 타입 `T`에서 `null`과 `undifined`를 제외한 새로운 타입을 만듭니다.
```typescript
type T = string | null | undefined;

type NonNullT = NonNullable<T>;

// 이런 타입이 생성됩니다.
// type NonNullT = string
```
### `Parameters<T>`
`Parameters<T>`는 함수 타입 `T`에서 함수의 파라미터를 튜플 형식으로 추출합니다.
```typescript
type Func = (a: number, b: string) => void;
type Params = Parameters<Func>;

// 이런 타입이 생성됩니다.
// type Params = [a: number, b: string]
```

### `ConstructorParameters<T>`
`ConstructorParameters<T>`는 클래스 생성자 함수에 매개변수 타입을 튜플 형식으로 추출합니다.
```typescript
class Person {
  constructor(public name: string, public age: number) {}
}

type ConstructorParams = ConstructorParameters<typeof Person>; 

// 이런 타입이 생성됩니다.
// type ConstructorParams = [name: string, age: number]
```

### `ReturnType<T>`
`ReturnType<T>`는 함수 타입 `T`에서 반환값의 타입을 추출합니다.
```typescript
type Func = (a: number, b: string) => boolean;
type Return = ReturnType<Func>;

// 이런 타입이 생성됩니다.
// type Return = boolean
```

### `InstanceType<T>`
`InstanceType<T>`는 생성자 함수 타입 `T`에서 해당 클래스의 인스턴트 타입을 추출합니다.
```typescript
class Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

type PersonInstance = InstanceType<typeof Person>;

// 이런 타입이 생성됩니다.
// type PersonInstance = Person
```

### `Awaited<T>`
`Awaited<T>`는 프로미스에서 반환값의 타입을 추출합니다.
```typescript
type Response = Promise<number>;

type Resolved = Awaited<Response>; 

// 이런 타입이 생성됩니다.
// type Resolved = number
```

### `ThisType<T>`
`ThisType<T>`는 객체의 컨텍스트`this` 타입을 지정할 때 사용됩니다. 
```typescript
type ObjectWithThis = {
  name: string;
  greet: () => void;
} & ThisType<{ name: string }>;

const obj: ObjectWithThis = {
  name: 'John',
  greet() {
    console.log(this.name);
  },
};

// this의 타입이 { name: string }으로 추론됩니다.
```

### `NoInfer<T>`
`NoInfer<T>`는 타입 추론을 막고 명시적으로 타입을 선언하도록 합니다.
```typescript
function example<T>(arg: NoInfer<T>): T {
  return arg;
}

const result1 = example<number>(42); // example<number>(arg: number): number
const result2 = example(42); // example<unknown>(arg: unknown): unknown
```

### `ThisParameterType<T>`
`ThisParameterType<T>`는 `this` 파라미터의 타입을 추출합니다.
```typescript
function toHex(this: Number) {
  return this.toString(16);
}
 
function numberToString(n: ThisParameterType<typeof toHex>) {
  return toHex.apply(n);
}

// 이런 타입이 생성됩니다.
// numberToString(n: ThisParameterType<(this: Number) => string>): string
```

### `OmitThisParameter<T>`
`OmitThisParameter<T>`는 함수 타입에서 `this` 파라미터 타입을 제거합니다.
```typescript
function toHex(this: Number) {
  return this.toString(16);
}
 
const fiveToHex: OmitThisParameter<typeof toHex> = toHex.bind(5);
 
// 이런 타입이 생성됩니다.
// fiveToHex: () => string
```


## 내장 문자열 조작 타입

### `Uppercase<StringType>`
`Uppercase`는 문자열의 모든 문자를 대문자로 변환합니다.
```typescript
type UppercaseExample = Uppercase<'hello world'>;
// 결과: 'HELLO WORLD'
```

### `Lowercase<StringType>`
`Lowercase`는 문자열의 모든 문자를 소문자로 변환합니다.
```typescript
type LowercaseExample = Lowercase<'HELLO WORLD'>;
// 결과: 'hello world'
```

### `Capitalize<StringType>`
`Capitalize`는 문자열의 첫 번째 문자만 대문자로 변환합니다.
```typescript
type CapitalizeExample = Capitalize<'hello world'>;
// 결과: 'Hello world'
```

### `Uncapitalize<StringType>`
`Uncapitalize`는 문자열의 첫 번째 문자만 소문자로 변환합니다.
```typescript
type UncapitalizeExample = Uncapitalize<'Hello World'>;
// 결과: 'hello World'
```

## 마치며
평소 타입스크립트를 사용하면서도 막연하게 사용하던 유틸리티 타입들에 대해 정리하고 넘어갈 수 있는 시간이 되어 너무 좋았고 이 시간 이후로는 유틸리티 타입과 다양한 타입 연산자를 활용해 더욱 효율적이고 간결하게 타입을 다루는 연습을 해야겠습니다.

## 참고자료
[공식 문서](https://www.typescriptlang.org/ko/docs/handbook/utility-types.html#parameterstype)